'use client'

import { ProgrammingLanguage } from './problems-complete'

const JDOODLE_LANGUAGES = {
  python: { language: 'python3', versionIndex: '4' },
  cpp: { language: 'cpp17', versionIndex: '0' },
  java: { language: 'java', versionIndex: '4' }
}

export async function executeCode(
  code: string,
  testCase: { input: string, expectedOutput: string },
  language: ProgrammingLanguage
): Promise<{ passed: boolean; actualOutput: string; error?: string }> {
  try {
    const jdoodleConfig = JDOODLE_LANGUAGES[language]
    const functionName = extractFunctionName(code, language)
    const params = parseInputParams(testCase.input)
    const isVoid = detectVoid(code, language, functionName)

    let fullScript = ''
    if (language === 'python') fullScript = wrapPython(code, params, functionName, isVoid)
    else if (language === 'cpp') fullScript = wrapCpp(code, params, functionName, isVoid)
    else if (language === 'java') fullScript = wrapJava(code, params, functionName, isVoid)

    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: fullScript,
        language: jdoodleConfig.language,
        versionIndex: jdoodleConfig.versionIndex
      })
    })

    const data = await response.json()
    const actualOutput = (data.output || '').trim()
    const expected = testCase.expectedOutput.trim()
    
    const isCorrect = normalizeOutput(actualOutput) === normalizeOutput(expected)

    return {
      passed: isCorrect,
      actualOutput: actualOutput || (data.error ? `Error: ${data.error}` : '(no output)'),
      error: isCorrect ? undefined : (data.error || actualOutput)
    }
  } catch (e: any) {
    return { passed: false, actualOutput: '', error: `Network Error: ${e.message}` }
  }
}

// ------------------- Helpers -------------------

function normalizeOutput(output: string): string {
  return output.replace(/\s+/g, '').replace(/[\[\]"'{} ]/g, '').toLowerCase()
}

function extractFunctionName(code: string, lang: string): string {
  const re = lang === 'python' ? /def\s+(\w+)/ : /(\w+)\s*\(/
  const match = code.match(re)
  return match ? match[1] : 'solution'
}

function detectVoid(code: string, lang: string, functionName: string): boolean {
  if (lang === 'python') {
    const parts = code.split(`def ${functionName}`)
    if (parts.length < 2) return false
    const functionBody = parts[1].split('def ')[0]
    return !functionBody.includes('return ')
  }
  const voidRegex = new RegExp(`void\\s+${functionName}`)
  return voidRegex.test(code)
}

function parseInputParams(input: string): string[] {
  const params: string[] = []
  let current = '', depth = 0, inString = false
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (char === '"' && input[i-1] !== '\\') inString = !inString
    if (!inString) {
      if (char === '[' || char === '{') depth++
      if (char === ']' || char === '}') depth--
    }
    if (char === ',' && depth === 0 && !inString) {
      params.push(current.trim())
      current = ''
    } else current += char
  }
  if (current.trim()) params.push(current.trim())
  return params
}

// ------------------- Python Wrapper -------------------

function wrapPython(code: string, params: string[], fName: string, isVoid: boolean) {
  const hasTreeNode = code.includes("TreeNode")
  const hasListNode = code.includes("ListNode")
  
  return `
import json, collections
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right
class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def build_tree(nodes):
    if not nodes or nodes[0] is None: return None
    root = TreeNode(nodes[0]); q = collections.deque([root]); i = 1
    while q and i < len(nodes):
        node = q.popleft()
        if i < len(nodes) and nodes[i] is not None:
            node.left = TreeNode(nodes[i]); q.append(node.left)
        i += 1
        if i < len(nodes) and nodes[i] is not None:
            node.right = TreeNode(nodes[i]); q.append(node.right)
        i += 1
    return root

def build_list(nodes):
    dummy = ListNode(0); cur = dummy
    for v in nodes: cur.next = ListNode(v); cur = cur.next
    return dummy.next

def serialize(res):
    if isinstance(res, TreeNode):
        out, q = [], collections.deque([res])
        while q:
            n = q.popleft()
            if n: out.append(n.val); q.append(n.left); q.append(n.right)
            else: out.append(None)
        while out and out[-1] is None: out.pop()
        return out
    if isinstance(res, ListNode):
        out = []
        while res: out.append(res.val); res = res.next
        return out
    return res

${code}

try:
    sol = Solution()
    args = [${params.join(',').replace(/null/g, 'None')}]
    if ${hasTreeNode ? 'True' : 'False'} and len(args) > 0 and isinstance(args[0], list):
        args[0] = build_tree(args[0])
    elif ${hasListNode ? 'True' : 'False'} and len(args) > 0 and isinstance(args[0], list):
        args[0] = build_list(args[0])
    
    ret = sol.${fName}(*args)
    res = args[0] if ${isVoid ? 'True' : 'False'} else ret
    print(json.dumps(serialize(res)))
except Exception as e:
    print(f"Error: {e}")
`
}

// ------------------- C++ Wrapper -------------------

function wrapCpp(code: string, params: string[], fName: string, isVoid: boolean) {
  const hasTreeNode = code.includes("TreeNode")
  const hasListNode = code.includes("ListNode")

  const argDecls = params.map((p, i) => {
    let val = p.replace(/\[/g, '{').replace(/\]/g, '}').replace(/null/g, '-999')
    if (i === 0 && (hasTreeNode || hasListNode)) return `vector<int> raw0 = ${val};`
    if (p.startsWith('[[')) return p.includes('"') ? `vector<vector<char>> arg${i} = ${val.replace(/"/g, "'")};` : `vector<vector<int>> arg${i} = ${val};`
    if (p.startsWith('[')) return p.includes('"') ? `vector<char> arg${i} = ${val.replace(/"/g, "'")};` : `vector<int> arg${i} = ${val};`
    if (p === 'true' || p === 'false') return `bool arg${i} = ${p};`
    if (p.startsWith('"')) return `string arg${i} = ${p};`
    return `int arg${i} = ${p};`
  }).join('\n    ')

  const callArgs = params.map((_, i) => {
    if (i === 0) {
      if (hasTreeNode) return "rootT"
      if (hasListNode) return "headL"
    }
    return `arg${i}`
  }).join(", ")

  return `
#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <stack>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <climits>
using namespace std;

struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x):val(x),left(nullptr),right(nullptr){} };
struct ListNode { int val; ListNode *next; ListNode(int x):val(x),next(nullptr){} };

TreeNode* bt(vector<int>& v){
    if(v.empty() || v[0]==-999) return nullptr;
    TreeNode* r = new TreeNode(v[0]); queue<TreeNode*> q; q.push(r); int i=1;
    while(!q.empty() && i<v.size()){
        TreeNode* c=q.front(); q.pop();
        if(i<v.size() && v[i]!=-999){ c->left=new TreeNode(v[i]); q.push(c->left); } i++;
        if(i<v.size() && v[i]!=-999){ c->right=new TreeNode(v[i]); q.push(c->right); } i++;
    } return r;
}
ListNode* bl(vector<int>& v){
    if(v.empty()) return nullptr;
    ListNode* h=new ListNode(v[0]), *c=h;
    for(int i=1;i<v.size();i++){ c->next=new ListNode(v[i]); c=c->next; } return h;
}

void pr(bool v){ cout<<(v?"true":"false"); }
void pr(int v){ cout<<v; }
void pr(string v){ cout<<"\""<<v<<"\""; }
template<typename T> void pr(const vector<T>& v){
    cout<<"["; for(size_t i=0;i<v.size();i++){ pr(v[i]); if(i<v.size()-1) cout<<","; } cout<<"]";
}
void pr(TreeNode* r){
    if(!r){ cout<<"[]"; return; }
    vector<string> res; queue<TreeNode*> q; q.push(r);
    while(!q.empty()){
        TreeNode* n=q.front(); q.pop();
        if(n){ res.push_back(to_string(n->val)); q.push(n->left); q.push(n->right); }
        else res.push_back("null");
    }
    while(!res.empty() && res.back()=="null") res.pop_back();
    cout<<"["; for(size_t i=0; i<res.size(); i++){ cout<<res[i]; if(i<res.size()-1) cout<<","; } cout<<"]";
}
void pr(ListNode* h){
    cout<<"["; while(h){ cout<<h->val; if(h->next) cout<<","; h=h->next; } cout<<"]";
}

${code.replace(/#include\s*<.*>/g, '')}

int main(){
    Solution sol;
    ${argDecls}
    TreeNode* rootT = ${hasTreeNode ? 'bt(raw0)' : 'nullptr'};
    ListNode* headL = ${hasListNode ? 'bl(raw0)' : 'nullptr'};
    ${isVoid ? 
      `sol.${fName}(${callArgs}); pr(${hasTreeNode ? "rootT" : hasListNode ? "headL" : "arg0"});` :
      `auto res = sol.${fName}(${callArgs}); pr(res);`
    }
    return 0;
}
`
}

// ------------------- Java Wrapper -------------------

function wrapJava(code: string, params: string[], fName: string, isVoid: boolean) {
  const hasTreeNode = code.includes("TreeNode")
  const hasListNode = code.includes("ListNode")

  const argDecls = params.map((p, i) => {
    let val = p.replace(/\[/g, '{').replace(/\]/g, '}').replace(/null/g, '-999')
    if (i === 0 && (hasTreeNode || hasListNode)) return `int[] raw0 = new int[] ${val};`
    if (p.startsWith('[[')) return p.includes('"') ? `char[][] arg${i} = ${val.replace(/"/g, "'")};` : `int[][] arg${i} = ${val};`
    if (p.startsWith('[')) return p.includes('"') ? `char[] arg${i} = new char[] ${val.replace(/"/g, "'")};` : `int[] arg${i} = new int[] ${val};`
    if (p === 'true' || p === 'false') return `boolean arg${i} = ${p};`
    if (p.startsWith('"')) return `String arg${i} = ${p};`
    return `int arg${i} = ${p};`
  }).join('\n        ')

  const callArgs = params.map((_, i) => {
    if (i === 0) {
      if (hasTreeNode) return "rootT"
      if (hasListNode) return "headL"
    }
    return `arg${i}`
  }).join(", ")

  return `
import java.util.*;

class TreeNode { int val; TreeNode left, right; TreeNode(int x){val=x;} }
class ListNode { int val; ListNode next; ListNode(int x){val=x;} }

${code}

public class Main {
    public static void main(String[] args){
        try {
            Solution sol = new Solution();
            ${argDecls}
            TreeNode rootT = ${hasTreeNode ? 'bt(raw0)' : 'null'};
            ListNode headL = ${hasListNode ? 'bl(raw0)' : 'null'};
            ${isVoid ? 
              `sol.${fName}(${callArgs}); System.out.print(${hasTreeNode ? "st(rootT)" : hasListNode ? "sl(headL)" : "Arrays.toString(arg0).replace(\" \",\"\")"});` :
              `Object res = sol.${fName}(${callArgs});
               if(res instanceof TreeNode) System.out.print(st((TreeNode)res));
               else if(res instanceof ListNode) System.out.print(sl((ListNode)res));
               else if(res instanceof int[][]) System.out.print(Arrays.deepToString((int[][])res).replace(" ",""));
               else if(res instanceof int[]) System.out.print(Arrays.toString((int[])res).replace(" ",""));
               else if(res instanceof Boolean) System.out.print((boolean)res ? "true" : "false");
               else System.out.print(res);`
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    static TreeNode bt(int[] n){
        if(n.length==0 || n[0]==-999) return null;
        TreeNode r=new TreeNode(n[0]); Queue<TreeNode> q=new LinkedList<>(); q.add(r);
        int i=1; while(!q.isEmpty() && i<n.length){
            TreeNode c=q.poll();
            if(i<n.length && n[i]!=-999){ c.left=new TreeNode(n[i]); q.add(c.left); } i++;
            if(i<n.length && n[i]!=-999){ c.right=new TreeNode(n[i]); q.add(c.right); } i++;
        } return r;
    }
    static String st(TreeNode r){
        if(r==null) return "[]";
        List<String> res=new ArrayList<>(); Queue<TreeNode> q=new LinkedList<>(); q.add(r);
        while(!q.isEmpty()){
            TreeNode c=q.poll();
            if(c!=null){ res.add(String.valueOf(c.val)); q.add(c.left); q.add(c.right); }
            else res.add("null");
        }
        while(!res.isEmpty() && res.get(res.size()-1).equals("null")) res.remove(res.size()-1);
        return res.toString().replace(" ","");
    }
    static String sl(ListNode h){
        List<Integer> res=new ArrayList<>();
        while(h!=null){ res.add(h.val); h=h.next; }
        return res.toString().replace(" ","");
    }
    static ListNode bl(int[] n){
        if(n.length==0) return null;
        ListNode h=new ListNode(n[0]), c=h;
        for(int i=1;i<n.length;i++){ c.next=new ListNode(n[i]); c=c.next; } return h;
    }
}
`
}



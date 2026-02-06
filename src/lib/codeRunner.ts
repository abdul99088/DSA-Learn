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
): Promise<{
  passed: boolean
  actualOutput: string
  error?: string
}> {
  try {
    const jdoodleConfig = JDOODLE_LANGUAGES[language]
    const fullCode = wrapCodeWithTestCase(code, testCase.input, language)

    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: fullCode,
        language: jdoodleConfig.language,
        versionIndex: jdoodleConfig.versionIndex
      })
    })

    const result = await response.json()
    if (!response.ok || result.error) return { passed: false, actualOutput: '', error: `Error: ${result.error || 'Server error'}` }
    if (result.statusCode && result.statusCode !== 200) return { passed: false, actualOutput: result.output || '', error: `Runtime/Comp Error:\n${result.output}` }

    const actualOutput = (result.output || '').trim()
    const passed = normalizeOutput(actualOutput) === normalizeOutput(testCase.expectedOutput)

    return { passed, actualOutput: actualOutput || '(no output)', error: passed ? undefined : 'Output mismatch' }
  } catch (error: any) {
    return { passed: false, actualOutput: '', error: `Network Error: ${error.message}` }
  }
}

function normalizeOutput(output: string): string {
  // Strips all formatting to compare core data values
  return output.replace(/\s+/g, '').replace(/["']/g, '').replace(/[\[\]\{\}]/g, '').replace(/,$/, '').toLowerCase()
}

function wrapCodeWithTestCase(code: string, input: string, language: ProgrammingLanguage): string {
  const functionName = extractMainFunctionName(code, language)
  if (language === 'python') return generatePythonWrapper(code, input, functionName)
  if (language === 'cpp') return generateCppWrapper(code, input, functionName)
  return code
}

function extractMainFunctionName(code: string, language: ProgrammingLanguage): string {
  // Ignores common helper/recursive names to find the primary Solution method
  const helpers = new Set(['find', 'unite', 'isMirror', 'dfs', 'bfs', 'helper', 'solve', 'build', 'traverse', 'isSameTree']);
  const functionRegex = /(?:vector<.*?>|int|void|TreeNode\*|ListNode\*|Node\*|string|bool|auto)\s+(\w+)\s*\(/g;
  const matches = [...code.matchAll(functionRegex)];
  if (matches.length === 0) return 'solution';
  for (const match of matches) {
    if (!helpers.has(match[1])) return match[1];
  }
  return matches[matches.length - 1][1];
}

function parseInputParams(input: string): string[] {
  const params: string[] = []
  let current = '', depth = 0, inString = false
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (char === '"') inString = !inString
    if (!inString) {
      if (char === '[' || char === '{') depth++
      if (char === ']' || char === '}') depth--
    }
    if (char === ',' && depth === 0 && !inString) {
      params.push(current.trim()); current = ''
    } else current += char
  }
  if (current.trim()) params.push(current.trim())
  return params
}

/* ---------------- C++ POWER WRAPPER ---------------- */

function generateCppWrapper(code: string, input: string, functionName: string): string {
  const isTree = code.includes('TreeNode');
  const isList = code.includes('ListNode');
  const isGraph = code.includes('Node') && !isTree; 
  const params = parseInputParams(input);

  const dataStructures = `
struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
struct ListNode {
    int val; ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};
class Node {
public:
    int val; vector<Node*> neighbors;
    Node() : val(0) {}
    Node(int _val) : val(_val) {}
};

TreeNode* buildTree(vector<string> nodes) {
    if (nodes.empty() || nodes[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(nodes[0]));
    queue<TreeNode*> q; q.push(root);
    int i = 1;
    while (!q.empty() && i < (int)nodes.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (i < (int)nodes.size() && nodes[i] != "null") {
            curr->left = new TreeNode(stoi(nodes[i])); q.push(curr->left);
        }
        i++;
        if (i < (int)nodes.size() && nodes[i] != "null") {
            curr->right = new TreeNode(stoi(nodes[i])); q.push(curr->right);
        }
        i++;
    }
    return root;
}

Node* buildGraph(vector<vector<int>> adj) {
    if (adj.empty()) return nullptr;
    vector<Node*> nodes;
    for (int i = 1; i <= (int)adj.size(); i++) nodes.push_back(new Node(i));
    for (int i = 0; i < (int)adj.size(); i++) {
        for (int neighborVal : adj[i]) {
            nodes[i]->neighbors.push_back(nodes[neighborVal - 1]);
        }
    }
    return nodes[0];
}

void printGraph(Node* node) {
    if (!node) { cout << "[]"; return; }
    map<int, vector<int>> adj;
    queue<Node*> q; q.push(node);
    while(!q.empty()){
        Node* curr = q.front(); q.pop();
        if(adj.count(curr->val)) continue;
        adj[curr->val] = {};
        for(Node* n : curr->neighbors) {
            adj[curr->val].push_back(n->val);
            q.push(n);
        }
    }
    cout << "[";
    for(auto const& [val, neighbors] : adj){
        cout << "[";
        for(size_t j=0; j<neighbors.size(); j++)
            cout << neighbors[j] << (j == neighbors.size()-1 ? "" : ",");
        cout << "]" << (val == (int)adj.size() ? "" : ",");
    }
    cout << "]";
}
`;

  return `
#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <stack>
#include <unordered_map>
#include <map>
#include <algorithm>
#include <numeric>
using namespace std;
${dataStructures}
${code}

void printVal(int v) { cout << v; }
void printVal(bool v) { cout << (v ? "true" : "false"); }
void printVal(vector<vector<int>> v) {
    cout << "["; for(size_t i=0; i<v.size(); i++) {
        cout << "["; for(size_t j=0; j<v[i].size(); j++) cout << v[i][j] << (j==v[i].size()-1?"":",");
        cout << "]" << (i==v.size()-1?"":",");
    } cout << "]";
}

int main() {
    Solution sol;
    ${params.map((p: string, i: number) => {
      const trimmed = p.trim();
      if (isGraph && trimmed.startsWith('[[')) {
        const cppMatrix = trimmed.replace(/\[/g, '{').replace(/\]/g, '}');
        return `vector<vector<int>> raw${i} = ${cppMatrix}; Node* p${i} = buildGraph(raw${i});`;
      }
      if (trimmed.startsWith('[[')) {
        // Detect char grids (like numIslands)
        if (trimmed.includes('"')) {
            return `vector<vector<char>> p${i} = ${trimmed.replace(/\[/g, '{').replace(/\]/g, '}').replace(/"/g, "'")};`;
        }
        return `vector<vector<int>> p${i} = ${trimmed.replace(/\[/g, '{').replace(/\]/g, '}')};`;
      }
      if (trimmed.startsWith('[')) {
          return `vector<int> p${i} = {${trimmed.slice(1, -1)}};`;
      }
      return `auto p${i} = ${trimmed};`;
    }).join('\n    ')}

    ${isGraph ? `auto res = sol.${functionName}(p0); printGraph(res);` :
      isTree ? `auto res = sol.${functionName}(root); printVal(res);` : 
      `auto res = sol.${functionName}(${params.map((_, i) => `p${i}`).join(',')}); printVal(res);`}
    
    return 0;
}`;
}

/* ---------------- PYTHON POWER WRAPPER ---------------- */

function generatePythonWrapper(code: string, input: string, functionName: string): string {
  return `
import json
import collections

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def build_graph(adj):
    if not adj: return None
    nodes = [Node(i+1) for i in range(len(adj))]
    for i, neighbors in enumerate(adj):
        for n_idx in neighbors:
            nodes[i].neighbors.append(nodes[n_idx-1])
    return nodes[0]

def graph_to_list(node):
    if not node: return []
    adj_map = {}
    q = collections.deque([node])
    while q:
        curr = q.popleft()
        if curr.val in adj_map: continue
        adj_map[curr.val] = [n.val for n in curr.neighbors]
        for n in curr.neighbors: q.append(n)
    return [adj_map[v] for v in sorted(adj_map.keys())]

${code}

try:
    raw_input = [${input.replace(/null/g, 'None')}]
    sol = Solution()
    if "Node" in """${code}""" and "TreeNode" not in """${code}""":
        root = build_graph(raw_input[0])
        result = sol.${functionName}(root)
        print(json.dumps(graph_to_list(result)))
    else:
        result = sol.${functionName}(*raw_input)
        print(json.dumps(result))
except Exception as e:
    print(str(e))
`;
}
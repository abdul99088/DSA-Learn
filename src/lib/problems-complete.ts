'use client'

// Export all types
export type DifficultyLevel = 'basic' | 'medium' | 'hard'
export type Level = DifficultyLevel | 'premium'
export type ProgrammingLanguage = 'python' | 'cpp' | 'java'
export type Company = 'Google' | 'Amazon' | 'Meta'

export interface TestCase {
  input: string
  expectedOutput: string
}

export interface Example {
  input: string
  output: string
  explanation?: string
}

export interface StarterCode {
  python: string
  cpp: string
  java: string
}

export interface Problem {
  id: string
  title: string
  difficulty?: DifficultyLevel
  topic: string
  level?: Level
  company?: Company
  description: string
  premium: boolean
  examples?: Example[]
  constraints?: string[]
  starterCode: StarterCode
  testCases: TestCase[]
  completed?: boolean
}

// Helper function
function convertStarterCode(jsCode: string, funcName: string = ''): StarterCode {
  if (!funcName) {
    const match = jsCode.match(/function\s+(\w+)/)
    funcName = match ? match[1] : 'solution'
  }

  return {
    python: `def ${funcName}():
    # Write your code here
    pass`,
    cpp: `class Solution {
public:
    auto ${funcName}() {
        // Write your code here
        
    }
};`,
    java: `class Solution {
    public Object ${funcName}() {
        // Write your code here
        
    }
}`
  }
}

export const problems: Problem[] = [
  // ============================================
  // DATA STRUCTURES - 15 PROBLEMS (3 FREE, 12 PREMIUM)
  // ============================================
  {
    id: 'ds-1',
    title: 'Two Sum',
    difficulty: 'basic',
    level: 'basic',
    topic: 'data-structures',
    premium: false,
    description: 'Find two numbers in array that add up to target sum. Return their indices.',
    examples: [{ input: '[2,7,11,15], target=9', output: '[0,1]', explanation: '2 + 7 = 9' }],
    constraints: ['2 ≤ nums.length ≤ 10⁴', 'Each input has exactly one solution'],
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[2,7,11,15], 9', expectedOutput: '[0,1]' }],
    completed: false
  },
  {
    id: 'ds-2',
    title: 'Valid Parentheses',
    difficulty: 'basic',
    level: 'basic',
    topic: 'data-structures',
    premium: false,
    description: 'Check if string with brackets (), {}, [] is valid. Open brackets must close in correct order.',
    examples: [{ input: '"{[()]}"', output: 'true' }, { input: '"{[(])}"', output: 'false' }],
    constraints: ['Use stack data structure', '1 ≤ s.length ≤ 10⁴'],
    starterCode: {
      python: `def isValid(s):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '"{[()]}"', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'ds-3',
    title: 'Merge Two Sorted Arrays',
    difficulty: 'basic',
    level: 'basic',
    topic: 'data-structures',
    premium: false,
    description: 'Merge two sorted arrays into one sorted array.',
    examples: [{ input: '[1,3,5], [2,4,6]', output: '[1,2,3,4,5,6]' }],
    constraints: ['Both arrays sorted', 'O(m+n) time'],
    starterCode: {
      python: `def merge(nums1, nums2):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    vector<int> merge(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public int[] merge(int[] nums1, int[] nums2) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[1,3,5], [2,4,6]', expectedOutput: '[1,2,3,4,5,6]' }],
    completed: false
  },
  {
    id: 'ds-4',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'basic',
    level: 'basic',
    topic: 'data-structures',
    premium: true,
    description: 'Remove duplicates in-place and return new length.',
    examples: [{ input: '[1,1,2]', output: '2' }],
    constraints: ['In-place with O(1) space'],
    starterCode: convertStarterCode('', 'removeDuplicates'),
    testCases: [{ input: '[1,1,2]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'ds-5',
    title: 'First Unique Element',
    difficulty: 'basic',
    level: 'basic',
    topic: 'data-structures',
    premium: true,
    description: 'Find first element that appears exactly once.',
    examples: [{ input: '[4,5,1,2,0,4]', output: '5' }],
    constraints: ['Use hashmap for O(n)'],
    starterCode: convertStarterCode('', 'firstUnique'),
    testCases: [{ input: '[4,5,1,2,0,4]', expectedOutput: '5' }],
    completed: false
  },
  {
    id: 'ds-6',
    title: 'Majority Element',
    difficulty: 'basic',
    level: 'basic',
    topic: 'data-structures',
    premium: true,
    description: 'Find element appearing more than n/2 times.',
    examples: [{ input: '[2,2,1,1,1,2,2]', output: '2' }],
    constraints: ['Boyer-Moore Algorithm'],
    starterCode: convertStarterCode('', 'majorityElement'),
    testCases: [{ input: '[2,2,1,1,1,2,2]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'ds-7',
    title: 'Rotate Array',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Rotate array right by k steps in-place.',
    examples: [{ input: '[1,2,3,4,5], k=2', output: '[4,5,1,2,3]' }],
    constraints: ['O(1) space', 'Three reversal method'],
    starterCode: convertStarterCode('', 'rotate'),
    testCases: [{ input: '[1,2,3,4,5], 2', expectedOutput: '[4,5,1,2,3]' }],
    completed: false
  },
  {
    id: 'ds-8',
    title: 'Min Stack',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Stack with getMin in O(1).',
    examples: [{ input: 'push(2), push(0), getMin()', output: '0' }],
    constraints: ['All ops O(1)'],
    starterCode: {
      python: `class MinStack:
    def __init__(self):
        pass
    
    def push(self, val):
        pass
    
    def pop(self):
        pass
    
    def getMin(self):
        pass`,
      cpp: `class MinStack {
public:
    MinStack() {}
    void push(int val) {}
    void pop() {}
    int getMin() {}
};`,
      java: `class MinStack {
    public MinStack() {}
    public void push(int val) {}
    public void pop() {}
    public int getMin() {}
}`
    },
    testCases: [{ input: 'push(2), push(0), getMin()', expectedOutput: '0' }],
    completed: false
  },
  {
    id: 'ds-9',
    title: 'LRU Cache',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Implement LRU cache with O(1) get and put.',
    examples: [{ input: 'put(1,1), get(1)', output: '1' }],
    constraints: ['Doubly linked list + hashmap'],
    starterCode: {
      python: `class LRUCache:
    def __init__(self, capacity):
        pass
    
    def get(self, key):
        pass
    
    def put(self, key, value):
        pass`,
      cpp: `class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) {}
    void put(int key, int value) {}
};`,
      java: `class LRUCache {
    public LRUCache(int capacity) {}
    public int get(int key) {}
    public void put(int key, int value) {}
}`
    },
    testCases: [{ input: 'capacity=2, get(1)', expectedOutput: '-1' }],
    completed: false
  },
  {
    id: 'ds-10',
    title: 'Top K Frequent Elements',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Return k most frequent elements.',
    examples: [{ input: '[1,1,1,2,2,3], k=2', output: '[1,2]' }],
    constraints: ['Better than O(n log n)', 'Bucket sort'],
    starterCode: convertStarterCode('', 'topKFrequent'),
    testCases: [{ input: '[1,1,1,2,2,3], 2', expectedOutput: '[1,2]' }],
    completed: false
  },
  {
    id: 'ds-11',
    title: 'Product Except Self',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Return array where output[i] equals product of all except nums[i].',
    examples: [{ input: '[1,2,3,4]', output: '[24,12,8,6]' }],
    constraints: ['No division', 'O(1) space'],
    starterCode: convertStarterCode('', 'productExceptSelf'),
    testCases: [{ input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]' }],
    completed: false
  },
  {
    id: 'ds-12',
    title: 'Longest Consecutive Sequence',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Find length of longest consecutive sequence.',
    examples: [{ input: '[100,4,200,1,3,2]', output: '4' }],
    constraints: ['O(n) time', 'Use HashSet'],
    starterCode: convertStarterCode('', 'longestConsecutive'),
    testCases: [{ input: '[100,4,200,1,3,2]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'ds-13',
    title: 'Group Anagrams',
    difficulty: 'medium',
    level: 'medium',
    topic: 'data-structures',
    premium: true,
    description: 'Group strings that are anagrams.',
    examples: [{ input: '["eat","tea","tan"]', output: '[["eat","tea"],["tan"]]' }],
    constraints: ['Use sorted key'],
    starterCode: convertStarterCode('', 'groupAnagrams'),
    testCases: [{ input: '["eat","tea","tan"]', expectedOutput: '[["eat","tea"],["tan"]]' }],
    completed: false
  },
  {
    id: 'ds-14',
    title: 'Sliding Window Maximum',
    difficulty: 'hard',
    level: 'hard',
    topic: 'data-structures',
    premium: true,
    description: 'Find max in each window of size k.',
    examples: [{ input: '[1,3,-1,-3,5], k=3', output: '[3,3,5]' }],
    constraints: ['Use deque', 'O(n) time'],
    starterCode: convertStarterCode('', 'maxSlidingWindow'),
    testCases: [{ input: '[1,3,-1,-3,5], 3', expectedOutput: '[3,3,5]' }],
    completed: false
  },
  {
    id: 'ds-15',
    title: 'Trapping Rain Water',
    difficulty: 'hard',
    level: 'hard',
    topic: 'data-structures',
    premium: true,
    description: 'Calculate how much water can be trapped.',
    examples: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
    constraints: ['Two pointer approach', 'O(n) time'],
    starterCode: convertStarterCode('', 'trap'),
    testCases: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' }],
    completed: false
  },

  // ============================================
  // TREES - 12 PROBLEMS (8 FREE, 4 PREMIUM)
  // ============================================
  {
    id: 'tree-1',
    title: 'Maximum Depth',
    difficulty: 'basic',
    level: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Return maximum depth of binary tree.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '3' }],
    constraints: ['Nodes: [0, 10^4]'],
    starterCode: {
      python: `def maxDepth(root):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-2',
    title: 'Symmetric Tree',
    difficulty: 'basic',
    level: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Check if tree is symmetric.',
    examples: [{ input: '[1,2,2,3,4,4,3]', output: 'true' }],
    constraints: ['Mirror check required'],
    starterCode: {
      python: `def isSymmetric(root):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[1,2,2,3,4,4,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-3',
    title: 'Invert Binary Tree',
    difficulty: 'basic',
    level: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Invert a binary tree (swap left and right).',
    examples: [{ input: '[4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }],
    constraints: ['Can do recursively or iteratively'],
    starterCode: {
      python: `def invertTree(root):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]' }],
    completed: false
  },
  {
    id: 'tree-4',
    title: 'Path Sum',
    difficulty: 'basic',
    level: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Check if root-to-leaf path with given sum exists.',
    examples: [{ input: '[5,4,8,11,null,13,4], 22', output: 'true' }],
    constraints: ['DFS traversal'],
    starterCode: {
      python: `def hasPathSum(root, targetSum):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[5,4,8,11,null,13,4], 22', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-5',
    title: 'Same Tree',
    difficulty: 'basic',
    level: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Check if two trees are identical.',
    examples: [{ input: '[1,2,3], [1,2,3]', output: 'true' }],
    constraints: ['Compare structure and values'],
    starterCode: {
      python: `def isSameTree(p, q):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[1,2,3], [1,2,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-6',
    title: 'Level Order Traversal',
    difficulty: 'medium',
    level: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Return level order traversal (BFS).',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
    constraints: ['Use queue for BFS'],
    starterCode: {
      python: `def levelOrder(root):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' }],
    completed: false
  },
  {
    id: 'tree-7',
    title: 'Lowest Common Ancestor',
    difficulty: 'medium',
    level: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Find LCA of two nodes.',
    examples: [{ input: '[3,5,1,6,2,0,8], 5, 1', output: '3' }],
    constraints: ['All values unique'],
    starterCode: {
      python: `def lowestCommonAncestor(root, p, q):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[3,5,1,6,2,0,8], 5, 1', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-8',
    title: 'Right Side View',
    difficulty: 'medium',
    level: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Return nodes visible from right.',
    examples: [{ input: '[1,2,3,null,5,null,4]', output: '[1,3,4]' }],
    constraints: ['BFS or DFS'],
    starterCode: {
      python: `def rightSideView(root):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[1,2,3,null,5,null,4]', expectedOutput: '[1,3,4]' }],
    completed: false
  },
  {
    id: 'tree-9',
    title: 'Zigzag Level Order',
    difficulty: 'medium',
    level: 'medium',
    topic: 'trees',
    premium: true,
    description: 'Zigzag level order traversal.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' }],
    constraints: ['Alternate direction each level'],
    starterCode: convertStarterCode('', 'zigzagLevelOrder'),
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[20,9],[15,7]]' }],
    completed: false
  },
  {
    id: 'tree-10',
    title: 'Serialize Deserialize Tree',
    difficulty: 'hard',
    level: 'hard',
    topic: 'trees',
    premium: true,
    description: 'Serialize and deserialize binary tree.',
    examples: [{ input: '[1,2,3,null,null,4,5]', output: '"1,2,N,N,3,4,N,N,5,N,N"' }],
    constraints: ['String encoding'],
    starterCode: {
      python: `def serialize(root):
    pass

def deserialize(data):
    pass`,
      cpp: `class Codec {
public:
    string serialize(TreeNode* root) {}
    TreeNode* deserialize(string data) {}
};`,
      java: `public class Codec {
    public String serialize(TreeNode root) {}
    public TreeNode deserialize(String data) {}
}`
    },
    testCases: [{ input: '[1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]' }],
    completed: false
  },
  {
    id: 'tree-11',
    title: 'Maximum Path Sum',
    difficulty: 'hard',
    level: 'hard',
    topic: 'trees',
    premium: true,
    description: 'Find maximum path sum in tree.',
    examples: [{ input: '[1,2,3]', output: '6' }],
    constraints: ['Path can start and end anywhere'],
    starterCode: convertStarterCode('', 'maxPathSum'),
    testCases: [{ input: '[1,2,3]', expectedOutput: '6' }],
    completed: false
  },
  {
    id: 'tree-12',
    title: 'Binary Tree Cameras',
    difficulty: 'hard',
    level: 'hard',
    topic: 'trees',
    premium: true,
    description: 'Minimum cameras to monitor all nodes.',
    examples: [{ input: '[0,0,null,0,0]', output: '1' }],
    constraints: ['Greedy + DFS'],
    starterCode: convertStarterCode('', 'minCameraCover'),
    testCases: [{ input: '[0,0,null,0,0]', expectedOutput: '1' }],
    completed: false
  },

  // ============================================
  // BST - 8 PROBLEMS (5 FREE, 3 PREMIUM)
  // ============================================
  {
    id: 'bst-1',
    title: 'Search in BST',
    difficulty: 'basic',
    level: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Find node with given value in BST.',
    examples: [{ input: '[4,2,7,1,3], 2', output: '[2,1,3]' }],
    constraints: ['BST property: left < root < right'],
    starterCode: {
      python: `def searchBST(root, val):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[4,2,7,1,3], 2', expectedOutput: '[2,1,3]' }],
    completed: false
  },
  {
    id: 'bst-2',
    title: 'Insert into BST',
    difficulty: 'basic',
    level: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Insert value into BST.',
    examples: [{ input: '[4,2,7,1,3], 5', output: '[4,2,7,1,3,5]' }],
    constraints: ['Maintain BST property'],
    starterCode: {
      python: `def insertIntoBST(root, val):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    TreeNode* insertIntoBST(TreeNode* root, int val) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[4,2,7,1,3], 5', expectedOutput: '[4,2,7,1,3,5]' }],
    completed: false
  },
  {
    id: 'bst-3',
    title: 'Validate BST',
    difficulty: 'medium',
    level: 'medium',
    topic: 'bst',
    premium: false,
    description: 'Check if tree is valid BST.',
    examples: [{ input: '[2,1,3]', output: 'true' }],
    constraints: ['Check all subtrees'],
    starterCode: {
      python: `def isValidBST(root):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[2,1,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'bst-4',
    title: 'Kth Smallest Element',
    difficulty: 'medium',
    level: 'medium',
    topic: 'bst',
    premium: false,
    description: 'Find kth smallest in BST.',
    examples: [{ input: '[3,1,4,null,2], 1', output: '1' }],
    constraints: ['Inorder traversal'],
    starterCode: {
      python: `def kthSmallest(root, k):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[3,1,4,null,2], 1', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'bst-5',
    title: 'Sorted Array to BST',
    difficulty: 'basic',
    level: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Convert sorted array to balanced BST.',
    examples: [{ input: '[-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]' }],
    constraints: ['Height balanced'],
    starterCode: {
      python: `def sortedArrayToBST(nums):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[-10,-3,0,5,9]', expectedOutput: '[0,-3,9,-10,null,5]' }],
    completed: false
  },
  {
    id: 'bst-6',
    title: 'Delete Node in BST',
    difficulty: 'medium',
    level: 'medium',
    topic: 'bst',
    premium: true,
    description: 'Delete node from BST.',
    examples: [{ input: '[5,3,6,2,4,null,7], 3', output: '[5,4,6,2,null,null,7]' }],
    constraints: ['Handle 3 cases: leaf, one child, two children'],
    starterCode: convertStarterCode('', 'deleteNode'),
    testCases: [{ input: '[5,3,6,2,4,null,7], 3', expectedOutput: '[5,4,6,2,null,null,7]' }],
    completed: false
  },
  {
    id: 'bst-7',
    title: 'BST to Greater Tree',
    difficulty: 'medium',
    level: 'medium',
    topic: 'bst',
    premium: true,
    description: 'Convert BST where each node equals original plus sum of greater values.',
    examples: [{ input: '[4,1,6,0,2,5,7]', output: '[30,36,21,36,35,26,15]' }],
    constraints: ['Reverse inorder traversal'],
    starterCode: convertStarterCode('', 'convertBST'),
    testCases: [{ input: '[4,1,6,0,2,5,7]', expectedOutput: '[30,36,21,36,35,26,15]' }],
    completed: false
  },
  {
    id: 'bst-8',
    title: 'Recover BST',
    difficulty: 'hard',
    level: 'hard',
    topic: 'bst',
    premium: true,
    description: 'Recover BST where two nodes are swapped.',
    examples: [{ input: '[3,1,4,null,null,2]', output: '[2,1,4,null,null,3]' }],
    constraints: ['Find swapped nodes', 'O(1) space preferred'],
    starterCode: convertStarterCode('', 'recoverTree'),
    testCases: [{ input: '[3,1,4,null,null,2]', expectedOutput: '[2,1,4,null,null,3]' }],
    completed: false
  },

  // ============================================
  // GRAPHS - 12 PROBLEMS (ALL FREE)
  // ============================================
  {
    id: 'graph-1',
    title: 'Number of Islands',
    difficulty: 'basic',
    level: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Count islands in 2D grid.',
    examples: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }],
    constraints: ['DFS or BFS', 'm, n in [1, 300]'],
    starterCode: {
      python: `def numIslands(grid):
    # Write your code here
    pass`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your code here
        
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        // Write your code here
        
    }
}`
    },
    testCases: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-2',
    title: 'Clone Graph',
    difficulty: 'basic',
    level: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Deep copy of undirected graph.',
    examples: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }],
    constraints: ['Use HashMap', 'Nodes: [0, 100]'],
    starterCode: convertStarterCode('', 'cloneGraph'),
    testCases: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' }],
    completed: false
  },
  {
    id: 'graph-3',
    title: 'Valid Path Exists',
    difficulty: 'basic',
    level: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Check if path exists from source to destination.',
    examples: [{ input: 'n=3, edges=[[0,1],[1,2],[2,0]], source=0, dest=2', output: 'true' }],
    constraints: ['Union Find or DFS'],
    starterCode: convertStarterCode('', 'validPath'),
    testCases: [{ input: '3, [[0,1],[1,2],[2,0]], 0, 2', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'graph-4',
    title: 'All Paths Source to Target',
    difficulty: 'basic',
    level: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Find all paths from 0 to n-1.',
    examples: [{ input: '[[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' }],
    constraints: ['Backtracking', 'n in [2, 15]'],
    starterCode: convertStarterCode('', 'allPathsSourceTarget'),
    testCases: [{ input: '[[1,2],[3],[3],[]]', expectedOutput: '[[0,1,3],[0,2,3]]' }],
    completed: false
  },
  {
    id: 'graph-5',
    title: 'Course Schedule',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Check if you can finish all courses (detect cycle).',
    examples: [{ input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true' }],
    constraints: ['Topological sort', 'DFS cycle detection'],
    starterCode: convertStarterCode('', 'canFinish'),
    testCases: [{ input: '2, [[1,0]]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'graph-6',
    title: 'Number of Provinces',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Find number of connected components.',
    examples: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', output: '2' }],
    constraints: ['Union Find or DFS'],
    starterCode: convertStarterCode('', 'findCircleNum'),
    testCases: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-7',
    title: 'Surrounded Regions',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Flip all O\'s surrounded by X.',
    examples: [{ input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', output: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
    constraints: ['DFS from borders'],
    starterCode: convertStarterCode('', 'solve'),
    testCases: [{ input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', expectedOutput: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
    completed: false
  },
  {
    id: 'graph-8',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Find cells where water flows to both oceans.',
    examples: [{ input: '[[1,2,3],[8,9,4],[7,6,5]]', output: '[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]' }],
    constraints: ['DFS from both oceans'],
    starterCode: convertStarterCode('', 'pacificAtlantic'),
    testCases: [{ input: '[[1,2,3],[8,9,4],[7,6,5]]', expectedOutput: '[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]' }],
    completed: false
  },
  {
    id: 'graph-9',
    title: 'Word Ladder',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Shortest transformation sequence.',
    examples: [{ input: 'beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]', output: '5' }],
    constraints: ['BFS', 'Word graph'],
    starterCode: convertStarterCode('', 'ladderLength'),
    testCases: [{ input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expectedOutput: '5' }],
    completed: false
  },
  {
    id: 'graph-10',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Find shortest path from top-left to bottom-right.',
    examples: [{ input: '[[0,1],[1,0]]', output: '2' }],
    constraints: ['8-directional movement', 'BFS'],
    starterCode: convertStarterCode('', 'shortestPathBinaryMatrix'),
    testCases: [{ input: '[[0,1],[1,0]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-11',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Minimum time for all oranges to rot.',
    examples: [{ input: '[[2,1,1],[1,1,0],[0,1,1]]', output: '4' }],
    constraints: ['Multi-source BFS'],
    starterCode: convertStarterCode('', 'orangesRotting'),
    testCases: [{ input: '[[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'graph-12',
    title: 'Network Delay Time',
    difficulty: 'medium',
    level: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Time for signal to reach all nodes.',
    examples: [{ input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', output: '2' }],
    constraints: ['Dijkstra\'s algorithm', 'Weighted graph'],
    starterCode: convertStarterCode('', 'networkDelayTime'),
    testCases: [{ input: '[[2,1,1],[2,3,1],[3,4,1]], 4, 2', expectedOutput: '2' }],
    completed: false
  },

  // ============================================
  // DYNAMIC PROGRAMMING - 10 PROBLEMS (6 FREE, 4 PREMIUM)
  // ============================================
  {
    id: 'dp-1',
    title: 'Climbing Stairs',
    difficulty: 'basic',
    level: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Count ways to climb n stairs (1 or 2 steps).',
    examples: [{ input: '3', output: '3', explanation: '1+1+1, 1+2, 2+1' }],
    constraints: ['1 <= n <= 45', 'Fibonacci pattern'],
    starterCode: convertStarterCode('', 'climbStairs'),
    testCases: [{ input: '3', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-2',
    title: 'House Robber',
    difficulty: 'basic',
    level: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Maximum money without robbing adjacent houses.',
    examples: [{ input: '[1,2,3,1]', output: '4', explanation: 'Rob 1 and 3' }],
    constraints: ['Can\'t rob adjacent'],
    starterCode: convertStarterCode('', 'rob'),
    testCases: [{ input: '[1,2,3,1]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'dp-3',
    title: 'Coin Change',
    difficulty: 'medium',
    level: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Minimum coins to make amount.',
    examples: [{ input: 'coins=[1,2,5], amount=11', output: '3', explanation: '5+5+1' }],
    constraints: ['Return -1 if impossible'],
    starterCode: convertStarterCode('', 'coinChange'),
    testCases: [{ input: '[1,2,5], 11', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-4',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    level: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Length of longest increasing subsequence.',
    examples: [{ input: '[10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101]' }],
    constraints: ['O(n log n) solution exists'],
    starterCode: convertStarterCode('', 'lengthOfLIS'),
    testCases: [{ input: '[10,9,2,5,3,7,101,18]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'dp-5',
    title: 'Unique Paths',
    difficulty: 'medium',
    level: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Count paths in m×n grid (only right/down).',
    examples: [{ input: 'm=3, n=7', output: '28' }],
    constraints: ['Start top-left, end bottom-right'],
    starterCode: convertStarterCode('', 'uniquePaths'),
    testCases: [{ input: '3, 7', expectedOutput: '28' }],
    completed: false
  },
  {
    id: 'dp-6',
    title: 'Longest Common Subsequence',
    difficulty: 'medium',
    level: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Length of LCS between two strings.',
    examples: [{ input: 'text1="abcde", text2="ace"', output: '3', explanation: '"ace"' }],
    constraints: ['Classic DP problem'],
    starterCode: convertStarterCode('', 'longestCommonSubsequence'),
    testCases: [{ input: '"abcde", "ace"', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-7',
    title: 'Word Break',
    difficulty: 'medium',
    level: 'medium',
    topic: 'dp',
    premium: true,
    description: 'Check if string can be segmented into dictionary words.',
    examples: [{ input: 's="leetcode", wordDict=["leet","code"]', output: 'true' }],
    constraints: ['DP with substring checks'],
    starterCode: convertStarterCode('', 'wordBreak'),
    testCases: [{ input: '"leetcode", ["leet","code"]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'dp-8',
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    level: 'medium',
    topic: 'dp',
    premium: true,
    description: 'Check if array can be partitioned into equal sum subsets.',
    examples: [{ input: '[1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11]' }],
    constraints: ['0/1 Knapsack variant'],
    starterCode: convertStarterCode('', 'canPartition'),
    testCases: [{ input: '[1,5,11,5]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'dp-9',
    title: 'Edit Distance',
    difficulty: 'hard',
    level: 'hard',
    topic: 'dp',
    premium: true,
    description: 'Minimum operations to convert word1 to word2.',
    examples: [{ input: 'word1="horse", word2="ros"', output: '3', explanation: 'horse -> rorse -> rose -> ros' }],
    constraints: ['Insert, delete, replace'],
    starterCode: convertStarterCode('', 'minDistance'),
    testCases: [{ input: '"horse", "ros"', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-10',
    title: 'Regular Expression Matching',
    difficulty: 'hard',
    level: 'hard',
    topic: 'dp',
    premium: true,
    description: 'Implement regex matching with . and *.',
    examples: [{ input: 's="aa", p="a*"', output: 'true' }],
    constraints: ['. matches any char', '* matches zero or more'],
    starterCode: convertStarterCode('', 'isMatch'),
    testCases: [{ input: '"aa", "a*"', expectedOutput: 'true' }],
    completed: false
  },

  // ============================================
  // INTERVIEW PROBLEMS - COMPANY SPECIFIC (PREMIUM)
  // ============================================
  {
    id: 'google-two-sum',
    title: 'Two Sum (Google Favorite)',
    topic: 'interviews',
    level: 'premium',
    difficulty: 'basic',
    company: 'Google',
    description: 'Find two numbers that add up to a specific target.',
    premium: true,
    starterCode: convertStarterCode('twoSum'),
    testCases: [{ input: '[2,7,11,15], 9', expectedOutput: '[0,1]' }],
    completed: false
  },
  {
    id: 'amazon-lru-cache',
    title: 'LRU Cache (Amazon)',
    topic: 'interviews',
    level: 'premium',
    difficulty: 'medium',
    company: 'Amazon',
    description: 'Design and implement an LRU Cache.',
    premium: true,
    starterCode: convertStarterCode('LRUCache'),
    testCases: [{ input: 'put(1,1), put(2,2), get(1)', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'meta-valid-palindrome',
    title: 'Valid Palindrome (Meta)',
    topic: 'interviews',
    level: 'premium',
    difficulty: 'basic',
    company: 'Meta',
    description: 'Check if a string is a valid palindrome.',
    premium: true,
    starterCode: convertStarterCode('isPalindrome'),
    testCases: [{ input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'reverse-array',
    title: 'Reverse Array',
    topic: 'arrays',
    level: 'basic',
    difficulty: 'basic',
    description: 'Reverse the given array.',
    premium: false,
    starterCode: convertStarterCode('reverseArray'),
    testCases: [{ input: '[1,2,3,4]', expectedOutput: '[4,3,2,1]' }],
    completed: false
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    topic: 'searching',
    level: 'medium',
    difficulty: 'medium',
    description: 'Implement binary search.',
    premium: false,
    starterCode: convertStarterCode('binarySearch'),
    testCases: [{ input: '[1,2,3,4,5], 4', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    topic: 'arrays',
    level: 'hard',
    difficulty: 'hard',
    description: 'Merge overlapping intervals.',
    premium: false,
    starterCode: convertStarterCode('mergeIntervals'),
    testCases: [{ input: '[[1,3],[2,6],[8,10]]', expectedOutput: '[[1,6],[8,10]]' }],
    completed: false
  }
]

export function getProblemsByTopicAndLevel(topic: string, level: Level | DifficultyLevel) {
  return problems.filter(p => {
    const matchTopic = p.topic === topic
    const matchLevel = p.level === level || p.difficulty === level
    return matchTopic && matchLevel
  })
}


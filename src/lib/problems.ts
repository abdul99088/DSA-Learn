'use client'

export interface Problem {
  id: string
  title: string
  difficulty: 'basic' | 'medium' | 'hard'
  topic: string
  description: string
  premium: boolean
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  starterCode: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
  completed: boolean
}

export const problems: Problem[] = [
  // ============================================
  // DATA STRUCTURES - 15 PROBLEMS (3 FREE, 12 PREMIUM)
  // ============================================
  {
    id: 'ds-1',
    title: 'Two Sum',
    difficulty: 'basic',
    topic: 'data-structures',
    premium: false, // FREE
    description: 'Find two numbers in array that add up to target sum. Return their indices.',
    examples: [{ input: '[2,7,11,15], target=9', output: '[0,1]', explanation: '2 + 7 = 9' }],
    constraints: ['2 ≤ nums.length ≤ 10⁴', 'Each input has exactly one solution'],
    starterCode: `function twoSum(nums, target) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[2,7,11,15], 9', expectedOutput: '[0,1]' }],
    completed: false
  },
  {
    id: 'ds-2',
    title: 'Valid Parentheses',
    difficulty: 'basic',
    topic: 'data-structures',
    premium: false, // FREE
    description: 'Check if string with brackets (), {}, [] is valid. Open brackets must close in correct order.',
    examples: [{ input: '"{[()]}"', output: 'true' }, { input: '"{[(])}"', output: 'false' }],
    constraints: ['Use stack data structure', '1 ≤ s.length ≤ 10⁴'],
    starterCode: `function isValid(s) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"{[()]}"', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'ds-3',
    title: 'Merge Two Sorted Arrays',
    difficulty: 'basic',
    topic: 'data-structures',
    premium: false, // FREE
    description: 'Merge two sorted arrays into one sorted array.',
    examples: [{ input: '[1,3,5], [2,4,6]', output: '[1,2,3,4,5,6]' }],
    constraints: ['Both arrays sorted', 'O(m+n) time'],
    starterCode: `function merge(nums1, nums2) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,3,5], [2,4,6]', expectedOutput: '[1,2,3,4,5,6]' }],
    completed: false
  },
  {
    id: 'ds-4',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'basic',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Remove duplicates in-place and return new length.',
    examples: [{ input: '[1,1,2]', output: '2' }],
    constraints: ['In-place with O(1) space'],
    starterCode: `function removeDuplicates(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,1,2]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'ds-5',
    title: 'First Unique Element',
    difficulty: 'basic',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Find first element that appears exactly once.',
    examples: [{ input: '[4,5,1,2,0,4]', output: '5' }],
    constraints: ['Use hashmap for O(n)'],
    starterCode: `function firstUnique(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,5,1,2,0,4]', expectedOutput: '5' }],
    completed: false
  },
  {
    id: 'ds-6',
    title: 'Majority Element',
    difficulty: 'basic',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Find element appearing more than n/2 times.',
    examples: [{ input: '[2,2,1,1,1,2,2]', output: '2' }],
    constraints: ['Boyer-Moore Algorithm'],
    starterCode: `function majorityElement(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[2,2,1,1,1,2,2]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'ds-7',
    title: 'Rotate Array',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Rotate array right by k steps in-place.',
    examples: [{ input: '[1,2,3,4,5], k=2', output: '[4,5,1,2,3]' }],
    constraints: ['O(1) space', 'Three reversal method'],
    starterCode: `function rotate(nums, k) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,4,5], 2', expectedOutput: '[4,5,1,2,3]' }],
    completed: false
  },
  {
    id: 'ds-8',
    title: 'Min Stack',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Stack with getMin in O(1).',
    examples: [{ input: 'push(2), push(0), getMin()', output: '0' }],
    constraints: ['All ops O(1)'],
    starterCode: `class MinStack {\n  constructor() {}\n  push(val) {}\n  pop() {}\n  getMin() {}\n}`,
    testCases: [{ input: 'push(2), push(0), getMin()', expectedOutput: '0' }],
    completed: false
  },
  {
    id: 'ds-9',
    title: 'LRU Cache',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Implement LRU cache with O(1) get and put.',
    examples: [{ input: 'put(1,1), get(1)', output: '1' }],
    constraints: ['Doubly linked list + hashmap'],
    starterCode: `class LRUCache {\n  constructor(capacity) {}\n  get(key) {}\n  put(key, value) {}\n}`,
    testCases: [{ input: 'capacity=2, get(1)', expectedOutput: '-1' }],
    completed: false
  },
  {
    id: 'ds-10',
    title: 'Top K Frequent Elements',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Return k most frequent elements.',
    examples: [{ input: '[1,1,1,2,2,3], k=2', output: '[1,2]' }],
    constraints: ['Better than O(n log n)', 'Bucket sort'],
    starterCode: `function topKFrequent(nums, k) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,1,1,2,2,3], 2', expectedOutput: '[1,2]' }],
    completed: false
  },
  {
    id: 'ds-11',
    title: 'Product Except Self',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Return array where output[i] equals product of all except nums[i].',
    examples: [{ input: '[1,2,3,4]', output: '[24,12,8,6]' }],
    constraints: ['No division', 'O(1) space'],
    starterCode: `function productExceptSelf(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]' }],
    completed: false
  },
  {
    id: 'ds-12',
    title: 'Longest Consecutive Sequence',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Find length of longest consecutive sequence.',
    examples: [{ input: '[100,4,200,1,3,2]', output: '4' }],
    constraints: ['O(n) time', 'Use HashSet'],
    starterCode: `function longestConsecutive(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[100,4,200,1,3,2]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'ds-13',
    title: 'Group Anagrams',
    difficulty: 'medium',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Group strings that are anagrams.',
    examples: [{ input: '["eat","tea","tan"]', output: '[["eat","tea"],["tan"]]' }],
    constraints: ['Use sorted key'],
    starterCode: `function groupAnagrams(strs) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '["eat","tea","tan"]', expectedOutput: '[["eat","tea"],["tan"]]' }],
    completed: false
  },
  {
    id: 'ds-14',
    title: 'Sliding Window Maximum',
    difficulty: 'hard',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Find max in each window of size k.',
    examples: [{ input: '[1,3,-1,-3,5], k=3', output: '[3,3,5]' }],
    constraints: ['Use deque', 'O(n) time'],
    starterCode: `function maxSlidingWindow(nums, k) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,3,-1,-3,5], 3', expectedOutput: '[3,3,5]' }],
    completed: false
  },
  {
    id: 'ds-15',
    title: 'Trapping Rain Water',
    difficulty: 'hard',
    topic: 'data-structures',
    premium: true, // PREMIUM
    description: 'Calculate how much water can be trapped.',
    examples: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
    constraints: ['Two pointer approach', 'O(n) time'],
    starterCode: `function trap(height) {\n  // Write your code here\n  \n}`,
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
    topic: 'trees',
    premium: false, // FREE
    description: 'Return maximum depth of binary tree.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '3' }],
    constraints: ['Nodes: [0, 10^4]'],
    starterCode: `function maxDepth(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-2',
    title: 'Symmetric Tree',
    difficulty: 'basic',
    topic: 'trees',
    premium: false, // FREE
    description: 'Check if tree is symmetric.',
    examples: [{ input: '[1,2,2,3,4,4,3]', output: 'true' }],
    constraints: ['Mirror check required'],
    starterCode: `function isSymmetric(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,2,3,4,4,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-3',
    title: 'Invert Binary Tree',
    difficulty: 'basic',
    topic: 'trees',
    premium: false, // FREE
    description: 'Invert a binary tree (swap left and right).',
    examples: [{ input: '[4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }],
    constraints: ['Can do recursively or iteratively'],
    starterCode: `function invertTree(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]' }],
    completed: false
  },
  {
    id: 'tree-4',
    title: 'Path Sum',
    difficulty: 'basic',
    topic: 'trees',
    premium: false, // FREE
    description: 'Check if root-to-leaf path with given sum exists.',
    examples: [{ input: '[5,4,8,11,null,13,4], 22', output: 'true' }],
    constraints: ['DFS traversal'],
    starterCode: `function hasPathSum(root, targetSum) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[5,4,8,11,null,13,4], 22', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-5',
    title: 'Same Tree',
    difficulty: 'basic',
    topic: 'trees',
    premium: false, // FREE
    description: 'Check if two trees are identical.',
    examples: [{ input: '[1,2,3], [1,2,3]', output: 'true' }],
    constraints: ['Compare structure and values'],
    starterCode: `function isSameTree(p, q) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3], [1,2,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-6',
    title: 'Level Order Traversal',
    difficulty: 'medium',
    topic: 'trees',
    premium: false, // FREE
    description: 'Return level order traversal (BFS).',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
    constraints: ['Use queue for BFS'],
    starterCode: `function levelOrder(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' }],
    completed: false
  },
  {
    id: 'tree-7',
    title: 'Lowest Common Ancestor',
    difficulty: 'medium',
    topic: 'trees',
    premium: false, // FREE
    description: 'Find LCA of two nodes.',
    examples: [{ input: '[3,5,1,6,2,0,8], 5, 1', output: '3' }],
    constraints: ['All values unique'],
    starterCode: `function lowestCommonAncestor(root, p, q) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,5,1,6,2,0,8], 5, 1', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-8',
    title: 'Right Side View',
    difficulty: 'medium',
    topic: 'trees',
    premium: false, // FREE
    description: 'Return nodes visible from right.',
    examples: [{ input: '[1,2,3,null,5,null,4]', output: '[1,3,4]' }],
    constraints: ['BFS or DFS'],
    starterCode: `function rightSideView(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,null,5,null,4]', expectedOutput: '[1,3,4]' }],
    completed: false
  },
  {
    id: 'tree-9',
    title: 'Zigzag Level Order',
    difficulty: 'medium',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Zigzag level order traversal.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' }],
    constraints: ['Alternate direction each level'],
    starterCode: `function zigzagLevelOrder(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[20,9],[15,7]]' }],
    completed: false
  },
  {
    id: 'tree-10',
    title: 'Serialize Deserialize Tree',
    difficulty: 'hard',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Serialize and deserialize binary tree.',
    examples: [{ input: '[1,2,3,null,null,4,5]', output: '"1,2,N,N,3,4,N,N,5,N,N"' }],
    constraints: ['String encoding'],
    starterCode: `function serialize(root) {}\nfunction deserialize(data) {}`,
    testCases: [{ input: '[1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]' }],
    completed: false
  },
  {
    id: 'tree-11',
    title: 'Maximum Path Sum',
    difficulty: 'hard',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Find maximum path sum in tree.',
    examples: [{ input: '[1,2,3]', output: '6' }],
    constraints: ['Path can start and end anywhere'],
    starterCode: `function maxPathSum(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3]', expectedOutput: '6' }],
    completed: false
  },
  {
    id: 'tree-12',
    title: 'Binary Tree Cameras',
    difficulty: 'hard',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Minimum cameras to monitor all nodes.',
    examples: [{ input: '[0,0,null,0,0]', output: '1' }],
    constraints: ['Greedy + DFS'],
    starterCode: `function minCameraCover(root) {\n  // Write your code here\n  \n}`,
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
    topic: 'bst',
    premium: false, // FREE
    description: 'Find node with given value in BST.',
    examples: [{ input: '[4,2,7,1,3], 2', output: '[2,1,3]' }],
    constraints: ['BST property: left < root < right'],
    starterCode: `function searchBST(root, val) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,2,7,1,3], 2', expectedOutput: '[2,1,3]' }],
    completed: false
  },
  {
    id: 'bst-2',
    title: 'Insert into BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false, // FREE
    description: 'Insert value into BST.',
    examples: [{ input: '[4,2,7,1,3], 5', output: '[4,2,7,1,3,5]' }],
    constraints: ['Maintain BST property'],
    starterCode: `function insertIntoBST(root, val) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,2,7,1,3], 5', expectedOutput: '[4,2,7,1,3,5]' }],
    completed: false
  },
  {
    id: 'bst-3',
    title: 'Validate BST',
    difficulty: 'medium',
    topic: 'bst',
    premium: false, // FREE
    description: 'Check if tree is valid BST.',
    examples: [{ input: '[2,1,3]', output: 'true' }],
    constraints: ['Check all subtrees'],
    starterCode: `function isValidBST(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[2,1,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'bst-4',
    title: 'Kth Smallest Element',
    difficulty: 'medium',
    topic: 'bst',
    premium: false, // FREE
    description: 'Find kth smallest in BST.',
    examples: [{ input: '[3,1,4,null,2], 1', output: '1' }],
    constraints: ['Inorder traversal'],
    starterCode: `function kthSmallest(root, k) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,1,4,null,2], 1', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'bst-5',
    title: 'Sorted Array to BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false, // FREE
    description: 'Convert sorted array to balanced BST.',
    examples: [{ input: '[-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]' }],
    constraints: ['Height balanced'],
    starterCode: `function sortedArrayToBST(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[-10,-3,0,5,9]', expectedOutput: '[0,-3,9,-10,null,5]' }],
    completed: false
  },
  {
    id: 'bst-6',
    title: 'Delete Node in BST',
    difficulty: 'medium',
    topic: 'bst',
    premium: true, // PREMIUM
    description: 'Delete node from BST.',
    examples: [{ input: '[5,3,6,2,4,null,7], 3', output: '[5,4,6,2,null,null,7]' }],
    constraints: ['Handle 3 cases: leaf, one child, two children'],
    starterCode: `function deleteNode(root, key) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[5,3,6,2,4,null,7], 3', expectedOutput: '[5,4,6,2,null,null,7]' }],
    completed: false
  },
  {
    id: 'bst-7',
    title: 'BST to Greater Tree',
    difficulty: 'medium',
    topic: 'bst',
    premium: true, // PREMIUM
    description: 'Convert BST where each node equals original plus sum of greater values.',
    examples: [{ input: '[4,1,6,0,2,5,7]', output: '[30,36,21,36,35,26,15]' }],
    constraints: ['Reverse inorder traversal'],
    starterCode: `function convertBST(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,1,6,0,2,5,7]', expectedOutput: '[30,36,21,36,35,26,15]' }],
    completed: false
  },
  {
    id: 'bst-8',
    title: 'Recover BST',
    difficulty: 'hard',
    topic: 'bst',
    premium: true, // PREMIUM
    description: 'Recover BST where two nodes are swapped.',
    examples: [{ input: '[3,1,4,null,null,2]', output: '[2,1,4,null,null,3]' }],
    constraints: ['Find swapped nodes', 'O(1) space preferred'],
    starterCode: `function recoverTree(root) {\n  // Write your code here\n  \n}`,
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
    topic: 'graphs',
    premium: false, // FREE
    description: 'Count islands in 2D grid.',
    examples: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }],
    constraints: ['DFS or BFS', 'm, n in [1, 300]'],
    starterCode: `function numIslands(grid) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-2',
    title: 'Clone Graph',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Deep copy of undirected graph.',
    examples: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }],
    constraints: ['Use HashMap', 'Nodes: [0, 100]'],
    starterCode: `function cloneGraph(node) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' }],
    completed: false
  },
  {
    id: 'graph-3',
    title: 'Valid Path Exists',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Check if path exists from source to destination.',
    examples: [{ input: 'n=3, edges=[[0,1],[1,2],[2,0]], source=0, dest=2', output: 'true' }],
    constraints: ['Union Find or DFS'],
    starterCode: `function validPath(n, edges, source, destination) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3, [[0,1],[1,2],[2,0]], 0, 2', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'graph-4',
    title: 'All Paths Source to Target',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Find all paths from 0 to n-1.',
    examples: [{ input: '[[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' }],
    constraints: ['Backtracking', 'n in [2, 15]'],
    starterCode: `function allPathsSourceTarget(graph) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,2],[3],[3],[]]', expectedOutput: '[[0,1,3],[0,2,3]]' }],
    completed: false
  },
  {
    id: 'graph-5',
    title: 'Course Schedule',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Check if you can finish all courses (detect cycle).',
    examples: [{ input: 'numCourses=2, prerequisites=[[1,0]]', output: 'true' }],
    constraints: ['Topological sort', 'DFS cycle detection'],
    starterCode: `function canFinish(numCourses, prerequisites) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '2, [[1,0]]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'graph-6',
    title: 'Number of Provinces',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Find number of connected components.',
    examples: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', output: '2' }],
    constraints: ['Union Find or DFS'],
    starterCode: `function findCircleNum(isConnected) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-7',
    title: 'Surrounded Regions',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Flip all O\'s surrounded by X.',
    examples: [{ input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', output: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
    constraints: ['DFS from borders'],
    starterCode: `function solve(board) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', expectedOutput: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
    completed: false
  },
  {
    id: 'graph-8',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Find cells where water flows to both oceans.',
    examples: [{ input: '[[1,2,3],[8,9,4],[7,6,5]]', output: '[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]' }],
    constraints: ['DFS from both oceans'],
    starterCode: `function pacificAtlantic(heights) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,2,3],[8,9,4],[7,6,5]]', expectedOutput: '[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]' }],
    completed: false
  },
  {
    id: 'graph-9',
    title: 'Word Ladder',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Shortest transformation sequence.',
    examples: [{ input: 'beginWord="hit", endWord="cog", wordList=["hot","dot","dog","lot","log","cog"]', output: '5' }],
    constraints: ['BFS', 'Word graph'],
    starterCode: `function ladderLength(beginWord, endWord, wordList) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expectedOutput: '5' }],
    completed: false
  },
  {
    id: 'graph-10',
    title: 'Shortest Path in Binary Matrix',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Find shortest path from top-left to bottom-right.',
    examples: [{ input: '[[0,1],[1,0]]', output: '2' }],
    constraints: ['8-directional movement', 'BFS'],
    starterCode: `function shortestPathBinaryMatrix(grid) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[0,1],[1,0]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-11',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Minimum time for all oranges to rot.',
    examples: [{ input: '[[2,1,1],[1,1,0],[0,1,1]]', output: '4' }],
    constraints: ['Multi-source BFS'],
    starterCode: `function orangesRotting(grid) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[2,1,1],[1,1,0],[0,1,1]]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'graph-12',
    title: 'Network Delay Time',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false, // FREE
    description: 'Time for signal to reach all nodes.',
    examples: [{ input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', output: '2' }],
    constraints: ['Dijkstra\'s algorithm', 'Weighted graph'],
    starterCode: `function networkDelayTime(times, n, k) {\n  // Write your code here\n  \n}`,
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
    topic: 'dp',
    premium: false, // FREE
    description: 'Count ways to climb n stairs (1 or 2 steps).',
    examples: [{ input: '3', output: '3', explanation: '1+1+1, 1+2, 2+1' }],
    constraints: ['1 <= n <= 45', 'Fibonacci pattern'],
    starterCode: `function climbStairs(n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-2',
    title: 'House Robber',
    difficulty: 'basic',
    topic: 'dp',
    premium: false, // FREE
    description: 'Maximum money without robbing adjacent houses.',
    examples: [{ input: '[1,2,3,1]', output: '4', explanation: 'Rob 1 and 3' }],
    constraints: ['Can\'t rob adjacent'],
    starterCode: `function rob(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,1]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'dp-3',
    title: 'Coin Change',
    difficulty: 'medium',
    topic: 'dp',
    premium: false, // FREE
    description: 'Minimum coins to make amount.',
    examples: [{ input: 'coins=[1,2,5], amount=11', output: '3', explanation: '5+5+1' }],
    constraints: ['Return -1 if impossible'],
    starterCode: `function coinChange(coins, amount) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,5], 11', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-4',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    topic: 'dp',
    premium: false, // FREE
    description: 'Length of longest increasing subsequence.',
    examples: [{ input: '[10,9,2,5,3,7,101,18]', output: '4', explanation: '[2,3,7,101]' }],
    constraints: ['O(n log n) solution exists'],
    starterCode: `function lengthOfLIS(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[10,9,2,5,3,7,101,18]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'dp-5',
    title: 'Unique Paths',
    difficulty: 'medium',
    topic: 'dp',
    premium: false, // FREE
    description: 'Count paths in m×n grid (only right/down).',
    examples: [{ input: 'm=3, n=7', output: '28' }],
    constraints: ['Start top-left, end bottom-right'],
    starterCode: `function uniquePaths(m, n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3, 7', expectedOutput: '28' }],
    completed: false
  },
  {
    id: 'dp-6',
    title: 'Longest Common Subsequence',
    difficulty: 'medium',
    topic: 'dp',
    premium: false, // FREE
    description: 'Length of LCS between two strings.',
    examples: [{ input: 'text1="abcde", text2="ace"', output: '3', explanation: '"ace"' }],
    constraints: ['Classic DP problem'],
    starterCode: `function longestCommonSubsequence(text1, text2) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"abcde", "ace"', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-7',
    title: 'Word Break',
    difficulty: 'medium',
    topic: 'dp',
    premium: true, // PREMIUM
    description: 'Check if string can be segmented into dictionary words.',
    examples: [{ input: 's="leetcode", wordDict=["leet","code"]', output: 'true' }],
    constraints: ['DP with substring checks'],
    starterCode: `function wordBreak(s, wordDict) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"leetcode", ["leet","code"]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'dp-8',
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    topic: 'dp',
    premium: true, // PREMIUM
    description: 'Check if array can be partitioned into equal sum subsets.',
    examples: [{ input: '[1,5,11,5]', output: 'true', explanation: '[1,5,5] and [11]' }],
    constraints: ['0/1 Knapsack variant'],
    starterCode: `function canPartition(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,5,11,5]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'dp-9',
    title: 'Edit Distance',
    difficulty: 'hard',
    topic: 'dp',
    premium: true, // PREMIUM
    description: 'Minimum operations to convert word1 to word2.',
    examples: [{ input: 'word1="horse", word2="ros"', output: '3', explanation: 'horse -> rorse -> rose -> ros' }],
    constraints: ['Insert, delete, replace'],
    starterCode: `function minDistance(word1, word2) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"horse", "ros"', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-10',
    title: 'Regular Expression Matching',
    difficulty: 'hard',
    topic: 'dp',
    premium: true, // PREMIUM
    description: 'Implement regex matching with . and *.',
    examples: [{ input: 's="aa", p="a*"', output: 'true' }],
    constraints: ['. matches any char', '* matches zero or more'],
    starterCode: `function isMatch(s, p) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"aa", "a*"', expectedOutput: 'true' }],
    completed: false
  },
]

export function getProblemsByTopicAndLevel(topic: string, level: string): Problem[] {
  return problems.filter(p => p.topic === topic && p.difficulty === level)
}

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
  // TREES - BASIC (8 problems - ALL FREE)
  // ============================================
  {
    id: 'tree-1',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Given the root of a binary tree, return its maximum depth.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '3' }],
    constraints: ['Number of nodes: [0, 10^4]'],
    starterCode: `function maxDepth(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-2',
    title: 'Count Leaf Nodes',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Count the number of leaf nodes in a binary tree.',
    examples: [{ input: '[1,2,3,4,5]', output: '3' }],
    constraints: ['Number of nodes: [0, 1000]'],
    starterCode: `function countLeaves(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,4,5]', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-3',
    title: 'Sum of All Nodes',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Calculate the sum of all node values in a binary tree.',
    examples: [{ input: '[1,2,3,4,5]', output: '15' }],
    constraints: ['Number of nodes: [0, 1000]'],
    starterCode: `function sumTree(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,4,5]', expectedOutput: '15' }],
    completed: false
  },
  {
    id: 'tree-4',
    title: 'Mirror Tree Check',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Check if a binary tree is symmetric.',
    examples: [{ input: '[1,2,2,3,4,4,3]', output: 'true' }],
    constraints: ['Number of nodes: [1, 1000]'],
    starterCode: `function isSymmetric(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,2,3,4,4,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-5',
    title: 'Find Minimum Value',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Find the minimum value node in a binary tree.',
    examples: [{ input: '[5,3,8,1,4,7,9]', output: '1' }],
    constraints: ['At least 1 node'],
    starterCode: `function findMin(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[5,3,8,1,4,7,9]', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'tree-6',
    title: 'Height Balanced Check',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Determine if a binary tree is height-balanced.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: 'true' }],
    constraints: ['Number of nodes: [0, 5000]'],
    starterCode: `function isBalanced(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-7',
    title: 'Path Sum Exists',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Check if root-to-leaf path exists with given sum.',
    examples: [{ input: '[5,4,8,11,null,13,4], 22', output: 'true' }],
    constraints: ['Number of nodes: [0, 5000]'],
    starterCode: `function hasPathSum(root, targetSum) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[5,4,8,11,null,13,4], 22', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-8',
    title: 'Same Tree',
    difficulty: 'basic',
    topic: 'trees',
    premium: false,
    description: 'Check if two trees are identical.',
    examples: [{ input: '[1,2,3], [1,2,3]', output: 'true' }],
    constraints: ['Number of nodes: [0, 100]'],
    starterCode: `function isSameTree(p, q) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3], [1,2,3]', expectedOutput: 'true' }],
    completed: false
  },

  // ============================================
  // TREES - MEDIUM (10 problems - 3 PREMIUM)
  // ============================================
  {
    id: 'tree-9',
    title: 'Level Order Traversal',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Return level order traversal (BFS).',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
    constraints: ['Number of nodes: [0, 2000]'],
    starterCode: `function levelOrder(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]' }],
    completed: false
  },
  {
    id: 'tree-10',
    title: 'Zigzag Level Order',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Return zigzag level order traversal.',
    examples: [{ input: '[3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' }],
    constraints: ['Number of nodes: [0, 2000]'],
    starterCode: `function zigzagLevelOrder(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,9,20,null,null,15,7]', expectedOutput: '[[3],[20,9],[15,7]]' }],
    completed: false
  },
  {
    id: 'tree-11',
    title: 'Validate BST',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Determine if a tree is a valid BST.',
    examples: [{ input: '[2,1,3]', output: 'true' }],
    constraints: ['Number of nodes: [1, 10^4]'],
    starterCode: `function isValidBST(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[2,1,3]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'tree-12',
    title: 'Lowest Common Ancestor',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Find LCA of two nodes.',
    examples: [{ input: '[3,5,1,6,2,0,8], 5, 1', output: '3' }],
    constraints: ['All values unique'],
    starterCode: `function lowestCommonAncestor(root, p, q) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,5,1,6,2,0,8], 5, 1', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'tree-13',
    title: 'Serialize and Deserialize Tree',
    difficulty: 'medium',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Serialize and deserialize binary tree.',
    examples: [{ input: '[1,2,3,null,null,4,5]', output: '"1,2,N,N,3,4,N,N,5,N,N"' }],
    constraints: ['Number of nodes: [0, 10^4]'],
    starterCode: `function serialize(root) {\n  // Write your code here\n}\n\nfunction deserialize(data) {\n  // Write your code here\n}`,
    testCases: [{ input: '[1,2,3,null,null,4,5]', expectedOutput: '[1,2,3,null,null,4,5]' }],
    completed: false
  },
  {
    id: 'tree-14',
    title: 'Right Side View',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Return nodes visible from right side.',
    examples: [{ input: '[1,2,3,null,5,null,4]', output: '[1,3,4]' }],
    constraints: ['Number of nodes: [0, 100]'],
    starterCode: `function rightSideView(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,null,5,null,4]', expectedOutput: '[1,3,4]' }],
    completed: false
  },
  {
    id: 'tree-15',
    title: 'Kth Smallest in BST',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Find kth smallest element in BST.',
    examples: [{ input: '[3,1,4,null,2], 1', output: '1' }],
    constraints: ['1 <= k <= n <= 10^4'],
    starterCode: `function kthSmallest(root, k) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,1,4,null,2], 1', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'tree-16',
    title: 'Flatten Tree to Linked List',
    difficulty: 'medium',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Flatten tree to linked list in-place.',
    examples: [{ input: '[1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' }],
    constraints: ['Number of nodes: [0, 2000]'],
    starterCode: `function flatten(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,5,3,4,null,6]', expectedOutput: '[1,null,2,null,3,null,4,null,5,null,6]' }],
    completed: false
  },
  {
    id: 'tree-17',
    title: 'Maximum Path Sum',
    difficulty: 'medium',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Find maximum path sum in binary tree.',
    examples: [{ input: '[1,2,3]', output: '6' }],
    constraints: ['Number of nodes: [1, 3*10^4]'],
    starterCode: `function maxPathSum(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3]', expectedOutput: '6' }],
    completed: false
  },
  {
    id: 'tree-18',
    title: 'Count Complete Tree Nodes',
    difficulty: 'medium',
    topic: 'trees',
    premium: false,
    description: 'Count nodes in complete binary tree efficiently.',
    examples: [{ input: '[1,2,3,4,5,6]', output: '6' }],
    constraints: ['Number of nodes: [0, 5*10^4]'],
    starterCode: `function countNodes(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,4,5,6]', expectedOutput: '6' }],
    completed: false
  },

  // ============================================
  // TREES - HARD (2 problems - ALL PREMIUM)
  // ============================================
  {
    id: 'tree-19',
    title: 'Binary Tree Cameras',
    difficulty: 'hard',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Install minimum cameras to monitor all nodes.',
    examples: [{ input: '[0,0,null,0,0]', output: '1' }],
    constraints: ['Number of nodes: [1, 1000]'],
    starterCode: `function minCameraCover(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[0,0,null,0,0]', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'tree-20',
    title: 'Recover BST',
    difficulty: 'hard',
    topic: 'trees',
    premium: true, // PREMIUM
    description: 'Recover BST where two nodes are swapped.',
    examples: [{ input: '[3,1,4,null,null,2]', output: '[2,1,4,null,null,3]' }],
    constraints: ['Number of nodes: [2, 1000]'],
    starterCode: `function recoverTree(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[3,1,4,null,null,2]', expectedOutput: '[2,1,4,null,null,3]' }],
    completed: false
  },

  // ============================================
  // BST - BASIC (6 problems - ALL FREE)
  // ============================================
  {
    id: 'bst-1',
    title: 'Search in BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Find node with given value in BST.',
    examples: [{ input: '[4,2,7,1,3], 2', output: '[2,1,3]' }],
    constraints: ['Number of nodes: [1, 5000]'],
    starterCode: `function searchBST(root, val) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,2,7,1,3], 2', expectedOutput: '[2,1,3]' }],
    completed: false
  },
  {
    id: 'bst-2',
    title: 'Insert into BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Insert value into BST.',
    examples: [{ input: '[4,2,7,1,3], 5', output: '[4,2,7,1,3,5]' }],
    constraints: ['Number of nodes: [0, 10^4]'],
    starterCode: `function insertIntoBST(root, val) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,2,7,1,3], 5', expectedOutput: '[4,2,7,1,3,5]' }],
    completed: false
  },
  {
    id: 'bst-3',
    title: 'Delete Node in BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Delete node from BST.',
    examples: [{ input: '[5,3,6,2,4,null,7], 3', output: '[5,4,6,2,null,null,7]' }],
    constraints: ['Number of nodes: [0, 10^4]'],
    starterCode: `function deleteNode(root, key) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[5,3,6,2,4,null,7], 3', expectedOutput: '[5,4,6,2,null,null,7]' }],
    completed: false
  },
  {
    id: 'bst-4',
    title: 'Minimum Distance Between Nodes',
    difficulty: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Find minimum absolute difference in BST.',
    examples: [{ input: '[4,2,6,1,3]', output: '1' }],
    constraints: ['Number of nodes: [2, 10^4]'],
    starterCode: `function getMinimumDifference(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,2,6,1,3]', expectedOutput: '1' }],
    completed: false
  },
  {
    id: 'bst-5',
    title: 'Convert Sorted Array to BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Convert sorted array to balanced BST.',
    examples: [{ input: '[-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]' }],
    constraints: ['1 <= nums.length <= 10^4'],
    starterCode: `function sortedArrayToBST(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[-10,-3,0,5,9]', expectedOutput: '[0,-3,9,-10,null,5]' }],
    completed: false
  },
  {
    id: 'bst-6',
    title: 'Two Sum IV - BST',
    difficulty: 'basic',
    topic: 'bst',
    premium: false,
    description: 'Find if two elements sum to target.',
    examples: [{ input: '[5,3,6,2,4,null,7], 9', output: 'true' }],
    constraints: ['Number of nodes: [1, 10^4]'],
    starterCode: `function findTarget(root, k) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[5,3,6,2,4,null,7], 9', expectedOutput: 'true' }],
    completed: false
  },

  // ============================================
  // BST - MEDIUM (4 problems - 1 PREMIUM)
  // ============================================
  {
    id: 'bst-7',
    title: 'Inorder Successor',
    difficulty: 'medium',
    topic: 'bst',
    premium: false,
    description: 'Find inorder successor in BST.',
    examples: [{ input: '[2,1,3], 1', output: '2' }],
    constraints: ['Number of nodes: [1, 10^4]'],
    starterCode: `function inorderSuccessor(root, p) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[2,1,3], 1', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'bst-8',
    title: 'Convert BST to Greater Tree',
    difficulty: 'medium',
    topic: 'bst',
    premium: true, // PREMIUM
    description: 'Convert BST where each node = original + sum of greater values.',
    examples: [{ input: '[4,1,6,0,2,5,7]', output: '[30,36,21,36,35,26,15]' }],
    constraints: ['Number of nodes: [0, 10^4]'],
    starterCode: `function convertBST(root) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[4,1,6,0,2,5,7]', expectedOutput: '[30,36,21,36,35,26,15]' }],
    completed: false
  },
  {
    id: 'bst-9',
    title: 'Unique BSTs Count',
    difficulty: 'medium',
    topic: 'bst',
    premium: false,
    description: 'Count structurally unique BSTs with n nodes.',
    examples: [{ input: '3', output: '5' }],
    constraints: ['1 <= n <= 19'],
    starterCode: `function numTrees(n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3', expectedOutput: '5' }],
    completed: false
  },
  {
    id: 'bst-10',
    title: 'Range Sum of BST',
    difficulty: 'medium',
    topic: 'bst',
    premium: false,
    description: 'Sum of values in range [low, high].',
    examples: [{ input: '[10,5,15,3,7,null,18], 7, 15', output: '32' }],
    constraints: ['Number of nodes: [1, 2*10^4]'],
    starterCode: `function rangeSumBST(root, low, high) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[10,5,15,3,7,null,18], 7, 15', expectedOutput: '32' }],
    completed: false
  },

  // ============================================
  // GRAPHS - BASIC (5 problems - ALL FREE)
  // ============================================
  {
    id: 'graph-1',
    title: 'Number of Islands',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Count islands in 2D grid.',
    examples: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }],
    constraints: ['m, n in [1, 300]'],
    starterCode: `function numIslands(grid) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-2',
    title: 'Clone Graph',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Deep copy of undirected graph.',
    examples: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }],
    constraints: ['Nodes: [0, 100]'],
    starterCode: `function cloneGraph(node) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]' }],
    completed: false
  },
  {
    id: 'graph-3',
    title: 'Find if Path Exists',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Check if path exists from source to destination.',
    examples: [{ input: '3, [[0,1],[1,2],[2,0]], 0, 2', output: 'true' }],
    constraints: ['1 <= n <= 2*10^5'],
    starterCode: `function validPath(n, edges, source, destination) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3, [[0,1],[1,2],[2,0]], 0, 2', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'graph-4',
    title: 'All Paths Source to Target',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Find all paths from node 0 to n-1.',
    examples: [{ input: '[[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' }],
    constraints: ['n in [2, 15]'],
    starterCode: `function allPathsSourceTarget(graph) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,2],[3],[3],[]]', expectedOutput: '[[0,1,3],[0,2,3]]' }],
    completed: false
  },
  {
    id: 'graph-5',
    title: 'Find Center of Star Graph',
    difficulty: 'basic',
    topic: 'graphs',
    premium: false,
    description: 'Find center node of star graph.',
    examples: [{ input: '[[1,2],[2,3],[4,2]]', output: '2' }],
    constraints: ['3 <= n <= 10^5'],
    starterCode: `function findCenter(edges) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,2],[2,3],[4,2]]', expectedOutput: '2' }],
    completed: false
  },

  // ============================================
  // GRAPHS - MEDIUM (5 problems - 2 PREMIUM)
  // ============================================
  {
    id: 'graph-6',
    title: 'Course Schedule',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Check if you can finish all courses (detect cycle).',
    examples: [{ input: '2, [[1,0]]', output: 'true' }],
    constraints: ['1 <= numCourses <= 2000'],
    starterCode: `function canFinish(numCourses, prerequisites) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '2, [[1,0]]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'graph-7',
    title: 'Number of Provinces',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Find number of connected components.',
    examples: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', output: '2' }],
    constraints: ['1 <= n <= 200'],
    starterCode: `function findCircleNum(isConnected) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,1,0],[1,1,0],[0,0,1]]', expectedOutput: '2' }],
    completed: false
  },
  {
    id: 'graph-8',
    title: 'Surrounded Regions',
    difficulty: 'medium',
    topic: 'graphs',
    premium: true, // PREMIUM
    description: 'Flip all O\'s surrounded by X.',
    examples: [{ input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', output: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
    constraints: ['m, n in [1, 200]'],
    starterCode: `function solve(board) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[["X","X","X"],["X","O","X"],["X","X","X"]]', expectedOutput: '[["X","X","X"],["X","X","X"],["X","X","X"]]' }],
    completed: false
  },
  {
    id: 'graph-9',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    topic: 'graphs',
    premium: true, // PREMIUM
    description: 'Find cells where water flows to both oceans.',
    examples: [{ input: '[[1,2,3],[8,9,4],[7,6,5]]', output: '[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]' }],
    constraints: ['m, n in [1, 200]'],
    starterCode: `function pacificAtlantic(heights) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[[1,2,3],[8,9,4],[7,6,5]]', expectedOutput: '[[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]' }],
    completed: false
  },
  {
    id: 'graph-10',
    title: 'Word Ladder',
    difficulty: 'medium',
    topic: 'graphs',
    premium: false,
    description: 'Shortest transformation sequence.',
    examples: [{ input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', output: '5' }],
    constraints: ['1 <= beginWord.length <= 10'],
    starterCode: `function ladderLength(beginWord, endWord, wordList) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expectedOutput: '5' }],
    completed: false
  },

  // ============================================
  // DP - BASIC (5 problems - ALL FREE)
  // ============================================
  {
    id: 'dp-1',title: 'Climbing Stairs',
    difficulty: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Count ways to climb n stairs.',
    examples: [{ input: '3', output: '3' }],
    constraints: ['1 <= n <= 45'],
    starterCode: `function climbStairs(n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-2',
    title: 'House Robber',
    difficulty: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Max money without robbing adjacent houses.',
    examples: [{ input: '[1,2,3,1]', output: '4' }],
    constraints: ['1 <= nums.length <= 100'],
    starterCode: `function rob(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,3,1]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'dp-3',
    title: 'Min Cost Climbing Stairs',
    difficulty: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Find minimum cost to reach top.',
    examples: [{ input: '[10,15,20]', output: '15' }],
    constraints: ['2 <= cost.length <= 1000'],
    starterCode: `function minCostClimbingStairs(cost) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[10,15,20]', expectedOutput: '15' }],
    completed: false
  },
  {
    id: 'dp-4',
    title: 'Fibonacci Number',
    difficulty: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Calculate nth Fibonacci number.',
    examples: [{ input: '4', output: '3' }],
    constraints: ['0 <= n <= 30'],
    starterCode: `function fib(n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '4', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-5',
    title: 'Counting Bits',
    difficulty: 'basic',
    topic: 'dp',
    premium: false,
    description: 'Count 1s in binary for 0 to n.',
    examples: [{ input: '5', output: '[0,1,1,2,1,2]' }],
    constraints: ['0 <= n <= 10^5'],
    starterCode: `function countBits(n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '5', expectedOutput: '[0,1,1,2,1,2]' }],
    completed: false
  },

 
  {
    id: 'dp-6',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Length of longest increasing subsequence.',
    examples: [{ input: '[10,9,2,5,3,7,101,18]', output: '4' }],
    constraints: ['1 <= nums.length <= 2500'],
    starterCode: `function lengthOfLIS(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[10,9,2,5,3,7,101,18]', expectedOutput: '4' }],
    completed: false
  },
  {
    id: 'dp-7',
    title: 'Coin Change',
    difficulty: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Minimum coins to make amount.',
    examples: [{ input: '[1,2,5], 11', output: '3' }],
    constraints: ['1 <= coins.length <= 12'],
    starterCode: `function coinChange(coins, amount) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,2,5], 11', expectedOutput: '3' }],
    completed: false
  },
  {
    id: 'dp-8',
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    topic: 'dp',
    premium: false, // PREMIUM
    description: 'Check if array can be partitioned into equal sum subsets.',
    examples: [{ input: '[1,5,11,5]', output: 'true' }],
    constraints: ['1 <= nums.length <= 200'],
    starterCode: `function canPartition(nums) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '[1,5,11,5]', expectedOutput: 'true' }],
    completed: false
  },
  {
    id: 'dp-9',
    title: 'Unique Paths',
    difficulty: 'medium',
    topic: 'dp',
    premium: false,
    description: 'Count paths in m×n grid.',
    examples: [{ input: '3, 7', output: '28' }],
    constraints: ['1 <= m, n <= 100'],
    starterCode: `function uniquePaths(m, n) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '3, 7', expectedOutput: '28' }],
    completed: false
  },
  {
    id: 'dp-10',
    title: 'Longest Common Subsequence',
    difficulty: 'medium',
    topic: 'dp',
    premium: false, // PREMIUM
    description: 'Length of LCS between two strings.',
    examples: [{ input: '"abcde", "ace"', output: '3' }],
    constraints: ['1 <= text1.length <= 1000'],
    starterCode: `function longestCommonSubsequence(text1, text2) {\n  // Write your code here\n  \n}`,
    testCases: [{ input: '"abcde", "ace"', expectedOutput: '3' }],
    completed: false
  }
]

export function getProblemsByTopicAndLevel(topic: string, level: string): Problem[] {
  return problems.filter(p => p.topic === topic && p.difficulty === level)
}
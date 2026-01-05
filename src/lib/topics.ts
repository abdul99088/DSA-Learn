import { BookOpen, Code, GitBranch, Network } from 'lucide-react'

export const topics = [
  {
    id: 'trees',
    name: 'Trees',
    icon: GitBranch,
    description: 'Binary Trees, traversals, and tree operations',
    levels: {
      basic: { unlocked: true, completed: false, problems: 8 },
      medium: { unlocked: true, completed: false, problems: 12 },
      hard: { unlocked: false, completed: false, problems: 10 }
    }
  },
  {
    id: 'bst',
    name: 'Binary Search Trees',
    icon: Code,
    description: 'BST operations, balancing, and applications',
    levels: {
      basic: { unlocked: true, completed: false, problems: 6 },
      medium: { unlocked: false, completed: false, problems: 10 },
      hard: { unlocked: false, completed: false, problems: 8 }
    }
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: Network,
    description: 'BFS, DFS, shortest paths, and algorithms',
    levels: {
      basic: { unlocked: false, completed: false, problems: 10 },
      medium: { unlocked: false, completed: false, problems: 14 },
      hard: { unlocked: false, completed: false, problems: 12 }
    }
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    icon: BookOpen,
    description: 'Memoization, tabulation, and optimization',
    levels: {
      basic: { unlocked: false, completed: false, problems: 8 },
      medium: { unlocked: false, completed: false, problems: 15 },
      hard: { unlocked: false, completed: false, problems: 18 }
    }
  }
]
'use client'

import { BookOpen, Code, GitBranch, Network, Database } from 'lucide-react'

export const topics = [
  {
    id: 'data-structures',
    name: 'Data Structures',
    icon: Database,
    description: 'Arrays, Stacks, Queues, Hash Tables',
    levels: {
      basic: { unlocked: true, completed: false, problems: 15 },
      medium: { unlocked: true, completed: false, problems: 0 },
      hard: { unlocked: false, completed: false, problems: 0 }
    }
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: GitBranch,
    description: 'Binary Trees and traversals',
    levels: {
      basic: { unlocked: true, completed: false, problems: 8 },
      medium: { unlocked: true, completed: false, problems: 4 },
      hard: { unlocked: false, completed: false, problems: 0 }
    }
  },
  {
    id: 'bst',
    name: 'Binary Search Trees',
    icon: Code,
    description: 'BST operations and balancing',
    levels: {
      basic: { unlocked: true, completed: false, problems: 5 },
      medium: { unlocked: true, completed: false, problems: 3 },
      hard: { unlocked: false, completed: false, problems: 0 }
    }
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: Network,
    description: 'BFS, DFS, shortest paths',
    levels: {
      basic: { unlocked: true, completed: false, problems: 4 },
      medium: { unlocked: true, completed: false, problems: 8 },
      hard: { unlocked: false, completed: false, problems: 0 }
    }
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    icon: BookOpen,
    description: 'Memoization and optimization',
    levels: {
      basic: { unlocked: true, completed: false, problems: 2 },
      medium: { unlocked: true, completed: false, problems: 4 },
      hard: { unlocked: false, completed: false, problems: 4 }
    }
  }
]
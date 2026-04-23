import { ProductDetail, RelatedItem, Comment } from '@/types';

export const mockProduct: ProductDetail = {
  id: '1',
  title: 'Virtual Reality Chemistry Lab - Interactive 3D Molecular Structures',
  description: 'An immersive virtual reality experience that allows students to explore molecular structures in 3D space. This educational tool combines cutting-edge VR technology with comprehensive chemistry curriculum, enabling learners to visualize complex molecular bonds, chemical reactions, and atomic structures in an interactive environment.',
  category: 'Chemistry',
  tags: ['VR', '3D', 'Chemistry', 'Interactive', 'Education', 'STEM'],
  media: [
    {
      id: '1',
      type: 'image',
      src: '/images/vr.jpg',
    },
    {
      id: '2',
      type: 'video',
      src: '/videos/chemistry-lab-demo.mp4',
      poster: '/images/vr.jpg'
    },
    {
      id: '3',
      type: '3d',
      src: '/models/molecular-structure.glb'
    }
  ],
  author: {
    id: 'author-1',
    name: 'Dr. Sarah Johnson',
    avatar: '/images/teacher2.jpg'
  },
  publishedAt: '2024-01-15T10:30:00Z',
  views: 15420,
  likes: 892,
  price: 0,
  duration: '45 minutes',
  resources: [
    { label: 'Teacher Guide PDF', url: '#' },
    { label: 'Student Worksheet', url: '#' },
    { label: 'VR Setup Instructions', url: '#' },
    { label: 'Assessment Rubric', url: '#' }
  ],
  usedBy: ['Harvard University', 'MIT', 'Stanford University', 'Oxford University', 'Cambridge University']
};

export const mockRelatedItems: RelatedItem[] = [
  {
    id: '2',
    title: 'Physics VR Lab - Gravity Simulation',
    description: 'Explore gravitational forces in a virtual space environment',
    thumbnail: '/images/atom_bomba.jpg',
    category: 'Physics',
    views: 12340,
    likes: 756
  },
  {
    id: '3',
    title: 'Biology VR - Cell Structure Explorer',
    description: 'Journey inside a living cell and explore its organelles',
    thumbnail: '/images/atom_bomba.jpg',
    category: 'Biology',
    views: 9876,
    likes: 634
  },
  {
    id: '4',
    title: 'Mathematics VR - Geometric Shapes',
    description: 'Visualize complex mathematical concepts in 3D space',
    thumbnail: '/images/atom_bomba.jpg',
    category: 'Mathematics',
    views: 8765,
    likes: 523
  },
  {
    id: '5',
    title: 'History VR - Ancient Civilizations',
    description: 'Step back in time and explore ancient civilizations',
    thumbnail: '/images/atom_bomba.jpg',
    category: 'History',
    views: 11234,
    likes: 789
  },
  {
    id: '6',
    title: 'Geography VR - World Explorer',
    description: 'Travel the world and explore different ecosystems',
    thumbnail: '/images/atom_bomba.jpg',
    category: 'Geography',
    views: 14567,
    likes: 912
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    author: {
      name: 'Prof. Michael Chen',
      avatar: '/images/teacher2.jpg'
    },
    content: 'This VR chemistry lab has revolutionized how my students understand molecular structures. The 3D visualization makes complex concepts much more accessible.',
    createdAt: '2024-01-20T14:30:00Z',
    likes: 23
  },
  {
    id: 'comment-2',
    author: {
      name: 'Dr. Emily Rodriguez'
    },
    content: 'Excellent educational tool! My students are more engaged than ever. The interactive elements really help with retention.',
    createdAt: '2024-01-18T09:15:00Z',
    likes: 18
  },
  {
    id: 'comment-3',
    author: {
      name: 'James Wilson',
      avatar: '/images/teacher2.jpg'
    },
    content: 'The VR experience is incredibly immersive. Students can actually "walk" through molecular structures. Highly recommended for chemistry educators.',
    createdAt: '2024-01-16T16:45:00Z',
    likes: 31
  }
];

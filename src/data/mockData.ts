// Unified Mock Data for the entire application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'teacher' | 'student' | 'admin';
  institution?: string;
  department?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  media: MediaItem[];
  author: User;
  publishedAt: string;
  views: number;
  likes: number;
  price: number;
  duration: string;
  resources: Resource[];
  usedBy: string[];
  isNew?: boolean;
  isPro?: boolean;
  isFree?: boolean;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  ageGroup: string;
  subject: string;
  interactiveExercises?: InteractiveExercise[];
}

export interface InteractiveExercise {
  id: string;
  type: 'quiz' | 'practical' | 'simulation' | 'experiment';
  title: string;
  description: string;
  icon: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | '3d' | 'audio';
  src: string;
  poster?: string;
  thumbnail?: string;
}

export interface Resource {
  label: string;
  url: string;
  type: 'pdf' | 'video' | 'audio' | '3d' | 'interactive';
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
}

export interface RelatedItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  views: number;
  likes: number;
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: any;
  explanation?: string;
}

export interface Content {
  id: string;
  type: 'video' | '3d' | 'interactive' | 'exercise';
  title: string;
  description: string;
  url?: string;
  model3dUrl?: string;
  embedded3d?: string;
  exercises?: Exercise[];
  duration?: string;
  thumbnail?: string;
}

export interface ProductProcess {
  id: string;
  title: string;
  description: string;
  author: User;
  category: string;
  difficulty: string;
  duration: string;
  steps: Content[];
  tags: string[];
  views: number;
  likes: number;
  publishedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    avatar: '/images/teacher2.jpg',
    role: 'teacher',
    institution: 'Harvard University',
    department: 'Chemistry'
  },
  {
    id: 'user-2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@mit.edu',
    avatar: '/images/teacher2.jpg',
    role: 'teacher',
    institution: 'MIT',
    department: 'Physics'
  },
  {
    id: 'user-3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@stanford.edu',
    avatar: '/images/teacher2.jpg',
    role: 'teacher',
    institution: 'Stanford University',
    department: 'Biology'
  },
  {
    id: 'user-4',
    name: 'James Wilson',
    email: 'james.wilson@oxford.edu',
    avatar: '/images/teacher2.jpg',
    role: 'teacher',
    institution: 'Oxford University',
    department: 'Mathematics'
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
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
    author: mockUsers[0],
    publishedAt: '2024-01-15T10:30:00Z',
    views: 15420,
    likes: 892,
    price: 0,
    duration: '45 minutes',
    resources: [
      { label: 'Teacher Guide PDF', url: '#', type: 'pdf' },
      { label: 'Student Worksheet', url: '#', type: 'pdf' },
      { label: 'VR Setup Instructions', url: '#', type: 'pdf' },
      { label: 'Assessment Rubric', url: '#', type: 'pdf' }
    ],
    usedBy: ['Harvard University', 'MIT', 'Stanford University', 'Oxford University', 'Cambridge University'],
    isNew: true,
    language: 'English',
    difficulty: 'intermediate',
    ageGroup: '16+',
    subject: 'Chemistry',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Molecular Structure Quiz',
        description: 'Test your knowledge of molecular structures and chemical bonds',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'simulation',
        title: '3D Molecular Builder',
        description: 'Build and manipulate molecular structures in 3D space',
        icon: 'Brain'
      },
      {
        id: 'ex3',
        type: 'experiment',
        title: 'Virtual Lab Experiment',
        description: 'Conduct chemical reactions in virtual laboratory',
        icon: 'FlaskConical'
      }
    ]
  },
  {
    id: '2',
    title: 'VR Kosmos sayohati',
    description: 'Virtual reallikda kosmosga sayohat qiling va sayyoralarni yaqindan ko\'ring. Bu VR tajriba sizni quyosh sistemasining chuqur o\'rganishiga olib boradi.',
    category: 'Physics',
    tags: ['VR', 'Space', 'Physics', 'Interactive', 'Education'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/vr.jpg',
      },
      {
        id: '2',
        type: '3d',
        src: '/models/solar_system_animation.glb'
      }
    ],
    author: mockUsers[1],
    publishedAt: '2024-01-10T08:00:00Z',
    views: 203,
    likes: 25,
    price: 0,
    duration: '30 minutes',
    resources: [
      { label: 'Space Guide PDF', url: '#', type: 'pdf' },
      { label: 'VR Setup Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['MIT', 'Stanford University'],
    isNew: true,
    language: 'Uzbek',
    difficulty: 'beginner',
    ageGroup: '12+',
    subject: 'Physics',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Kosmos bilimi testi',
        description: 'Quyosh sistemi va sayyoralar haqida test savollar',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'simulation',
        title: 'Sayyora simulyatsiyasi',
        description: 'Sayyoralar harakatini kuzatish va o\'rganish',
        icon: 'Brain'
      }
    ]
  },
  {
    id: '3',
    title: 'Fizika laboratoriyasi',
    description: 'Virtual fizika laboratoriyasida tajribalar o\'tkazing va fizika qonunlarini o\'rganing.',
    category: 'Physics',
    tags: ['VR', 'Physics', 'Laboratory', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      }
    ],
    author: mockUsers[1],
    publishedAt: '2024-01-08T12:00:00Z',
    views: 167,
    likes: 18,
    price: 0,
    duration: '60 minutes',
    resources: [
      { label: 'Physics Lab Manual', url: '#', type: 'pdf' }
    ],
    usedBy: ['MIT', 'Harvard University'],
    language: 'Uzbek',
    difficulty: 'intermediate',
    ageGroup: '14+',
    subject: 'Physics',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Fizika asoslari testi',
        description: 'Fizika qonunlari va hodisalar haqida test savollar',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'experiment',
        title: 'Virtual tajriba',
        description: 'Laboratoriya asboblarini ishlatib tajriba o\'tkazing',
        icon: 'FlaskConical'
      }
    ]
  },
  {
    id: '4',
    title: 'Inson anatomiyasi - Yurak',
    description: '3D inson yurakini o\'rganing va uning ishlash mexanizmini tushuning.',
    category: 'Biology',
    tags: ['3D', 'Biology', 'Anatomy', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      },
      {
        id: '2',
        type: '3d',
        src: '/models/heart-model.glb'
      }
    ],
    author: mockUsers[2],
    publishedAt: '2024-01-05T14:30:00Z',
    views: 156,
    likes: 8,
    price: 0,
    duration: '25 minutes',
    resources: [
      { label: 'Anatomy Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['Stanford University', 'Oxford University'],
    language: 'Uzbek',
    difficulty: 'beginner',
    ageGroup: '16+',
    subject: 'Biology',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Yurak anatomiyasi testi',
        description: 'Inson yurakining tuzilishi va ishlashi haqida test',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'practical',
        title: '3D Yurak tekshiruvi',
        description: 'Yurakning turli qismlarini 3D muhitda tekshirish',
        icon: 'Beaker'
      }
    ]
  },
  {
    id: '5',
    title: 'VR Atom bomba tajribasi',
    description: 'Atom bombasining ishlash prinsiplarini 3D muhitda o\'rganing.',
    category: 'Physics',
    tags: ['VR', 'Physics', 'Nuclear', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      }
    ],
    author: mockUsers[1],
    publishedAt: '2024-01-03T16:00:00Z',
    views: 145,
    likes: 22,
    price: 0,
    duration: '40 minutes',
    resources: [
      { label: 'Nuclear Physics Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['MIT', 'Harvard University'],
    language: 'Uzbek',
    difficulty: 'advanced',
    ageGroup: '18+',
    subject: 'Physics',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Yadroviy fizika testi',
        description: 'Atom bombasi va yadroviy reaksiyalar haqida test',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'simulation',
        title: 'Atom bombasi simulyatsiyasi',
        description: 'Atom bombasining ishlash jarayonini kuzatish',
        icon: 'Brain'
      }
    ]
  },
  {
    id: '6',
    title: 'Dinazavrlar olami',
    description: 'Jurassic davridagi dinazavrlarni 3D muhitda o\'rganing.',
    category: 'Biology',
    tags: ['3D', 'Biology', 'Dinosaurs', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      }
    ],
    author: mockUsers[2],
    publishedAt: '2024-01-01T10:00:00Z',
    views: 134,
    likes: 15,
    price: 0,
    duration: '35 minutes',
    resources: [
      { label: 'Dinosaur Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['Stanford University'],
    isNew: true,
    language: 'Uzbek',
    difficulty: 'beginner',
    ageGroup: '8+',
    subject: 'Biology',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Dinazavrlar haqida test',
        description: 'Jurassic davri va dinazavrlar haqida test savollar',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'simulation',
        title: 'Dinazavrlar simulyatsiyasi',
        description: 'Dinazavrlarning hayotini kuzatish va o\'rganish',
        icon: 'Brain'
      }
    ]
  },
  {
    id: '7',
    title: 'Quyosh sistemasi va 8 sayyora',
    description: 'Quyosh sistemasidagi barcha sayyoralarni 3D muhitda o\'rganing.',
    category: 'Physics',
    tags: ['3D', 'Space', 'Planets', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      },
      {
        id: '2',
        type: '3d',
        src: '/models/solar_system_animation.glb'
      }
    ],
    author: mockUsers[1],
    publishedAt: '2023-12-28T09:00:00Z',
    views: 120,
    likes: 5,
    price: 0,
    duration: '50 minutes',
    resources: [
      { label: 'Solar System Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['MIT', 'Harvard University', 'Stanford University'],
    isPro: true,
    language: 'Uzbek',
    difficulty: 'intermediate',
    ageGroup: '10+',
    subject: 'Physics',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Quyosh sistemi testi',
        description: 'Sayyoralar va quyosh sistemi haqida test',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'simulation',
        title: 'Sayyora harakati simulyatsiyasi',
        description: 'Sayyoralarning orbital harakatini kuzatish',
        icon: 'Brain'
      },
      {
        id: 'ex3',
        type: 'practical',
        title: 'Sayyora o\'lchamlari',
        description: 'Sayyoralarning o\'lchamlari va masofalarini o\'rganish',
        icon: 'Beaker'
      }
    ]
  },
  {
    id: '8',
    title: '3D Inson skeleti',
    description: 'Inson skeletini 3D muhitda batafsil o\'rganing.',
    category: 'Biology',
    tags: ['3D', 'Biology', 'Skeleton', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      }
    ],
    author: mockUsers[2],
    publishedAt: '2023-12-25T11:00:00Z',
    views: 112,
    likes: 9,
    price: 0,
    duration: '30 minutes',
    resources: [
      { label: 'Skeleton Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['Stanford University', 'Oxford University'],
    isFree: true,
    language: 'Uzbek',
    difficulty: 'beginner',
    ageGroup: '12+',
    subject: 'Biology',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Skelet anatomiyasi testi',
        description: 'Inson skeletining tuzilishi haqida test',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'practical',
        title: '3D Skelet tekshiruvi',
        description: 'Skeletning turli qismlarini 3D muhitda tekshirish',
        icon: 'Beaker'
      }
    ]
  },
  {
    id: '9',
    title: 'Kimyoviy reaksiyalar',
    description: 'Turli kimyoviy reaksiyalarni 3D muhitda kuzating.',
    category: 'Chemistry',
    tags: ['3D', 'Chemistry', 'Reactions', 'Interactive'],
    media: [
      {
        id: '1',
        type: 'image',
        src: '/images/atom_bomba.jpg',
      }
    ],
    author: mockUsers[0],
    publishedAt: '2023-12-20T13:00:00Z',
    views: 98,
    likes: 11,
    price: 0,
    duration: '45 minutes',
    resources: [
      { label: 'Chemistry Guide', url: '#', type: 'pdf' }
    ],
    usedBy: ['Harvard University', 'MIT'],
    isNew: true,
    language: 'Uzbek',
    difficulty: 'intermediate',
    ageGroup: '14+',
    subject: 'Chemistry',
    interactiveExercises: [
      {
        id: 'ex1',
        type: 'quiz',
        title: 'Kimyoviy reaksiyalar testi',
        description: 'Kimyoviy reaksiyalar va ularning turlari haqida test',
        icon: 'HelpCircle'
      },
      {
        id: 'ex2',
        type: 'experiment',
        title: 'Virtual kimyoviy tajriba',
        description: 'Turli kimyoviy reaksiyalarni o\'tkazish',
        icon: 'FlaskConical'
      },
      {
        id: 'ex3',
        type: 'simulation',
        title: 'Molekulyar simulyatsiya',
        description: 'Molekulalarning reaksiya jarayonini kuzatish',
        icon: 'Brain'
      }
    ]
  }
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    author: mockUsers[1],
    content: 'This VR chemistry lab has revolutionized how my students understand molecular structures. The 3D visualization makes complex concepts much more accessible.',
    createdAt: '2024-01-20T14:30:00Z',
    likes: 23
  },
  {
    id: 'comment-2',
    author: mockUsers[2],
    content: 'Excellent educational tool! My students are more engaged than ever. The interactive elements really help with retention.',
    createdAt: '2024-01-18T09:15:00Z',
    likes: 18
  },
  {
    id: 'comment-3',
    author: mockUsers[3],
    content: 'The VR experience is incredibly immersive. Students can actually "walk" through molecular structures. Highly recommended for chemistry educators.',
    createdAt: '2024-01-16T16:45:00Z',
    likes: 31
  }
];

// Mock Related Items
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

// Mock Exercises
export const mockExercises: Exercise[] = [
  {
    id: 1,
    title: 'Kimyoviy bog\'lanishlar',
    description: 'Molekulyar strukturalarni o\'rganish uchun mashqlar',
    questions: [
      {
        id: 1,
        question: 'Kovalent bog\'lanish nima?',
        type: 'multiple-choice',
        options: [
          'Atomlar orasidagi elektron almashinuvi',
          'Atomlar orasidagi proton almashinuvi',
          'Atomlar orasidagi neytron almashinuvi',
          'Atomlar orasidagi ion almashinuvi'
        ],
        correctAnswer: 0,
        explanation: 'Kovalent bog\'lanish - bu atomlar orasidagi elektron almashinuvi'
      },
      {
        id: 2,
        question: 'H2O molekulasida kislorod atomi nechta kovalent bog\'lanish hosil qiladi?',
        type: 'multiple-choice',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'H2O molekulasida kislorod atomi 2 ta kovalent bog\'lanish hosil qiladi'
      }
    ],
    timeLimit: 300,
    points: 10,
    difficulty: 'medium'
  },
  {
    id: 2,
    title: 'Molekulyar geometriya',
    description: 'Molekulyar shakllarni aniqlash mashqlari',
    questions: [
      {
        id: 3,
        question: 'CH4 molekulasining geometrik shakli qanday?',
        type: 'multiple-choice',
        options: ['Chiziqli', 'Uchburchak', 'Tetraedr', 'Kvadrat'],
        correctAnswer: 2,
        explanation: 'CH4 molekulasi tetraedr shaklida joylashgan'
      }
    ],
    timeLimit: 180,
    points: 8,
    difficulty: 'easy'
  }
];

// Mock Content for Product Process
export const mockContent: Content[] = [
  {
    id: 'content-1',
    type: 'video',
    title: 'Kimyoviy bog\'lanishlar haqida video',
    description: 'Kimyoviy bog\'lanishlar turlari va ularning xususiyatlari',
    url: '/videos/chemical-bonds.mp4',
    duration: '15 minutes',
    thumbnail: '/images/vr.jpg'
  },
  {
    id: 'content-2',
    type: '3d',
    title: '3D Molekulyar struktura',
    description: 'Molekulyar strukturalarni 3D muhitda o\'rganing',
    model3dUrl: '/models/molecular-structure.glb',
    duration: '20 minutes',
    thumbnail: '/images/atom_bomba.jpg'
  },
  {
    id: 'content-3',
    type: 'exercise',
    title: 'Kimyoviy bog\'lanishlar mashqlari',
    description: 'O\'rganilgan materialni mustahkamlash uchun mashqlar',
    exercises: mockExercises,
    duration: '10 minutes'
  }
];

// Mock Product Process
export const mockProductProcess: ProductProcess[] = [
  {
    id: 'process-1',
    title: 'Kimyoviy bog\'lanishlar kursi',
    description: 'Kimyoviy bog\'lanishlar turlari va ularning xususiyatlarini o\'rganish',
    author: mockUsers[0],
    category: 'Chemistry',
    difficulty: 'intermediate',
    duration: '45 minutes',
    steps: mockContent,
    tags: ['Chemistry', 'Bonds', 'Interactive', '3D'],
    views: 1250,
    likes: 89,
    publishedAt: '2024-01-15T10:30:00Z'
  }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductProcessById = (id: string): ProductProcess | undefined => {
  return mockProductProcess.find(process => process.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getRelatedProducts = (productId: string, limit: number = 4): RelatedItem[] => {
  return mockRelatedItems.filter(item => item.id !== productId).slice(0, limit);
};

export const getCommentsByProductId = (productId: string): Comment[] => {
  return mockComments;
};

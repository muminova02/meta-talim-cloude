// Product Process Mock Data
export interface ProductProcessContent {
  id: number;
  title: string;
  type: 'video' | '3d-animation' | 'presentation';
  duration: number; // seconds
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  thumbnail: string;
  videoUrl?: string;
  model3dUrl?: string;
  embedded3d?: string; // Sketchfab embed code
  texturePath?: string; // Texture fayllar yo'li
  presentationUrl?: string;
  subtitles: Subtitle[];
  chapters: Chapter[];
  exercises: Exercise[];
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Subtitle {
  time: number;
  text: string;
}

export interface Chapter {
  id: number;
  title: string;
  duration: number;
  type: 'video' | '3d-animation' | 'presentation';
  description: string;
  isCompleted: boolean;
}

export interface Exercise {
  id: number;
  title: string;
  type: 'quiz' | 'interactive' | 'assignment';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  questions: Question[];
  timeLimit?: number; // seconds
  points: number;
}

export interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'interactive';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

// Mock Data
const mockProducts: ProductProcessContent[] = [
  {
    id: 1,
    title: "Quyosh sistemasining tuzilishi",
    type: "3d-animation",
    duration: 480, // 8 minutes
    category: "Astronomiya",
    difficulty: "medium",
    description: "Quyosh sistemasining barcha sayyoralari va ularning xususiyatlari haqida to'liq ma'lumot",
    thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
    videoUrl: "/solar_system.mp4",
    model3dUrl: "/models/solar_system_animation.glb",
    subtitles: [
      {
        time: 0,
        text: "Quyosh sistemasiga Quyosh va uning atrofida aylanadigan barcha osmon jismlari kiradi.",
      },
      {
        time: 30,
        text: "Quyosh sistemasida 8 ta asosiy sayyora mavjud: Merkuriy, Venera, Yer, Mars, Yupiter, Saturn, Uran va Neptun.",
      },
      { time: 60, text: "Merkuriy Quyoshga eng yaqin va eng kichik sayyoradir." },
      {
        time: 90,
        text: "Venera Quyoshdan ikkinchi o'rinda joylashgan va Yerga eng yaqin sayyoradir.",
      },
      {
        time: 120,
        text: "Yer Quyoshdan uchinchi o'rinda joylashgan yagona hayot mavjud bo'lgan sayyoradir.",
      },
      {
        time: 150,
        text: "Mars Quyoshdan to'rtinchi o'rinda joylashgan va 'Qizil sayyora' deb ataladi.",
      },
      { time: 180, text: "Yupiter Quyosh sistemasidagi eng katta sayyoradir." },
      {
        time: 210,
        text: "Saturn o'zining halqalari bilan mashhur bo'lgan gaz gigantidir.",
      },
      {
        time: 240,
        text: "Uran va Neptun Quyoshdan eng uzoq joylashgan sayyoralardir va ular ham gaz gigantlari hisoblanadi.",
      },
    ],
    chapters: [
      {
        id: 1,
        title: "Quyosh sistemasiga kirish",
        duration: 60,
        type: "video",
        description: "Quyosh sistema nima va uning tuzilishi",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Ichki sayyoralar",
        duration: 120,
        type: "3d-animation",
        description: "Merkuriy, Venera, Yer va Mars haqida",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Tashqi sayyoralar",
        duration: 180,
        type: "3d-animation",
        description: "Yupiter, Saturn, Uran va Neptun haqida",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Sayyoralar orasidagi masofalar",
        duration: 120,
        type: "presentation",
        description: "Astronomik birliklar va masofalar",
        isCompleted: false,
      },
    ],
    exercises: [
      {
        id: 1,
        title: "Sayyoralarni tanlash",
        type: "interactive",
        difficulty: "easy",
        description: "Quyosh sistemasidagi sayyoralarni to'g'ri tartibda joylashtiring",
        questions: [
          {
            id: 1,
            question: "Quyoshga eng yaqin sayyora qaysi?",
            type: "multiple-choice",
            options: ["Merkuriy", "Venera", "Yer", "Mars"],
            correctAnswer: 0,
            explanation: "Merkuriy Quyoshga eng yaqin sayyoradir",
          },
          {
            id: 2,
            question: "Yer Quyoshdan nechanchi o'rinda joylashgan?",
            type: "multiple-choice",
            options: ["1-o'rin", "2-o'rin", "3-o'rin", "4-o'rin"],
            correctAnswer: 2,
            explanation: "Yer Quyoshdan 3-o'rinda joylashgan",
          },
        ],
        timeLimit: 300, // 5 minutes
        points: 10,
      },
      {
        id: 2,
        title: "Sayyoralar xususiyatlari",
        type: "quiz",
        difficulty: "medium",
        description: "Har bir sayyoraning asosiy xususiyatlarini bilish",
        questions: [
          {
            id: 3,
            question: "Qaysi sayyora 'Qizil sayyora' deb ataladi?",
            type: "multiple-choice",
            options: ["Venera", "Mars", "Yupiter", "Saturn"],
            correctAnswer: 1,
            explanation: "Mars 'Qizil sayyora' deb ataladi",
          },
          {
            id: 4,
            question: "Saturnning halqalari bor",
            type: "true-false",
            correctAnswer: 1, // true
            explanation: "Ha, Saturn o'zining halqalari bilan mashhur",
          },
        ],
        timeLimit: 180, // 3 minutes
        points: 15,
      },
    ],
    instructor: {
      name: "Dr. Ahmad Karimov",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      title: "Astronomiya professori",
    },
    tags: ["Astronomiya", "3D", "Interaktiv", "O'quv"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z",
  },
  {
    id: 2,
    title: "Atom tuzilishi va elektron konfiguratsiyasi",
    type: "video",
    duration: 360, // 6 minutes
    category: "Kimyo",
    difficulty: "hard",
    description: "Atomning ichki tuzilishi, elektronlar va ularning joylashuvi haqida batafsil",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    // YouTube'dan video qo'yish ham mumkin:
    videoUrl: "https://www.youtube.com/watch?v=7WhRJV_bAiE",
    embedded3d: "https://sketchfab.com/models/2374c548368846be8db883a124b492a3/embed?autostart=1&preload=1",
    subtitles: [
      {
        time: 0,
        text: "Atom - moddaning eng kichik qismi bo'lib, kimyoviy reaksiyalarda o'zgarishsiz qoladi.",
      },
      {
        time: 30,
        text: "Atom yadro va elektronlardan iborat. Yadro proton va neytronlardan tashkil topgan.",
      },
      {
        time: 60,
        text: "Elektronlar yadro atrofida ma'lum orbitallarda aylanadi.",
      },
      {
        time: 90,
        text: "Har bir orbitalda maksimal 2 ta elektron bo'lishi mumkin.",
      },
    ],
    chapters: [
      {
        id: 1,
        title: "Atom tuzilishi",
        duration: 120,
        type: "video",
        description: "Atomning asosiy komponentlari",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Elektron konfiguratsiyasi",
        duration: 180,
        type: "presentation",
        description: "Elektronlarning orbitalda joylashuvi",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Periodik jadval",
        duration: 60,
        type: "video",
        description: "Elementlarning periodik jadvaldagi joylashuvi",
        isCompleted: false,
      },
    ],
    exercises: [
      {
        id: 3,
        title: "Atom tuzilishi testi",
        type: "quiz",
        difficulty: "hard",
        description: "Atom tuzilishi haqidagi bilimlarni tekshirish",
        questions: [
          {
            id: 5,
            question: "Atom yadrosida qanday zarralar joylashgan?",
            type: "multiple-choice",
            options: ["Faqat protonlar", "Faqat neytronlar", "Proton va neytronlar", "Faqat elektronlar"],
            correctAnswer: 2,
            explanation: "Atom yadrosida proton va neytronlar joylashgan",
          },
        ],
        timeLimit: 240,
        points: 20,
      },
    ],
    instructor: {
      name: "Prof. Malika Toshmatova",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      title: "Kimyo professori",
    },
    tags: ["Kimyo", "Atom", "Elektron", "O'quv"],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z",
  },
  {
    id: 3,
    title: "Dinozavrlar davri va ularning evolyutsiyasi",
    type: "3d-animation",
    duration: 600, // 10 minutes
    category: "Biologiya",
    difficulty: "medium",
    description: "Dinozavrlar davri, ularning turlari va evolyutsiya jarayoni",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=Q5z5C1MFmT8",
    embedded3d: "https://sketchfab.com/models/5bbcadb7d9274843abb5ada35767dba1/embed?autostart=1&preload=1",
    subtitles: [
      {
        time: 0,
        text: "Dinozavrlar 230 million yil oldin paydo bo'lgan va 65 million yil oldin yo'qolgan.",
      },
      {
        time: 60,
        text: "Dinozavrlar ikki asosiy guruhga bo'linadi: Saurischia va Ornithischia.",
      },
      {
        time: 120,
        text: "Tyrannosaurus Rex eng mashhur yirtqich dinozavr hisoblanadi.",
      },
    ],
    chapters: [
      {
        id: 1,
        title: "Dinozavrlar davri",
        duration: 180,
        type: "3d-animation",
        description: "Dinozavrlar davri haqida umumiy ma'lumot",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Dinozavr turlari",
        duration: 240,
        type: "3d-animation",
        description: "Turli dinozavr turlari va ularning xususiyatlari",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Yo'qolish sabablari",
        duration: 180,
        type: "presentation",
        description: "Dinozavrlarning yo'qolish sabablari",
        isCompleted: false,
      },
    ],
    exercises: [
      {
        id: 4,
        title: "Dinozavr turlarini tanlash",
        type: "interactive",
        difficulty: "medium",
        description: "Dinozavr turlarini to'g'ri tasniflash",
        questions: [
          {
            id: 6,
            question: "Qaysi dinozavr eng katta yirtqich hisoblanadi?",
            type: "multiple-choice",
            options: ["Triceratops", "Tyrannosaurus Rex", "Stegosaurus", "Brachiosaurus"],
            correctAnswer: 1,
            explanation: "Tyrannosaurus Rex eng katta yirtqich dinozavr edi",
          },
        ],
        timeLimit: 300,
        points: 15,
      },
    ],
    instructor: {
      name: "Dr. Botir Rahimov",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      title: "Paleontologiya professori",
    },
    tags: ["Biologiya", "Dinozavr", "Evolyutsiya", "3D"],
    createdAt: "2024-01-05T14:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z",
  },
];

// API-like functions
export const getProductProcessById = (id: number): ProductProcessContent | null => {
  const product = mockProducts.find(p => p.id === id);
  return product || null;
};

export const getAllProductProcess = (): ProductProcessContent[] => {
  return mockProducts;
};

export const getProductProcessByCategory = (category: string): ProductProcessContent[] => {
  return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const getProductProcessByDifficulty = (difficulty: string): ProductProcessContent[] => {
  return mockProducts.filter(p => p.difficulty === difficulty);
};

export const searchProductProcess = (query: string): ProductProcessContent[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(p => 
    p.title.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Exercise functions
export const getExercisesByProductId = (productId: number): Exercise[] => {
  const product = getProductProcessById(productId);
  return product ? product.exercises : [];
};

export const getExerciseById = (productId: number, exerciseId: number): Exercise | null => {
  const exercises = getExercisesByProductId(productId);
  return exercises.find(e => e.id === exerciseId) || null;
};

// Chapter functions
export const getChaptersByProductId = (productId: number): Chapter[] => {
  const product = getProductProcessById(productId);
  return product ? product.chapters : [];
};

export const getChapterById = (productId: number, chapterId: number): Chapter | null => {
  const chapters = getChaptersByProductId(productId);
  return chapters.find(c => c.id === chapterId) || null;
};

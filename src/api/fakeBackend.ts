import { mockComments } from "@/data/mockProduct";
import { getAllProductProcess, getProductProcessById } from "@/data/mockProductProcess";

type ProductDto = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  thumbnail?: string | null;
  video_url?: string | null;
  model_3d_url?: string | null;
  embedded_3d?: string | null;
  views?: number;
  likes?: number;
  language?: string;
  created_at: string;
};

type ProductResourceDto = {
  id: number;
  product_id: number;
  label: string;
  url: string;
  type: string;
  is_download?: boolean;
};

type ProductDetailDto = ProductDto & {
  resources: ProductResourceDto[];
};

type ProductProcessDto = ProductDto & {
  chapters: Array<{ id: number; title: string; type: string; is_completed: boolean }>;
  exercises: Array<{
    id: number;
    type: string;
    title: string;
    questions: Array<{
      id: number;
      question: string;
      options?: string | null;
      correct_answer: string;
    }>;
  }>;
  subtitles: Array<{ id: number; time: number; text: string }>;
};

type CommentDto = {
  id: number;
  product_id: number;
  user_id: number;
  text: string;
  created_at: string;
};

type CreateCommentPayload = {
  user_id: number;
  text: string;
};

type AuthUserDto = {
  id: number;
  full_name?: string | null;
  email?: string | null;
  is_verified: boolean;
  created_at: string;
  role?: string | null;
};

type AuthResponseDto = {
  access_token: string;
  token_type: "bearer";
  user: AuthUserDto;
};

type SignupRequestDto = {
  full_name: string;
  email: string;
  password: string;
};
type LoginRequestDto = { email: string; password: string };
type VerifyCodeRequestDto = { email: string; code: string };
type ResendCodeRequestDto = { email: string };
type GoogleSigninRequestDto = { id_token: string };

const wait = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

function mapProcessToProductDto(p: ReturnType<typeof getAllProductProcess>[number]): ProductDto {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    difficulty: p.difficulty,
    duration: p.duration,
    thumbnail: p.thumbnail ?? null,
    video_url: p.videoUrl ?? null,
    model_3d_url: p.model3dUrl ?? null,
    embedded_3d: p.embedded3d ?? null,
    views: 0,
    likes: 0,
    language: "UZB",
    created_at: p.createdAt,
  };
}

function makeResources(productId: number): ProductResourceDto[] {
  const p = getProductProcessById(productId);
  if (!p) return [];
  const resources: ProductResourceDto[] = [];
  let rid = 1;
  if (p.videoUrl) {
    resources.push({
      id: rid++,
      product_id: productId,
      label: "Video material",
      url: p.videoUrl,
      type: "video",
      is_download: false,
    });
  }
  if (p.model3dUrl) {
    resources.push({
      id: rid++,
      product_id: productId,
      label: "3D model",
      url: p.model3dUrl,
      type: "3d",
      is_download: false,
    });
  }
  if (p.embedded3d) {
    resources.push({
      id: rid++,
      product_id: productId,
      label: "3D embed",
      url: p.embedded3d,
      type: "3d",
      is_download: false,
    });
  }
  return resources;
}

const commentStore: Record<number, CommentDto[]> = {
  1: mockComments.map((c, idx) => ({
    id: idx + 1,
    product_id: 1,
    user_id: 1,
    text: c.content,
    created_at: c.createdAt,
  })),
};

const fakeUsers: Array<{
  id: number;
  full_name: string;
  email: string;
  password: string;
  is_verified: boolean;
  created_at: string;
  role: string;
}> = [];
const verificationCodes = new Map<string, string>();

export async function fakeFetchProducts(): Promise<ProductDto[]> {
  await wait();
  return getAllProductProcess().map(mapProcessToProductDto);
}

export async function fakeFetchProductById(
  id: string | number,
): Promise<ProductDetailDto> {
  await wait();
  const p = getProductProcessById(Number(id));
  if (!p) throw new Error("Product not found");
  return {
    ...mapProcessToProductDto(p),
    resources: makeResources(Number(id)),
  };
}

export async function fakeFetchProductProcess(
  id: string | number,
): Promise<ProductProcessDto> {
  await wait();
  const p = getProductProcessById(Number(id));
  if (!p) throw new Error("Product process not found");
  return {
    ...mapProcessToProductDto(p),
    chapters: p.chapters.map((c) => ({
      id: c.id,
      title: c.title,
      type: c.type,
      is_completed: c.isCompleted,
    })),
    exercises: p.exercises.map((e) => ({
      id: e.id,
      type: e.type,
      title: e.title,
      questions: e.questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options ? JSON.stringify(q.options) : null,
        correct_answer: String(q.correctAnswer),
      })),
    })),
    subtitles: p.subtitles.map((s, idx) => ({
      id: idx + 1,
      time: s.time,
      text: s.text,
    })),
  };
}

export async function fakeFetchComments(
  productId: string | number,
): Promise<CommentDto[]> {
  await wait(120);
  return [...(commentStore[Number(productId)] ?? [])];
}

export async function fakeCreateComment(
  productId: string | number,
  payload: CreateCommentPayload,
): Promise<CommentDto> {
  await wait(120);
  const pid = Number(productId);
  const nextId = (commentStore[pid]?.[commentStore[pid].length - 1]?.id ?? 0) + 1;
  const item: CommentDto = {
    id: nextId,
    product_id: pid,
    user_id: payload.user_id,
    text: payload.text,
    created_at: new Date().toISOString(),
  };
  if (!commentStore[pid]) commentStore[pid] = [];
  commentStore[pid].push(item);
  return item;
}

export async function fakeFetchProductResources(
  productId: string | number,
): Promise<ProductResourceDto[]> {
  await wait(100);
  return makeResources(Number(productId));
}

export async function fakeSignup(
  dto: SignupRequestDto,
): Promise<{ message: string }> {
  await wait();
  if (fakeUsers.some((u) => u.email.toLowerCase() === dto.email.toLowerCase())) {
    throw new Error("User already exists for this email");
  }
  const userId = fakeUsers.length + 1;
  fakeUsers.push({
    id: userId,
    full_name: dto.full_name,
    email: dto.email,
    password: dto.password,
    is_verified: false,
    created_at: new Date().toISOString(),
    role: "student",
  });
  verificationCodes.set(dto.email.toLowerCase(), "123456");
  return { message: "Verification code sent (fake: 123456)" };
}

export async function fakeLogin(dto: LoginRequestDto): Promise<AuthResponseDto> {
  await wait();
  const user = fakeUsers.find((u) => u.email.toLowerCase() === dto.email.toLowerCase());
  if (!user || user.password !== dto.password) {
    throw new Error("Invalid email or password");
  }
  if (!user.is_verified) {
    throw new Error("Email is not verified");
  }
  return {
    access_token: `fake-token-${user.id}`,
    token_type: "bearer",
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      is_verified: user.is_verified,
      created_at: user.created_at,
      role: user.role,
    },
  };
}

export async function fakeVerifyCode(
  dto: VerifyCodeRequestDto,
): Promise<AuthResponseDto> {
  await wait();
  const user = fakeUsers.find((u) => u.email.toLowerCase() === dto.email.toLowerCase());
  if (!user) throw new Error("Invalid email or code");
  const code = verificationCodes.get(dto.email.toLowerCase());
  if (!code || dto.code !== code) {
    throw new Error("Invalid verification code");
  }
  user.is_verified = true;
  return {
    access_token: `fake-token-${user.id}`,
    token_type: "bearer",
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      is_verified: user.is_verified,
      created_at: user.created_at,
      role: user.role,
    },
  };
}

export async function fakeResendCode(
  dto: ResendCodeRequestDto,
): Promise<{ message: string }> {
  await wait(120);
  if (!fakeUsers.some((u) => u.email.toLowerCase() === dto.email.toLowerCase())) {
    throw new Error("User not found");
  }
  verificationCodes.set(dto.email.toLowerCase(), "123456");
  return { message: "Verification code resent (fake: 123456)" };
}

export async function fakeGoogleSignIn(
  _dto: GoogleSigninRequestDto,
): Promise<AuthResponseDto> {
  await wait();
  let user = fakeUsers.find((u) => u.email === "google.demo@metatalim.local");
  if (!user) {
    user = {
      id: fakeUsers.length + 1,
      full_name: "Google Demo User",
      email: "google.demo@metatalim.local",
      password: "",
      is_verified: true,
      created_at: new Date().toISOString(),
      role: "student",
    };
    fakeUsers.push(user);
  }
  return {
    access_token: `fake-google-token-${user.id}`,
    token_type: "bearer",
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      is_verified: true,
      created_at: user.created_at,
      role: user.role,
    },
  };
}


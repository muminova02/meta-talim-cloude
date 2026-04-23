import { apiPost, shouldUseFakeApi } from "./http";
import {
  fakeGoogleSignIn,
  fakeLogin,
  fakeResendCode,
  fakeSignup,
  fakeVerifyCode,
} from "./fakeBackend";

export interface AuthUserDto {
  id: number;
  full_name?: string | null;
  email?: string | null;
  is_verified: boolean;
  created_at: string;
  role?: string | null;
}

export interface AuthResponseDto {
  access_token: string;
  token_type: "bearer";
  user: AuthUserDto;
}

export interface SignupRequestDto {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface VerifyCodeRequestDto {
  email: string;
  code: string;
}

export interface ResendCodeRequestDto {
  email: string;
}

export interface GoogleSigninRequestDto {
  id_token: string;
}

export async function signup(dto: SignupRequestDto): Promise<{ message: string }> {
  try {
    return await apiPost<{ message: string }, SignupRequestDto>("/auth/signup", dto);
  } catch (error) {
    if (shouldUseFakeApi(error)) return fakeSignup(dto);
    throw error;
  }
}

export async function login(dto: LoginRequestDto): Promise<AuthResponseDto> {
  try {
    return await apiPost<AuthResponseDto, LoginRequestDto>("/auth/login", dto);
  } catch (error) {
    if (shouldUseFakeApi(error)) return fakeLogin(dto);
    throw error;
  }
}

export async function verifyCode(
  dto: VerifyCodeRequestDto,
): Promise<AuthResponseDto> {
  try {
    return await apiPost<AuthResponseDto, VerifyCodeRequestDto>("/auth/verify-code", dto);
  } catch (error) {
    if (shouldUseFakeApi(error)) return fakeVerifyCode(dto);
    throw error;
  }
}

export async function resendCode(
  dto: ResendCodeRequestDto,
): Promise<{ message: string }> {
  try {
    return await apiPost<{ message: string }, ResendCodeRequestDto>(
      "/auth/resend-code",
      dto,
    );
  } catch (error) {
    if (shouldUseFakeApi(error)) return fakeResendCode(dto);
    throw error;
  }
}

export async function googleSignIn(dto: GoogleSigninRequestDto): Promise<AuthResponseDto> {
  try {
    return await apiPost<AuthResponseDto, GoogleSigninRequestDto>("/auth/google", dto);
  } catch (error) {
    if (shouldUseFakeApi(error)) return fakeGoogleSignIn(dto);
    throw error;
  }
}


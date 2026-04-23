import { apiGet, apiPost, shouldUseFakeApi } from "./http";
import { fakeCreateComment, fakeFetchComments } from "./fakeBackend";

export interface CommentDto {
  id: number;
  product_id: number;
  user_id: number;
  text: string;
  created_at: string;
}

export interface CreateCommentPayload {
  user_id: number;
  text: string;
}

export async function fetchComments(
  productId: string | number,
): Promise<CommentDto[]> {
  try {
    return await apiGet<CommentDto[]>(`/products/${productId}/comments`);
  } catch (error) {
    if (shouldUseFakeApi(error)) {
      return fakeFetchComments(productId);
    }
    throw error;
  }
}

export async function createComment(
  productId: string | number,
  payload: CreateCommentPayload,
): Promise<CommentDto> {
  try {
    return await apiPost<CommentDto, CreateCommentPayload>(
      `/products/${productId}/comments`,
      payload,
    );
  } catch (error) {
    if (shouldUseFakeApi(error)) {
      return fakeCreateComment(productId, payload);
    }
    throw error;
  }
}


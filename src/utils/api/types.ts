import { Post } from 'types/posts';

export type RegisterRequest = {
  client_id: string;
  email: string;
  name: string;
};

export type RegisterResponse = {
  meta: { request_id: string };
  data: {
    sl_token: string;
    client_id: string;
    email: string;
  };
};

export type RegisterError = {
  meta: {
    request_id: string;
  };
  error: {
    code: string;
    message: string;
  };
};

export type GetPostsRequest = {
  sl_token: string;
  page: number;
};

export type GetPostsResponse = {
  meta: { request_id: string };
  data: {
    page: number;
    posts: Post[];
  };
};

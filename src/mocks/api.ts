import { GetPostsResponse, RegisterResponse } from 'utils/api/types';

import mockGetPostsResponses from './posts';

export const mockRegister = async (
  credentials: { name: string; email: string }
): Promise<RegisterResponse> => new Promise(
  resolve => {
    setTimeout(() => resolve({
      meta: { request_id: 'mock_request_id' },
      data: {
        sl_token: 'mock_sl_token',
        client_id: 'client_0',
        email: credentials.email
      }
    }), 1000);
  }
);

export const mockGetPosts = async (page = 2): Promise<GetPostsResponse> => new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({
          meta: { request_id: 'mock_request_id' },
          data: {
            posts: mockGetPostsResponses[page - 1].data.posts,
            page
          }
        });
      } catch {
        reject(new Error('failed to fetch posts'));
      }
    }, 1000);
  }
);

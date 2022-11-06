import axios, { AxiosResponse } from 'axios';
import {
  GetPostsRequest, GetPostsResponse, RegisterRequest, RegisterResponse
} from './types';

export const baseUrl = 'https://api.supermetrics.com/assignment';
export const clientId = 'ju16a6m81mhid5ue1z3v2g0uh';

const registerUrl = `${ baseUrl }/register`;
const getPostsUrl = `${ baseUrl }/posts`;

const register = (credentials: { name: string; email: string }): Promise<RegisterResponse> => axios
  .post<RegisterRequest, AxiosResponse<RegisterResponse>>(registerUrl, {
  client_id: clientId,
  email: credentials.email,
  name: credentials.name
})
  .then(response => response.data)
  .catch(reason => {
    console.error('failed registering');
    throw reason;
  });

const getPosts = (params: GetPostsRequest): Promise<GetPostsResponse> => axios
  .get<GetPostsRequest, AxiosResponse<GetPostsResponse>>(getPostsUrl, { params })
  .then(response => response.data)
  .catch(reason => {
    console.error('failed getting posts');
    throw reason;
  });

export { register, getPosts };

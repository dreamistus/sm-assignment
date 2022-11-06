import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { Post, Sender } from 'types/posts';
import { getPosts } from 'utils/api';
import { GetPostsResponse } from 'utils/api/types';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export const fetchPosts = createAsyncThunk<GetPostsResponse, number, { state: RootState }>(
  'posts/fetchPosts',
  async (page, thunkAPI): Promise<GetPostsResponse> => {
    const { auth: { sl_token: token } } = thunkAPI.getState();

    if (!token) {
      throw new Error('invalid token');
    }

    return getPosts({ sl_token: token ?? '', page });
  }

);

const initialState: PostsState = {
  posts: [],
  loading: false,
  isError: false,
  errorMessage: null
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    flushPosts: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.posts = data.posts;
      })
      .addCase(fetchPosts.rejected, (_, payload) => (
        { ...initialState, isError: true, errorMessage: payload?.error?.message ?? '' }
      ));
  }
});

export const { flushPosts } = postsSlice.actions;

export const selectPosts = ({ posts }: RootState): PostsState => posts;
export const selectSenders = ({ posts: { posts } }: RootState): Sender[] => {
  const uniqueSenderIds = new Map<string, number>();

  return posts
    .map(({ from_id: id, from_name: name }) => ({ id, name }))
    .filter(({ id }) => {
      const postsCount = uniqueSenderIds.get(id);
      if (postsCount !== undefined) {
        uniqueSenderIds.set(id, postsCount + 1);

        return false;
      }

      uniqueSenderIds.set(id, 1);

      return true;
    })
    .map(sender => ({ ...sender, postsCount: uniqueSenderIds.get(sender.id) ?? 0 }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export default postsSlice.reducer;

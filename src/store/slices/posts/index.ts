import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { Post } from 'types/posts';
import { getPosts } from 'utils/api';
import { GetPostsResponse } from 'utils/api/types';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  isError: boolean;
  errorMessage: string | null;
  isDescending: boolean;
  textFilter?: string;
  senderFilter?: string;
  selectedSenderId?: string;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  isError: false,
  isDescending: false,
  errorMessage: null
};

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

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    flushPosts: () => initialState,
    setTextFilter: (state, { payload }) => {
      state.textFilter = payload;
    },
    setSenderFilter: (state, { payload }) => {
      state.senderFilter = payload;
    },
    toggleIsDescending: state => {
      state.isDescending = !state.isDescending;
    },
    setSelectedSenderId: (state, { payload }) => {
      state.selectedSenderId = payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.isError = false;
        state.senderFilter = undefined;
        state.textFilter = undefined;
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

type PostsLoadingState = Pick<PostsState, 'loading' | 'isError' | 'errorMessage'>;
export const selectLoadingState = ({ posts: { loading, isError, errorMessage } }: RootState): PostsLoadingState => (
  { loading, isError, errorMessage });
export const selectIsDescending = ({ posts: { isDescending } }: RootState): boolean => isDescending;

const selectPosts = ({ posts: { posts } }: RootState): Post[] => posts;
const selectSelectedSenderId = ({ posts: { selectedSenderId } }: RootState): string | undefined => selectedSenderId;
const selectTextFilter = ({ posts: { textFilter } }: RootState): string | undefined => textFilter;
const selectSenderFilter = ({ posts: { senderFilter } }: RootState): string | undefined => senderFilter;

// filtering by sender dramatically limits the number of operations in dependent selectors
// so do it first and memoize the result
const selectFilteredBySenderPosts = createSelector(
  selectPosts,
  selectSelectedSenderId,
  (posts, selectedSenderId) => {
    if (!selectedSenderId) {
      return posts;
    }

    return posts.filter(post => post.from_id === selectedSenderId);
  }
);

// sorted posts are memoized so that filtering by text does not re-trigger sorting
const selectSortedPosts = createSelector(
  selectFilteredBySenderPosts,
  selectIsDescending,
  (posts, isDescending) => posts.slice()
    .sort(
      (a, b) => (isDescending ? 1 : -1) * (new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
    )
);

// finally filter posts by text
const selectFilteredByTextPosts = createSelector(
  selectSortedPosts,
  selectTextFilter,
  (sortedPosts, textFilter) => {
    if (!textFilter) {
      return sortedPosts;
    }

    const filterUppercased = textFilter.toLocaleUpperCase();

    return sortedPosts.filter(post => post.message.toUpperCase().includes(filterUppercased));
  }
);

export const selectSenders = createSelector(selectPosts, posts => {
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
});

export const selectFilteredSenders = createSelector(
  selectSenders,
  selectSenderFilter,
  (senders, senderFilter) => {
    if (!senderFilter) {
      return senders;
    }

    const senderFilterUppercased = senderFilter.toUpperCase();

    return senders
      .filter(sender => sender.name.toUpperCase().includes(senderFilterUppercased));
  }
);

export const selectFilteredPosts = selectFilteredByTextPosts;
export const {
  flushPosts,
  setSenderFilter,
  setTextFilter,
  toggleIsDescending,
  setSelectedSenderId
} = postsSlice.actions;
export default postsSlice.reducer;

/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback,
  useEffect
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchPosts,
  selectFilteredPosts,
  selectFilteredSenders,
  selectIsDescending,
  selectLoadingState,
  setSelectedSenderId,
  setSenderFilter,
  setTextFilter,
  toggleIsDescending
} from 'store/slices/posts';
import Posts from 'components/PostsPage/Posts';
import Senders from 'components/PostsPage/Senders';
import Loader from 'components/Loader';

import styles from './PostsPage.module.scss';

const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    isError,
    errorMessage
  } = useAppSelector(selectLoadingState);
  const isDescending = useAppSelector(selectIsDescending);
  const filteredSenders = useAppSelector(selectFilteredSenders);
  const filteredPosts = useAppSelector(selectFilteredPosts);

  const { senderId: selectedSenderId, page } = useParams();
  const navigate = useNavigate();

  const pageNum = parseInt(page ?? '', 10);

  const handleIsDescendingToggled = useCallback(() => dispatch(toggleIsDescending()), [dispatch]);
  const handleSenderNameFilterChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSenderFilter(event.target.value));
  }, [dispatch]);
  const handlePostFilterChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTextFilter(event.target.value));
  }, [dispatch]);
  const handlePageNumberChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      navigate(`/posts/${ event.target.value }`);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(setSelectedSenderId(selectedSenderId));
  }, [
    dispatch,
    selectedSenderId
  ]);

  useEffect(() => {
    dispatch(fetchPosts(pageNum));
  }, [
    dispatch,
    pageNum
  ]);

  const errorOrComponent = isError ? <div>{ `Error: ${ errorMessage }` }</div> : (
    <>
      <Senders
        senders={ filteredSenders }
        selectedSenderId={ selectedSenderId }
        page={ page }
        handleSenderNameFilterChanged={ handleSenderNameFilterChanged }
      />
      <Posts
        posts={ filteredPosts }
        isDescending={ isDescending }
        page={ pageNum }
        onPostsFilterChanged={ handlePostFilterChanged }
        onIsDescendingToggled={ handleIsDescendingToggled }
        onPageNumberChanged={ handlePageNumberChanged }
      />
    </>
  );

  return (
    <main className={ styles.page }>
      { loading ? <Loader /> : errorOrComponent }
    </main>
  );
};

export default React.memo(PostsPage);

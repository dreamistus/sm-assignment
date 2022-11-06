/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchPosts, selectPosts, selectSenders } from 'store/slices/posts';
import Posts from 'components/PostsPage/Posts';
import Senders from 'components/PostsPage/Senders';
import Loader from 'components/Loader';

import styles from './PostsPage.module.scss';

const PostsPage: React.FC = () => {
  const {
    posts,
    loading,
    isError,
    errorMessage
  } = useAppSelector(selectPosts);
  const senders = useAppSelector(selectSenders);
  const dispatch = useAppDispatch();
  const { senderId: selectedSenderId, page } = useParams();
  const navigate = useNavigate();

  const [senderFilter, setSenderFilter] = useState<string>();
  const [postFilter, setPostFilter] = useState<string>();
  const [isDescending, setIsDescending] = useState(false);

  const pageNum = parseInt(page ?? '', 10);

  const handleIsDescendingToggled = useCallback(() => setIsDescending(prevState => !prevState), []);
  const handlePageNumberChanged = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      navigate(`/posts/${ event.target.value }`);
    },
    [navigate]
  );
  const handleSenderNameFilterChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSenderFilter(event.target.value);
  }, []);
  const handlePostFilterChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPostFilter(event.target.value);
  }, []);

  const filteredPosts = useMemo(
    () => {
      const filteredBySender = selectedSenderId ? posts.filter(post => post.from_id === selectedSenderId) : posts;

      const filteredByText = postFilter
        ? filteredBySender.filter(post => post.message.toUpperCase().includes(postFilter.toLocaleUpperCase()))
        : filteredBySender;

      return filteredByText.slice().sort(
        (a, b) => (isDescending ? 1 : -1) * (new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
      );
    },
    [isDescending, postFilter, posts, selectedSenderId]
  );

  const filteredSenders = useMemo(
    () => (senderFilter
      ? senders.filter(sender => sender.name.toUpperCase().includes(senderFilter.toUpperCase()))
      : senders),
    [senderFilter, senders]
  );

  useEffect(() => {
    dispatch(fetchPosts(pageNum));
  }, [dispatch, pageNum]);

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

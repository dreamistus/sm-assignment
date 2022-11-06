import { useAppSelector } from 'store';
import { AuthState, selectAuth } from 'store/slices/auth';

const useAuth = (): AuthState => useAppSelector(selectAuth);

export default useAuth;

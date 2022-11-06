import { useEffect, useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import styles from './ErrorPage.module.scss';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  const [status, setStatus] = useState<number>();
  const [message, setMessage] = useState('');

  console.error(error);

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setStatus(error.status);
      setMessage(error.statusText);
    }
    if (error instanceof Error) {
      setMessage(`${ error.name }: ${ error.message }`);
    }
    if (typeof error === 'string') {
      setMessage(error);
    }
  }, [error]);

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.error }>
        { status && <div className={ styles.error__code }>{ status }</div> }
        <div className={ styles.error__message }>{ message }</div>
      </div>
    </div>
  );
};

export default ErrorPage;



'use client';

type Props = {
    error: Error;
    reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Loading, please wait...</h2>
          <p>{error.message}</p>
          <button onClick={reset}>Retry</button>
    </div>
  );
}

export default Error;

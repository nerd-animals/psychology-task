import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sleep } from '../lib/utils';

export default function task() {
  const [displayedValue, setDisplayedValue] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const test = async () => {
      console.log(displayedValue);
      await sleep(5000);
      setDisplayedValue(undefined);
      console.log('hi');
    };

    test();
  }, []);

  return (
    <>
      <div>this is task page</div>
      <Link to="/pre-task">end</Link>
    </>
  );
}

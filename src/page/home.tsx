import { Link } from 'react-router-dom';

export default function home() {
  return (
    <>
      <div>this is home</div>
      <Link to="/pre-task">start</Link>
      <Link to="/setting">setting</Link>
    </>
  );
}

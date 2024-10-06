import { Link } from 'react-router-dom';

export default function preTask() {
  return (
    <>
      <div>this is pre-task page</div>
      <Link to="/task">do Task</Link>
    </>
  );
}

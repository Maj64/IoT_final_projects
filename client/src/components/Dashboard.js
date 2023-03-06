// import { hasPermission } from '../services/userService';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

const Dashboard = ({ user }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch({ type: 'LOGOUT'})
    history.push('/')
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleClick}>logout</button>
      {/* {hasPermission(user.role, ['admin']) && (
        <Link to="/users">Manage Users</Link>
      )} */}
    </div>
  );
};

export default Dashboard
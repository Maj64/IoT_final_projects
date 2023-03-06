// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// function Dashboard() {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   // Redirect to login page if user is not authenticated
//   if (!isAuthenticated) {
//     return <Redirect to="/login" />;
//   }

//   // Check if user has admin role
//   const isAdmin = user.roles.includes('admin');

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {isAdmin && <h2>Admin statistics here</h2>}
//       <h2>Statistics about Sensors here</h2>
//     </div>
//   );
// }

// export default Dashboard;

import React from 'react';
// import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = () => {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAuthenticated = true
  const isLoading = false

  if (isLoading) {
    // Render a loading spinner or message while the authentication status is being checked
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Home;


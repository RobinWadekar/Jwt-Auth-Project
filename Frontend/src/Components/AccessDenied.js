import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <h2>Access Denied</h2>
      <p>You don’t have permission to view this page.</p>

      <Link to="/" className="home-btn">
        Go back home
      </Link>
    </div>
  );
};

export default AccessDenied;

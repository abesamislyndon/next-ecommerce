import { useEffect } from "react";
import withAuth from "../../hooks/withAuth";

const  DashboardPage = () => {

  const { user, handleLogout, checkAuthentication } = useAuth();

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          {user && <a className="navbar-brand">Hello ! {user.name}</a>}
          <li>
            <a className="dropdown-item btn" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default withAuth(DashboardPage);
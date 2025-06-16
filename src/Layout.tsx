import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
    <nav className="navbar">
  <ul>
    <li><Link to="/">Start</Link></li>
    <li><Link to="/animals">Djur</Link></li>
  </ul>
</nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">CareerViewX</h2>

      <nav>
        <a className="active">Dashboard</a>
        <a>My Career</a>
        <a>Guidance</a>
        <a>Profile</a>
        <a>Settings</a>
      </nav>
    </aside>
  );
};

export default Sidebar;

function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>코인 트래커</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;

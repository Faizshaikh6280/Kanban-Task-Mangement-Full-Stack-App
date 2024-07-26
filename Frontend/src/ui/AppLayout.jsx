import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

function AppLayout() {
  return (
    <div
      className="app-layout"
      onClick={(e) => {
        console.log(e);
        e.target.parentNode.classList.toggle('menu');
      }}
    >
      <Sidebar />
      <Header />
      <main className="main">
        main
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

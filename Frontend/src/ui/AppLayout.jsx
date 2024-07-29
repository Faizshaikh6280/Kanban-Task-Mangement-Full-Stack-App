import { Outlet, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useBoard } from '../hooks/api/useBoard';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <Header />
      <main className="main bg-custom-bg-main text-custom-text-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

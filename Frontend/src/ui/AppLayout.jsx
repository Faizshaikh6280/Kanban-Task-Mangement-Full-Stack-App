import { Outlet, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import CurrentBoardProvider from '../contexts/CurretBoardContext';

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <CurrentBoardProvider>
        <Header />
        <main className="main bg-custom-bg-main text-custom-text-2">
          <Outlet />
        </main>
      </CurrentBoardProvider>
    </div>
  );
}

export default AppLayout;

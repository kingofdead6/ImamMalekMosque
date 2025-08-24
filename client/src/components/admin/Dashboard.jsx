import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

export default function Dashboard() {
  const role = localStorage.getItem('role') || '';

  return (
    <div className="flex min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300">
      <Sidebar role={role} />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
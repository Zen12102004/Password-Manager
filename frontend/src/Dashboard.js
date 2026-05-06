import React, { useState } from 'react';
import PasswordList from './PasswordList';
import AddPassword from './AddPassword';

const Dashboard = () => {
  const [view, setView] = useState('list'); // 'list' or 'add'

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  
  return (
    <div className="dashboard-container">
      <nav className="dashboard-menu">
        <button onClick={() => setView('list')}>View Passwords</button>
        <button onClick={() => setView('add')}>Add New Password</button>
        <button onClick={handleLogout} className="exit-btn">Exit</button>
      </nav>

      <main className="content">
        {view === 'list' ? <PasswordList /> : <AddPassword setView={setView} />}
      </main>
    </div>
  );
};

export default Dashboard;
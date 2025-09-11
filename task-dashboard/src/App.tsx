import { useState } from 'react';
import './App.css';
import { DashboardRender } from './presenters/dashboardPresenter';

function App() {
  return (
    <div className="min-h-screen bg-background text-primary p-4">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <DashboardRender />
    </div>
  );
}

export default App;

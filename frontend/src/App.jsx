import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ApplyLeavePage from './pages/ApplyLeavePage';
import MyLeavesPage from './pages/MyLeavesPage';
import { useAuth } from './context/AuthContext';

const HRPanel = lazy(() => import('./pages/HRPanel'));

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/apply" element={
          <ProtectedRoute>
            <ApplyLeavePage />
          </ProtectedRoute>
        } />
        <Route path="/my-leaves" element={
          <ProtectedRoute>
            <MyLeavesPage />
          </ProtectedRoute>
        } />
        <Route path="/hr" element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading HR Panel...</div>}>
              <HRPanel />
            </Suspense>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

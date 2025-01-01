import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { useAuthStore } from './store/auth';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ImportCards from './pages/ImportCards';
import Rules from './pages/Rules';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="import" element={<ImportCards />} />
            <Route path="rules" element={<Rules />} />
            <Route path="history" element={<History />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
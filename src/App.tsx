import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PublicSite from './PublicSite';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import DashboardHome from './admin/DashboardHome';
import ProductList from './admin/ProductList';
import ProductForm from './admin/ProductForm';
import ArrivalsManagement from './admin/ArrivalsManagement';
import GalleryManagement from './admin/GalleryManagement';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  
  if (loading) return null;
  if (!isAdmin) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicSite />} />
          <Route path="/login" element={<AdminLogin />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="arrivals" element={<ArrivalsManagement />} />
            <Route path="categories" element={<div className="p-12 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">Taxonomy management pipeline arriving soon</div>} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="settings" element={<div className="p-12 text-center text-gray-400 font-mono text-xs uppercase tracking-widest">System settings arriving soon</div>} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

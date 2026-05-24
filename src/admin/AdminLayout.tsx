import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  Tags, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase';

const AdminLayout: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
        <div className="text-center space-y-4">
          <h1 className="serif text-3xl text-brand-dark">Access Restricted</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">Auth Signature Required</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-brand-dark text-white text-[10px] uppercase font-bold tracking-widest"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Products', icon: ShoppingBag, path: '/admin/products' },
    { name: 'New Arrivals', icon: Sparkles, path: '/admin/arrivals' },
    { name: 'Categories', icon: Tags, path: '/admin/categories' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin/gallery' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-muted/20 flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-brand-muted/10">
          <NavLink to="/" className="flex flex-col gap-1 items-start group">
            <span className="serif text-2xl text-brand-dark group-hover:text-brand-accent transition-colors">Muskan</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Management Portal</span>
          </NavLink>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center justify-between p-3 rounded-sm transition-all group
                ${isActive ? 'bg-brand-card text-brand-dark border-l-2 border-brand-accent' : 'text-gray-400 hover:text-brand-dark hover:bg-brand-card/50'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${navItems[0].path === item.path ? 'text-brand-accent' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
              </div>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-brand-muted/10">
          <div className="flex items-center gap-3 mb-6 p-2">
            <img 
              src={user?.photoURL || 'https://ui-avatars.com/api/?name=Admin'} 
              alt="Admin" 
              className="w-8 h-8 rounded-full border border-brand-muted/30"
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brand-dark uppercase truncate w-32">{user?.displayName || 'Administrator'}</span>
              <span className="text-[8px] text-gray-400 uppercase font-medium truncate w-32">{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  Home,
  BookOpen,
  History,
  ScrollText,
  Package,
  Download
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', to: '/' },
  { icon: Package, label: 'Products', to: '/products' },
  { icon: Download, label: 'Import Cards', to: '/import' },
  { icon: ScrollText, label: 'Rules', to: '/rules' },
  { icon: History, label: 'History', to: '/history' },
  { icon: BarChart3, label: 'Analytics', to: '/analytics' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold">TCG Repricer</span>
      </div>
      
      <nav className="space-y-2">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                isActive && 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
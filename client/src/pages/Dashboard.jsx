import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">MyApp</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {user?.name || user?.email || 'User'}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Here is an overview of your account activity and statistics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">64%</p>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm text-gray-700">Logged in successfully</span>
              <span className="text-xs text-gray-500">Just now</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm text-gray-700">Updated profile settings</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm text-gray-700">Created new project workspace</span>
              <span className="text-xs text-gray-500">Yesterday</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};
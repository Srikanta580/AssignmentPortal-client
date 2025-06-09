import React from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiShield,
  FiActivity,
  FiDatabase,
} from "react-icons/fi";

const Dashboard = () => {
  // Mock data - universities and status
  const universities = [
    {
      name: "Stanford University",
      status: "active",
      departments: 24,
      lastSync: "15 minutes ago",
    },
    { name: "MIT", status: "active", departments: 18, lastSync: "1 hour ago" },
    {
      name: "University of Tokyo",
      status: "pending",
      departments: 5,
      lastSync: "2 days ago",
    },
    {
      name: "ETH Zurich",
      status: "active",
      departments: 16,
      lastSync: "30 minutes ago",
    },
    {
      name: "National University of Singapore",
      status: "inactive",
      departments: 0,
      lastSync: "Never",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <FiShield className="text-white" />
            </div>
            <span className="text-xl font-semibold">Orbit Super Admin</span>
          </div>
        </div>

        <nav className="mt-6 px-4">
          <a
            href="#"
            className="flex items-center px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg"
          >
            <FiUsers className="mr-3" />
            Universities
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mt-1"
          >
            <FiActivity className="mr-3" />
            System Health
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mt-1"
          >
            <FiDatabase className="mr-3" />
            Data Management
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mt-1"
          >
            <FiSettings className="mr-3" />
            Configuration
          </a>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <FiLogOut className="mr-3" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            University Management
          </h1>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all">
            Add University
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="col-span-5 font-medium text-gray-700">
              University
            </div>
            <div className="col-span-2 font-medium text-gray-700">Status</div>
            <div className="col-span-2 font-medium text-gray-700">
              Departments
            </div>
            <div className="col-span-3 font-medium text-gray-700">
              Last Sync
            </div>
          </div>

          {universities.map((uni, index) => (
            <div
              key={index}
              className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="col-span-5 font-medium text-gray-800">
                {uni.name}
              </div>
              <div className="col-span-2">
                {uni.status === "active" ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : uni.status === "pending" ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </div>
              <div className="col-span-2 text-gray-600">{uni.departments}</div>
              <div className="col-span-3 text-gray-500">{uni.lastSync}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Showing {universities.length} of {universities.length} universities
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

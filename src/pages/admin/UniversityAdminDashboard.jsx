import React from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const UniversityAdminDashboard = () => {
  // Mock data - departments and access status
  const departments = [
    { name: "Computer Science", access: true, lastActive: "2 hours ago" },
    { name: "Electrical Engineering", access: true, lastActive: "1 day ago" },
    { name: "Business Administration", access: false, lastActive: "Never" },
    { name: "Medicine", access: true, lastActive: "5 minutes ago" },
    { name: "Arts & Humanities", access: false, lastActive: "Never" },
    { name: "Law", access: true, lastActive: "30 minutes ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <FiHome className="text-white" />
            </div>
            <span className="text-xl font-semibold">University Portal</span>
          </div>
        </div>

        <nav className="mt-6 px-4">
          <a
            href="#"
            className="flex items-center px-4 py-3 bg-cyan-50 text-cyan-600 rounded-lg"
          >
            <FiUsers className="mr-3" />
            Department Access
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg mt-1"
          >
            <FiSettings className="mr-3" />
            Settings
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
            Department Access Control
          </h1>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all">
            Manage Access
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div className="col-span-5 font-medium text-gray-700">
              Department
            </div>
            <div className="col-span-3 font-medium text-gray-700">
              Access Status
            </div>
            <div className="col-span-4 font-medium text-gray-700">
              Last Active
            </div>
          </div>

          {departments.map((dept, index) => (
            <div
              key={index}
              className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="col-span-5 font-medium text-gray-800">
                {dept.name}
              </div>
              <div className="col-span-3">
                {dept.access ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FiCheckCircle className="mr-1" />
                    Enabled
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <FiXCircle className="mr-1" />
                    Disabled
                  </span>
                )}
              </div>
              <div className="col-span-4 text-gray-500">{dept.lastActive}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Showing {departments.length} of {departments.length} departments
        </div>
      </div>
    </div>
  );
};

export default UniversityAdminDashboard;

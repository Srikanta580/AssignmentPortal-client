// AdminDashboard.jsx
import {
  BarChart2,
  Users,
  BookOpen,
  AlertTriangle,
  Activity,
  Settings,
  Bell,
} from "lucide-react";

const AdminDashboard = () => {
  // Sample data
  const statistics = [
    { id: 1, title: "Total Students", count: 3254, icon: Users, color: "blue" },
    {
      id: 2,
      title: "Faculty Members",
      count: 142,
      icon: Users,
      color: "purple",
    },
    {
      id: 3,
      title: "Active Courses",
      count: 87,
      icon: BookOpen,
      color: "green",
    },
    {
      id: 4,
      title: "Support Tickets",
      count: 18,
      icon: AlertTriangle,
      color: "orange",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Dr. Brown",
      action: "Created a new course",
      course: "CS480: Artificial Intelligence",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Admin",
      action: "System maintenance",
      details: "Database optimization",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: "John Smith",
      action: "Submitted a support ticket",
      details: "Login issue",
      time: "1 day ago",
    },
    {
      id: 4,
      user: "Dr. Johnson",
      action: "Updated course materials",
      course: "CS101: Intro to Programming",
      time: "1 day ago",
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "System Update Scheduled",
      message: "LMS will be down for maintenance on April 10, 1-3 AM EST",
      priority: "high",
    },
    {
      id: 2,
      title: "End of Semester Approaching",
      message: "Remind faculty to prepare final grades by May 15",
      priority: "medium",
    },
    {
      id: 3,
      title: "New Faculty Onboarding",
      message: "5 new faculty members need account setup",
      priority: "medium",
    },
  ];

  // Enrollment statistics sample data
  const enrollmentData = [
    { id: 1, label: "CS101", enrollments: 150 },
    { id: 2, label: "ENG202", enrollments: 200 },
    { id: 3, label: "MATH303", enrollments: 180 },
    { id: 4, label: "HIST404", enrollments: 120 },
    { id: 5, label: "BIO505", enrollments: 250 },
  ];
  const maxEnrollments = Math.max(
    ...enrollmentData.map((item) => item.enrollments)
  );

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Administration Dashboard</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Academic Year: 2024-2025</p>
          <p className="text-sm text-gray-500">Spring Semester</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {statistics.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow p-6">
            <div
              className={`inline-flex p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-500 mb-4`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">
              {stat.count.toLocaleString()}
            </h2>
            <p className="text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* System Performance */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">System Performance</h2>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Server CPU</span>
                <span className="text-sm text-gray-500">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-gray-500">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-gray-500">48%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "48%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-gray-500">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Settings className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start pb-3 border-b border-gray-100"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {activity.user}{" "}
                    <span className="text-gray-500">— {activity.action}</span>
                  </h3>
                  {activity.course && (
                    <p className="text-sm text-gray-600">{activity.course}</p>
                  )}
                  {activity.details && (
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-500 hover:text-blue-700 text-sm">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Notifications */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">System Notifications</h2>
            <Bell className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border-l-4 ${
                  notification.priority === "high"
                    ? "border-red-500 bg-red-50"
                    : "border-yellow-500 bg-yellow-50"
                }`}
              >
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Statistics */}
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Enrollment Statistics</h2>
            <BarChart2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="h-64 flex items-end justify-around mb-4">
            {enrollmentData.map((item) => {
              const barHeight = (item.enrollments / maxEnrollments) * 100;
              return (
                <div key={item.id} className="flex flex-col items-center">
                  <div
                    className="bg-indigo-500 w-8 rounded-t transition-all duration-300 hover:bg-indigo-600"
                    style={{ height: `${barHeight}%` }}
                  ></div>
                  <span className="text-sm mt-2">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button className="text-indigo-500 hover:text-indigo-700 text-sm">
              View Detailed Enrollment Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import {
  BarChart2,
  Users,
  BookOpen,
  AlertTriangle,
  Activity,
  Settings,
  Bell,
} from "lucide-react";

// Sample data
const statistics = [
  {
    id: 1,
    title: "Total Students",
    count: 3254,
    icon: Users,
    color: "primary",
  },
  {
    id: 2,
    title: "Faculty Members",
    count: 142,
    icon: Users,
    color: "secondary",
  },
  {
    id: 3,
    title: "Active Courses",
    count: 87,
    icon: BookOpen,
    color: "accent",
  },
  {
    id: 4,
    title: "Support Tickets",
    count: 18,
    icon: AlertTriangle,
    color: "accent",
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

const enrollmentData = [
  { id: 1, label: "CS101", enrollments: 150 },
  { id: 2, label: "ENG202", enrollments: 200 },
  { id: 3, label: "MATH303", enrollments: 180 },
  { id: 4, label: "HIST404", enrollments: 120 },
  { id: 5, label: "BIO505", enrollments: 250 },
];

const AdminDashboard = () => {
  const maxEnrollments = Math.max(...enrollmentData.map((i) => i.enrollments));

  return (
    <div className="w-full mx-auto text-dark">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <div className="text-right">
          <p className="text-sm text-primary">Academic Year: 2024-2025</p>
          <p className="text-sm text-primary">Spring Semester</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid-four-cols mb-6">
        {statistics.map((stat) => (
          <div key={stat.id} className="card">
            <div
              className={`
                inline-flex p-3 rounded-full 
                bg-${stat.color}-100 text-${stat.color}-500 mb-4
              `}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">
              {stat.count.toLocaleString()}
            </h2>
            <p className="text-primary">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid-three-cols mb-6">
        {/* System Performance */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">System Performance</h2>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div className="card-list">
            {[
              { label: "Server CPU", value: 35, color: "primary" },
              { label: "Memory Usage", value: 62, color: "secondary" },
              { label: "Storage", value: 48, color: "accent" },
              { label: "Database", value: 72, color: "accent" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="card-item">
                  <span className="text-sm font-medium text-dark">
                    {item.label}
                  </span>
                  <span className="text-sm text-primary">{item.value}%</span>
                </div>
                <div className="w-full bg-light rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-${item.color}-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 card">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div className="card-list">
            {recentActivities.map((act) => (
              <div key={act.id} className="card-item-start">
                <div className="bg-secondary/20 p-2 rounded-full mr-3">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-dark">
                    {act.user}{" "}
                    <span className="text-primary">— {act.action}</span>
                  </h3>
                  {act.course && (
                    <p className="text-sm text-primary">{act.course}</p>
                  )}
                  {act.details && (
                    <p className="text-sm text-primary">{act.details}</p>
                  )}
                  <p className="text-xs text-primary mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-accent hover:text-primary text-sm">
              View All Activity
            </button>
          </div>
        </div>
      </div>

      <div className="grid-three-cols mb-6">
        {/* Notifications */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">System Notifications</h2>
            <Bell className="w-5 h-5 text-accent" />
          </div>
          <div className="card-list">
            {notifications.map((note) => (
              <div
                key={note.id}
                className={`
                  p-3 rounded-lg border-l-4
                  ${
                    note.priority === "high"
                      ? "border-accent bg-accent/10"
                      : "border-secondary bg-secondary/10"
                  }
                `}
              >
                <h3 className="font-medium text-dark">{note.title}</h3>
                <p className="text-sm text-primary">{note.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Statistics */}
        <div className="col-span-2 card">
          <div className="card-header">
            <h2 className="card-title">Enrollment Statistics</h2>
            <BarChart2 className="w-5 h-5 text-primary" />
          </div>
          <div className="h-64 flex items-end justify-around mb-4">
            {enrollmentData.map((item) => {
              const height = (item.enrollments / maxEnrollments) * 100;
              return (
                <div key={item.id} className="flex flex-col items-center">
                  <div
                    className="w-8 rounded-t bg-secondary transition-all duration-300 hover:bg-primary"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-sm text-dark mt-2">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button className="text-primary hover:text-primary text-sm">
              View Detailed Enrollment Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

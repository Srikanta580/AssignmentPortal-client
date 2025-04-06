// FacultyDashboard.jsx
import {
  BarChart2,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle,
} from "lucide-react";

const FacultyDashboard = () => {
  // Sample data
  const classes = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Programming",
      students: 35,
      section: "A",
    },
    {
      id: 2,
      code: "CS101",
      name: "Introduction to Programming",
      students: 32,
      section: "B",
    },
    {
      id: 3,
      code: "CS450",
      name: "Operating Systems",
      students: 28,
      section: "A",
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: "Grade Programming Assignment #2",
      course: "CS101-A",
      deadline: "2025-04-06",
      submissions: 30,
    },
    {
      id: 2,
      title: "Grade Programming Assignment #2",
      course: "CS101-B",
      deadline: "2025-04-06",
      submissions: 28,
    },
    {
      id: 3,
      title: "Upload Lab Materials",
      course: "CS450-A",
      deadline: "2025-04-07",
      submissions: null,
    },
  ];

  const schedule = [
    {
      id: 1,
      title: "CS101-A Lecture",
      location: "Room 302",
      start: "9:00 AM",
      end: "10:30 AM",
    },
    {
      id: 2,
      title: "CS450-A Lecture",
      location: "Room 405",
      start: "1:00 PM",
      end: "2:30 PM",
    },
    {
      id: 3,
      title: "CS101-B Lecture",
      location: "Room 302",
      start: "3:00 PM",
      end: "4:30 PM",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">
            <Clock className="inline mr-1 w-4 h-4" /> Today: April 4, 2025
          </span>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome back, Dr. Johnson!
        </h2>
        <p>
          You have 3 classes today and 58 assignments to grade. Office hours are
          scheduled from 4:30 PM to 6:00 PM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* My Classes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Classes</h2>
            <Users className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="flex justify-between pb-2 border-b border-gray-100"
              >
                <div>
                  <h3 className="font-medium">
                    {cls.code}-{cls.section}: {cls.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {cls.students} Students Enrolled
                  </p>
                </div>
                <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Class Performance Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Class Performance</h2>
            <BarChart2 className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">CS101-A Average</span>
                <span className="text-sm text-gray-500">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `82%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">CS101-B Average</span>
                <span className="text-sm text-gray-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `78%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">CS450-A Average</span>
                <span className="text-sm text-gray-500">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `75%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pending Tasks</h2>
            <CheckCircle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between pb-2 border-b border-gray-100"
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Due: {task.deadline}</p>
                  {task.submissions && (
                    <p className="text-sm text-gray-500">
                      {task.submissions} submissions
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Today's Schedule</h2>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {schedule.map((event) => (
              <div
                key={event.id}
                className="flex items-start pb-2 border-b border-gray-100"
              >
                <div className="text-sm text-gray-500 w-16 shrink-0">
                  {event.start}
                </div>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <p className="text-sm text-gray-500">
                    {event.start} - {event.end}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="flex items-center justify-center p-4 bg-indigo-100 text-indigo-600 rounded-lg">
          <FileText className="mr-2 w-5 h-5" />
          <span>Create Assignment</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-lg">
          <BookOpen className="mr-2 w-5 h-5" />
          <span>Add Course Material</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-orange-100 text-orange-600 rounded-lg">
          <Users className="mr-2 w-5 h-5" />
          <span>Message Students</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-purple-100 text-purple-600 rounded-lg">
          <BarChart2 className="mr-2 w-5 h-5" />
          <span>View Analytics</span>
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;

import {
  BarChart2,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle,
} from "lucide-react";

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

const FacultyDashboard = () => {
  return (
    <div className="w-full mx-auto text-dark space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Faculty Dashboard</h1>
        <div className="flex items-center space-x-2 text-primary">
          <Clock className="inline mr-1 w-5 h-5" /> Today: April 4, 2025
        </div>
      </div>

      {/* Welcome Card (gradient stays as-is) */}
      <div className="bg-gradient-to-r from-secondary to-primary text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome back, Dr. Johnson!
        </h2>
        <p>
          You have 3 classes today and 58 assignments to grade. Office hours are
          scheduled from 4:30 PM to 6:00 PM.
        </p>
      </div>

      <div className="grid-two-cols">
        {/* My Classes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">My Classes</h2>
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="card-list">
            {classes.map((cls) => (
              <div key={cls.id} className="card-item">
                <div>
                  <h3 className="font-medium text-dark">
                    {cls.code}-{cls.section}: {cls.name}
                  </h3>
                  <p className="text-sm text-primary">
                    {cls.students} Students Enrolled
                  </p>
                </div>
                <button className="card-btn">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Class Performance Overview */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Class Performance</h2>
            <BarChart2 className="w-6 h-6 text-primary" />
          </div>
          <div className="card-list">
            {[
              { label: "CS101-A Average", value: 82 },
              { label: "CS101-B Average", value: 78 },
              { label: "CS450-A Average", value: 75 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-dark">
                    {item.label}
                  </span>
                  <span className="text-sm text-primary">{item.value}%</span>
                </div>
                <div className="w-full bg-light rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-secondary"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-two-cols">
        {/* Pending Tasks */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Pending Tasks</h2>
            <CheckCircle className="w-6 h-6 text-accent" />
          </div>
          <div className="card-list">
            {pendingTasks.map((task) => (
              <div key={task.id} className="card-item">
                <div>
                  <h3 className="font-medium text-dark">{task.title}</h3>
                  <p className="text-sm text-primary">{task.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-dark">
                    Due: {task.deadline}
                  </p>
                  {task.submissions != null && (
                    <p className="text-sm text-primary">
                      {task.submissions} submissions
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Today's Schedule</h2>
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="card-list">
            {schedule.map((event) => (
              <div key={event.id} className="card-item">
                <div className="text-sm text-primary w-16 shrink-0">
                  {event.start}
                </div>
                <div>
                  <h3 className="font-medium text-dark">{event.title}</h3>
                  <p className="text-sm text-primary">{event.location}</p>
                  <p className="text-sm text-primary">
                    {event.start} – {event.end}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid-four-cols">
        <button className="flex items-center justify-center p-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition">
          <FileText className="mr-2 w-5 h-5" />
          <span>Create Assignment</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-secondary/10 text-primary rounded-lg hover:bg-secondary/20 transition">
          <BookOpen className="mr-2 w-5 h-5" />
          <span>Add Course Material</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition">
          <Users className="mr-2 w-5 h-5" />
          <span>Message Students</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-secondary/10 text-primary rounded-lg hover:bg-secondary/20 transition">
          <BarChart2 className="mr-2 w-5 h-5" />
          <span>View Analytics</span>
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;

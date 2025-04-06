import { BarChart2, BookOpen, Calendar, Clock, FileText } from "lucide-react";

const StudentDashboard = () => {
  // Sample data
  const courses = [
    { id: 1, code: "CS101", name: "Introduction to Programming", progress: 65 },
    { id: 2, code: "MATH201", name: "Calculus II", progress: 42 },
    { id: 3, code: "PHY150", name: "Physics for Engineers", progress: 78 },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: "Programming Assignment #3",
      course: "CS101",
      dueDate: "2025-04-10",
    },
    { id: 2, title: "Problem Set 5", course: "MATH201", dueDate: "2025-04-08" },
    { id: 3, title: "Lab Report", course: "PHY150", dueDate: "2025-04-15" },
  ];

  const events = [
    { id: 1, title: "CS101 Lecture", start: "10:00 AM", end: "11:30 AM" },
    { id: 2, title: "Study Group", start: "2:00 PM", end: "4:00 PM" },
    { id: 3, title: "Office Hours", start: "4:30 PM", end: "5:30 PM" },
  ];

  return (
    <div className="w-full mx-auto text-dark space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Student Dashboard</h1>
        <div className="flex items-center space-x-2 text-primary">
          <Clock className="inline mr-1 w-4 h-4" /> Today: April 4, 2025
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-secondary to-primary text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Welcome back, Alex!</h2>
        <p>
          You have 3 assignments due this week and 2 upcoming exams. Keep up the
          good work!
        </p>
      </div>

      {/* 3‑column grid */}
      <div className="grid-three-cols">
        {/* Course Progress */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Course Progress</h2>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="card-list">
            {courses.map((course) => (
              <div key={course.id} className="pb-2 border-b border-accent">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-dark">
                    {course.code}: {course.name}
                  </span>
                  <span className="text-sm text-primary">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-light rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Assignments</h2>
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div className="card-list">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="card-item">
                <div>
                  <h3 className="font-medium text-dark">{assignment.title}</h3>
                  <p className="text-sm text-primary">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-dark">Due</p>
                  <p className="text-sm text-primary">{assignment.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Today's Schedule</h2>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="card-list">
            {events.map((event) => (
              <div key={event.id} className="card-item">
                <div>
                  <div className="text-sm text-primary w-16 shrink-0">
                    {event.start}
                  </div>
                  <div>
                    <h3 className="font-medium text-dark">{event.title}</h3>
                    <p className="text-sm text-primary">
                      {event.start} – {event.end}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Performance */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Academic Performance</h2>
          <BarChart2 className="w-5 h-5 text-secondary" />
        </div>
        <div className="h-64 flex items-end justify-around">
          {[
            { term: "Fall 2023", gpa: 3.2 },
            { term: "Spring 2024", gpa: 3.5 },
            { term: "Fall 2024", gpa: 3.6 },
            { term: "Spring 2025", gpa: 3.7 },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="bg-secondary w-16 rounded-t"
                style={{ height: `${(item.gpa / 4) * 100}%` }}
              />
              <span className="mt-2 text-sm text-dark">{item.term}</span>
              <span className="text-sm font-bold text-primary">
                {item.gpa.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  FileText,
  FolderOpen,
  Clock,
  Edit,
  Camera,
  Save,
  X,
} from "lucide-react";

// Sample data
const studentData = {
  id: "STU001",
  name: "Emma Johnson",
  email: "emma.johnson@university.edu",
  phone: "+1 (555) 123-4567",
  address: "123 Campus Drive, University City",
  year: "3rd Year",
  major: "Computer Science",
  gpa: "3.85",
  profileImage:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
  pendingAssignments: [
    {
      id: 1,
      title: "Data Structures Project",
      course: "CS 301",
      dueDate: "2025-06-10",
      priority: "high",
    },
    {
      id: 2,
      title: "Algorithm Analysis Report",
      course: "CS 302",
      dueDate: "2025-06-12",
      priority: "medium",
    },
    {
      id: 3,
      title: "Web Development Assignment",
      course: "CS 350",
      dueDate: "2025-06-15",
      priority: "low",
    },
  ],
  savedNotes: [
    {
      id: 1,
      title: "Binary Search Trees",
      course: "CS 301",
      lastEdited: "2025-06-01",
    },
    {
      id: 2,
      title: "HTTP Protocols",
      course: "CS 350",
      lastEdited: "2025-05-28",
    },
    {
      id: 3,
      title: "Graph Algorithms",
      course: "CS 302",
      lastEdited: "2025-05-25",
    },
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Website",
      status: "In Progress",
      lastUpdated: "2025-06-02",
    },
    {
      id: 2,
      title: "Machine Learning Model",
      status: "Completed",
      lastUpdated: "2025-05-20",
    },
    {
      id: 3,
      title: "Mobile App Prototype",
      status: "Planning",
      lastUpdated: "2025-06-01",
    },
  ],
};

const facultyData = {
  id: "FAC001",
  name: "Dr. Michael Thompson",
  email: "m.thompson@university.edu",
  phone: "+1 (555) 987-6543",
  address: "456 Faculty Lane, University City",
  department: "Computer Science",
  position: "Associate Professor",
  office: "Engineering Building, Room 304",
  officeHours: "Mon/Wed/Fri 2:00-4:00 PM",
  profileImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  courses: [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      code: "CS 301",
      students: 45,
    },
    { id: 2, name: "Advanced Programming", code: "CS 302", students: 32 },
    { id: 3, name: "Software Engineering", code: "CS 401", students: 28 },
  ],
  research: [
    {
      id: 1,
      title: "Machine Learning in Healthcare",
      status: "Ongoing",
      year: "2024-2025",
    },
    {
      id: 2,
      title: "Distributed Computing Systems",
      status: "Published",
      year: "2024",
    },
  ],
};

export const StudentProfile = () => {
  const student = useSelector((state) => state.auth.user.student);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50";
      case "In Progress":
        return "text-blue-600 bg-blue-50";
      case "Planning":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-primary">Profile</h1>
      {/* Header Section */}
      <div className="card mb-6 mt-2">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <img
              src={student.profileImage || ""}
              alt={student.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-dark">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-secondary font-medium">
                  BCA - {student.admissionYear}
                </p>
                <p className="text-gray-600">Student ID: {student.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{student.phone}</span>
              </div>
              {/* <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>{student.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen size={16} />
                <span>GPA: {student.gpa}</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <Clock size={20} className="text-primary" />
              Pending Assignments
            </h2>
            {/* <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
              {student.pendingAssignments.length}
            </span> */}
          </div>
          {/* <div className="card-list">
            {student.pendingAssignments.map((assignment) => (
              <div key={assignment.id} className="card-item-start">
                <div className="flex-1">
                  <h3 className="font-medium text-dark">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                  <p className="text-sm text-gray-500">
                    Due: {assignment.dueDate}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    assignment.priority
                  )}`}
                >
                  {assignment.priority}
                </span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Saved Notes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Saved Notes
            </h2>
            <button className="card-btn">Add New</button>
          </div>
          {/* <div className="card-list">
            {student.savedNotes.map((note) => (
              <div key={note.id} className="card-item">
                <div>
                  <h3 className="font-medium text-dark">{note.title}</h3>
                  <p className="text-sm text-gray-600">{note.course}</p>
                  <p className="text-xs text-gray-500">
                    Last edited: {note.lastEdited}
                  </p>
                </div>
                <button className="card-btn">View</button>
              </div>
            ))}
          </div>*/}
        </div>

        {/* Projects */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <FolderOpen size={20} className="text-primary" />
              Projects
            </h2>
            <button className="card-btn">New Project</button>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {student.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-accent rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="font-medium text-dark mb-2">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {project.lastUpdated}
                  </span>
                </div>
                <button className="w-full mt-3 card-btn text-center">
                  View Details
                </button>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const FacultyProfile = () => {
  const faculty = useSelector((state) => state.auth.user);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-primary">Profile</h1>
      {/* Header Section */}
      <div className="card mb-6 mt-2">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="relative">
            <img
              src={faculty.profileImage}
              alt={faculty.firstName}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-dark">
                  {faculty.firstName} {faculty.lasstName}
                </h1>
                <p className="text-secondary font-medium">{faculty.position}</p>
                <p className="text-gray-600">{faculty.department} Department</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{faculty.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{faculty.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Courses */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <BookOpen size={20} className="text-primary" />
              Current Courses
            </h2>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
              {faculty.courses?.length}
            </span>
          </div>
          <div className="card-list">
            {faculty.courses?.map((course) => (
              <div key={course.id} className="card-item">
                <div>
                  <h3 className="font-medium text-dark">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.code}</p>
                  <p className="text-sm text-gray-500">
                    {course.students} students enrolled
                  </p>
                </div>
                <button className="card-btn">Manage</button>
              </div>
            ))}
          </div>
        </div>

        {/* Research Projects */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Research Projects
            </h2>
            <button className="card-btn">Add Research</button>
          </div>
          <div className="card-list">
            {faculty.research?.map((research) => (
              <div key={research.id} className="card-item-start">
                <div className="flex-1">
                  <h3 className="font-medium text-dark">{research.title}</h3>
                  <p className="text-sm text-gray-600">{research.year}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    research.status === "Ongoing"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {research.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn bg-primary hover:bg-primary/80 justify-center">
              <Calendar size={16} />
              Schedule Class
            </button>
            <button className="btn bg-secondary hover:bg-secondary/80 justify-center">
              <FileText size={16} />
              Create Assignment
            </button>
            <button className="btn bg-accent text-dark hover:bg-accent/80 justify-center">
              <User size={16} />
              View Students
            </button>
            <button className="btn bg-gray-600 hover:bg-gray-700 justify-center">
              <BookOpen size={16} />
              Grade Papers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Building,
  Users,
  Bookmark,
  ChevronDown,
  ChevronUp,
  FileText,
  Upload,
  UserPlus,
} from "lucide-react";
import { useSelector } from "react-redux";

const ClassesPage = () => {
  const [expandedClass, setExpandedClass] = useState(null);

  // Sample data - would come from Redux store in real app
  const facultyClasses = {
    current: [
      {
        id: 1,
        subjectCode: "CS101",
        subjectName: "Introduction to Programming",
        semester: "1",
        department: "Computer Science",
        classTime: "Mon, Wed 10:00-11:30 AM",
        location: "Building A, Room 101",
        studentsCount: 45,
        nextClass: "Monday, Apr 29, 2025 - 10:00 AM",
        materials: [
          { id: 1, name: "Week 1: Introduction to Variables", type: "pdf" },
          { id: 2, name: "Week 2: Control Flow", type: "ppt" },
        ],
      },
      {
        id: 2,
        subjectCode: "CS202",
        subjectName: "Data Structures",
        semester: "2",
        department: "Computer Science",
        classTime: "Tue, Thu 2:00-3:30 PM",
        location: "Building B, Room 205",
        studentsCount: 38,
        nextClass: "Tuesday, Apr 29, 2025 - 2:00 PM",
        materials: [
          { id: 1, name: "Week 1: Arrays and Linked Lists", type: "pdf" },
          { id: 2, name: "Week 2: Stacks and Queues", type: "ppt" },
        ],
      },
      {
        id: 3,
        subjectCode: "CS480",
        subjectName: "Artificial Intelligence",
        semester: "4",
        department: "Computer Science",
        classTime: "Fri 9:00-12:00 PM",
        location: "Building C, Room 310",
        studentsCount: 32,
        nextClass: "Friday, May 2, 2025 - 9:00 AM",
        materials: [
          { id: 1, name: "Week 1: Introduction to AI", type: "pdf" },
          { id: 2, name: "Week 2: Search Algorithms", type: "ppt" },
        ],
      },
    ],
  };

  const toggleExpandClass = (id) => {
    if (expandedClass === id) {
      setExpandedClass(null);
    } else {
      setExpandedClass(id);
    }
  };

  // Stats for current semester
  const currentClassesCount = facultyClasses.current.length;
  const totalStudents = facultyClasses.current.reduce(
    (sum, cls) => sum + cls.studentsCount,
    0
  );
  const averageClassSize = Math.round(totalStudents / currentClassesCount);

  // Next class to teach
  const nextClassesWithDates = facultyClasses.current.map((cls) => {
    const [_, date, time] = cls.nextClass.split(" - ");
    // Convert to Date object for comparison
    return {
      ...cls,
      nextClassDate: new Date(`${date} ${time}`),
    };
  });

  // Sort by date and get the soonest
  nextClassesWithDates.sort((a, b) => a.nextClassDate - b.nextClassDate);
  const nextClass = nextClassesWithDates[0];

  return (
    <div className="w-full mx-auto text-dark">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">My Classes</h1>
        <div className="text-right">
          <p className="text-sm text-primary">Academic Year: 2024-2025</p>
          <p className="text-sm text-primary">Spring Semester</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="inline-flex p-3 rounded-full bg-primary-100 text-primary-500 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">{currentClassesCount}</h2>
          <p className="text-primary">Current Classes</p>
        </div>

        <div className="card">
          <div className="inline-flex p-3 rounded-full bg-secondary-100 text-secondary-500 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">{totalStudents}</h2>
          <p className="text-primary">Total Students</p>
        </div>

        <div className="card">
          <div className="inline-flex p-3 rounded-full bg-accent-100 text-accent-500 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">{averageClassSize}</h2>
          <p className="text-primary">Avg. Class Size</p>
        </div>

        <div className="card">
          <div className="inline-flex p-3 rounded-full bg-accent-100 text-accent-500 mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold">{nextClass.nextClass}</h2>
          <p className="text-primary">Next Class</p>
        </div>
      </div>

      {/* Classes List */}
      <div className="grid-one-col">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Semester Classes</h2>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>

          <div className="card-list">
            {facultyClasses.current.map((cls) => (
              <div
                key={cls.id}
                className="border rounded-lg mb-3 overflow-hidden"
              >
                <div
                  className="bg-light p-3 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpandClass(cls.id)}
                >
                  <div>
                    <h3 className="font-medium text-dark">
                      <span className="font-bold">{cls.subjectCode}:</span>{" "}
                      {cls.subjectName}
                    </h3>
                    <p className="text-sm text-primary">
                      Semester: {cls.semester} | {cls.classTime}
                    </p>
                  </div>
                  <div>
                    {expandedClass === cls.id ? (
                      <ChevronUp className="w-4 h-4 text-primary" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>

                {expandedClass === cls.id && (
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Class Details</h4>
                        <p className="text-sm text-primary flex items-center mb-2">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Subject: {cls.subjectCode}: {cls.subjectName}
                        </p>
                        <p className="text-sm text-primary flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          Semester: {cls.semester} {cls.term && `(${cls.term})`}
                        </p>
                        <p className="text-sm text-primary flex items-center mb-2">
                          <Building className="w-4 h-4 mr-2" />
                          Department: {cls.department}
                        </p>
                        <p className="text-sm text-primary flex items-center mb-2">
                          <Clock className="w-4 h-4 mr-2" />
                          Schedule: {cls.classTime}
                        </p>
                        <p className="text-sm text-primary flex items-center mb-2">
                          <Building className="w-4 h-4 mr-2" />
                          Location: {cls.location}
                        </p>
                        <p className="text-sm text-primary flex items-center mb-2">
                          <Users className="w-4 h-4 mr-2" />
                          Students: {cls.studentsCount}
                        </p>
                        {cls.nextClass && (
                          <p className="text-sm text-primary flex items-center mb-2">
                            <Clock className="w-4 h-4 mr-2" />
                            Next Class: {cls.nextClass}
                          </p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Course Materials</h4>
                        {cls.materials.map((material) => (
                          <div
                            key={material.id}
                            className="flex items-center justify-between p-2 bg-light rounded-md mb-2"
                          >
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-primary" />
                              <span className="text-sm">{material.name}</span>
                            </div>
                            <span className="text-xs bg-secondary-100 text-secondary-500 px-2 py-1 rounded-md uppercase">
                              {material.type}
                            </span>
                          </div>
                        ))}

                        <div className="mt-4">
                          <button className="bg-primary text-white px-3 py-2 rounded-md text-sm flex items-center mr-2">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Material
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="border border-primary text-primary px-3 py-2 rounded-md text-sm flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        View Students
                      </button>
                      <button className="bg-secondary text-white px-3 py-2 rounded-md text-sm flex items-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Manage Attendance
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;

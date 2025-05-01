import { useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  Building,
  PlusCircle,
  Edit,
  EyeIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectDepartments,
  selectFaculty,
  selectSubjects,
} from "../../features/admin/classAssignmentSlice";

const Classes = () => {
  const departments = useSelector(selectDepartments);
  const faculty = useSelector(selectFaculty);
  const subjects = useSelector(selectSubjects);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [classTime, setClassTime] = useState("");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState("assign"); // "assign" or "view"
  const [expandedAssignment, setExpandedAssignment] = useState(null);

  // Filter faculty by department
  const filteredFaculty = selectedDepartment
    ? faculty.filter((f) => f.departmentId === selectedDepartment)
    : [];

  // Filter subjects by semester and department
  const filteredSubjects =
    selectedDepartment && selectedSemester
      ? subjects.filter(
          (s) =>
            s.departmentId === selectedDepartment &&
            s.semester === selectedSemester
        )
      : [];

  // Sample assignments data - would come from Redux store in real app
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      departmentId: "dept1",
      departmentName: "Computer Science",
      facultyId: "fac1",
      facultyName: "Dr. Brown",
      subjectId: "sub1",
      subjectName: "CS101: Introduction to Programming",
      semester: "1",
      classTime: "Mon, Wed 10:00-11:30 AM",
      location: "Building A, Room 101",
    },
    {
      id: 2,
      departmentId: "dept1",
      departmentName: "Computer Science",
      facultyId: "fac2",
      facultyName: "Dr. Johnson",
      subjectId: "sub2",
      subjectName: "CS202: Data Structures",
      semester: "2",
      classTime: "Tue, Thu 2:00-3:30 PM",
      location: "Building B, Room 205",
    },
    {
      id: 3,
      departmentId: "dept2",
      departmentName: "Mathematics",
      facultyId: "fac3",
      facultyName: "Dr. Smith",
      subjectId: "sub3",
      subjectName: "MATH303: Linear Algebra",
      semester: "3",
      classTime: "Mon, Wed, Fri 1:00-2:00 PM",
      location: "Building C, Room 310",
    },
  ]);

  const handleAssignFaculty = () => {
    if (
      !selectedDepartment ||
      !selectedFaculty ||
      !selectedSemester ||
      !selectedSubject ||
      !classTime ||
      !location
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newAssignment = {
      id: assignments.length + 1,
      departmentId: selectedDepartment,
      departmentName: departments.find((d) => d.id === selectedDepartment).name,
      facultyId: selectedFaculty,
      facultyName: faculty.find((f) => f.id === selectedFaculty).name,
      subjectId: selectedSubject,
      subjectName: subjects.find((s) => s.id === selectedSubject).name,
      semester: selectedSemester,
      classTime,
      location,
    };

    setAssignments([...assignments, newAssignment]);

    // Reset form
    setSelectedSubject("");
    setClassTime("");
    setLocation("");

    // In a real app, would dispatch to Redux
    // dispatch(assignFacultyToClass(newAssignment));
  };

  const toggleExpandAssignment = (id) => {
    if (expandedAssignment === id) {
      setExpandedAssignment(null);
    } else {
      setExpandedAssignment(id);
    }
  };

  return (
    <div className="w-full mx-auto text-dark">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Class Management</h1>
      </div>

      {/* Toggle View */}
      <div className="flex mb-6 bg-light rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-md ${
            viewMode === "assign" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setViewMode("assign")}
        >
          <PlusCircle className="w-4 h-4 inline-block mr-2" />
          Assign Faculty
        </button>
        <button
          className={`flex-1 py-2 rounded-md ${
            viewMode === "view" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setViewMode("view")}
        >
          <EyeIcon className="w-4 h-4 inline-block mr-2" />
          View Assignments
        </button>
      </div>

      {viewMode === "assign" ? (
        <div className="grid-two-cols mb-6">
          {/* Assignment Form */}
          <div className="col-span-2 card">
            <div className="card-header">
              <h2 className="card-title">Assign Faculty to Class</h2>
              <Users className="w-5 h-5 text-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Faculty
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  disabled={!selectedDepartment}
                >
                  <option value="">Select Faculty</option>
                  {filteredFaculty.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Semester
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={!selectedSemester || !selectedDepartment}
                >
                  <option value="">Select Subject</option>
                  {filteredSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.code}: {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Class Time
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., Mon, Wed 10:00-11:30 AM"
                  value={classTime}
                  onChange={(e) => setClassTime(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., Building A, Room 101"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                onClick={handleAssignFaculty}
              >
                Assign Faculty
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-2 card">
          <div className="card-header">
            <h2 className="card-title">Current Faculty Assignments</h2>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>

          <div className="overflow-hidden">
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Filter by Department
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Filter by Semester
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Filter by Faculty
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">All Faculty</option>
                  {faculty.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assignments List */}
            <div className="card-list">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="border rounded-lg mb-3 overflow-hidden"
                >
                  <div
                    className="bg-light p-3 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpandAssignment(assignment.id)}
                  >
                    <div>
                      <h3 className="font-medium text-dark">
                        {assignment.subjectName}
                      </h3>
                      <p className="text-sm text-primary">
                        Faculty: {assignment.facultyName}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Edit className="w-4 h-4 mr-3 text-primary cursor-pointer" />
                      {expandedAssignment === assignment.id ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </div>

                  {expandedAssignment === assignment.id && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-primary mb-2">
                            <Building className="w-4 h-4 inline-block mr-2" />
                            Department: {assignment.departmentName}
                          </p>
                          <p className="text-sm text-primary mb-2">
                            <BookOpen className="w-4 h-4 inline-block mr-2" />
                            Subject: {assignment.subjectName}
                          </p>
                          <p className="text-sm text-primary mb-2">
                            <Users className="w-4 h-4 inline-block mr-2" />
                            Faculty: {assignment.facultyName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-primary mb-2">
                            <Calendar className="w-4 h-4 inline-block mr-2" />
                            Semester: {assignment.semester}
                          </p>
                          <p className="text-sm text-primary mb-2">
                            <Clock className="w-4 h-4 inline-block mr-2" />
                            Time: {assignment.classTime}
                          </p>
                          <p className="text-sm text-primary mb-2">
                            <Building className="w-4 h-4 inline-block mr-2" />
                            Location: {assignment.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <button className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-dark">
                          Edit Assignment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;

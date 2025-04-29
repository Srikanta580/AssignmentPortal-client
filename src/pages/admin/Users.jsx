// UsersPage.jsx
import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import IconMap from "../../components/icons/formIcons";
import { addStudent, addFaculty, fetchStudents, fetchFaculties, deleteFaculty, deleteStudent } from "../../features/admin/adminAPI";
import { useDispatch, useSelector } from "react-redux";
const fieldConfig = {
  Faculty: [
    { name: "firstName", label: "First Name", type: "text", icon: "user" },
    { name: "lastName", label: "Last Name", type: "text", icon: "user-plus" },
    { name: "password", label: "Password", type: "password", icon: "lock" },
    { name: "email", label: "Email", type: "email", icon: "mail" },
    { name: "phone", label: "Phone", type: "tel", icon: "phone" },
  ],
  Student: [
    { name: "firstName", label: "First Name", type: "text", icon: "user" },
    { name: "lastName", label: "Last Name", type: "text", icon: "user-plus" },
    { name: "rollNo", label: "Roll No.", type: "text", icon: "hash" },
    { name: "admissionYear", label: "Admission Year", type: "number", icon: "calendar" },
    { name: "semester", label: "Semester", type: "text", icon: "book" },
    { name: "email", label: "Email", type: "email", icon: "mail" },
    { name: "password", label: "Password", type: "password", icon: "lock" },
    { name: "phone", label: "Phone", type: "tel", icon: "phone" },
  ],
};


const UsersPage = () => {
  const tabs = ["Faculty", "Student", "Alumni", "Guest"];
  const [activeTab, setActiveTab] = useState("Faculty");
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("Faculty");
  const [formData, setFormData] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const openModal = () => {
    setFormType("Faculty");
    setFormData({});
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const { students, faculties, status, error } = useSelector((state) => state?.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching students ...");
    dispatch(fetchStudents(),fetchFaculties());
    console.log("Fetching faculties ...");
    dispatch(fetchFaculties());
  }, [dispatch]);


  //addStudent and addFaculty are async actions that return a promise
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Adding", formType, formData);
    try {
      let resultAction;
      if (formType === "Student") {
        resultAction = await dispatch(addStudent(formData));
      } else if (formType === "Faculty") {
        resultAction = await dispatch(addFaculty(formData));
      }
      if (resultAction?.type.endsWith("/fulfilled")) {
        console.log(`${formType} added successfully:`, resultAction.payload);
        closeModal();
      } else {
        console.error(`Add ${formType.toLowerCase()} failed:`, resultAction.payload);
        alert(`Error: ${resultAction.payload}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };


  const renderTable = () => {
    if (activeTab === "Faculty") {
      return (
        <div className="card overflow-x-auto">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-6 p-4 bg-light border-b rounded-md">
            {/* Search by Name  */}
            <div className="flex flex-col w-full sm:w-60">
              <label className="mb-1 text-sm font-medium text-dark">Search by Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
              />
            </div>

            {/* Sort by */}
            <div className="flex flex-col w-full sm:w-52">
              <label className="mb-1 text-sm font-medium text-dark">Sort by Roll No</label>
              <select
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
                defaultValue=""
              >
                <option value="">Default</option>
                <option value="name">Name</option>

              </select>
            </div>

            {/* Optional: More Filters Button */}
            <div className="flex items-end">
              <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark">
                More Filters
              </button>
            </div>
          </div>

          <table className="min-w-full table-auto">
            <thead className="bg-light">
              <tr>
                {["First Name", "Last Name", "Password", "Email", "Phone", "Actions"].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-dark">
                    <div className="flex flex-col">
                      <span className="font-medium">{col}</span>
                      {/* <input
                        type="text"
                        placeholder={`Filter ${col}`}
                        className="mt-1 p-1 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
                      /> */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-light">
              {faculties.map((faculty, index) => (
                <tr key={index} className="hover:bg-light/50">
                  <td className="px-4 py-2">{faculty.firstName}</td>
                  <td className="px-4 py-2">{faculty.lastName}</td>
                  <td className="px-4 py-2">{faculty.password}</td>
                  <td className="px-4 py-2">{faculty.email}</td>
                  <td className="px-4 py-2">{faculty.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      onClick={() => {
                        console.log("Deleting faculty with ID:", faculty.id);
                        dispatch(deleteFaculty(faculty.id)); // Dispatch the delete action
                      } }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === "Student") {
      return (
        <div className="card overflow-x-auto">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-6 p-4 bg-light border-b rounded-md">
            {/* Search by Name  */}
            <div className="flex flex-col w-full sm:w-60">
              <label className="mb-1 text-sm font-medium text-dark">Search by Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
              />
            </div>

            {/* Semester Filter */}
            <div className="flex flex-col w-full sm:w-48">
              <label className="mb-1 text-sm font-medium text-dark">Filter by Semester</label>
              <select
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
                defaultValue=""
              >
                <option value="">All</option>
                {[...Array(6)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div className="flex flex-col w-full sm:w-52">
              <label className="mb-1 text-sm font-medium text-dark">Sort by Roll No</label>
              <select
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
                defaultValue=""
              >
                <option value="">Default</option>
                <option value="name">Name</option>
                <option value="rollNo">Roll No</option>
                <option value="admissionYear">Admission Year</option>
                <option value="semester">Semester</option>
              </select>
            </div>

            {/* Optional: More Filters Button */}
            <div className="flex items-end">
              <button className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark">
                More Filters
              </button>
            </div>
          </div>


          <table className="min-w-full table-auto">
            <thead className="bg-light">
              <tr>
                {["First Name", "Last Name", "Roll No.", "Admission Year", "Semester", "Email", "Password", "Phone", "Actions"].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-dark">
                    <div className="flex flex-col">
                      <span className="font-medium">{col}</span>
                      {/* <input
                        type="text"
                        placeholder={`Filter ${col}`}
                        className="mt-1 p-1 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
                      /> */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-light">
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-light/50">
                  <td className="px-4 py-2">{student.firstName}</td>
                  <td className="px-4 py-2">{student.lastName}</td>
                  <td className="px-4 py-2">{student.rollNo}</td>
                  <td className="px-4 py-2">{student.admissionYear}</td>
                  <td className="px-4 py-2">{student.semester}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.password}</td>
                  <td className="px-4 py-2">{student.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                      onClick={() => { 
                        console.log("Deleting student with ID:", student.id);
                        dispatch(deleteStudent(student.id));// Dispatch the delete action
                      } }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-64 text-secondary">
          <p className="italic">This section is under development.</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Users</h1>
      {/* Tabs + Add Button */}
      <div className="flex flex-wrap items-center gap-4">
        {tabs.map((tab) => {
          const isDisabled = tab === "Alumni" || tab === "Guest";
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => !isDisabled && setActiveTab(tab)}
              disabled={isDisabled}
              className={`
                px-4 py-2 rounded-lg font-semibold transition
                ${isActive
                  ? "bg-secondary text-white"
                  : "bg-light text-dark hover:bg-secondary/30"
                }
                ${isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
                }
              `}
            >
              {tab}
            </button>
          );
        })}

        <button
          onClick={openModal}
          className="ml-auto flex items-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
        >
          <PlusCircle className="w-5 h-5 mr-1" /> Add
        </button>
      </div>

      {/* Content Area */}
      {renderTable(/* same as before */)}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
            {/* Standard Header */}
            <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Add New User</h2>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* User Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={formType === "Faculty"}
                      onChange={() => {
                        setFormType("Faculty");
                        setFormData({});
                      }}
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <span className="ml-2">Faculty</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={formType === "Student"}
                      onChange={() => {
                        setFormType("Student");
                        setFormData({});
                      }}
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <span className="ml-2">Student</span>
                  </label>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {fieldConfig[formType].map((field) => {
                  const Icon = IconMap[field.icon];
                  return (
                    <div
                      key={field.name}
                      className={`relative transition-all duration-300 ${focusedField === field.name
                        ? "transform -translate-y-1"
                        : ""
                        }`}
                    >
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon />
                      </div>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.label}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${focusedField === field.name
                          ? "border-primary shadow-md"
                          : "border-gray-300"
                          } focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;

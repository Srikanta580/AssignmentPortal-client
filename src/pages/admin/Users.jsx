// UsersPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import { AiOutlineFileExcel, AiOutlineFileText } from "react-icons/ai"; // Add this import
import IconMap from "../../components/icons/formIcons";
import {
  addStudent,
  addFaculty,
  fetchStudents,
  fetchFaculties,
  deleteFaculty,
  deleteStudent,
  uploadFacultyExcel,
  uploadFacultyCsv,
  uploadStudentExcel,
  uploadStudentCsv,
} from "../../features/admin/adminAPI";
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
    {name: "gender", label: "Gender", type: "text", icon: "gender" },
    { name: "rollNo", label: "Roll No.", type: "text", icon: "hash" },
    { name: "admissionYear", label: "Admission Year", type: "text", icon: "calendar" },
    { name: "semester", label: "Semester", type: "text", icon: "book" },
    {name: "section", label: "Section", type: "text", icon: "section" },
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
  const [semesterFilter, setSemesterFilter] = useState(0);
  const [formError, setFormError] = useState(""); // <-- Add this line
  const [showFileInput, setShowFileInput] = useState(false);
  const [fileType, setFileType] = useState(""); // e.g. "faculty-excel"
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef();

  const openModal = () => {
    setFormType(activeTab); // <-- This will preset the modal to the selected tab
    setFormData({});
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError(""); // Clear error when user starts typing
  };

  const {
    students = [],
    faculties = [],
    currentStudentPage,
    totalStudentPages,
    currentFacultyPage,
    totalFacultyPages,
  } = useSelector((state) => state?.admin);
  const { id } = useSelector((state) => state?.university);
  const { user } = useSelector((state) => state?.auth);
  const handleSemesterFilterChange = (e) => {
    setSemesterFilter(e.target.value);
  };

  useEffect(() => {
    if (activeTab === "Student") {
      dispatch(fetchStudents({ universityId: id, departmentId: user?.department?.id, page: 0, semester: semesterFilter }));
      console.log("Fetching students...");
    } else if (activeTab === "Faculty") {
      dispatch(fetchFaculties({ universityId: id, departmentId: user?.department?.id, page: 0 }));
      console.log("Fetching faculties...");
    }
  }, [dispatch, activeTab, semesterFilter, id, user?.department?.id]);


  const renderPagination = (currentPage, totalPages) => {
    if (totalPages <= 1) return null; // Hide pagination if only one page

    const maxPageNumbers = 3; // You can adjust this based on how many numbers you want to show

    const generatePageNumbers = () => {
      let start = Math.max(0, currentPage - Math.floor(maxPageNumbers / 2));
      let end = Math.min(totalPages, currentPage + Math.ceil(maxPageNumbers / 2));

      if (end - start < maxPageNumbers) {
        if (start === 0) {
          end = Math.min(totalPages, start + maxPageNumbers);
        } else {
          start = Math.max(0, end - maxPageNumbers);
        }
      }

      const pages = [];
      for (let i = start; i < end; i++) {
        pages.push(i);
      }

      return pages;
    };

    const pagesToShow = generatePageNumbers();

    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        {currentPage > 0 && (
          <button
            onClick={() =>
              activeTab === "Student"
                ? dispatch(fetchStudents({ universityId: id, departmentId: user.departmentId, page: currentPage - 1, semester: semesterFilter }))
                : dispatch(fetchFaculties({ universityId: id, departmentId: user?.department?.id, page: currentPage - 1 }))
            }
            className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
          >
            Previous
          </button>
        )}

        {pagesToShow[0] > 0 && (
          <>
            <button
              onClick={() =>
                activeTab === "Student"
                  ? dispatch(fetchStudents({ universityId: id, departmentId: user.departmentId, page, semester: semesterFilter }))
                  : dispatch(fetchFaculties({ universityId: id, departmentId: user?.department?.id, page }))
              }
              className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
            >
              1
            </button>
            {pagesToShow[0] > 1 && (
              <span className="px-3 py-1 text-primary">...</span>
            )}
          </>
        )}

        {pagesToShow.map((page) => (
          <button
            key={page}
            onClick={() =>
              activeTab === "Student"
                ? dispatch(fetchStudents({ universityId: id, departmentId: user.departmentId, page, semester: semesterFilter }))
                : dispatch(fetchFaculties({ universityId: id, departmentId: user?.department?.id, page }))
            }
            className={`px-3 py-1 rounded cursor-pointer ${currentPage === page
              ? "bg-primary text-white"
              : "bg-light text-primary"
              }`}
          >
            {page + 1}
          </button>
        ))}

        {pagesToShow[pagesToShow.length - 1] < totalPages - 1 && (
          <>
            {pagesToShow[pagesToShow.length - 1] < totalPages - 2 && (
              <span className="px-3 py-1 text-primary">...</span>
            )}
            <button
              onClick={() =>
                activeTab === "Student"
                  ? dispatch(fetchStudents({ universityId: id, departmentId: user.departmentId, page: totalPages - 1, semester: semesterFilter }))
                  : dispatch(fetchFaculties({ universityId: id, departmentId: user?.department?.id, page: totalPages - 1 }))
              }
              className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
            >
              {totalPages}
            </button>
          </>
        )}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() =>
              activeTab === "Student"
                ? dispatch(fetchStudents({ universityId: id, departmentId: user.departmentId, page: currentPage + 1, semester: semesterFilter }))
                : dispatch(fetchFaculties({ universityId: id, departmentId: user?.department?.id, page: currentPage + 1 }))
            }
            className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
          >
            Next
          </button>
        )}
      </div>
    );
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields are filled
    const requiredFields = fieldConfig[formType].map(f => f.name);
    const missing = requiredFields.some(field => !formData[field]);
    if (missing) {
      setFormError("All fields are required.");
      return;
    }
    try {
      let resultAction;
      if (formType === "Student") {
        resultAction = await dispatch(addStudent({...formData, universityId: id, departmentId: user?.department?.id }));
      } else if (formType === "Faculty") {
        resultAction = await dispatch(addFaculty({...formData, universityId: id, departmentId: user?.department?.id }));
      }
      if (resultAction?.type.endsWith("/fulfilled")) {
        console.log(`${formType} added successfully:`, resultAction.payload);
        closeModal();
      } else {
        console.error(
          `Add ${formType.toLowerCase()} failed:`,
          resultAction.payload
        );
        setFormError(`Error: ${resultAction.payload}`); // Show error in form
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFormError("Unexpected error occurred.");
    }
  };

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      setUploadError("Please select a file.");
      return;
    }
    setUploading(true);
    setUploadError("");
    let thunk;
    if (fileType === "faculty-excel") thunk = uploadFacultyExcel;
    else if (fileType === "faculty-csv") thunk = uploadFacultyCsv;
    else if (fileType === "student-excel") thunk = uploadStudentExcel;
    else if (fileType === "student-csv") thunk = uploadStudentCsv;
    try {
      const resultAction = await dispatch(thunk(file));
      if (resultAction.type.endsWith("/fulfilled")) {
        setShowFileInput(false);
        setSelectedFileName(""); // Reset file name
        if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
        // Optionally refresh list here
      } else {
        setUploadError(resultAction.payload || "Upload failed.");
      }
    } catch {
      setUploadError("Upload failed.");
    }
    setUploading(false);
  };

  const renderTable = () => {
    if (activeTab === "Faculty") {
      return (
        <div className="card overflow-x-auto">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-6 p-4 bg-light border-b rounded-md">
            {/* Search by Name  */}
            <div className="flex flex-col w-full sm:w-60">
              <label className="mb-1 text-sm font-medium text-dark">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
              />
            </div>

            {/* Optional: More Filters Button */}
            <div className="flex items-end">
              <button className="bg-primary text-white px-4 py-2 rounded opacity-50 cursor-not-allowed text-sm hover:bg-primary-dark">
                More Filters
              </button>
            </div>
          </div>

          <table className="min-w-full table-auto">
            <thead className="bg-light">
              <tr>
                {[
                  "First Name",
                  "Last Name",
                  "Email",
                  "Phone",
                  "Actions",
                ].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-dark">
                    <div className="flex flex-col">
                      <span className="font-medium">{col}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-light">
              {faculties.map((faculty) => (
                <tr
                  key={faculty.id}
                  className="hover:bg-light/50"
                >
                  <td className="px-4 py-2">{faculty.firstName}</td>
                  <td className="px-4 py-2">{faculty.lastName}</td>
                  <td className="px-4 py-2">{faculty.email}</td>
                  <td className="px-4 py-2">{faculty.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
                      onClick={() => {
                        console.log("Deleting faculty with ID:", faculty.id);
                        dispatch(deleteFaculty(faculty.id)); // Dispatch the delete action
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {activeTab === "Faculty" && renderPagination(currentFacultyPage, totalFacultyPages)}
        </div>
      );
    } else if (activeTab === "Student") {
      return (
        <div className="card overflow-x-auto">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-6 p-4 bg-light border-b rounded-md">
            {/* Search by Name  */}
            <div className="flex flex-col w-full sm:w-60">
              <label className="mb-1 text-sm font-medium text-dark">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
              />
            </div>

            {/* Semester Filter */}
            <div className="flex flex-col w-full sm:w-48">
              <label className="mb-1 text-sm font-medium text-dark">
                Filter by Semester
              </label>
              <select
                className="p-2 border border-secondary rounded text-sm focus:ring-1 focus:ring-secondary"
                value={semesterFilter}
                onChange={handleSemesterFilterChange}
              >
                <option value="">All</option>
                {[...Array(6)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>
            {/* Optional: More Filters Button */}
            <div className="flex items-end">
              <button className="bg-primary text-white px-4 py-2 rounded cursor-not-allowed opacity-50 text-sm hover:bg-primary-dark" disabled>
                More Filters
              </button>
            </div>
          </div>

          <table className="min-w-full table-auto">
            <thead className="bg-light">
              <tr>
                {[
                  "First Name",
                  "Last Name",
                  "Roll No.",
                  "Admission Year",
                  "Semester",
                  "Email",
                  "Phone",
                  "Actions",
                ].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-dark">
                    <div className="flex flex-col">
                      <span className="font-medium">{col}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-light">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-light/50"
                >
                  <td className="px-4 py-2">{student.firstName}</td>
                  <td className="px-4 py-2">{student.lastName}</td>
                  <td className="px-4 py-2">{student.rollNo}</td>
                  <td className="px-4 py-2">{student.admissionYear}</td>
                  <td className="px-4 py-2">{student.semester}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  <td className="px-4 py-2">{student.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
                      onClick={() => {
                        console.log("Deleting student with ID:", student.id);
                        dispatch(deleteStudent(student.id)); // Dispatch the delete action
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {activeTab === "Student" && renderPagination(currentStudentPage, totalStudentPages)}
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

        {/* Add using Excel */}
        <button
          className="flex items-center px-3 py-2 bg-primary text-white cursor-pointer rounded-lg hover:bg-primary/80 transition"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            setFileType(
              activeTab === "Faculty"
                ? "faculty-excel"
                : activeTab === "Student"
                  ? "student-excel"
                  : ""
            );
            setShowFileInput(true);
            setUploadError("");
          }}
          disabled={activeTab !== "Faculty" && activeTab !== "Student"}
        >
          <AiOutlineFileExcel className="w-5 h-5 mr-1" />
          Excel
        </button>

        {/* Add using CSV */}
        <button
          className="flex items-center px-3 py-2 bg-primary text-white cursor-pointer rounded-lg hover:bg-primary/80 transition"
          onClick={() => {
            setFileType(
              activeTab === "Faculty"
                ? "faculty-csv"
                : activeTab === "Student"
                  ? "student-csv"
                  : ""
            );
            setShowFileInput(true);
            setUploadError("");
          }}
          disabled={activeTab !== "Faculty" && activeTab !== "Student"}
        >
          <AiOutlineFileText className="w-5 h-5 mr-1" />
          CSV
        </button>

        {/* Add User */}
        <button
          onClick={openModal}
          className="flex items-center px-3 py-2 bg-primary text-white cursor-pointer rounded-lg hover:bg-primary/80 transition"
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
              {/* Show error if any */}
              {formError && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                  {formError}
                </div>
              )}
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
                  // Dropdown for gender
                  if (formType === "Student" && field.name === "gender") {
                    return (
                      <div key={field.name} className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon />
                        </div>
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${focusedField === field.name ? "border-primary shadow-md" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    );
                  }
                  // Dropdown for section
                  if (formType === "Student" && field.name === "section") {
                    return (
                      <div key={field.name} className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon />
                        </div>
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${focusedField === field.name ? "border-primary shadow-md" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                        >
                          <option value="">Select Section</option>
                          <option value="A">Section-A</option>
                          <option value="B">Section-B</option>
                          <option value="C">Section-C</option>
                          <option value="D">Section-D</option>
                        </select>
                      </div>
                    );
                  }
                  // Dropdown for semester (1 to 8)
                  if (formType === "Student" && field.name === "semester") {
                    return (
                      <div key={field.name} className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Icon />
                        </div>
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${focusedField === field.name ? "border-primary shadow-md" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
                        >
                          <option value="">Select Semester</option>
                          {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  // Default input for other fieldsSection-
                  return (
                    <div
                      key={field.name}
                      className={`relative transition-all duration-300 ${focusedField === field.name ? "transform -translate-y-1" : ""}`}
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
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${focusedField === field.name ? "border-primary shadow-md" : "border-gray-300"} focus:outline-none focus:ring-1 focus:ring-primary transition-all`}
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
                  className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      {showFileInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Upload {fileType.includes("faculty") ? "Faculty" : "Student"}{" "}
              {fileType.includes("excel") ? "Excel" : "CSV"}
            </h2>
            <div className="mb-4 flex">
              {/* Hidden file input */}
              <input
                type="file"
                accept={fileType.includes("excel") ? ".xlsx" : ".csv"}
                ref={fileInputRef}
                id="file-upload"
                className="hidden"
                onChange={e => {
                  setUploadError("");
                  setSelectedFileName(e.target.files[0]?.name || "");
                }}
              />
              {/* Styled label as button */}
              <label
                htmlFor="file-upload"
                className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-l cursor-pointer text-primary hover:bg-gray-100 text-sm font-medium"
                style={{ minWidth: "110px" }}
              >
                <AiOutlineFileText className="w-4 h-4" />
                Upload File
              </label>
              {/* File name display */}
              <span
                className="px-3 py-1 bg-white text-gray-700 text-sm min-w-[120px] truncate"
                style={{ maxWidth: 180 }}
              >
                {selectedFileName || "No file chosen"}
              </span>
            </div>
            {uploadError && (
              <div className="mb-2 text-sm text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                {uploadError}
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={e => {
                  setShowFileInput(false);
                  setSelectedFileName("");
                  setUploadError("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFileUpload}
                className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;

import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import {
  fetchSubjects,
  fetchAllFaculties,
  fetchClasses,
  assignClass,
} from "../../features/admin/adminAPI";
import { useDispatch, useSelector } from "react-redux";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const {
    faculties = [],
    subjects = [],
    classes = [],
    currentClassPage = 0,
    totalClassPages = 1,
  } = useSelector((state) => state?.admin);
    const { id } = useSelector((state) => state?.university);
    const { user } = useSelector((state) => state?.auth);
    const departmentId = user?.department?.id;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (departmentId && id) {
      dispatch(fetchAllFaculties({ departmentId, universityId: id }));
      dispatch(fetchSubjects({ departmentId, universityId: id }));
      dispatch(fetchClasses({ departmentId, universityId: id, page: 0 }));
    }
  }, [dispatch, departmentId, id]);

  const openModal = () => {
    setFormData({});
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setFormError("");
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { facultyId, subjectCode, semester, section, timing, location } = formData;

    if (!facultyId || !subjectCode || !semester || !section || !timing || !location) {
      setFormError("All fields are required.");
      return;
    }

    try {
      const resultAction = await dispatch(assignClass({...formData, departmentId, universityId: id}));
      if (resultAction?.type.endsWith("/fulfilled")) {
        console.log("Class assigned successfully!", resultAction.payload);
        closeModal();
      } else {
        // Show error from API or fallback message
        console.error("Assign class failed:", resultAction.payload);
        setFormError( `Error:${resultAction.payload}`);
      }
    } catch (error) {
      setFormError("Unexpected error occurred. Please try again.");
      console.log("Unexpected error:", error);
    }
  };

  // Pagination for Classes
  const renderPagination = (currentPage, totalPages) => {
    if (totalPages <= 1) return null; // Hide pagination if only one page

    const maxPageNumbers = 3;
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
            onClick={() => dispatch(fetchClasses({ page: currentPage - 1 }))}
            className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
          >
            Previous
          </button>
        )}

        {pagesToShow[0] > 0 && (
          <>
            <button
              onClick={() => dispatch(fetchClasses({ page: 0 }))}
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
            onClick={() => dispatch(fetchClasses({ departmentId, universityId: id, page }))}
            className={`px-3 py-1 rounded cursor-pointer ${
              currentPage === page
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
              onClick={() => dispatch(fetchClasses({ page: totalPages - 1 }))}
              className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
            >
              {totalPages}
            </button>
          </>
        )}

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => dispatch(fetchClasses({ page: currentPage + 1 }))}
            className="px-3 py-1 rounded cursor-pointer bg-light text-primary"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Classes</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={openModal}
          className="ml-auto flex items-center px-3 py-2 bg-primary text-white cursor-pointer rounded-lg hover:bg-primary/80 transition"
        >
          <PlusCircle className="w-5 h-5 mr-1" /> Assign Class
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-light">
            <tr>
              {["Faculty", "Subject", "Semester", "Section", "Time", "Location"].map((col) => (
                <th key={col} className="px-4 py-2 text-left text-dark">
                  <span className="font-medium">{col}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-light">
            {classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-light/50">
                <td className="px-4 py-2">{cls.faculty?.firstName} {cls.faculty?.lastName}</td>
                <td className="px-4 py-2">{cls.subject?.subjectCode}: {cls.subject?.subjectName}</td>
                <td className="px-4 py-2">{cls.semester}</td>
                <td className="px-4 py-2">{cls.section}</td>
                <td className="px-4 py-2">{cls.timing}</td>
                <td className="px-4 py-2">{cls.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add pagination below the table */}
        {renderPagination(currentClassPage, totalClassPages)}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Assign Faculty to Class</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              {formError && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Faculty</label>
                  <select
                    name="facultyId"
                    value={formData.facultyId || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.firstName} {fac.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <select
                    name="subjectCode"
                    value={formData.subjectCode || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((sub) => (
                      <option key={sub.subjectCode} value={sub.subjectCode}>
                        {sub.subjectCode}: {sub.subjectName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Semester</label>
                  <select
                    name="semester"
                    value={formData.semester || ""}
                    onChange={e => handleInputChange({ ...e, target: { ...e.target, value: Number(e.target.value) } })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Section</label>
                  <select
                    name="section"
                    value={formData.section || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Section</option>
                    {["A", "B", "C", "D"].map((section) => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Class Time</label>
                  <input
                    type="text"
                    name="timing"
                    value={formData.timing || ""}
                    onChange={handleInputChange}
                    placeholder="e.g., Mon, Wed 10:00-11:30 AM"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleInputChange}
                    placeholder="e.g., Building A, Room 101"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
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
    </div>
  );
};

export default ClassesPage;

import React, { useEffect, useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects, addSubject, deleteSubject } from "../../features/admin/adminAPI";

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state?.admin);
      const { id } = useSelector((state) => state?.university);
      const { user } = useSelector((state) => state?.auth);
      const departmentId = user?.department?.id;
  const [newSubject, setNewSubject] = useState({
    subjectCode: "",
    subjectName: "",
    semester: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(""); // <-- Add error state

  useEffect(() => {
    dispatch(fetchSubjects({departmentId, universityId: id}));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
    setFormError(""); // Clear error when user starts typing
  };

  const handleAddSubject = async () => {
    if (!newSubject.subjectCode || !newSubject.subjectName || !newSubject.semester) {
      setFormError("All fields are required.");
      return;
    }

    try {
      const resultAction = await dispatch(addSubject({...newSubject, departmentId, universityId: id}));
      if (resultAction.type.endsWith("/fulfilled")) {
        console.log("Subject added successfully:", resultAction.payload);
        setNewSubject({ subjectCode: "", subjectName: "", semester: "" });
        setShowModal(false);
        setFormError(""); // Clear error on success
      } else {
        setFormError(
          resultAction?.payload?.message ||
          resultAction?.payload ||
          "Failed to add subject. Please try again."
        );
        console.error("Add subject failed:", resultAction.payload);
      }
    } catch (error) {
      setFormError("Unexpected error occurred. Please try again.");
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-primary">Subjects</h1>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowModal(true);
            setFormError(""); // Clear error when opening modal
          }}
          className="flex items-center px-3 py-2 bg-primary text-white cursor-pointer rounded-lg hover:bg-primary/80 transition"
        >
          <PlusCircle className="w-5 h-5 mr-1" /> Add Subject
        </button>
      </div>

      {/* Subjects Table */}
      <div className="card overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-light">
            <tr>
              {["Subject Code", "Subject Name", "Semester", "Actions"].map((col) => (
                <th key={col} className="px-4 py-2 text-left text-dark">
                  <span className="font-medium">{col}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-light">
            {subjects.map((subject, index) => (
              <tr key={index} className="hover:bg-light/50">
                <td className="px-4 py-2">{subject.subjectCode}</td>
                <td className="px-4 py-2">{subject.subjectName}</td>
                <td className="px-4 py-2">Semester {subject.semester}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer"
                    onClick={() => {
                      console.log("Deleting subject with code:", subject.subjectCode);
                      dispatch(deleteSubject(subject.subjectCode)); // Dispatch the delete action
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Add New Subject</h2>
            </div>
            <div className="p-6">
              {/* Error message */}
              {formError && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                  {formError}
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subject Code</label>
                <input
                  type="text"
                  name="subjectCode"
                  value={newSubject.subjectCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., CS101"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={newSubject.subjectName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., Introduction to Programming"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Semester</label>
                <select
                  name="semester"
                  value={newSubject.semester}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormError(""); // Clear error when closing modal
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubject}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsPage;

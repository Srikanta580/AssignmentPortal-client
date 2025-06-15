import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import {
  addAssignment,
  fetchAssignmentsBySubjectCode,
} from "../../features/faculty/facultyAPI";
import { AiOutlineFileText } from "react-icons/ai";
import { selectAssignmentsBySubject } from "../../features/faculty/facultySelectors";
// import "@react-pdf-viewer/core/lib/styles/index.css";

const ASSIGNMENT_TYPES = ["Class Assignment", "CA1", "CA2", "CA3", "CA4"];

export default function SubjectAccordion({ subject, isActive, onToggle }) {
  const [showForm, setShowForm] = useState(false);
  const [fileError, setFileError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    dueDate: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add this line
  const [openPdfUrl, setOpenPdfUrl] = useState(null);
  const dispatch = useDispatch();

  const selectAssignments = useMemo(
    () => selectAssignmentsBySubject(subject.subjectCode),
    [subject.subjectCode]
  );
  const assignments = useSelector(selectAssignments);

  useEffect(() => {
    if (isActive && subject?.subjectCode) {
      dispatch(
        fetchAssignmentsBySubjectCode({ subjectCode: subject.subjectCode })
      );
    }
  }, [dispatch, isActive, subject?.subjectCode]);

  const handleAdd = () => setShowForm(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormError(""); // Clear error when user starts typing
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileError("File is required.");
      setSelectedFileName("");
      setSelectedFile(null);
      return;
    }
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are allowed.");
      setSelectedFileName("");
      setSelectedFile(null);
      return;
    }
    setFileError("");
    setSelectedFileName(file.name);
    setSelectedFile(file);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFileError("");
    setSelectedFileName("");
    setSelectedFile(null);
    setFormData({
      type: "",
      title: "",
      description: "",
      dueDate: "",
    });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.type ||
      !formData.title ||
      !formData.description ||
      !formData.dueDate
    ) {
      setFormError("All fields are required.");
      return;
    }
    if (!selectedFile) {
      setFileError("File is required.");
      return;
    }
    setLoading(true);
    setFormError("");
    setFileError("");
    setSuccessMessage(""); // Clear previous success message

    const resultAction = await dispatch(
      addAssignment({
        ...formData,
        subjectCode: subject.subjectCode,
        file: selectedFile,
      })
    );
    setLoading(false);

    if (addAssignment.fulfilled.match(resultAction)) {
      setShowForm(false);
      setFormData({
        type: "",
        title: "",
        description: "",
        dueDate: "",
      });
      setSelectedFileName("");
      setSelectedFile(null);
      setSuccessMessage("Assignment added successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);

      // Fetch updated assignments list
      dispatch(
        fetchAssignmentsBySubjectCode({ subjectCode: subject.subjectCode })
      );
    } else {
      setFormError(
        resultAction.payload?.message ||
          resultAction.error?.message ||
          "Failed to add assignment."
      );
    }
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-start text-left">
          <span className="text-lg font-semibold text-gray-800">
            {subject.subjectCode}
          </span>
          <span className="text-sm text-gray-600">{subject.subjectName}</span>
        </div>
        {successMessage && (
          <div className="text-green-600 text-sm mb-2">{successMessage}</div>
        )}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-3"></span>
          {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isActive && (
        <div className="p-4 bg-gray-50">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">{subject.description}</p>
            <button
              onClick={handleAdd}
              className="flex items-center text-sm font-medium text-primary cursor-pointer"
            >
              <PlusCircle size={16} className="mr-1" />
              Add Assignment
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-4 rounded-lg shadow-sm mb-4"
            >
              <div>
                <label className="block mb-1 font-medium">
                  Assignment Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select Type</option>
                  {ASSIGNMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              {/* File Upload */}
              <div className="mb-4 flex">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  id="file-upload"
                  className="hidden"
                  name="file"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-l cursor-pointer text-primary hover:bg-gray-100 text-sm font-medium"
                  style={{ minWidth: "110px" }}
                >
                  <AiOutlineFileText className="w-4 h-4 mr-1" />
                  Upload File
                </label>
                <span
                  className="px-3 py-1 bg-white text-gray-700 text-sm min-w-[120px] truncate"
                  style={{ maxWidth: 180 }}
                >
                  {selectedFileName || "No file chosen"}
                </span>
              </div>
              {fileError && (
                <div className="text-red-600 text-sm mb-2">{fileError}</div>
              )}
              {formError && (
                <div className="text-red-600 text-sm mb-2">{formError}</div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-32 h-9 border rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-32 h-9 bg-primary text-white rounded text-sm"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}

          {/* Assignment list rendering */}
          {assignments.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-primary">Assignments</h4>
              <ul className="space-y-3">
                {assignments.map((a) => (
                  <li
                    key={a.id || a._id}
                    className="p-3 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        {a.title}{" "}
                        <span className="text-xs text-gray-500">
                          ({a.type})
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {a.description}
                      </div>
                      <div className="text-xs text-gray-500">
                        Due Date:{" "}
                        {(() => {
                          const d = new Date(a.dueDate);
                          const day = String(d.getDate()).padStart(2, "0");
                          const month = String(d.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const year = d.getFullYear();
                          return `${day}-${month}-${year}`;
                        })()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {" "}
                        Total Submissions: {a.submissions?.length}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => setOpenPdfUrl(a.assignmentUrl)}
                        className="inline-block px-3 py-1 bg-primary text-white rounded text-xs"
                      >
                        View PDF
                      </button>
                      <button
                        type="button"
                        className="inline-block px-3 py-1 bg-gray-400 text-white rounded text-xs cursor-not-allowed"
                        disabled
                      >
                        View Submissions
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* PDF Modal */}
      {openPdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg pt-8 relative w-[90vw] h-[90vh]">
            <button
              onClick={() => setOpenPdfUrl(null)}
              className="absolute top-0 right-0 w-11 h-8 flex items-center justify-center bg-gray-200 text-gray-700 text-2xl font-bold transition-colors duration-200 hover:bg-red-500 hover:text-white-600 focus:outline-none"
              aria-label="Close PDF"
              style={{
                border: "none",
                cursor: "pointer",
                borderRadius: "0",
              }}
            >
              &times;
            </button>
            <iframe
              src={openPdfUrl}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

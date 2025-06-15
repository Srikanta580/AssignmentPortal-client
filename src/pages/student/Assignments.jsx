import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, fetchAssignmentsBySubjectCode, submitAssignment, fetchAllSubmissionsByRollNo } from "../../features/student/studentAPI";
import {
  BookOpen,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function AssignmentPage() {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [openPdfUrl, setOpenPdfUrl] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(""); // <-- Success message state
  const [selectedFileName, setSelectedFileName] = useState("");
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state.student);
  const { user } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.university);
  const { assignments } = useSelector((state) => state.student);
  const { submissions } = useSelector((state) => state.student);
  const departmentId = user?.department?.id;
  const semester = user?.student?.semester;
  const rollNo = user?.student?.rollNo;

  useEffect(() => {
    if (semester && departmentId && id) {
      dispatch(fetchSubjects({ semester, departmentId, universityId: id }));
    }
  }, [semester, departmentId, id, dispatch]);

  // Fetch assignments when a subject is expanded
  useEffect(() => {
    if (expandedSubject && !assignments[expandedSubject]) {
      dispatch(fetchAssignmentsBySubjectCode({ subjectCode: expandedSubject }));
    }
  }, [expandedSubject, assignments, dispatch]);

  // Fetch submissions for the student
  useEffect(() => {
    if (rollNo) {
      dispatch(fetchAllSubmissionsByRollNo({ rollNo }));
    }
  }, [rollNo, dispatch]);

  const toggleExpand = (code) => {
    setExpandedSubject(expandedSubject === code ? null : code);
  };

  const getStatusIcon = (status, dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    if (status === "urgent" || daysLeft <= 2) {
      return <AlertCircle size={16} className="text-red-500" />;
    }
    return <Clock size={16} className="text-yellow-500" />;
  };

  // Handle assignment file upload
  const handleAssignmentUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      setUploadError("Please select a file.");
      setUploadSuccess("");
      return;
    }
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");
    try {
      const formData = new FormData();
      formData.append("assignmentId", currentAssignment.id || currentAssignment._id);
      formData.append("file", file);
      formData.append("rollNo", rollNo);
      const resultAction = await dispatch(submitAssignment({ formData }));
      if (submitAssignment.fulfilled.match(resultAction)) {
        setUploadSuccess("Assignment uploaded successfully!");
        setUploadError("");
        setSelectedFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        // Re-fetch all submissions to update the UI and disable the button
        await dispatch(fetchAllSubmissionsByRollNo({ rollNo }));
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadSuccess(""); // Clear after modal closes
        }, 5000); // <-- Show success message for 5 seconds
      } else {
        setUploadError(resultAction.payload?.message || "Upload failed.");
        setUploadSuccess("");
      }
    } catch (err) {
      setUploadError("Upload failed.");
      setUploadSuccess("");
    }
    setUploading(false);
  };

  const isAssignmentSubmitted = (assignmentId) =>
    submissions.some(
      (sub) => String(sub.assignmentId) === String(assignmentId) && sub.studentRoll === rollNo
    );

  const getSubmissionUrl = (assignmentId) => {
    const sub = submissions.find(
      (s) => String(s.assignmentId) === String(assignmentId) && s.studentRoll === rollNo
    );
    return sub?.submissionUrl || sub?.fileUrl || null;
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        {subjects.map((subject) => (
          <div
            key={subject.subjectCode}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(subject.subjectCode)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {subject.subjectCode}
                  </h2>
                  <p className="text-sm text-gray-600">{subject.subjectName}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm bg-light text-primary py-1 px-2 rounded-full">
                    {(assignments[subject.subjectCode]?.length) || 0} assignments
                  </span>
                </div>
              </div>
            </div>

            {expandedSubject === subject.subjectCode && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {assignments[subject.subjectCode] && assignments[subject.subjectCode].length > 0 ? (
                  <ul className="space-y-3">
                    {assignments[subject.subjectCode].map((assignment) => {
                      const submitted = isAssignmentSubmitted(assignment.id || assignment._id);
                      const submissionUrl = getSubmissionUrl(assignment.id || assignment._id);

                      return (
                        <li
                          key={assignment.id || assignment._id}
                          className="flex items-center justify-between bg-white rounded p-3 shadow"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <BookOpen size={18} className="text-blue-500" />
                              <div className="font-medium">
                                {assignment.title}{" "}
                                <span className="text-xs text-gray-500">({assignment.type})</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {assignment.description || "No description provided."}
                            </div>
                            <div className="text-xs text-gray-500">
                              Due Date: {(() => {
                                const d = new Date(assignment.dueDate);
                                const day = String(d.getDate()).padStart(2, "0");
                                const month = String(d.getMonth() + 1).padStart(2, "0");
                                const year = d.getFullYear();
                                return `${day}-${month}-${year}`;
                              })()}
                            </div>
                            {assignment.assignmentUrl && (
                              <button
                                type="button"
                                onClick={() => setOpenPdfUrl(assignment.assignmentUrl)}
                                className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                                style={{ textDecoration: "none" }}
                              >
                                View PDF
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {submitted ? (
                              <>
                                <CheckCircle size={18} className="text-green-500" title="Submitted" />
                                {submissionUrl && (
                                  <button
                                    type="button"
                                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
                                    onClick={() => setOpenPdfUrl(submissionUrl)}
                                  >
                                    View Submission
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/80 transition"
                                  onClick={() => {
                                    setCurrentAssignment(assignment);
                                    setShowUploadModal(true);
                                    setUploadError("");
                                    setUploadSuccess("");
                                    setSelectedFileName("");
                                  }}
                                  disabled={submitted}
                                >
                                  Upload
                                </button>
                                <Upload size={18} className="text-gray-500" title="Submit" />
                              </>
                            )}
                            {getStatusIcon(assignment.status, assignment.dueDate)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-gray-500 text-sm">No assignments available for this subject.</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

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
                borderRadius: "0"
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

      {/* Assignment Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Submit Assignment
            </h2>
            <div className="mb-4 flex">
              {/* Hidden file input */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                id="assignment-file-upload"
                className="hidden"
                onChange={e => {
                  setUploadError("");
                  setUploadSuccess("");
                  setSelectedFileName(e.target.files[0]?.name || "");
                }}
              />
              {/* Styled label as button */}
              <label
                htmlFor="assignment-file-upload"
                className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-l cursor-pointer text-primary hover:bg-gray-100 text-sm font-medium"
                style={{ minWidth: "110px" }}
              >
                <Upload className="w-4 h-4 mr-1" />
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
            {uploadSuccess && (
              <div className="mb-2 text-sm text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-md">
                {uploadSuccess}
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFileName("");
                  setUploadError("");
                  setUploadSuccess("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignmentUpload}
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
}

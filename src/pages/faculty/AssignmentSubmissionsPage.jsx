import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Users, Calendar, FileText, ArrowLeft, Download, X } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function AssignmentSubmissionsPage() {
    const { assignmentId } = useParams();
    const [openPdfUrl, setOpenPdfUrl] = useState(null);
    const [downloading, setDownloading] = useState(false);

    // Store marks locally: { [submissionId]: marks }
    const [marksMap, setMarksMap] = useState({});

    const assignments = useSelector((state) =>
        Object.values(state.faculty.assignments || {}).flat()
    );
    const assignment = assignments.find(
        (a) => String(a.id) === String(assignmentId) || String(a._id) === String(assignmentId)
    );

    // Download all submissions as zip
    const handleDownloadAll = async () => {
        if (!assignment?.submissions?.length) return;
        setDownloading(true);
        const zip = new JSZip();
        const folder = zip.folder("submissions");
        // Download each file and add to zip
        await Promise.all(
            assignment.submissions.map(async (sub, idx) => {
                try {
                    const response = await fetch(sub.submissionUrl);
                    const blob = await response.blob();
                    // Use rollno_marks.ext as filename
                    const ext = sub.submissionUrl.split(".").pop().split(/\#|\?/)[0];
                    const marks = marksMap[sub.id] !== undefined && marksMap[sub.id] !== "" ? marksMap[sub.id] : "NA";
                    const filename = `${sub.studentRoll || "student"}_${marks}.${ext}`;
                    folder.file(filename, blob);
                } catch (e) {
                    // skip failed downloads
                }
            })
        );
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${assignment.title.replace(/\s+/g, "_")}_submissions.zip`);
        setDownloading(false);
    };

    if (!assignment) {
        return (
            <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border border-red-100 text-center">
                <div className="mb-4 text-xl font-semibold text-red-600 flex items-center justify-center gap-2">
                    <FileText className="w-7 h-7 text-red-400" />
                    Assignment not found.
                </div>
                <Link
                    to="/dashboard/faculty/assignments/class"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Assignments
                </Link>
            </div>
        );
    }

    return (
        <div className="h-auto w-full bg-gradient-to-br from-white to-gray-50 py-0 border-t border-gray-200">
            <div className="w-full max-w-none border border-gray-200 bg-white rounded-xl shadow-lg overflow-hidden mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 px-8 py-8 bg-primary/90 shadow border-b-gray-300 rounded-t-xl">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/dashboard/faculty/assignments/class"
                            className="text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </Link>
                        <FileText className="w-9 h-9 text-white drop-shadow" />
                        <div>
                            <div className="text-2xl font-bold text-white tracking-wide">{assignment.title}</div>
                            <div className="text-xs text-white/80">{assignment.type}</div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-white/90 text-sm mt-2 md:mt-0">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Submissions: {assignment.submissions?.length || 0}
                        </span>
                    </div>
                </div>

                {/* Download All Button */}
                <div className="flex justify-end px-8 mt-8">
                    <button
                        onClick={handleDownloadAll}
                        disabled={downloading || !assignment.submissions?.length}
                        className={`group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-lg transition-all duration-200
                            ${downloading || !assignment.submissions?.length ? "opacity-50 cursor-not-allowed" : "hover:from-blue-800 hover:to-blue-600"}
                        `}
                        style={{
                            boxShadow: "0 4px 14px 0 rgba(34, 139, 230, 0.15)",
                            letterSpacing: "0.02em"
                        }}
                    >
                        <span className="absolute left-0 top-0 w-full h-full bg-blue-900 opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"></span>
                        <Download className="w-5 h-5" />
                        <span className="relative z-10">
                            {downloading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Downloading...
                                </span>
                            ) : (
                                "Download All"
                            )}
                        </span>
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto px-8 py-10 w-full">
                    <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
                        <thead>
                            <tr className="bg-primary/10">
                                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">Roll No</th>
                                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">Submission Date</th>
                                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">Marks</th>
                                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignment.submissions && assignment.submissions.length > 0 ? (
                                assignment.submissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-3 border-b text-gray-800">{sub.studentRoll}</td>
                                        <td className="px-6 py-3 border-b text-gray-600">
                                            {new Date(sub.submissionDate).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-3 border-b">
                                            <input
                                                type="number"
                                                min={0}
                                                max={100}
                                                placeholder="Marks"
                                                className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={marksMap[sub.id] ?? ""}
                                                onChange={e => {
                                                    setMarksMap(prev => ({
                                                        ...prev,
                                                        [sub.id]: e.target.value
                                                    }));
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-3 border-b">
                                            <button
                                                onClick={() => setOpenPdfUrl(sub.submissionUrl)}
                                                className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition font-medium"
                                            >
                                                View File
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-400 text-lg">
                                        No submissions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PDF Modal */}
            {openPdfUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl pt-8 relative w-[95vw] h-[95vh] flex flex-col">
                        <button
                            onClick={() => setOpenPdfUrl(null)}
                            className="absolute top-0 right-0 w-12 h-8 flex items-center justify-center bg-gray-200 text-gray-700 text-2xl font-bold transition-colors duration-200 hover:bg-red-500 hover:text-white focus:outline-none"
                            aria-label="Close PDF"
                            style={{
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "0 0.75rem 0 0"
                            }}
                        >
                            &times;
                        </button>
                        <iframe
                            src={openPdfUrl}
                            title="PDF Viewer"
                            width="100%"
                            height="100%"
                            style={{ border: "none", borderRadius: "0 0 0.75rem 0.75rem" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
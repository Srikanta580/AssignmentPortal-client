import { useState } from "react";
import {
  BookOpen,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

const subjects = [
  {
    code: "CS101",
    title: "Introduction to Computer Science",
    assignments: [
      {
        id: 1,
        title: "Midterm Project",
        description: "Research paper on selected topic",
        dueDate: "2025-05-15",
        status: "pending",
      },
      {
        id: 2,
        title: "Lab Exercise 3",
        description: "Implement a linked list data structure",
        dueDate: "2025-05-05",
        status: "urgent",
      },
    ],
  },
  {
    code: "MATH201",
    title: "Calculus II",
    assignments: [
      {
        id: 3,
        title: "Problem Set 4",
        description: "Integration techniques practice",
        dueDate: "2025-05-20",
        status: "pending",
      },
    ],
  },
  {
    code: "PHY150",
    title: "Physics for Engineers",
    assignments: [
      {
        id: 4,
        title: "Lab Report",
        description: "Analysis of experimental data",
        dueDate: "2025-04-30",
        status: "urgent",
      },
    ],
  },
];

export default function AssignmentPage() {
  const [uploads, setUploads] = useState({});
  const [expandedSubject, setExpandedSubject] = useState(null);

  const handleUpload = (subject, assignment, file) => {
    setUploads((prev) => ({
      ...prev,
      [`${subject}-${assignment.id}`]: {
        file,
        timestamp: new Date().toLocaleString(),
      },
    }));
  };

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

  return (
    <div className="w-full">
      <div className="space-y-6">
        {subjects.map((subject) => (
          <div
            key={subject.code}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(subject.code)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {subject.code}
                  </h2>
                  <p className="text-sm text-gray-600">{subject.title}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm bg-light text-primary py-1 px-2 rounded-full">
                    {subject.assignments.length} assignments
                  </span>
                </div>
              </div>
            </div>

            {expandedSubject === subject.code && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {subject.assignments.map((assignment) => {
                  const uploadKey = `${subject.code}-${assignment.id}`;
                  const isUploaded = !!uploads[uploadKey];

                  return (
                    <div
                      key={assignment.id}
                      className="mb-4 last:mb-0 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            {getStatusIcon(
                              assignment.status,
                              assignment.dueDate
                            )}
                            <h3 className="ml-2 font-medium text-gray-800">
                              {assignment.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {assignment.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Due: {assignment.dueDate}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        {isUploaded ? (
                          <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded">
                            <CheckCircle size={16} className="mr-2" />
                            <div>
                              <p>Uploaded: {uploads[uploadKey].file.name}</p>
                              <p className="text-xs text-gray-500">
                                {uploads[uploadKey].timestamp}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <label className="flex items-center px-3 py-2 bg-primary text-white text-sm rounded-md cursor-pointer transition-colors">
                              <Upload size={14} className="mr-2" />
                              Upload Submission
                              <input
                                type="file"
                                onChange={(e) =>
                                  handleUpload(
                                    subject.code,
                                    assignment,
                                    e.target.files[0]
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

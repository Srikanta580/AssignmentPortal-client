import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlusCircle,
  FileText,
  Clock,
  Calendar,
  Users,
} from "lucide-react";
import AssignmentForm from "../forms/AssignmentForm";

export default function SubjectAccordion({ subject, isActive, onToggle }) {
  const [showForm, setShowForm] = useState(false);
  const [uploads, setUploads] = useState([
    {
      id: 1,
      title: "Midterm Project",
      text: "Research paper on selected topic",
      dueDate: "2025-05-15",
      submissions: 12,
    },
  ]);

  const handleAdd = () => setShowForm(true);

  const handleSubmit = (data) => {
    setUploads((u) => [
      {
        id: Date.now(),
        title: data.title,
        text: data.text,
        dueDate: data.dueDate,
        submissions: 0,
      },
      ...u,
    ]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col items-start text-left">
          <span className="text-lg font-semibold text-gray-800">
            {subject.code}
          </span>
          <span className="text-sm text-gray-600">{subject.title}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-3">
            {uploads.length} assignments
          </span>
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
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <AssignmentForm onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
          )}

          <div className="space-y-3">
            {uploads.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <FileText size={18} className="text-primary mt-1 mr-2" />
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {assignment.text}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {assignment.id}
                  </div>
                </div>

                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    Due: {assignment.dueDate}
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    {assignment.submissions} submissions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

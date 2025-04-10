// SubjectAccordion.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import AssignmentForm from "../forms/AssignmentForm";

export default function SubjectAccordion({ subject }) {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploads, setUploads] = useState([]);

  const handleAdd = () => setShowForm(true);
  const handleSubmit = (data) => {
    setUploads((u) => [data, ...u]);
    setShowForm(false);
  };

  return (
    <div className="card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-lg font-semibold text-dark"
      >
        {subject} {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <button
            onClick={handleAdd}
            className="flex items-center px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            <PlusCircle className="mr-1" /> Add Assignment
          </button>

          {showForm && <AssignmentForm onSubmit={handleSubmit} />}

          <ul className="space-y-2">
            {uploads.map((u, i) => (
              <li key={i} className="p-2 bg-secondary/10 rounded">
                {u.text || u.file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

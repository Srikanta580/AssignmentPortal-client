// StudentAssignments.jsx
import { useState } from "react";

const subjects = ["CS101", "MATH201", "PHY150"];

export default function AssignmentPage() {
  const [uploads, setUploads] = useState({});

  const handleUpload = (sub, file) => {
    setUploads((u) => ({ ...u, [sub]: file }));
  };

  return (
    <div className="space-y-4">
      {subjects.map((sub) => (
        <div key={sub} className="card">
          <h3 className="text-lg font-semibold text-dark mb-2">{sub}</h3>
          <input
            type="file"
            onChange={(e) => handleUpload(sub, e.target.files[0])}
            className="mb-2"
          />
          {uploads[sub] && (
            <p className="text-secondary">Uploaded: {uploads[sub].name}</p>
          )}
        </div>
      ))}
    </div>
  );
}

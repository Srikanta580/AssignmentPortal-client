// AssignmentForm.jsx
import { useState } from "react";

export default function AssignmentForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ text, file });
  };

  return (
    <form onSubmit={submit} className="space-y-4 bg-light p-4 rounded-lg">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write details..."
        className="w-full p-2 border border-secondary rounded focus:ring-1 focus:ring-secondary"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block"
        required={!text}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition"
      >
        Upload
      </button>
    </form>
  );
}

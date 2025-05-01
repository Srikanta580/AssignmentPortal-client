import { useState } from "react";
import { Save, X } from "lucide-react";

export default function AssignmentForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    dueDate: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        file: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.text.trim()) {
      newErrors.text = "Description is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Assignment Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter assignment title"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows="3"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.text ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the assignment"
          ></textarea>
          {errors.text && (
            <p className="mt-1 text-xs text-red-500">{errors.text}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Attachment (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <X size={16} className="mr-1" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary cursor-pointer"
          >
            <Save size={16} className="mr-1" />
            Save Assignment
          </button>
        </div>
      </div>
    </form>
  );
}

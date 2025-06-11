import { FiX } from "react-icons/fi";
import Button from "../ui/Button";

const DepartmentAddForm = ({ onClose, onSubmit }) => {
  return (
    <div className="bg-white rounded-xl w-full max-w-md">
      <div className="bg-primary text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Add New Department</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        {/* Other form fields */}
      </div>

      <div className="flex justify-end space-x-3 mt-6 pb-6 px-6">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Add Department</Button>
      </div>
    </div>
  );
};

export default DepartmentAddForm;

import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";

const DepartmentTable = ({ departments, onToggleAccess }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
        <div className="col-span-3">Department</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Admins</div>
        <div className="col-span-2">Students</div>
        <div className="col-span-2">Last Active</div>
        <div className="col-span-1">Actions</div>
      </div>

      {departments.map((dept) => (
        <div
          key={dept.id}
          className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
        >
          <div className="col-span-3">
            <div className="font-medium text-gray-800">{dept.name}</div>
            <div className="text-sm text-gray-500">
              {dept.code} • {dept.head}
            </div>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => onToggleAccess(dept.id)}
              className="inline-flex items-center"
            >
              {dept.access ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FiCheckCircle className="mr-1" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <FiXCircle className="mr-1" />
                  Inactive
                </span>
              )}
            </button>
          </div>
          <div className="col-span-2 text-gray-600">
            {dept.adminCount} admins
          </div>
          <div className="col-span-2 text-gray-600">
            {dept.studentCount} students
          </div>
          <div className="col-span-2 text-gray-500">{dept.lastActive}</div>
          <div className="col-span-1">
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-cyan-600">
                <FiEye />
              </button>
              <button className="text-gray-400 hover:text-cyan-600">
                <FiEdit3 />
              </button>
              <button className="text-gray-400 hover:text-red-600">
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentTable;

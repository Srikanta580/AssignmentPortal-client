import { FiMail, FiPhone, FiEye, FiEdit3, FiTrash2 } from "react-icons/fi";

const AdminTable = ({ admins }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
        <div className="col-span-3">Administrator</div>
        <div className="col-span-3">Department</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">Last Login</div>
        <div className="col-span-2">Actions</div>
      </div>

      {admins.map((admin) => (
        <div
          key={admin.id}
          className="grid grid-cols-12 px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
        >
          <div className="col-span-3">
            <div className="font-medium text-gray-800">
              {admin.firstName} {admin.lastName}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <FiMail className="mr-1" />
              {admin.email}
            </div>
          </div>
          <div className="col-span-3 text-gray-600">{admin.department}</div>
          <div className="col-span-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Departmental Admin
            </span>
          </div>
          <div className="col-span-2 text-gray-500">{admin.lastLogin}</div>
          <div className="col-span-2">
            <div className="flex space-x-2">
              <button className="text-gray-400 cursor-pointer hover:text-cyan-600">
                <FiEye size={20} />
              </button>
              <button className="text-gray-400 cursor-pointer hover:text-cyan-600">
                <FiEdit3 size={20} />
              </button>
              <button className="text-gray-400 cursor-pointer hover:text-red-600">
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTable;

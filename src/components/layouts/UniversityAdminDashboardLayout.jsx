import { Outlet, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiShield,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiBarChart,
} from "react-icons/fi";
import { logoutUser } from "../../features/auth/authAPI";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { university } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const universityData = useSelector((state) => state.university);

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());
    console.log(res);
    navigate("/auth");
  };
  return (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">
            {universityData.name} Admin Portal
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <NavLink
          to={`/${university}/admin`}
          end
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-3 rounded-lg mb-1 ${
              isActive
                ? "bg-cyan-50 text-cyan-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FiUsers className="mr-3" />
          Departments
        </NavLink>
        <NavLink
          to={`/${university}/admin/admins`}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-3 rounded-lg mb-1 ${
              isActive
                ? "bg-cyan-50 text-cyan-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FiShield className="mr-3" />
          Administrators
        </NavLink>
        <NavLink
          to={`/${university}/admin/analytics`}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-3 rounded-lg mb-1 ${
              isActive
                ? "bg-cyan-50 text-cyan-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FiBarChart className="mr-3" />
          Analytics
        </NavLink>
        <NavLink
          to={`/${university}/admin/settings`}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-3 rounded-lg mb-1 ${
              isActive
                ? "bg-cyan-50 text-cyan-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <FiSettings className="mr-3" />
          Settings
        </NavLink>
        {/* Other nav links similarly */}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiLogOut className="mr-3" />
          Log Out
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

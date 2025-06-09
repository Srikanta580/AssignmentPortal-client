import { Link } from "react-router-dom";
import roleIcons from "../components/icons/roleIcons";
import Logo from "../components/atoms/Logo";

const RoleButton = ({ role, icon, route, isActive }) => {
  return (
    <Link
      to={isActive && route}
      className={`flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 
          rounded-full border-2 transition-all duration-300 ease-in-out 
          ${
            isActive
              ? "border-primary bg-white hover:shadow-lg hover:-translate-y-1"
              : "border-gray-400 bg-gray-100 opacity-50 cursor-not-allowed"
          }`}
    >
      {icon}
      <span
        className={`mt-2 text-sm font-medium ${
          isActive ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {role}
      </span>
    </Link>
  );
};

const roles = [
  { name: "Admin", route: "admin", active: true },
  { name: "Faculty", route: "faculty", active: true },
  { name: "Student", route: "student", active: true },
  { name: "Alumni", route: "alumni", active: false },
  { name: "Guest", route: "guest", active: false },
];

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute top-8 left-10">
        <Logo size="regular" />
        {/* <h2 className="mt-2 text-lg font-semibold text-gray-700">
          Techno Main SaltLake
        </h2> */}
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Techno Main SaltLake
          </h1>
          <p className="text-lg text-gray-600">Select Your Role</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {roles.slice(0, 3).map((role) => (
            <RoleButton
              key={role.name}
              role={role.name}
              icon={roleIcons[role.route]}
              route={role.route}
              isActive={role.active}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {roles.slice(3).map((role) => (
            <RoleButton
              key={role.name}
              role={role.name}
              icon={roleIcons[role.route]}
              route={role.route}
              isActive={role.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

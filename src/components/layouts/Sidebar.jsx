import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Users,
  Settings,
  Calendar,
  BarChart2,
  FileText,
  Bell,
  User,
  LogOut,
  Home,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import Logo from "../atoms/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const navigation = {
  student: [
    { name: "Home", icon: Home, href: "/dashboard/student" },
    {
      name: "Assignments",
      icon: FileText,
      href: "/dashboard/student/assignments",
    },
    {
      name: "Minor Project",
      icon: BookOpen,
      href: "/dashboard/student/minor-project",
    },
    {
      name: "Major Project",
      icon: BookOpen,
      href: "/dashboard/student/major-project",
    },
    { name: "Calendar", icon: Calendar, href: "/dashboard/student/calendar" },
    {
      name: "Messages",
      icon: MessageSquare,
      href: "/dashboard/student/messages",
    },
    { name: "Profile", icon: User, href: "/dashboard/student/profile" },
  ],
  faculty: [
    { name: "Home", icon: Home, href: "/dashboard/faculty" },
    { name: "My Classes", icon: Users, href: "/dashboard/faculty/classes" },
    {
      name: "Assignments",
      icon: FileText,
      href: "/dashboard/faculty/assignments",
    },
    { name: "Calendar", icon: Calendar, href: "/dashboard/faculty/calendar" },
    {
      name: "Notices",
      icon: MessageSquare,
      href: "/dashboard/faculty/notices",
    },
    { name: "Profile", icon: User, href: "/dashboard/faculty/profile" },
  ],
  admin: [
    { name: "Home", icon: Home, href: "/dashboard/admin" },
    { name: "Users", icon: Users, href: "/dashboard/admin/users" },
    { name: "Courses", icon: BookOpen, href: "/dashboard/admin/courses" },
    {
      name: "Analytics",
      icon: BarChart2,
      href: "/dashboard/admin/analytics",
    },
    { name: "Settings", icon: Settings, href: "/dashboard/admin/settings" },
    {
      name: "Notifications",
      icon: Bell,
      href: "/dashboard/admin/notifications",
    },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentNavigation = navigation[role] || navigation.student;

  const MobileToggle = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-primary text-light"
      aria-label="Toggle menu"
    >
      {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-start border-b border-secondary">
        <Logo size="small" />
      </div>

      <div className="p-2 border-b border-secondary">
        <select
          className="w-full bg-dark text-light py-2 px-3 rounded"
          value={role}
        >
          <option value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)} View
          </option>
        </select>
      </div>

      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul>
          {currentNavigation.map((item) => (
            <li key={item.name} className="px-2 py-1">
              <Link
                to={item.href}
                className={`
                  flex items-center px-3 py-2 rounded-md
                  hover:bg-secondary hover:text-light
                  ${
                    location.pathname === item.href
                      ? "bg-secondary text-light"
                      : "text-light"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-secondary">
        <button
          className="flex items-center text-light hover:text-accent w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MobileToggle />

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-dark bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="hidden lg:flex bg-dark text-light w-72 flex-col h-full">
        <SidebarContent />
      </div>

      <div
        className={`
          lg:hidden fixed inset-y-0 left-0 transform
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 bg-dark text-light z-30 transition-transform duration-300 ease-in-out h-full
        `}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;

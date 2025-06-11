import { FiUsers, FiCheckCircle, FiShield, FiActivity } from "react-icons/fi";
import StatCard from "../../components/ui/StatCard";
import ActivityList from "../../components/pages/department/ActivityList";
import { useSelector } from "react-redux";

const AnalyticsPage = () => {
  const universityData = useSelector((state) => state.university);
  const departments = universityData?.departments || [];

  const totalDepartments = departments.length;

  const activeDepartments = departments.filter(
    (dept) => dept.totalStudents > 0
  ).length;

  const totalAdmins = departments.reduce(
    (sum, dept) => sum + (dept.admins?.length || 0),
    0
  );

  const totalStudents = departments.reduce(
    (sum, dept) => sum + (dept.totalStudents || 0),
    0
  );

  const stats = [
    {
      title: "Total Departments",
      value: totalDepartments,
      icon: <FiUsers />,
      color: "blue",
    },
    {
      title: "Active Departments",
      value: activeDepartments,
      icon: <FiCheckCircle />,
      color: "green",
    },
    {
      title: "Total Administrators",
      value: totalAdmins,
      icon: <FiShield />,
      color: "purple",
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: <FiActivity />,
      color: "orange",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor university-wide statistics and performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <ActivityList />
    </>
  );
};

export default AnalyticsPage;

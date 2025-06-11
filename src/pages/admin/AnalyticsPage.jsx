import { FiUsers, FiCheckCircle, FiShield, FiActivity } from "react-icons/fi";
import StatCard from "../../components/ui/StatCard";
import ActivityList from "../../components/pages/department/ActivityList";

const AnalyticsPage = () => {
  // Mock data - would normally come from API
  const stats = [
    {
      title: "Total Departments",
      value: 6,
      icon: <FiUsers />,
      color: "blue",
    },
    {
      title: "Active Departments",
      value: 4,
      icon: <FiCheckCircle />,
      color: "green",
    },
    {
      title: "Total Administrators",
      value: 8,
      icon: <FiShield />,
      color: "purple",
    },
    {
      title: "Total Students",
      value: 1203,
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

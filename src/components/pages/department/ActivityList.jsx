import {
  FiCheckCircle,
  FiUserPlus,
  FiEdit3,
  FiAlertCircle,
} from "react-icons/fi";

const ActivityList = () => {
  const activities = [
    {
      id: 1,
      icon: <FiCheckCircle className="text-green-600" />,
      title: "Medicine department access enabled",
      time: "2 hours ago",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      icon: <FiUserPlus className="text-blue-600" />,
      title: "New administrator added to Computer Science",
      time: "1 day ago",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      icon: <FiEdit3 className="text-orange-600" />,
      title: "Business Administration department updated",
      time: "3 days ago",
      bgColor: "bg-orange-100",
    },
    {
      id: 4,
      icon: <FiAlertCircle className="text-red-600" />,
      title: "Electrical Engineering access disabled",
      time: "1 week ago",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              {activity.icon}
            </div>
            <div>
              <p className="font-medium text-gray-800">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;

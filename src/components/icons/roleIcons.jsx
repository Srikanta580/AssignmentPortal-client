import {
  FaUserShield,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const roleIcons = {
  admin: <FaUserShield className="text-4xl text-[#EE9B00]" />,
  faculty: <FaChalkboardTeacher className="text-4xl text-[#EE9B00]" />,
  student: <FaUserGraduate className="text-4xl text-[#EE9B00]" />,
  alumni: <FaUsers className="text-4xl text-gray-400" />,
  guest: <FaUser className="text-4xl text-gray-400" />,
};

export default roleIcons;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  Search,
  Users,
  Clock,
  BookOpen,
  CheckCircle,
  XCircle,
  MoreVertical,
} from "lucide-react";

const AttendanceList = () => {
  // Sample data
  const classes = [
    { id: 1, name: "Computer Science 101", code: "CS101" },
    { id: 2, name: "Mathematics for Engineers", code: "MATH202" },
    { id: 3, name: "Data Structures", code: "CS201" },
    { id: 4, name: "Algorithms", code: "CS301" },
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate sample attendance data
  const generateAttendanceData = () => {
    const data = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() - 7 + i);

      classes.forEach((cls) => {
        const totalStudents = Math.floor(Math.random() * 10) + 20;
        const presentCount = Math.floor(Math.random() * totalStudents);

        data.push({
          id: `${cls.id}-${date.getDate()}-${date.getMonth()}`,
          classId: cls.id,
          className: cls.name,
          classCode: cls.code,
          date: new Date(date),
          day: days[date.getDay()],
          totalStudents,
          presentCount,
          absentCount: totalStudents - presentCount,
          status: Math.random() > 0.2 ? "completed" : "pending",
        });
      });
    }

    return data.sort((a, b) => b.date - a.date);
  };

  const attendanceData = generateAttendanceData();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");

  // Filter attendance data based on selections
  const filteredData = attendanceData.filter((item) => {
    const matchesDate =
      item.date.getDate() === selectedDate.getDate() &&
      item.date.getMonth() === selectedDate.getMonth() &&
      item.date.getFullYear() === selectedDate.getFullYear();

    const matchesClass = selectedClass ? item.classId === selectedClass : true;
    const matchesSearch =
      item.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.classCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesClass && matchesSearch;
  });

  // Navigation functions
  const prevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Calendar view functions
  const renderMiniCalendar = () => {
    const today = new Date();
    const weekDays = [];

    for (let i = -3; i <= 3; i++) {
      const day = new Date(selectedDate);
      day.setDate(day.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="flex justify-between mb-4">
        {weekDays.map((day, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDate(day)}
            className={`flex flex-col items-center justify-center w-10 h-14 rounded-lg cursor-pointer ${
              day.getDate() === selectedDate.getDate()
                ? "bg-[#005f73] text-white"
                : day.getDate() === today.getDate()
                ? "bg-[#e6f7f9] text-[#005f73]"
                : "bg-white text-[#495057]"
            }`}
          >
            <div className="text-xs font-medium">
              {days[day.getDay()].substring(0, 3)}
            </div>
            <div className="text-sm font-bold">{day.getDate()}</div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#001219]">
            Attendance Records
          </h1>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="bg-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 shadow-sm border border-[#e9ecef]"
            >
              {viewMode === "grid" ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  List
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Grid
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-[#e9ecef]">
          <div className="flex justify-between items-center mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevDay}
              className="p-1 rounded-full hover:bg-[#e9ecef]"
            >
              <ChevronLeft className="w-5 h-5 text-[#005f73]" />
            </motion.button>

            <div className="text-center">
              <h2 className="text-lg font-bold text-[#001219]">
                {days[selectedDate.getDay()]}, {months[selectedDate.getMonth()]}{" "}
                {selectedDate.getDate()}
              </h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToToday}
                className="text-xs text-[#005f73] font-medium px-2 py-1 rounded hover:bg-[#e6f7f9]"
              >
                Today
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextDay}
              className="p-1 rounded-full hover:bg-[#e9ecef]"
            >
              <ChevronRight className="w-5 h-5 text-[#005f73]" />
            </motion.button>
          </div>

          {renderMiniCalendar()}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#6c757d]" />
            </div>
            <input
              type="text"
              placeholder="Search classes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e9ecef] focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="appearance-none bg-white pl-3 pr-8 py-2 rounded-lg border border-[#e9ecef] focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:border-transparent w-full"
              value={selectedClass || ""}
              onChange={(e) =>
                setSelectedClass(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.code})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Filter className="w-4 h-4 text-[#6c757d]" />
            </div>
          </div>
        </div>

        {/* Attendance Cards */}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-[#e9ecef]">
            <CalendarIcon className="w-10 h-10 mx-auto text-[#adb5bd] mb-4" />
            <h3 className="text-lg font-medium text-[#495057] mb-2">
              No attendance records found
            </h3>
            <p className="text-[#6c757d]">
              Try selecting a different date or class
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e9ecef]"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-[#001219]">
                        {item.className}
                      </h3>
                      <p className="text-sm text-[#6c757d]">{item.classCode}</p>
                    </div>
                    <button className="text-[#adb5bd] hover:text-[#495057]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center text-sm text-[#6c757d] mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.day},{" "}
                    {item.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-[#6c757d]" />
                      <span className="text-sm font-medium">
                        {item.totalStudents} students
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-green-600">Present</span>
                        <span className="font-medium">{item.presentCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{
                            width: `${
                              (item.presentCount / item.totalStudents) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-600">Absent</span>
                        <span className="font-medium">{item.absentCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-red-500 h-1.5 rounded-full"
                          style={{
                            width: `${
                              (item.absentCount / item.totalStudents) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#005f73] text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-white border border-[#e9ecef] text-[#495057] py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-4 h-4" />
                      Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#e9ecef]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#e9ecef]">
                <thead className="bg-[#f8f9fa]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#495057] uppercase tracking-wider"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#495057] uppercase tracking-wider"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#495057] uppercase tracking-wider"
                    >
                      Attendance
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#495057] uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-[#495057] uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#e9ecef]">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-[#f8f9fa]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#e6f7f9] rounded-full flex items-center justify-center text-[#005f73] font-bold">
                            {item.classCode}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#001219]">
                              {item.className}
                            </div>
                            <div className="text-sm text-[#6c757d]">
                              {item.totalStudents} students
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#495057]">{item.day}</div>
                        <div className="text-sm text-[#6c757d]">
                          {item.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-20 mr-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-green-600">
                                {item.presentCount}
                              </span>
                              <span className="text-red-600">
                                {item.absentCount}
                              </span>
                            </div>
                            <div className="flex h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-green-500"
                                style={{
                                  width: `${
                                    (item.presentCount / item.totalStudents) *
                                    100
                                  }%`,
                                }}
                              />
                              <div
                                className="bg-red-500"
                                style={{
                                  width: `${
                                    (item.absentCount / item.totalStudents) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#005f73] hover:text-[#00495a] mr-3">
                          View
                        </button>
                        <button className="text-[#495057] hover:text-[#001219]">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceList;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  BookOpen,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { markAttendance } from "../../features/attendance/attendanceAPI";

const Attendance = () => {
  // Sample data
  const classInfo = {
    className: "Computer Science 101",
    date: "June 13, 2025",
    teacherName: "Dr. Sarah Johnson",
    room: "B-204",
  };

  const students = [
    { id: 1, name: "Alice Johnson", rollNumber: "CS001" },
    { id: 2, name: "Bob Smith", rollNumber: "CS002" },
    { id: 3, name: "Charlie Brown", rollNumber: "CS003" },
    { id: 4, name: "Diana Prince", rollNumber: "CS004" },
    { id: 5, name: "Ethan Hunt", rollNumber: "CS005" },
    { id: 6, name: "Fiona Green", rollNumber: "CS006" },
    { id: 7, name: "George Wilson", rollNumber: "CS007" },
    { id: 8, name: "Hannah Davis", rollNumber: "CS008" },
  ];

  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendance, setAttendance] = useState({});
  const [direction, setDirection] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMarkAttendance = (status) => {
    const currentStudent = students[currentIndex];

    // Dispatch attendance save API call
    dispatch(
      markAttendance({
        studentId: 12,
        present: status === "present" ? true : false,
        classId: 7,
      })
    );

    // Update local state
    setAttendance((prev) => ({
      ...prev,
      [currentStudent.id]: status,
    }));

    if (currentIndex < students.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetAttendance = () => {
    setCurrentIndex(0);
    setAttendance({});
    setIsCompleted(false);
    setDirection(1);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.02 },
  };

  if (isCompleted) {
    const presentCount = Object.values(attendance).filter(
      (status) => status === "present"
    ).length;
    const absentCount = Object.values(attendance).filter(
      (status) => status === "absent"
    ).length;

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 border border-[#e9ecef]"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-[#e6f7f9] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-[#005f73]" />
              </motion.div>
              <h2 className="text-xl font-bold text-[#001219] mb-2">
                Attendance Recorded!
              </h2>
              <p className="text-[#495057] mb-4">
                {presentCount} present, {absentCount} absent
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {students.slice(0, 6).map((student) => {
                  const status = attendance[student.id];
                  let bgColor =
                    status === "present" ? "bg-[#0a9396]" : "bg-[#9b2226]";
                  return (
                    <motion.div
                      key={student.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * student.id }}
                      className={`${bgColor} w-6 h-6 rounded-full`}
                    />
                  );
                })}
                {students.length > 6 && (
                  <div className="w-6 h-6 rounded-full bg-[#e9ecef] flex items-center justify-center text-xs">
                    +{students.length - 6}
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetAttendance}
                className="w-full bg-[#005f73] text-white py-2 rounded-lg font-medium hover:bg-[#00495a] transition-colors shadow-sm"
              >
                Mark Another Session
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentStudent = students[currentIndex];
  const progress = ((currentIndex + 1) / students.length) * 100;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-4 mb-4 border border-[#e9ecef]"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-lg font-bold text-[#001219] flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-[#005f73]" />
                {classInfo.className}
              </h1>
              <div className="text-xs text-[#495057] mt-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {classInfo.date} • Room {classInfo.room}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-[#005f73]">
                {currentIndex + 1}/{students.length}
              </div>
              <div className="w-20 bg-[#e9ecef] rounded-full h-1.5 mt-1">
                <motion.div
                  className="bg-[#005f73] h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Student Card */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="bg-white rounded-xl shadow-md p-6 mb-4 border border-[#e9ecef]"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-gradient-to-br from-[#005f73] to-[#0a9396] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-xl font-bold text-white">
                    {currentStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-[#001219] mb-1"
                >
                  {currentStudent.name}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-[#495057] mb-6"
                >
                  {currentStudent.rollNumber}
                </motion.p>

                {/* Attendance Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleMarkAttendance("present")}
                    className="flex-1 bg-[#005f73] text-white py-3 rounded-lg font-medium text-sm shadow-sm hover:bg-[#00495a] transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Present
                  </motion.button>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleMarkAttendance("absent")}
                    className="flex-1 bg-[#9b2226] text-white py-3 rounded-lg font-medium text-sm shadow-sm hover:bg-[#7a1b1e] transition-colors flex items-center justify-center"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Absent
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-3">
          <motion.button
            initial={{ opacity: currentIndex > 0 ? 1 : 0 }}
            animate={{ opacity: currentIndex > 0 ? 1 : 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goBack}
            className={`flex-1 bg-[#e9ecef] text-[#495057] py-2 rounded-lg font-medium hover:bg-[#d1d7dd] transition-colors flex items-center justify-center ${
              currentIndex === 0 ? "invisible" : ""
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (currentIndex < students.length - 1) {
                setDirection(1);
                setCurrentIndex((prev) => prev + 1);
              } else {
                setIsCompleted(true);
              }
            }}
            className="flex-1 bg-[#0a9396] text-white py-2 rounded-lg font-medium hover:bg-[#088184] transition-colors flex items-center justify-center shadow-sm"
          >
            {currentIndex === students.length - 1 ? "Complete" : "Skip"}
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

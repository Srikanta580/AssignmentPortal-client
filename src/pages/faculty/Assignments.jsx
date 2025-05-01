import { useState } from "react";
import SubjectAccordion from "../../components/ui/SubjectAccordion";
import { BookOpen } from "lucide-react";

const subjects = [
  {
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Fundamentals of programming and computer systems",
  },
  {
    code: "MATH201",
    title: "Calculus II",
    description: "Advanced calculus concepts including integration and series",
  },
  {
    code: "PHY150",
    title: "Physics for Engineers",
    description: "Mechanics, thermodynamics and wave phenomena",
  },
];

export default function AssignmentPage() {
  const [activeSubject, setActiveSubject] = useState(null);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {subjects.map((subject) => (
          <SubjectAccordion
            key={subject.code}
            subject={subject}
            isActive={activeSubject === subject.code}
            onToggle={() =>
              setActiveSubject(
                activeSubject === subject.code ? null : subject.code
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

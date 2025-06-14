import React, { useState, useEffect } from "react";
import SubjectAccordion from "../../components/ui/SubjectAccordion";
import { BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesByFaculty } from "../../features/faculty/facultyAPI";


export default function AssignmentPage() {
  const [activeSubject, setActiveSubject] = useState(null);
  const dispatch = useDispatch();
  const {subjects = [] } = useSelector((state) => state?.faculty);
  const { id } = useSelector((state) => state?.auth?.user);


  useEffect(() => {
    const res = dispatch(fetchClassesByFaculty({ facultyId: id }));
  }, [dispatch, id]);
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {subjects.map((subject) => (
          <SubjectAccordion
            key={subject.subjectCode}
            subject={subject}
            isActive={activeSubject === subject.subjectCode}
            onToggle={() =>
              setActiveSubject(
                activeSubject === subject.subjectCode ? null : subject.subjectCode
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

// FacultyAssignments.jsx
import SubjectAccordion from "../../components/ui/SubjectAccordion";

const subjects = ["CS101", "MATH201", "PHY150"];

export default function AssignmentPage() {
  return (
    <div className="space-y-4">
      {subjects.map((sub) => (
        <SubjectAccordion key={sub} subject={sub} />
      ))}
    </div>
  );
}

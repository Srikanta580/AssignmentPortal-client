// AssignmentLayout.jsx
import { Link, Outlet, useParams } from "react-router-dom";

const tabs = [
  { key: "class", label: "Class Assignments" },
  { key: "ca1", label: "CA1 – Continuous Assessment 1" },
  { key: "ca2", label: "CA2 – Continuous Assessment 2" },
  { key: "ca3", label: "CA3 – Continuous Assessment 3" },
];

export default function AssignmentLayout() {
  const { type } = useParams(); // "class", "ca1", or "ca2"

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">Assignments</h1>
      {/* Top cards */}
      <div className="grid-four-cols">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            to={tab.key}
            className={`
              card text-center font-semibold transition
              ${
                type === tab.key
                  ? "bg-secondary text-white"
                  : "bg-light text-dark hover:bg-secondary/20"
              }
            `}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Nested content */}
      <Outlet />
    </div>
  );
}

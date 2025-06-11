import { useState } from "react";
import { FiDownload, FiPlus } from "react-icons/fi";
import DepartmentTable from "./DepartmentTable";
import Button from "../../ui/Button";
import SearchFilter from "../../ui/SearchFilter";

const DepartmentList = ({ onAddDepartment }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - would normally come from API
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Computer Science",
      access: true,
      lastActive: "2 hours ago",
      adminCount: 3,
      studentCount: 245,
      code: "CS",
      head: "Dr. Sarah Johnson",
    },
    // ... other departments
  ]);

  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch = dept.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && dept.access) ||
      (filterStatus === "inactive" && !dept.access);
    return matchesSearch && matchesFilter;
  });

  const toggleDepartmentAccess = (id) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id ? { ...dept, access: !dept.access } : dept
      )
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Department Management
        </h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<FiDownload />}>
            Export
          </Button>
          <Button onClick={onAddDepartment} icon={<FiPlus />}>
            Add Department
          </Button>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterStatus}
        onFilterChange={setFilterStatus}
        placeholder="Search departments..."
        filterOptions={[
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
      />

      <DepartmentTable
        departments={filteredDepartments}
        onToggleAccess={toggleDepartmentAccess}
      />

      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredDepartments.length} of {departments.length} departments
      </div>
    </>
  );
};

export default DepartmentList;

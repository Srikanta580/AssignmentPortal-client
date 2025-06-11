import { useState } from "react";
import { FiDownload, FiPlus } from "react-icons/fi";
import DepartmentTable from "./DepartmentTable";
import Button from "../../ui/Button";
import SearchFilter from "../../ui/SearchFilter";
import { useSelector } from "react-redux";

const DepartmentList = ({ onAddDepartment, handleAddAdmin }) => {
  const universityData = useSelector((state) => state.university);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredDepartments = universityData.departments.filter((dept) => {
    const matchesSearch = dept.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && dept.access) ||
      (filterStatus === "inactive" && !dept.access);
    return matchesSearch && matchesFilter;
  });

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
        handleAddAdmin={handleAddAdmin}
      />

      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredDepartments.length} of{" "}
        {universityData.departments.length} departments
      </div>
    </>
  );
};

export default DepartmentList;

import { useState } from "react";
import { FiDownload, FiUserPlus } from "react-icons/fi";
import AdminTable from "./AdminTable";
import Button from "../../ui/Button";
import SearchFilter from "../../ui/SearchFilter";
import { useSelector } from "react-redux";

const AdminsList = ({ onAddAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const universityData = useSelector((state) => state.university);

  const filteredAdmins = universityData.departments
    .flatMap((dept) =>
      dept.admins?.map((admin) => ({
        ...admin,
        department: dept.name, // attach department name for searching
      }))
    )
    .filter(
      (admin) =>
        admin?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin?.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Administrator Management
        </h1>
        {/* <div className="flex space-x-3">
          <Button
            variant="outline"
            icon={<FiDownload />}
            disabled={true}
            className="bg-gray-500"
          >
            Export
          </Button>
          <Button
            onClick={onAddAdmin}
            disabled={true}
            className="bg-gray-500"
            icon={<FiUserPlus />}
          >
            Add Administrator
          </Button>
        </div> */}
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search administrators..."
      />

      <AdminTable admins={filteredAdmins} />

      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredAdmins.length} of {filteredAdmins.length}{" "}
        administrators
      </div>
    </>
  );
};

export default AdminsList;

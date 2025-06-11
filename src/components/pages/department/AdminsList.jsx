import { useState } from "react";
import { FiDownload, FiUserPlus } from "react-icons/fi";
import AdminTable from "./AdminTable";
import Button from "../../ui/Button";
import SearchFilter from "../../ui/SearchFilter";

const AdminsList = ({ onAddAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@university.edu",
      phone: "+1 (555) 123-4567",
      department: "Computer Science",
      role: "Department Admin",
      status: "active",
      lastLogin: "2 hours ago",
      joinDate: "2023-01-15",
    },
    // ... other admins
  ]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Administrator Management
        </h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<FiDownload />}>
            Export
          </Button>
          <Button onClick={onAddAdmin} icon={<FiUserPlus />}>
            Add Administrator
          </Button>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search administrators..."
      />

      <AdminTable admins={filteredAdmins} />

      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredAdmins.length} of {admins.length} administrators
      </div>
    </>
  );
};

export default AdminsList;

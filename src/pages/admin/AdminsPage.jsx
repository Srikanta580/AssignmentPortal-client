import { useState } from "react";
import AdminList from "../../components/pages/department/AdminsList";
import Modal from "../../components/ui/Modal";
import AdminAddForm from "../../components/forms/AdminAddForm";

const AdminsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <AdminList onAddAdmin={() => setShowAddForm(true)} />

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <AdminAddForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(data) => {
            console.log("New admin:", data);
            setShowAddForm(false);
          }}
        />
      </Modal>
    </>
  );
};

export default AdminsPage;

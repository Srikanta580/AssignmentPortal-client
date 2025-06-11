import { useState } from "react";
import AdminList from "../../components/pages/department/AdminsList";
import Modal from "../../components/ui/Modal";
import AdminAddForm from "../../components/forms/AdminAddForm";
import { useDispatch } from "react-redux";
import { addDepartmentalAdmin } from "../../features/university/universityAPI";

const AdminsPage = () => {
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const handleAddAdmin = (formData) => {
    dispatch(addDepartmentalAdmin(formData));
    setShowAddForm(false); // close modal after dispatch
  };

  return (
    <>
      <AdminList onAddAdmin={() => setShowAddForm(true)} />

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <AdminAddForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddAdmin}
        />
      </Modal>
    </>
  );
};

export default AdminsPage;

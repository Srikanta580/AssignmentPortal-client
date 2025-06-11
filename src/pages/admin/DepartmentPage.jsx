import { useState } from "react";
import DepartmentList from "../../components/pages/department/DepartmentList";
import Modal from "../../components/ui/Modal";
import DepartmentAddForm from "../../components/forms/DepartmentAddForm";

const DepartmentsPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <DepartmentList onAddDepartment={() => setShowAddForm(true)} />

      <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
        <DepartmentAddForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(data) => {
            console.log("Submitting:", data);
            setShowAddForm(false);
          }}
        />
      </Modal>
    </>
  );
};

export default DepartmentsPage;

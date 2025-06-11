import { useState } from "react";
import DepartmentList from "../../components/pages/department/DepartmentList";
import Modal from "../../components/ui/Modal";
import DepartmentAddForm from "../../components/forms/DepartmentAddForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  addDepartmentalAdmin,
} from "../../features/university/universityAPI";
import AdminAddForm from "../../components/forms/AdminAddForm";

const DepartmentsPage = () => {
  const dispatch = useDispatch();
  const universityId = useSelector((state) => state.university.id);
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [showAddDeptForm, setShowAddDeptForm] = useState(false);
  const [departmentId, setDepartmentId] = useState(null);

  const openAddAdmimForm = (deptId) => {
    console.log(deptId);
    setShowAddAdminForm(true);
    setDepartmentId(deptId);
  };

  const handleAddAdmin = (formData) => {
    dispatch(
      addDepartmentalAdmin({
        ...formData,
        deptId: departmentId,
        universityId: universityId,
      })
    );
    setShowAddAdminForm(false); // close modal after dispatch
  };

  const handleAddDept = (formData) => {
    dispatch(
      addDepartment({
        ...formData,
        universityId: universityId,
      })
    );
    setShowAddAdminForm(false); // close modal after dispatch
  };

  return (
    <>
      <DepartmentList
        onAddDepartment={() => setShowAddDeptForm(true)}
        handleAddAdmin={openAddAdmimForm}
      />

      <Modal isOpen={showAddDeptForm} onClose={() => setShowAddDeptForm(false)}>
        <DepartmentAddForm
          onClose={() => setShowAddDeptForm(false)}
          onSubmit={handleAddDept}
        />
      </Modal>

      <Modal
        isOpen={showAddAdminForm}
        onClose={() => setShowAddAdminForm(false)}
      >
        <AdminAddForm
          onClose={() => setShowAddAdminForm(false)}
          onSubmit={handleAddAdmin}
        />
      </Modal>
    </>
  );
};

export default DepartmentsPage;

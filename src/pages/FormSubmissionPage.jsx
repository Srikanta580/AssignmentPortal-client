import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchForm } from "../features/admin/formSlice";
import FormComponent from "../components/forms/FormComponent";

function FormSubmissionPage() {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const { submissionForm: form } = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(fetchForm(formId));
  }, [dispatch, formId]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  if (!form || !form.questions) {
    return <p className="text-center text-gray-500">Loading form...</p>;
  }

  return <FormComponent form={form} onSubmit={handleSubmitForm} />;
}

export default FormSubmissionPage;

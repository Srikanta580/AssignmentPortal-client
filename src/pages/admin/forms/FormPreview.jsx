import { useSelector } from "react-redux";
import FormComponent from "../../../components/forms/FormComponent";

const FormPreview = () => {
  const { form } = useSelector((state) => state.forms);

  if (!form || !form.questions) return <p>Loading preview...</p>;

  return <FormComponent form={form} />;
};

export default FormPreview;

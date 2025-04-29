import { FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";

const FormCard = ({ form }) => {
  const handleExport = (e) => {
    e.stopPropagation();
    // Dummy export logic
    alert(`Exporting form: ${form.title}`);
  };

  return (
    <div className="card relative">
      <Link to={`/dashboard/admin/forms/${form.id}`} className="block">
        <FileText className="text-primary w-10 h-10 mb-4" />
        <h3 className="card-title">{form.title}</h3>
        <p className="text-gray-700 text-sm">Created: {form.createdAt}</p>
      </Link>
      <button
        onClick={handleExport}
        className="absolute top-4 right-4 text-primary cursor-pointer"
      >
        <Download />
      </button>
    </div>
  );
};

export default FormCard;

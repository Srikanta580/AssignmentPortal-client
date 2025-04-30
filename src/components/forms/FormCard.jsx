import { FileText, Download, Share2, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../modals/ConfirmModal";
import ShareModal from "../modals/ShareModal";

const FormCard = ({ form }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const currentUrl = window.location.href;
  const handleExport = (e) => {
    e.stopPropagation();
    // Dummy export logic
    alert(`Exporting form: ${form.title}`);
  };

  const handleShare = () => {
    setShareOpen(true);
  };

  const handleDelete = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="card relative">
        <Link to={`/dashboard/admin/forms/${form.id}`} className="block">
          <FileText className="text-primary w-10 h-10 mb-4" />
          <h3 className="card-title">{form.title}</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore,
            itaque voluptate ad minima non veniam.
          </p>
          <p className="text-gray-700 text-sm font-medium">
            Created: {form.createdAt}
          </p>
        </Link>
        <button
          onClick={handleExport}
          className="absolute top-4 right-16 text-primary cursor-pointer"
        >
          <Download />
        </button>
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-red-700 cursor-pointer"
        >
          <Trash2 />
        </button>
        <div className="w-full flex justify-between items-center mt-4">
          <button
            onClick={handleShare}
            className="text-primary cursor-pointer flex gap-x-2 py-2 px-5 bg-white rounded-lg font-semibold"
          >
            <Share2 />
            Share
          </button>
          <button
            onClick={handleExport}
            className="text-primary cursor-pointer flex gap-x-2 py-2 px-5 bg-white rounded-lg font-semibold"
          >
            <Edit2 />
            Edit
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete this item?"
        message="This action is permanent and cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />
      <ShareModal
        open={isShareOpen}
        onClose={setShareOpen}
        shareUrl={currentUrl}
      />
    </>
  );
};

export default FormCard;

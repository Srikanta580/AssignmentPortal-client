import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../../features/admin/adminAPI";
import { Link } from "react-router-dom";
import FormCard from "../../../components/forms/FormCard";
import { PlusIcon } from "lucide-react";

const FormsPage = () => {
  const dispatch = useDispatch();
  const { forms, loading } = useSelector((state) => state?.forms);

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto text-dark">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Forms</h1>
        <Link
          to="/dashboard/admin/forms/create"
          className="flex items-center justify-center gap-2 p-3
          bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500
          text-white font-semibold rounded-lg shadow-lg
          hover:scale-105 hover:shadow-pink-500/50 transition-transform duration-300
          animate-pulse hover:animate-none"
        >
          <PlusIcon />
          Create Form
        </Link>
      </div>

      {loading ? (
        <div>Loading forms...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsPage;

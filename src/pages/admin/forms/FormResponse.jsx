import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormResponses } from "../../../features/admin/formSlice";
import { ArrowLeft, MoveLeftIcon } from "lucide-react";

const FormResponses = () => {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responses } = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(fetchFormResponses(formId));
  }, [dispatch, formId]);

  const formResponses = responses[formId] || [];

  // Dummy multi-page form data for preview
  const dummyFormPages = [
    {
      title: "Personal Information",
      fields: [
        { id: "name", label: "Full Name", type: "text" },
        { id: "email", label: "Email Address", type: "email" },
        { id: "phone", label: "Phone Number", type: "tel" },
      ],
    },
    {
      title: "Address Details",
      fields: [
        { id: "street", label: "Street Address", type: "text" },
        { id: "city", label: "City", type: "text" },
        { id: "state", label: "State/Province", type: "text" },
        { id: "zip", label: "Zip/Postal Code", type: "text" },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        { id: "occupation", label: "Occupation", type: "text" },
        { id: "interests", label: "Interests", type: "textarea" },
        { id: "referral", label: "How did you hear about us?", type: "text" },
      ],
    },
  ];

  // const responseData = useMemo(()=>{
  const r = dummyFormPages.map((form) =>
    form.fields.map((field) => field.label)
  );
  const r2 = r.flat();
  console.log(r2);

  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < dummyFormPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ArrowLeft
        onClick={() => navigate(-1)}
        size={30}
        cursor="pointer"
        className="bg-none hover:bg-gray-50 size-9 p-2 rounded-full"
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left side: Responses Table (70% width) */}
        <div className="w-[75%] overflow-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              {formResponses.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No responses yet.
                </div>
              ) : (
                <table className="min-w-full table-auto">
                  <thead className="bg-light">
                    <tr>
                      {r2.map((col) => (
                        <th key={col} className="px-4 py-2 text-left text-dark">
                          <div className="flex flex-col">
                            <span className="font-medium">{col}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light">
                    {/* {students.map((student, index) => ( */}
                    <tr key={1} className="hover:bg-light/50">
                      <td className="px-4 py-2">""</td>
                      {/* <td className="px-4 py-2">{student.lastName}</td>
                        <td className="px-4 py-2">{student.rollNo}</td>
                        <td className="px-4 py-2">{student.admissionYear}</td>
                        <td className="px-4 py-2">{student.semester}</td>
                        <td className="px-4 py-2">{student.email}</td>
                        <td className="px-4 py-2">{student.password}</td>
                        <td className="px-4 py-2">{student.phone}</td> */}
                    </tr>
                    {/* ))} */}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Form Preview (30% width) */}
        <div className="w-[25%] px-4">
          <div className="bg-white rounded-lg shadow h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Form Preview</h2>
              <div className="text-sm text-gray-500 mt-1">
                Page {currentPage + 1} of {dummyFormPages.length}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {dummyFormPages[currentPage].title}
                </h3>

                {dummyFormPages[currentPage].fields.map((field) => (
                  <div key={field.id} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        rows="3"
                        disabled
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        disabled
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t flex justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded ${
                  currentPage === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous Page
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === dummyFormPages.length - 1}
                className={`px-4 py-2 rounded ${
                  currentPage === dummyFormPages.length - 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResponses;

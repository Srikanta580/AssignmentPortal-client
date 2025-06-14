import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchFormResponses } from "../../../features/admin/formSlice";
import { ArrowLeft } from "lucide-react";

const FormResponses = () => {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { responses } = useSelector((state) => state.forms);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      const responses = await dispatch(fetchFormResponses(formId)).unwrap();
      setResponses(responses.responses);
    };
    fetchResponses();
  }, [dispatch, formId]);

  const allLabels = useMemo(() => {
    if (responses.length === 0) return [];
    const labelSet = new Set();
    responses.forEach((submission) => {
      submission.parsedAnswers?.forEach((a) => labelSet.add(a.label));
    });
    return Array.from(labelSet);
  }, [responses]);

  return (
    <div className="flex flex-col h-screen">
      <ArrowLeft
        onClick={() => navigate(-1)}
        size={30}
        cursor="pointer"
        className="bg-none hover:bg-gray-50 size-9 p-2 rounded-full"
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left side: Responses Table (75%) */}
        <div className="w-full overflow-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              {responses.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No responses yet.
                </div>
              ) : (
                <table className="min-w-full table-auto">
                  <thead className="bg-light">
                    <tr>
                      <th className="px-4 py-2 text-left text-dark">
                        Submitted By
                      </th>
                      <th className="px-4 py-2 text-left text-dark">
                        Submitted At
                      </th>
                      {allLabels.map((label) => (
                        <th
                          key={label}
                          className="px-4 py-2 text-left text-dark"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light">
                    {responses.map((submission, index) => (
                      <tr
                        key={submission.id || index}
                        className="hover:bg-light/50"
                      >
                        <td className="px-4 py-2">
                          {submission.submittedBy || "Anonymous"}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </td>
                        {allLabels.map((label) => {
                          const answer = submission.parsedAnswers?.find(
                            (a) => a.label === label
                          );
                          return (
                            <td key={label} className="px-4 py-2">
                              {answer?.answer ?? "-"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResponses;

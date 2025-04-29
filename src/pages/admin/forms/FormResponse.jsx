import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormResponses } from "../../../features/admin/formSlice";

const FormResponses = () => {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const { responses } = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(fetchFormResponses(formId));
  }, [dispatch, formId]);

  const formResponses = responses[formId] || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Responses</h1>

      <div className="bg-gray-800 p-4 rounded-lg">
        {formResponses.length === 0 ? (
          <div>No responses yet.</div>
        ) : (
          <div className="space-y-4">
            {formResponses.map((res, index) => (
              <div key={res.id} className="p-4 bg-gray-700 rounded-md">
                <h2 className="text-lg font-semibold text-primary">
                  Response {index + 1}
                </h2>
                <ul className="text-gray-300 ml-4 mt-2 list-disc">
                  {res.answers.map((answer, idx) => (
                    <li key={idx}>{answer}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormResponses;

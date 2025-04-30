import { useSelector } from "react-redux";

const FormPreview = () => {
  const { form } = useSelector((state) => state.forms);

  if (!form || !form.questions) return <p>Loading preview...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 pb-2 border-b border-gray-200">
        <h2
          className="text-2xl font-bold"
          style={{ color: form.themeColor, fontFamily: form.fontStyle }}
        >
          {form.title || "Untitled Form"}
        </h2>
        <p
          className="mt-2 text-gray-500"
          style={{ fontFamily: form.fontStyle }}
        >
          {form.description || "Please fill out this form"}
        </p>
      </div>

      {form.questions.map((item, idx) => (
        <div
          key={idx}
          className={`mb-4 transition-all ${
            form.style === "card" ? "bg-gray-50 p-4 rounded-md" : ""
          }`}
        >
          <label
            className="block mb-2 font-medium"
            style={{
              fontFamily: form.fontStyle,
              color: form.style === "minimal" ? form.themeColor : "#005f73",
            }}
          >
            {item.label}
          </label>

          {item.type === "text" && (
            <input type="text" className="w-full border p-2 rounded" readOnly />
          )}
          {item.type === "email" && (
            <input
              type="email"
              className="w-full border p-2 rounded"
              readOnly
            />
          )}
          {item.type === "textarea" && (
            <textarea className="w-full border p-2 rounded" readOnly />
          )}
          {item.type === "checkbox" && (
            <div>
              <input type="checkbox" disabled /> <span>{item.label}</span>
            </div>
          )}
          {/* Add more types if needed */}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;

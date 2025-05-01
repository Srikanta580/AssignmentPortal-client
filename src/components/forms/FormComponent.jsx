import React from "react";

function FormComponent({ form, onSubmit }) {
  return (
    <form
      className={`max-w-2xl mx-auto my-8 p-6 ${
        form.formStyle === "glassmorphism"
          ? "backdrop-blur-md bg-opacity-20"
          : ""
      } rounded-lg shadow-md relative overflow-hidden`}
      style={{
        backgroundColor:
          form.formStyle === "minimal"
            ? "transparent"
            : form.formStyle === "glassmorphism"
            ? "rgba(248, 250, 252, 0.85)"
            : "#ffffff",
        boxShadow:
          form.formStyle === "card"
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        border:
          form.formStyle === "bordered"
            ? `2px solid ${form.themeColor}`
            : "1px solid rgb(229, 231, 235)",
        borderRadius: form.borderRadius,
      }}
      onSubmit={onSubmit}
    >
      {/* Background pattern for glassmorphism */}
      {form.formStyle === "glassmorphism" && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-10"
            style={{ backgroundColor: form.themeColor }}
          ></div>
          <div
            className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-5"
            style={{ backgroundColor: form.accentColor }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 h-20 w-20 rounded-full opacity-10"
            style={{ backgroundColor: form.themeColor }}
          ></div>
        </div>
      )}

      {/* Form Header */}
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

      {/* Form Fields */}
      <div className="space-y-4">
        {form.questions.map((item, idx) => (
          <div
            key={idx}
            className={`transition-all ${
              form.formStyle === "card"
                ? "bg-gray-50 bg-opacity-60 p-4 rounded-md"
                : ""
            }`}
          >
            <label
              className="block mb-2 font-medium"
              style={{
                fontFamily: form.fontStyle,
                color:
                  form.formStyle === "minimal"
                    ? form.themeColor
                    : "rgb(55, 65, 81)",
              }}
            >
              {item.label}
            </label>

            {/* Render form inputs */}
            {item.type === "text" && (
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Your answer"
              />
            )}
            {item.type === "email" && (
              <input
                type="email"
                className="w-full border p-2 rounded"
                placeholder="Your email"
              />
            )}
            {item.type === "textarea" && (
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Your response"
              />
            )}
            {item.type === "yes_no" && (
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name={`yesno-${idx}`} value="Yes" />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name={`yesno-${idx}`} value="No" />
                  No
                </label>
              </div>
            )}
            {item.type === "checkbox" && (
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{item.label}</span>
              </div>
            )}
            {/* Add more types as needed */}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-4 mt-6 border-t border-gray-200 text-right">
        <button
          className="py-2 px-4 text-white"
          style={{
            backgroundColor: form.accentColor,
            borderRadius: form.borderRadius,
          }}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormComponent;

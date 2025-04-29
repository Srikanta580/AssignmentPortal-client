import { useEffect, useState } from "react";
import {
  Share,
  Share2,
  PaintBucket,
  Type,
  Layout,
  Palette,
  Eye,
  CheckCircle,
  Download,
  Save,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { generateForm } from "../../../features/admin/adminAPI";

const CreateForm = () => {
  const dispatch = useDispatch();
  const { form, loading } = useSelector((state) => state?.forms);
  const [prompt, setPrompt] = useState("");
  const [generatedForm, setGeneratedForm] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [themeColor, setThemeColor] = useState("#005f73"); // Default primary color
  const [fontStyle, setFontStyle] = useState("Poppins");

  // Additional customization options
  const [accentColor, setAccentColor] = useState("#94d2bd");
  const [borderRadius, setBorderRadius] = useState("md");
  const [spacing, setSpacing] = useState("normal");
  const [showCustomizations, setShowCustomizations] = useState(true);
  const [formStyle, setFormStyle] = useState("standard");
  const [buttonStyle, setButtonStyle] = useState("solid");
  const [inputStyle, setInputStyle] = useState("filled");
  const [showHeader, setShowHeader] = useState(true);
  const [formBranding, setFormBranding] = useState(true);

  useEffect(() => {
    if (form) {
      setGeneratedForm(form.questions);
      setFormTitle(form.title);
      setShowCustomizations(true);
    }
  }, [form]);

  const handleGenerate = async () => {
    try {
      const formResponse = await dispatch(generateForm(prompt));
      console.log("Generated form : ", formResponse.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {
    alert("Form link copied! (Mock)");
  };

  // Get spacing class based on selection
  const getSpacingClass = () => {
    switch (spacing) {
      case "compact":
        return "space-y-3";
      case "normal":
        return "space-y-6";
      case "relaxed":
        return "space-y-8";
      default:
        return "space-y-6";
    }
  };

  // Get border radius class based on selection
  const getBorderRadiusClass = () => {
    switch (borderRadius) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "full":
        return "rounded-full";
      default:
        return "rounded-md";
    }
  };

  // Function to get input class based on style
  const getInputClass = (baseClass) => {
    const radiusClass = getBorderRadiusClass();
    switch (inputStyle) {
      case "filled":
        return `${baseClass} border border-gray-600 ${radiusClass}`;
      case "outlined":
        return `${baseClass} bg-transparent border-2 border-gray-500 ${radiusClass}`;
      case "underlined":
        return `${baseClass} bg-transparent border-b-2 border-gray-500 rounded-none px-0`;
      case "minimal":
        return `${baseClass} bg-gray-800 border-none ${radiusClass} shadow-sm`;
      default:
        return `${baseClass} border border-gray-600 ${radiusClass}`;
    }
  };

  // Render different form input types
  const renderFormInput = (item) => {
    switch (item.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder="Your answer..."
            className={getInputClass(
              "w-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
            )}
            style={{
              fontFamily: fontStyle,
              borderColor: inputStyle === "outlined" ? themeColor : undefined,
              borderBottomColor:
                inputStyle === "underlined" ? themeColor : undefined,
              focusRing: themeColor,
            }}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder="Your answer..."
            className={getInputClass(
              "w-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all h-24 resize-none"
            )}
            style={{
              fontFamily: fontStyle,
              borderColor: inputStyle === "outlined" ? themeColor : undefined,
              borderBottomColor:
                inputStyle === "underlined" ? themeColor : undefined,
            }}
          />
        );
      case "rating":
        return (
          <div className="flex gap-4 py-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className={`h-10 w-10 flex items-center justify-center ${getBorderRadiusClass()} transition-all hover:opacity-80`}
                style={{
                  backgroundColor:
                    rating === 1
                      ? "rgba(10, 147, 150, 0.2)"
                      : "rgba(10, 147, 150, 0.1)",
                  border: `1px solid ${themeColor}`,
                  color: rating === 1 ? themeColor : "white",
                }}
              >
                {rating}
              </button>
            ))}
          </div>
        );
      case "radio":
        return (
          <div className="space-y-2 py-2">
            {item.options.map((option, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-1 hover:  hover:bg-opacity-30 rounded transition-colors"
              >
                <div
                  className="h-5 w-5 rounded-full flex items-center justify-center transition-all"
                  style={{
                    border: `2px solid ${
                      i === 0 ? themeColor : "rgba(255,255,255,0.3)"
                    }`,
                    backgroundColor:
                      i === 0 ? "rgba(10, 147, 150, 0.1)" : "transparent",
                  }}
                >
                  {i === 0 && (
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    ></div>
                  )}
                </div>
                <span style={{ fontFamily: fontStyle }}>{option}</span>
              </div>
            ))}
          </div>
        );
      case "select":
        return (
          <div className="relative">
            <select
              className={getInputClass(
                "w-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all appearance-none pr-10"
              )}
              style={{
                fontFamily: fontStyle,
                borderColor: inputStyle === "outlined" ? themeColor : undefined,
                borderBottomColor:
                  inputStyle === "underlined" ? themeColor : undefined,
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              {item.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ArrowRight
                size={16}
                className="transform rotate-90 text-gray-400"
              />
            </div>
          </div>
        );
      default:
        return (
          <input
            type="text"
            placeholder="Your answer..."
            className={getInputClass(
              "w-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
            )}
            style={{ fontFamily: fontStyle }}
          />
        );
    }
  };

  // Function to render submit button based on style
  const renderSubmitButton = () => {
    const radiusClass = getBorderRadiusClass();
    const baseClasses = "py-3 px-6 font-medium transition-all";

    switch (buttonStyle) {
      case "solid":
        return (
          <button
            className={`${baseClasses} ${radiusClass} text-white hover:shadow-lg`}
            style={{ backgroundColor: themeColor }}
          >
            Submit
          </button>
        );
      case "outline":
        return (
          <button
            className={`${baseClasses} ${radiusClass} hover:bg-opacity-10 border-2`}
            style={{ borderColor: themeColor, color: themeColor }}
          >
            Submit
          </button>
        );
      case "ghost":
        return (
          <button
            className={`${baseClasses} ${radiusClass} hover:bg-opacity-10`}
            style={{ color: themeColor }}
          >
            Submit
          </button>
        );
      case "gradient":
        return (
          <button
            className={`${baseClasses} ${radiusClass} text-white hover:shadow-lg`}
            style={{
              background: `linear-gradient(45deg, ${themeColor}, ${accentColor})`,
            }}
          >
            Submit
          </button>
        );
      default:
        return (
          <button
            className={`${baseClasses} ${radiusClass} text-white hover:shadow-lg`}
            style={{ backgroundColor: themeColor }}
          >
            Submit
          </button>
        );
    }
  };

  return (
    <div className="w-full text-dark" style={{ color: "var(--color-dark)" }}>
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          Create Form
        </h1>
        {generatedForm && (
          <div className="flex gap-x-4">
            <button
              onClick={() => {}}
              className="flex items-center gap-2 py-2 px-4 text-white transition-all transform hover:scale-105"
              style={{
                backgroundColor: "var(--color-secondary)",
                borderRadius: "0.375rem",
              }}
            >
              <Eye size={18} /> Live Preview
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 py-2 px-4 text-white transition-all transform hover:scale-105"
              style={{
                backgroundColor: "var(--color-primary)",
                borderRadius: "0.375rem",
              }}
            >
              <Share2 size={18} /> Share
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Form Creator */}
        <div>
          <div className="space-y-4">
            <label className="text-primary font-semibold flex items-center gap-2">
              <Layout size={18} /> Prompt
            </label>
            <textarea
              className="w-full h-32 p-4 text-black border rounded-md focus:outline-none transition-all"
              placeholder="Enter prompt to generate a form..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Customization Section - Shows after generation */}
          {showCustomizations && (
            <div className="space-y-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <h2
                  className="text-xl font-bold flex items-center gap-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  <Palette size={20} /> Customize Form
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Theme Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-10 h-10 border-2 border-gray-600 rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="  text-white p-2 rounded-md border border-gray-600 w-24"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 border-2 border-gray-600 rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="text-white p-2 rounded-md border border-gray-600 w-24"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Font Style
                  </label>
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value)}
                    className="w-full p-2 text-white rounded-md border border-gray-600"
                  >
                    <option value="Poppins">Poppins</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="cursive">Cursive</option>
                    <option value="fantasy">Fantasy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Form Style
                  </label>
                  <select
                    value={formStyle}
                    onChange={(e) => setFormStyle(e.target.value)}
                    className="w-full p-2 text-white rounded-md border border-gray-600"
                  >
                    <option value="standard">Standard</option>
                    <option value="card">Card</option>
                    <option value="minimal">Minimal</option>
                    <option value="bordered">Bordered</option>
                    <option value="glassmorphism">Glassmorphism</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Input Style
                  </label>
                  <select
                    value={inputStyle}
                    onChange={(e) => setInputStyle(e.target.value)}
                    className="w-full p-2 text-white rounded-md border border-gray-600"
                  >
                    <option value="filled">Filled</option>
                    <option value="outlined">Outlined</option>
                    <option value="underlined">Underlined</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Button Style
                  </label>
                  <select
                    value={buttonStyle}
                    onChange={(e) => setButtonStyle(e.target.value)}
                    className="w-full p-2 text-white rounded-md border border-gray-600"
                  >
                    <option value="solid">Solid</option>
                    <option value="outline">Outline</option>
                    <option value="ghost">Ghost</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Border Radius
                  </label>
                  <select
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(e.target.value)}
                    className="w-full p-2 text-white rounded-md border border-gray-600"
                  >
                    <option value="none">None</option>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                    <option value="full">Full</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">
                    Field Spacing
                  </label>
                  <select
                    value={spacing}
                    onChange={(e) => setSpacing(e.target.value)}
                    className="w-full p-2   text-white rounded-md border border-gray-600"
                  >
                    <option value="compact">Compact</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showHeader"
                    checked={showHeader}
                    onChange={(e) => setShowHeader(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="showHeader"
                    className="text-gray-300 font-semibold"
                  >
                    Show Form Header
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="formBranding"
                    checked={formBranding}
                    onChange={(e) => setFormBranding(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="formBranding"
                    className="text-gray-300 font-semibold"
                  >
                    Show Form Branding
                  </label>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            className={`${
              loading || prompt === "" ? "bg-neutral-500" : "bg-primary"
            } mt-6 py-3 px-6 rounded-md w-full text-white font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2`}
            disabled={loading || prompt === ""}
          >
            <PaintBucket size={18} />{" "}
            {loading ? "Generating..." : "Generate Form"}
          </button>
        </div>

        {/* Right Column - Live Preview */}
        <div
          className={`${
            formStyle === "glassmorphism"
              ? "backdrop-blur-md bg-opacity-20"
              : ""
          } rounded-lg shadow-lg relative overflow-hidden`}
          style={{
            backgroundColor:
              formStyle === "minimal"
                ? "transparent"
                : formStyle === "glassmorphism"
                ? "rgba(0, 18, 25, 0.7)"
                : "#1f2937",
            boxShadow:
              formStyle === "card"
                ? "0 10px 25px -5px rgba(0, 95, 115, 0.25)"
                : "none",
            border:
              formStyle === "bordered"
                ? `2px solid ${themeColor}`
                : "1px solid #374151",
            borderRadius: getBorderRadiusClass().replace("rounded", "0.375rem"),
          }}
        >
          {/* Background pattern for glassmorphism */}
          {formStyle === "glassmorphism" && (
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div
                className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20"
                style={{ backgroundColor: themeColor }}
              ></div>
              <div
                className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-10"
                style={{ backgroundColor: accentColor }}
              ></div>
              <div
                className="absolute top-1/2 left-1/3 h-20 w-20 rounded-full opacity-15"
                style={{ backgroundColor: themeColor }}
              ></div>
            </div>
          )}

          {generatedForm ? (
            <div className="p-6">
              {/* Form Header */}
              {showHeader && (
                <div className="mb-6 pb-2 border-b border-gray-700">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: themeColor, fontFamily: fontStyle }}
                  >
                    {formTitle || "Untitled Form"}
                  </h2>
                  <p
                    className="mt-2 text-gray-400"
                    style={{ fontFamily: fontStyle }}
                  >
                    Please fill out this form with your feedback
                  </p>
                </div>
              )}

              {/* Form Fields */}
              <div className={getSpacingClass()}>
                {generatedForm.map((item, idx) => (
                  <div
                    key={idx}
                    className={`transition-all ${
                      formStyle === "card"
                        ? "  bg-opacity-40 p-4 rounded-md"
                        : ""
                    }`}
                  >
                    <label
                      className="block mb-2 font-medium"
                      style={{
                        fontFamily: fontStyle,
                        color: formStyle === "minimal" ? themeColor : "white",
                      }}
                    >
                      {item.label}
                    </label>
                    {renderFormInput(item, idx)}
                  </div>
                ))}

                {/* Submit Button Section */}
                <div className="pt-4 mt-4 border-t border-gray-700 flex items-center justify-between">
                  {renderSubmitButton()}

                  {/* Save Draft */}
                  <button
                    className={`py-2 px-3 text-sm ${getBorderRadiusClass()} flex items-center gap-1`}
                    style={{ color: accentColor }}
                  >
                    <Save size={14} /> Save draft
                  </button>
                </div>
              </div>

              {/* Form Branding */}
              {formBranding && (
                <div className="mt-8 pt-4 border-t border-gray-700 opacity-70 flex items-center justify-between">
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <CheckCircle size={12} />
                    <span>Secured by FormAI</span>
                  </div>
                  <button
                    className="text-xs flex items-center gap-1"
                    style={{ color: accentColor }}
                  >
                    <Download size={12} />
                    <span>Download Responses</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 flex flex-col items-center justify-center h-full py-20">
              <div className="w-16 h-16 mb-4 rounded-full   flex items-center justify-center">
                <Eye size={24} className="text-gray-500" />
              </div>
              <p className="mb-2">No form generated yet</p>
              <p className="text-sm opacity-70 text-center max-w-xs">
                Generate a form using the prompt on the left to see a live
                preview here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

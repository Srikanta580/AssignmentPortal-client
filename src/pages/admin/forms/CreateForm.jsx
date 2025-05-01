import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Share2,
  PaintBucket,
  Layout,
  Palette,
  Eye,
  CheckCircle,
  Download,
  Save,
  Edit2,
  Delete,
  Trash,
  SaveAll,
  Trash2,
  MoveLeftIcon,
  ArrowLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { generateForm, saveForm } from "../../../features/admin/adminAPI";
import {
  editInputField,
  editFormTitle,
  deleteInputField,
  setThemeColor,
  setAccentColor,
  setFontStyle,
  setFormStyle,
  setInputStyle,
  setButtonStyle,
  setBorderRadius,
  setSpacing,
  setFormBranding,
  resetForm,
} from "../../../features/admin/formSlice";
import ShareModal from "../../../components/modals/ShareModal";

const CreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, loading } = useSelector((state) => state.forms);
  const [prompt, setPrompt] = useState("");
  const [generatedForm, setGeneratedForm] = useState(null);
  const [isFormSaved, setFormSaved] = useState(false);
  // Additional customization options
  const [showCustomizations, setShowCustomizations] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [editMode, setEditMode] = useState(false);
  // Others
  const [isShareOpen, setShareOpen] = useState(false);
  const currentUrl = window.location.href;

  console.log(form);

  useEffect(() => {
    if (form) {
      setGeneratedForm(form.questions);
      dispatch(editFormTitle(form.title));
    }
  }, [dispatch, form]);

  // Handle generate form
  const handleGenerate = async () => {
    try {
      const formResponse = await dispatch(generateForm(prompt));
      console.log("Generated form : ", formResponse.payload);
      setShowCustomizations(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle save form
  const handleSave = async () => {
    await dispatch(
      saveForm({
        title: form.title,
        config: {
          ...form,
        },
      })
    );
    setFormSaved(true);
  };

  // Handle share
  const handleShare = () => {
    setShareOpen(true);
  };

  // Handle live preview
  const handleLivePreview = () => {
    console.log("Live preview");
    navigate("/form-preview");
  };

  // Handle reset form
  const handleReset = () => {
    dispatch(resetForm());
  };

  // Helper functions
  const getBorderRadiusClass = () => {
    switch (form.borderRadius) {
      case "none":
        return "rounded-none";
      case "sm":
        return "rounded-sm";
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

  const getSpacingClass = () => {
    switch (form.spacing) {
      case "compact":
        return "space-y-3";
      case "normal":
        return "space-y-5";
      case "relaxed":
        return "space-y-8";
      default:
        return "space-y-5";
    }
  };

  // Form input renderer
  const renderFormInput = (item, idx) => {
    const inputClasses = `w-full ${getBorderRadiusClass()} ${
      form.inputStyle === "filled"
        ? "bg-white border border-gray-300"
        : form.inputStyle === "outlined"
        ? "bg-white border-2 border-gray-300"
        : form.inputStyle === "underlined"
        ? "border-b-2 border-gray-300 bg-transparent"
        : "bg-gray-50 border border-gray-200"
    } p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-50`;

    // const focusStyle = { focusRing: `focus:ring-${form.themeColor}` };

    switch (item.type) {
      case "text":
      case "email":
        return (
          <input
            type={item.type}
            placeholder={item.placeholder}
            className={inputClasses}
            style={{ fontFamily: form.fontStyle }}
            required={item.required}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={item.placeholder}
            className={`${inputClasses} min-h-32`}
            style={{ fontFamily: form.fontStyle }}
            required={item.required}
          />
        );
      case "select":
        return (
          <select
            className={inputClasses}
            style={{ fontFamily: form.fontStyle }}
            required={item.required}
          >
            <option value="">Select an option</option>
            {item.options.map((opt, i) => (
              <option key={i} value={opt.toLowerCase().replace(/\s+/g, "-")}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "rating":
        return (
          <div className="flex gap-2">
            {[...Array(item.max)].map((_, i) => (
              <button
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-300 focus:outline-none"
                style={{
                  borderColor: i < 3 ? form.themeColor : "rgb(209, 213, 219)",
                  backgroundColor: i < 3 ? form.themeColor : "transparent",
                  color: i < 3 ? "white" : "rgb(107, 114, 128)",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`checkbox-${idx}`}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`checkbox-${idx}`} className="text-gray-700">
              {item.label}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  // Submit button renderer
  const renderSubmitButton = () => {
    const baseClasses = `py-3 px-6 font-medium ${getBorderRadiusClass()} transition-all`;

    switch (form.buttonStyle) {
      case "solid":
        return (
          <button
            className={`${baseClasses} text-white`}
            style={{ backgroundColor: form.themeColor }}
          >
            Submit Feedback
          </button>
        );
      case "outline":
        return (
          <button
            className={`${baseClasses} bg-transparent border-2`}
            style={{ borderColor: form.themeColor, color: form.themeColor }}
          >
            Submit Feedback
          </button>
        );
      case "ghost":
        return (
          <button
            className={`${baseClasses} bg-opacity-10 hover:bg-opacity-20`}
            style={{
              backgroundColor: `${form.themeColor}20`,
              color: form.themeColor,
            }}
          >
            Submit Feedback
          </button>
        );
      case "gradient":
        return (
          <button
            className={`${baseClasses} text-white`}
            style={{
              background: `linear-gradient(45deg, ${form.themeColor}, ${form.accentColor})`,
            }}
          >
            Submit Feedback
          </button>
        );
      default:
        return (
          <button
            className={`${baseClasses} text-white`}
            style={{ backgroundColor: form.themeColor }}
          >
            Submit Feedback
          </button>
        );
    }
  };

  return (
    <>
      <div className="w-full text-dark" style={{ color: "var(--color-dark)" }}>
        {/* Header */}
        <div className="flex justify-between items-center pb-4">
          <div className="flex items-center gap-x-2 font-medium">
            <ArrowLeft
              onClick={() => navigate(-1)}
              size={30}
              cursor="pointer"
              className="bg-none hover:bg-gray-50 size-9 p-2 rounded-full"
            />
            Back
          </div>
          {generatedForm && (
            <div className="flex gap-x-4">
              <button onClick={handleLivePreview} className="btn bg-secondary">
                <Eye size={18} /> Live Preview
              </button>
              <button
                onClick={handleShare}
                className={`btn ${
                  isFormSaved
                    ? "bg-primary"
                    : "bg-neutral-500 border-neutral-500 hover:scale-none"
                }`}
                disabled={!isFormSaved}
              >
                <Share2 size={18} /> Share
              </button>
              <button
                onClick={handleSave}
                className={`btn ${loading ? "bg-neutral-500" : "bg-primary"}`}
              >
                <SaveAll size={18} /> {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleReset}
                className="btn bg-red-600 border-red-600"
              >
                <Trash2 size={18} /> Reset
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

            {/* Customization Section */}
            {showCustomizations && (
              <div className="space-y-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-bold flex items-center gap-2"
                    style={{ color: form.themeColor }}
                  >
                    <Palette size={20} /> Customize Form
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Theme Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={form.themeColor}
                        onChange={(e) =>
                          dispatch(setThemeColor(e.target.value))
                        }
                        className="w-10 h-10 border-2 border-gray-300 rounded-md cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.themeColor}
                        onChange={(e) =>
                          dispatch(setThemeColor(e.target.value))
                        }
                        className="text-gray-800 p-2 rounded-md border border-gray-300 w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Accent Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={form.accentColor}
                        onChange={(e) =>
                          dispatch(setAccentColor(e.target.value))
                        }
                        className="w-10 h-10 border-2 border-gray-300 rounded-md cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.accentColor}
                        onChange={(e) =>
                          dispatch(setAccentColor(e.target.value))
                        }
                        className="text-gray-800 p-2 rounded-md border border-gray-300 w-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Font Style
                    </label>
                    <select
                      value={form.fontStyle}
                      onChange={(e) => dispatch(setFontStyle(e.target.value))}
                      className="w-full p-2 text-gray-800 rounded-md border border-gray-300 bg-white"
                    >
                      <option value="Poppins">Poppins</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Monospace</option>
                      <option value="cursive">Cursive</option>
                      <option value="fantasy">Fantasy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Form Style
                    </label>
                    <select
                      value={form.formStyle}
                      onChange={(e) => dispatch(setFormStyle(e.target.value))}
                      className="w-full p-2 text-gray-800 rounded-md border border-gray-300 bg-white"
                    >
                      <option value="standard">Standard</option>
                      <option value="card">Card</option>
                      <option value="minimal">Minimal</option>
                      <option value="bordered">Bordered</option>
                      <option value="glassmorphism">Glassmorphism</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Input Style
                    </label>
                    <select
                      value={form.inputStyle}
                      onChange={(e) => dispatch(setInputStyle(e.target.value))}
                      className="w-full p-2 text-gray-800 rounded-md border border-gray-300 bg-white"
                    >
                      <option value="filled">Filled</option>
                      <option value="outlined">Outlined</option>
                      <option value="underlined">Underlined</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Button Style
                    </label>
                    <select
                      value={form.buttonStyle}
                      onChange={(e) => dispatch(setButtonStyle(e.target.value))}
                      className="w-full p-2 text-gray-800 rounded-md border border-gray-300 bg-white"
                    >
                      <option value="solid">Solid</option>
                      <option value="outline">Outline</option>
                      <option value="ghost">Ghost</option>
                      <option value="gradient">Gradient</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Border Radius
                    </label>
                    <select
                      value={form.borderRadius}
                      onChange={(e) =>
                        dispatch(setBorderRadius(e.target.value))
                      }
                      className="w-full p-2 text-gray-800 rounded-md border border-gray-300 bg-white"
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="full">Full</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      Field Spacing
                    </label>
                    <select
                      value={form.spacing}
                      onChange={(e) => dispatch(setSpacing(e.target.value))}
                      className="w-full p-2 text-gray-800 rounded-md border border-gray-300 bg-white"
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
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <label
                      htmlFor="showHeader"
                      className="text-gray-700 font-semibold"
                    >
                      Show Form Header
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="formBranding"
                      checked={form.formBranding}
                      onChange={(e) =>
                        dispatch(setFormBranding(e.target.checked))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <label
                      htmlFor="formBranding"
                      className="text-gray-700 font-semibold"
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
                loading || prompt === "" || generatedForm ? "bg-gray-400" : ""
              } mt-6 py-3 px-6 rounded-md w-full text-white font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2`}
              style={
                loading || prompt === ""
                  ? {}
                  : { backgroundColor: form.themeColor }
              }
              disabled={loading || prompt === "" || generatedForm}
            >
              <PaintBucket size={18} />{" "}
              {loading ? "Generating..." : "Generate Form"}
            </button>
          </div>
          {/* Right Column - Generated Form Response */}
          <div
            className={`${
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
              borderRadius: getBorderRadiusClass().replace(
                "rounded",
                "0.375rem"
              ),
            }}
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

            {generatedForm ? (
              <div className="p-6">
                {/* Form Header */}
                {showHeader && (
                  <div className="mb-6 pb-2 border-b border-gray-200">
                    {editMode ? (
                      <input
                        className="text-2xl font-bold w-full outline-none"
                        value={form.title}
                        onChange={(e) =>
                          dispatch(editFormTitle(e.target.value))
                        }
                        style={{
                          color: form.themeColor,
                          fontFamily: form.fontStyle,
                        }}
                      />
                    ) : (
                      <h2
                        className="text-2xl font-bold"
                        style={{
                          color: form.themeColor,
                          fontFamily: form.fontStyle,
                        }}
                      >
                        {form.title || "Untitled Form"}
                      </h2>
                    )}
                    <p
                      className="mt-2 text-gray-500"
                      style={{ fontFamily: form.fontStyle }}
                    >
                      Please fill out this form with your feedback
                    </p>
                  </div>
                )}

                {/* Form Fields */}
                <div className={getSpacingClass()}>
                  {generatedForm.map((item) => (
                    <div
                      key={item.id}
                      className={`transition-all ${
                        form.formStyle === "card"
                          ? "bg-gray-50 bg-opacity-60 p-4 rounded-md"
                          : ""
                      }`}
                    >
                      {item.type !== "checkbox" &&
                        (editMode ? (
                          <input
                            className="block mb-2 font-medium w-full outline-none"
                            style={{
                              fontFamily: form.fontStyle,
                              color:
                                form.formStyle === "minimal"
                                  ? form.themeColor
                                  : "rgb(55, 65, 81)",
                            }}
                            value={item.label}
                            onChange={(e) =>
                              dispatch(
                                editInputField({
                                  id: item.id,
                                  label: e.target.value,
                                })
                              )
                            }
                          />
                        ) : (
                          <div className="flex justify-between items-center">
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
                            <button
                              onClick={() =>
                                dispatch(deleteInputField(item.id))
                              }
                              className="cursor-pointer text-red-500"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        ))}
                      {renderFormInput(item, item.id)}
                    </div>
                  ))}

                  {/* Submit Button Section */}
                  <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
                    {renderSubmitButton()}

                    {/* Save Draft */}
                    <button
                      className={`py-2 px-3 text-sm ${getBorderRadiusClass()} flex items-center gap-1`}
                      style={{ color: form.accentColor }}
                    >
                      <Save size={14} /> Save draft
                    </button>
                  </div>
                </div>

                {/* Form Branding */}
                {form.formBranding && (
                  <div className="mt-8 pt-4 border-t border-gray-200 opacity-70 flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <CheckCircle size={12} />
                      <span>Secured by FormAI</span>
                    </div>
                    <button
                      className="text-xs flex items-center gap-1"
                      style={{ color: form.accentColor }}
                    >
                      <Download size={12} />
                      <span>Download Responses</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 flex flex-col items-center justify-center h-full py-20">
                <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Eye size={24} className="text-gray-400" />
                </div>
                <p className="mb-2">No form generated yet</p>
                <p className="text-sm opacity-70 text-center max-w-xs">
                  Generate a form using the prompt on the left to see a live
                  preview here
                </p>
              </div>
            )}

            {generatedForm && (
              <div
                className="absolute top-4 right-10 cursor-pointer rounded-full p-2 bg-secondary text-white text-sm flex gap-x-1.5 px-3"
                onClick={() =>
                  editMode ? setEditMode(false) : setEditMode(true)
                }
              >
                {editMode ? (
                  <>
                    <Delete />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 size={18} />
                    Edit
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ShareModal
        open={isShareOpen}
        onClose={setShareOpen}
        shareUrl={currentUrl}
      />
    </>
  );
};

export default CreateForm;

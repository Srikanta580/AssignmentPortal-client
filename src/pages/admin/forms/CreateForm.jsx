import { useState } from "react";
import { Share, Share2 } from "lucide-react";

const CreateForm = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedForm, setGeneratedForm] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [themeColor, setThemeColor] = useState("#3b82f6"); // Default blue
  const [fontStyle, setFontStyle] = useState("sans-serif");

  const handleGenerate = () => {
    // Mock AI Response
    setGeneratedForm([
      "What is your opinion about the course?",
      "Rate the teaching methods from 1-5.",
      "Would you recommend this course to others?",
    ]);
  };

  const handleShare = () => {
    alert("Form link copied! (Mock)");
  };

  return (
    <div className="w-full text-dark">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Create Form</h1>
        {generatedForm && (
          <div className="flex gap-x-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
            >
              <Share size={18} /> Live Preview
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
            >
              <Share2 size={18} /> Share
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <label className="block text-gray-300 font-semibold">
              Form Title
            </label>
            <input
              type="text"
              placeholder="Enter form title..."
              className="w-full p-3 bg-gray-700 text-white rounded-md"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-gray-300 font-semibold">Prompt</label>
            <textarea
              className="w-full h-32 p-4 bg-gray-700 text-white rounded-md"
              placeholder="Enter prompt to generate a form..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Customization Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-primary mb-2">
              Customize Form
            </h2>

            <div>
              <label className="block text-gray-300 mb-1 font-semibold">
                Theme Color
              </label>
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-16 h-10 border-2 border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-semibold">
                Font Style
              </label>
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md"
              >
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="mt-6 bg-primary text-white py-3 px-6 rounded-md w-full hover:bg-primary-dark"
          >
            Generate Form
          </button>
        </div>

        {/* Right Column - Live Preview */}
        <div className="bg-gray-800 p-6 rounded-lg">
          {generatedForm ? (
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: themeColor, fontFamily: fontStyle }}
              >
                {formTitle || "Untitled Form"}
              </h2>

              <form className="space-y-6">
                {generatedForm.map((q, idx) => (
                  <div key={idx}>
                    <label
                      className="block text-white mb-2"
                      style={{ fontFamily: fontStyle }}
                    >
                      {q}
                    </label>
                    <input
                      type="text"
                      placeholder="Your answer..."
                      className="w-full p-3 bg-gray-700 text-white rounded-md"
                      style={{ fontFamily: fontStyle }}
                    />
                  </div>
                ))}
              </form>
            </div>
          ) : (
            <div className="text-gray-400 flex items-center justify-center h-full">
              No form generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Code, Send, Loader2, FileCode } from "lucide-react";
import Logo from "../components/atoms/Logo";
import { Link } from "react-router-dom";

const CodeAnalyzer = () => {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");

  const analyzeCode = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post("http://localhost:8080/api/analyze", {
        code,
      });
      const result = JSON.parse(res.data);
      setResponse(result.choices[0].message.content);
    } catch (error) {
      setResponse("❌ Error analyzing code.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-dark to-primary text-light">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-dark border-b border-secondary">
          <div className="flex items-center gap-3">
            <Logo size="small" route="/" />
            <FileCode className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              AI Code Analyzer
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-light">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-secondary text-dark px-3 py-1 rounded-md border border-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </select>
          </div>
        </div>

        {/* Main Content: Editor | Button | Suggestions */}
        <div className="flex flex-1 p-6 space-x-4">
          {/* Editor Panel */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-light">Your Code</h2>
            </div>
            <div className="flex-1 border border-secondary rounded-lg overflow-hidden">
              <Editor
                height="100%"
                language={language}
                defaultValue="// Write your code here"
                onChange={(value) => setCode(value)}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Analyze Button Center */}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={analyzeCode}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-dark font-medium rounded-lg hover:from-secondary hover:to-accent focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-70 transition-all duration-300 shadow-lg cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-dark" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Code className="w-6 h-6" />
                  Analyze
                </>
              )}
            </button>
          </div>

          {/* Suggestions Panel */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-medium text-light mb-2">
              AI Suggestions
            </h2>
            <div
              className={`flex-1 bg-dark border border-secondary rounded-lg p-4 overflow-auto ${
                response ? "text-light" : "text-secondary"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 text-secondary animate-spin" />
                </div>
              ) : response ? (
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {response}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Send className="w-8 h-8 text-secondary mb-2" />
                  <p>AI suggestions will appear here after analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAnalyzer;

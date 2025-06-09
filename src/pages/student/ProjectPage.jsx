import React, { useState, useRef, useEffect } from "react";
import { BetaTag } from "../../components/atoms/Tag";
import {
  MessageCircle,
  Send,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Github,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  User,
  Code,
  GitBranch,
  Star,
  Users,
  BarChart3,
  BookOpen,
  Target,
  Upload,
  UploadCloud,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Sample data
const projectData = {
  id: 1,
  title: "E-Commerce Platform",
  type: "Major Project",
  description:
    "A full-stack e-commerce platform with React frontend and Node.js backend",
  status: "In Progress",
  progress: 65,
  startDate: "2025-03-01",
  endDate: "2025-07-15",
  supervisor: "Dr. Sarah Wilson",
  teamMembers: [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Frontend Developer",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Alex Chen",
      role: "Backend Developer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "UI/UX Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ],
  githubRepo: "https://github.com/team/ecommerce-platform",
  githubStats: {
    stars: 23,
    forks: 8,
    commits: 147,
    contributors: 3,
  },
};

const timelineData = [
  {
    id: 1,
    title: "Project Planning & Research",
    status: "completed",
    dueDate: "2025-03-15",
    completedDate: "2025-03-14",
  },
  {
    id: 2,
    title: "Database Design",
    status: "completed",
    dueDate: "2025-04-01",
    completedDate: "2025-03-30",
  },
  {
    id: 3,
    title: "Backend API Development",
    status: "completed",
    dueDate: "2025-04-30",
    completedDate: "2025-04-28",
  },
  {
    id: 4,
    title: "Frontend Development",
    status: "in-progress",
    dueDate: "2025-05-30",
    completedDate: null,
  },
  {
    id: 5,
    title: "Integration & Testing",
    status: "pending",
    dueDate: "2025-06-15",
    completedDate: null,
  },
  {
    id: 6,
    title: "Deployment & Documentation",
    status: "pending",
    dueDate: "2025-07-01",
    completedDate: null,
  },
  {
    id: 7,
    title: "Final Presentation",
    status: "pending",
    dueDate: "2025-07-15",
    completedDate: null,
  },
];

const contributionData = [
  { name: "Emma Johnson", value: 45, color: "#005f73" },
  { name: "Alex Chen", value: 35, color: "#0a9396" },
  { name: "Maria Garcia", value: 20, color: "#94d2bd" },
];

const commitData = [
  { name: "Week 1", Emma: 12, Alex: 8, Maria: 5 },
  { name: "Week 2", Emma: 15, Alex: 10, Maria: 7 },
  { name: "Week 3", Emma: 18, Alex: 12, Maria: 9 },
  { name: "Week 4", Emma: 20, Alex: 15, Maria: 8 },
];

const chatMessages = [
  {
    id: 1,
    sender: "Dr. Sarah Wilson",
    message:
      "Great progress on the frontend! The user interface looks clean and intuitive.",
    timestamp: "10:30 AM",
    isSuper: true,
  },
  {
    id: 2,
    sender: "Emma Johnson",
    message:
      "Thank you! We're facing some challenges with the payment gateway integration. Could you guide us?",
    timestamp: "10:35 AM",
    isSuper: false,
  },
  {
    id: 3,
    sender: "Dr. Sarah Wilson",
    message:
      "I'll share some documentation on Stripe API integration. Also, consider using webhook for payment confirmations.",
    timestamp: "10:40 AM",
    isSuper: true,
  },
  {
    id: 4,
    sender: "Alex Chen",
    message: "Should we implement JWT authentication or OAuth for user login?",
    timestamp: "11:15 AM",
    isSuper: false,
  },
  {
    id: 5,
    sender: "Dr. Sarah Wilson",
    message:
      "JWT would be simpler for your use case. I'll send you a sample implementation.",
    timestamp: "11:20 AM",
    isSuper: true,
  },
];

const ProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    dueDate: "",
    description: "",
  });
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Emma Johnson",
        message: chatInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSuper: false,
      };
      setMessages([...messages, newMessage]);
      setChatInput("");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "in-progress":
        return <Clock className="text-blue-500" size={20} />;
      case "pending":
        return <AlertCircle className="text-gray-400" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const addMilestone = () => {
    if (newMilestone.title && newMilestone.dueDate) {
      const milestone = {
        id: timelineData.length + 1,
        title: newMilestone.title,
        status: "pending",
        dueDate: newMilestone.dueDate,
        completedDate: null,
      };
      timelineData.push(milestone);
      setNewMilestone({ title: "", dueDate: "", description: "" });
      setShowAddMilestone(false);
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick, isBeta }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isActive
          ? "bg-primary text-white shadow-md"
          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
      }`}
    >
      <Icon size={18} />
      <span className="flex items-center gap-1">
        {label}
        {isBeta && <BetaTag />}
      </span>
    </button>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark">
              {projectData.title}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {projectData.type}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {projectData.status}
              </span>
              <span className="text-gray-600">
                Progress: {projectData.progress}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={projectData.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gray-800 hover:bg-gray-900 text-white"
            >
              <Github size={16} />
              View Repository
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${projectData.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton
          id="overview"
          label="Overview"
          icon={BookOpen}
          isActive={activeTab === "overview"}
          onClick={setActiveTab}
        />
        <TabButton
          id="timeline"
          label="Timeline"
          icon={Calendar}
          isActive={activeTab === "timeline"}
          onClick={setActiveTab}
          isBeta={true}
        />
        <TabButton
          id="github"
          label="GitHub Stats"
          icon={Github}
          isActive={activeTab === "github"}
          onClick={setActiveTab}
          isBeta={true}
        />
        <TabButton
          id="chat"
          label="Doubt Solver"
          icon={MessageCircle}
          isActive={activeTab === "chat"}
          onClick={setActiveTab}
          isBeta={true}
        />
      </div>

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Details */}
          <div className="lg:col-span-2 card">
            <h2 className="card-title mb-4">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-dark mb-2">Description</h3>
                <p className="text-gray-600">{projectData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-dark mb-1">Start Date</h3>
                  <p className="text-gray-600">{projectData.startDate}</p>
                </div>
                <div>
                  <h3 className="font-medium text-dark mb-1">End Date</h3>
                  <p className="text-gray-600">{projectData.endDate}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-dark mb-1">Supervisor</h3>
                <p className="text-gray-600">{projectData.supervisor}</p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="card">
            <h2 className="card-title mb-4">Team Members</h2>
            <div className="space-y-3">
              {projectData.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-dark">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-primary" size={20} />
                <span className="text-sm text-gray-600">Milestones</span>
              </div>
              <p className="text-2xl font-bold text-dark">7</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <p className="text-2xl font-bold text-dark">3</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-secondary" size={20} />
                <span className="text-sm text-gray-600">Team Size</span>
              </div>
              <p className="text-2xl font-bold text-dark">3</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Code className="text-accent" size={20} />
                <span className="text-sm text-gray-600">Commits</span>
              </div>
              <p className="text-2xl font-bold text-dark">147</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <h2 className="card-title">Project Timeline</h2>
              <button
                onClick={() => setShowAddMilestone(true)}
                className="btn bg-primary hover:bg-primary/80"
              >
                <Plus size={16} />
                Add Milestone
              </button>
            </div>

            <div className="space-y-4">
              {timelineData.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(milestone.status)}
                    {index < timelineData.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-dark">
                        {milestone.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          milestone.status
                        )}`}
                      >
                        {milestone.status.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Due: {milestone.dueDate}
                    </p>
                    {milestone.completedDate && (
                      <p className="text-sm text-green-600">
                        Completed: {milestone.completedDate}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Milestone Form */}
          {showAddMilestone && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Add Milestone</h2>
                <button
                  onClick={() => setShowAddMilestone(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter milestone title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addMilestone}
                  className="w-full btn bg-primary hover:bg-primary/80 justify-center"
                >
                  Add Milestone
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "github" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Repository Stats */}
          <div className="card">
            <h2 className="card-title mb-4">Repository Statistics</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="text-yellow-500 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-dark">
                  {projectData.githubStats.stars}
                </p>
                <p className="text-sm text-gray-600">Stars</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <GitBranch className="text-secondary mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-dark">
                  {projectData.githubStats.forks}
                </p>
                <p className="text-sm text-gray-600">Forks</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Code className="text-primary mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-dark">
                  {projectData.githubStats.commits}
                </p>
                <p className="text-sm text-gray-600">Commits</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="text-accent mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-dark">
                  {projectData.githubStats.contributors}
                </p>
                <p className="text-sm text-gray-600">Contributors</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-dark">Quick Actions</h3>
              <button className="w-full btn bg-gray-800 hover:bg-gray-900 justify-center">
                <Upload size={16} />
                Upload Latest Changes
              </button>
              <button className="w-full btn bg-secondary hover:bg-secondary/80 justify-center">
                <GitBranch size={16} />
                Create New Branch
              </button>
            </div>
          </div>

          {/* Contribution Chart */}
          <div className="card">
            <h2 className="card-title mb-4">Team Contributions</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {contributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Commit Activity */}
          <div className="card lg:col-span-2">
            <h2 className="card-title mb-4">Weekly Commit Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Emma" fill="#005f73" />
                  <Bar dataKey="Alex" fill="#0a9396" />
                  <Bar dataKey="Maria" fill="#94d2bd" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 card">
            <div className="card-header">
              <h2 className="card-title flex items-center gap-2">
                <MessageCircle size={20} />
                Doubt Solver Chat
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Dr. Sarah Wilson - Online
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.isSuper ? "text-left" : "text-right"
                  }`}
                >
                  <div
                    className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isSuper
                        ? "bg-white text-dark border border-gray-200"
                        : "bg-primary text-white"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">{message.sender}</p>
                    <p>{message.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask your doubt or share an update..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
              />
              <button
                onClick={handleSendMessage}
                className="btn bg-primary hover:bg-primary/80"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Chat Info Panel */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-medium text-dark mb-3">Supervisor</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-dark">Dr. Sarah Wilson</p>
                  <p className="text-sm text-gray-600">Computer Science</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-medium text-dark mb-3">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Monday: 2:00 - 4:00 PM</p>
                <p>Wednesday: 2:00 - 4:00 PM</p>
                <p>Friday: 10:00 AM - 12:00 PM</p>
              </div>
              <button className="w-full mt-3 btn bg-secondary hover:bg-secondary/80 justify-center text-sm">
                Schedule Meeting
              </button>
            </div>

            <div className="card">
              <h3 className="font-medium text-dark mb-3">Quick Help</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  📚 Documentation
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  🔧 Technical Issues
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  📋 Project Guidelines
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  ⚡ Code Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        disabled
        className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full opacity-50 cursor-not-allowed shadow-lg"
      >
        <UploadCloud className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProjectDashboard;

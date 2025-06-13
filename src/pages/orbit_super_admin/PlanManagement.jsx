// src/pages/PlanManagement.js
import React, { useState } from "react";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import PlanCard from "../../components/pages/orbit_super_admin/PlanCard";

const PlanManagement = ({ plans, setPlans }) => {
  const [activeTab, setActiveTab] = useState("plans");
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: "",
    features: ["Feature 1", "Feature 2"],
    modules: [],
  });

  const availableModules = [
    {
      id: 1,
      name: "Student Management",
      description: "Manage student profiles and records",
    },
    {
      id: 2,
      name: "Course Management",
      description: "Create and manage courses",
    },
    {
      id: 3,
      name: "Attendance Tracking",
      description: "Track student attendance",
    },
    { id: 4, name: "Gradebook", description: "Manage student grades" },
    {
      id: 5,
      name: "Financial Management",
      description: "Handle tuition and payments",
    },
    { id: 6, name: "Reporting", description: "Generate reports and analytics" },
    {
      id: 7,
      name: "Library Management",
      description: "Manage library resources",
    },
    { id: 8, name: "HR Management", description: "Manage staff and faculty" },
  ];

  const handleAddPlan = () => {
    if (!newPlan.name.trim()) return;

    const newPlanObj = {
      ...newPlan,
      id: plans.length + 1,
      isActive: true,
    };

    setPlans([...plans, newPlanObj]);
    setNewPlan({
      name: "",
      description: "",
      price: "",
      features: ["Feature 1", "Feature 2"],
      modules: [],
    });
  };

  const toggleModule = (moduleId) => {
    if (newPlan.modules.includes(moduleId)) {
      setNewPlan({
        ...newPlan,
        modules: newPlan.modules.filter((id) => id !== moduleId),
      });
    } else {
      setNewPlan({
        ...newPlan,
        modules: [...newPlan.modules, moduleId],
      });
    }
  };

  const togglePlanStatus = (planId) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
      )
    );
  };

  const deletePlan = (planId) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
  };

  return (
    <div className="plan-page">
      <div className="page-header">
        <h1 className="page-title">Plan & Module Management</h1>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "plans" ? "active" : ""}`}
            onClick={() => setActiveTab("plans")}
          >
            Subscription Plans
          </button>
          <button
            className={`tab ${activeTab === "modules" ? "active" : ""}`}
            onClick={() => setActiveTab("modules")}
          >
            Available Modules
          </button>
        </div>
      </div>

      {activeTab === "plans" ? (
        <div className="plans-container">
          <div className="create-plan-form">
            <h2>Create New Plan</h2>
            <div className="form-group">
              <label>Plan Name</label>
              <input
                type="text"
                value={newPlan.name}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, name: e.target.value })
                }
                placeholder="e.g., Premium Plan"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
                placeholder="Describe this plan..."
              />
            </div>

            <div className="form-group">
              <label>Monthly Price ($)</label>
              <input
                type="number"
                value={newPlan.price}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, price: e.target.value })
                }
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Included Modules</label>
              <div className="modules-grid">
                {availableModules.map((module) => (
                  <div
                    key={module.id}
                    className={`module-card ${
                      newPlan.modules.includes(module.id) ? "selected" : ""
                    }`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <h3>{module.name}</h3>
                    <p>{module.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn primary-btn" onClick={handleAddPlan}>
              <FaPlus /> Create Plan
            </button>
          </div>

          <div className="plans-list">
            <h2>Current Subscription Plans</h2>
            <div className="plans-grid">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onToggleStatus={() => togglePlanStatus(plan.id)}
                  onDelete={() => deletePlan(plan.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="modules-container">
          <h2>Available System Modules</h2>
          <div className="modules-grid">
            {availableModules.map((module) => (
              <div key={module.id} className="module-card">
                <h3>{module.name}</h3>
                <p>{module.description}</p>
                <div className="module-meta">
                  <span>Version: 2.1</span>
                  <span>Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;

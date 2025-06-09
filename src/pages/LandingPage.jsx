import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiLock,
  FiShield,
  FiUserCheck,
  FiTrendingUp,
  FiBriefcase,
  FiBook,
  FiUsers,
  FiClipboard,
  FiBarChart2,
  FiFileText,
  FiAward,
  FiTool,
  FiSearch,
  FiDatabase,
  FiLayers,
  FiServer,
  FiZap,
  FiShieldOff,
  FiCode,
  FiHeadphones,
  FiChevronRight,
} from "react-icons/fi";
import Logo from "../components/atoms/Logo";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("universities");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const redirectToAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Navigation */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Logo size="small" />
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab("universities")}
                className={`font-medium transition-colors ${
                  activeTab === "universities"
                    ? "text-cyan-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Universities
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`font-medium transition-colors ${
                  activeTab === "students"
                    ? "text-cyan-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab("employers")}
                className={`font-medium transition-colors ${
                  activeTab === "employers"
                    ? "text-cyan-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Employers
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                to="/auth"
                className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <button
                onClick={redirectToAuth}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {activeTab === "universities"
                  ? "Transform University Management"
                  : activeTab === "students"
                  ? "Empower Your Academic Journey"
                  : "Discover Top Talent Efficiently"}
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                {activeTab === "universities"
                  ? "A unified platform to manage administration, students, and employer partnerships seamlessly."
                  : activeTab === "students"
                  ? "Build your future with verified credentials, job opportunities, and career development tools."
                  : "Streamline hiring with verified student profiles, campus recruitment, and talent matching."}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={redirectToAuth}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  onClick={redirectToAuth}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-cyan-600 border-2 border-cyan-100 px-8 py-4 rounded-xl font-medium text-lg hover:bg-cyan-50 transition-all"
                >
                  Schedule a Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                {activeTab === "universities"
                  ? "Comprehensive University Solutions"
                  : activeTab === "students"
                  ? "Everything Students Need to Succeed"
                  : "Powerful Tools for Employers"}
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {activeTab === "universities"
                  ? "Streamline operations and enhance student outcomes with our integrated platform"
                  : activeTab === "students"
                  ? "Access tools and opportunities to build your career from day one"
                  : "Find, evaluate, and hire the best talent from universities nationwide"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeTab === "universities" && (
                <>
                  <FeatureCard
                    icon={<FiUsers className="text-2xl" />}
                    title="Admin & Faculty Management"
                    description="Centralized system for managing staff, faculty, and administrative workflows."
                  />
                  <FeatureCard
                    icon={<FiClipboard className="text-2xl" />}
                    title="Assignment & Grading"
                    description="Streamlined tools for creating, distributing, and grading assignments."
                  />
                  <FeatureCard
                    icon={<FiBarChart2 className="text-2xl" />}
                    title="Attendance & Reporting"
                    description="Automated attendance tracking and comprehensive analytics dashboard."
                  />
                  <FeatureCard
                    icon={<FiFileText className="text-2xl" />}
                    title="Digital Forms & Surveys"
                    description="Create custom forms and surveys for students, staff, and research."
                  />
                  <FeatureCard
                    icon={<FiAward className="text-2xl" />}
                    title="Accreditation Tools"
                    description="Prepare for accreditation with organized documentation and reporting."
                  />
                  <FeatureCard
                    icon={<FiTool className="text-2xl" />}
                    title="Employer Partnership Hub"
                    description="Manage industry relationships and create opportunities for students."
                  />
                </>
              )}

              {activeTab === "students" && (
                <>
                  <FeatureCard
                    icon={<FiUserCheck className="text-2xl" />}
                    title="Verified Digital Profile"
                    description="Create a trusted profile with verified academic credentials."
                  />
                  <FeatureCard
                    icon={<FiFileText className="text-2xl" />}
                    title="Smart Resume Builder"
                    description="Build professional resumes with university-verified accomplishments."
                  />
                  <FeatureCard
                    icon={<FiBriefcase className="text-2xl" />}
                    title="Internship & Job Board"
                    description="Access exclusive opportunities from employer partners."
                  />
                  <FeatureCard
                    icon={<FiTrendingUp className="text-2xl" />}
                    title="Skill Roadmap"
                    description="Personalized learning paths to develop in-demand skills."
                  />
                  <FeatureCard
                    icon={<FiBook className="text-2xl" />}
                    title="Digital Portfolio"
                    showcase
                    description="Showcase projects, research, and accomplishments to employers."
                  />
                  <FeatureCard
                    icon={<FiUsers className="text-2xl" />}
                    title="Mentorship Network"
                    description="Connect with alumni and industry professionals for guidance."
                  />
                </>
              )}

              {activeTab === "employers" && (
                <>
                  <FeatureCard
                    icon={<FiSearch className="text-2xl" />}
                    title="Talent Discovery"
                    description="Find qualified candidates with verified skills and credentials."
                  />
                  <FeatureCard
                    icon={<FiUserCheck className="text-2xl" />}
                    title="Verified Profiles"
                    description="Access student profiles with university-verified information."
                  />
                  <FeatureCard
                    icon={<FiClipboard className="text-2xl" />}
                    title="Pre-screening Tools"
                    description="Efficiently evaluate candidates with customizable assessments."
                  />
                  <FeatureCard
                    icon={<FiTool className="text-2xl" />}
                    title="Campus Hiring Automation"
                    description="Streamline campus recruitment with scheduling and management tools."
                  />
                  <FeatureCard
                    icon={<FiAward className="text-2xl" />}
                    title="Employer Branding"
                    showcase
                    description="Showcase your company culture and opportunities to students."
                  />
                  <FeatureCard
                    icon={<FiBarChart2 className="text-2xl" />}
                    title="Analytics Dashboard"
                    description="Track hiring metrics and candidate pipeline performance."
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Trust & Security Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-cyan-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Leading Institutions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Enterprise-grade security and compliance for sensitive
                educational data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <SecurityFeature
                icon={<FiLock className="text-3xl" />}
                title="End-to-End Encryption"
                description="All data is encrypted at rest and in transit with industry-leading protocols."
              />
              <SecurityFeature
                icon={<FiShieldOff className="text-3xl" />}
                title="Compliance Certified"
                description="Fully compliant with FERPA, GDPR, and global data protection standards."
              />
              <SecurityFeature
                icon={<FiUserCheck className="text-3xl" />}
                title="Identity Verification"
                description="Multi-factor authentication and verified identity for all users."
              />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Verified Academic Credentials
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our blockchain-verified credential system ensures academic
                    records are tamper-proof and instantly verifiable by
                    employers and institutions.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" />
                      <span>
                        Instant verification of degrees and certifications
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" />
                      <span>
                        Reduced fraud and credential misrepresentation
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FiCheck className="text-green-500 mr-2" />
                      <span>
                        Student-controlled sharing with privacy controls
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl p-6 text-white">
                  <div className="text-5xl font-bold mb-2">99.99%</div>
                  <div className="text-lg">Uptime Guarantee</div>
                  <div className="mt-4 text-sm">
                    Enterprise-grade reliability for critical academic
                    operations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {activeTab === "universities" && <PricingSection />}

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from universities, students, and employers transforming
                education and careers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="Orbit reduced our administrative workload by 40% and improved student-employer connections significantly."
                author="Dr. Sarah Johnson"
                role="Dean of Academic Affairs"
                organization="Stanford University"
              />
              <TestimonialCard
                quote="As a computer science student, I landed my dream internship through the platform and built a portfolio that impressed employers."
                author="Alex Martinez"
                role="Computer Science Graduate"
                organization="MIT"
                highlight
              />
              <TestimonialCard
                quote="Hiring through Orbit cut our campus recruitment time in half while improving candidate quality."
                author="Michael Chen"
                role="Talent Acquisition Director"
                organization="Google"
              />
            </div>

            <div className="mt-16">
              <h3 className="text-center text-xl font-semibold text-gray-700 mb-8">
                Trusted by leading institutions and companies
              </h3>
              <div className="flex flex-wrap justify-center gap-10">
                {[
                  "Stanford",
                  "MIT",
                  "Harvard",
                  "Google",
                  "Microsoft",
                  "Amazon",
                ].map((logo, index) => (
                  <div
                    key={index}
                    className="text-2xl font-bold text-gray-400 opacity-80"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your educational experience?
            </h2>
            <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
              Join thousands of universities, students, and employers already
              using Orbit
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={redirectToAuth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-cyan-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                onClick={redirectToAuth}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg"
              >
                Schedule a Demo
              </motion.button>
            </div>

            <p className="mt-8 text-cyan-100 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Logo size="small" />
              </div>
              <p className="mb-4">
                Connecting education to opportunity through innovative
                technology.
              </p>
              <div className="flex space-x-4">
                {[
                  /* Social icons would go here */
                ].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"
                  >
                    {/* Social icon */}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Platform</h4>
              <ul className="space-y-2">
                {[
                  "Universities",
                  "Students",
                  "Employers",
                  "Features",
                  "Pricing",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {[
                  "Blog",
                  "Help Center",
                  "Documentation",
                  "Community",
                  "Webinars",
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Contact", "Partners", "Legal"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2025 Orbit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reusable Components
const FeatureCard = ({ icon, title, description, showcase = false }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`bg-gradient-to-b ${
      showcase
        ? "from-cyan-50 to-white border-t-4 border-cyan-500"
        : "from-white to-gray-50"
    } rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}
  >
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
        showcase ? "bg-cyan-100 text-cyan-600" : "bg-gray-100 text-gray-600"
      }`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const SecurityFeature = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="w-14 h-14 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({
  quote,
  author,
  role,
  organization,
  highlight = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`rounded-2xl p-6 ${
      highlight
        ? "bg-gradient-to-br from-cyan-50 to-white border-t-4 border-cyan-500"
        : "bg-gray-50"
    }`}
  >
    <div className="text-cyan-600 text-5xl mb-4">"</div>
    <p className="text-gray-700 mb-6 text-lg">{quote}</p>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
      <div>
        <div className="font-bold text-gray-900">{author}</div>
        <div className="text-gray-600">
          {role}, {organization}
        </div>
      </div>
    </div>
  </motion.div>
);

const PricingSection = () => {
  const plans = [
    {
      name: "Shared-DB Plan",
      tier: "Standard",
      icon: <FiDatabase className="text-cyan-600" size={24} />,
      price: "$499/month",
      description:
        "Affordable & quick setup—get started in days with full-feature access!",
      features: [
        { text: "Shared database (row-level isolation)", icon: <FiDatabase /> },
        {
          text: "Standard modules (assignments, attendance)",
          icon: <FiLayers />,
        },
        { text: "Basic customization (themes, logos)", icon: <FiCode /> },
        { text: "Fixed API rate limits", icon: <FiZap /> },
      ],
      cta: "Start Free Trial",
      bestFor: "Small/medium universities",
    },
    {
      name: "Dedicated Schema",
      tier: "Professional",
      icon: <FiServer className="text-teal-500" size={24} />,
      price: "$1,499/month",
      description:
        "Your own isolated environment within our shared cloud—performance + flexibility.",
      features: [
        { text: "Shared DB with dedicated schema", icon: <FiServer /> },
        { text: "Advanced modules & analytics", icon: <FiBarChart2 /> },
        { text: "Higher performance guarantees", icon: <FiZap /> },
        { text: "Custom module toggling", icon: <FiCode /> },
      ],
      cta: "Get Started",
      bestFor: "Growing institutions",
      popular: true,
    },
    {
      name: "Dedicated Database",
      tier: "Enterprise",
      icon: <FiShield className="text-purple-600" size={24} />,
      price: "Custom Pricing",
      description:
        "Enterprise-grade security, control, and performance—your own cloud, your way.",
      features: [
        { text: "Full database isolation", icon: <FiShield /> },
        { text: "White-labeling & branding", icon: <FiCode /> },
        { text: "99.9% uptime SLA", icon: <FiZap /> },
        { text: "Dedicated account manager", icon: <FiHeadphones /> },
        { text: "Compliance-ready (GDPR, etc.)", icon: <FiShield /> },
      ],
      cta: "Contact Sales",
      bestFor: "Large universities & enterprises",
    },
  ];

  const addOns = [
    { name: "Custom Domain", price: "$99/month" },
    { name: "Advanced Analytics", price: "$299/month" },
    { name: "LMS/ERP Integration", price: "From $499" },
    { name: "Custom Mobile App", price: "From $9,999" },
    { name: "Security Audit", price: "$2,500/audit" },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Flexible Plans for Every Institution
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scale from basic to enterprise with our architecture-driven pricing
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className={`relative rounded-2xl overflow-hidden shadow-lg ${
                plan.popular
                  ? "border-t-4 border-cyan-500"
                  : "border-t-4 border-transparent"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-cyan-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="bg-white p-8">
                <div className="flex items-center mb-4">
                  <div className="mr-3 p-2 bg-cyan-50 rounded-lg">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <span className="text-sm text-gray-500">{plan.tier}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {plan.price}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-cyan-500 mr-2 mt-0.5">
                        {feature.icon}
                      </span>
                      <span className="text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold ${
                    plan.popular
                      ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>
                <div className="mt-3 text-sm text-gray-500 text-center">
                  Best for: {plan.bestFor}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-Ons */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Premium Add-Ons
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 text-center hover:border-cyan-300 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {addon.name}
                </div>
                <div className="text-xs text-gray-600">{addon.price}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Need custom solutions? Our team can build tailored integrations
              for your specific needs.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-cyan-600 hover:bg-cyan-50">
              Request Custom Solution <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>

        {/* Upselling Path */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Simple Growth Path
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex items-center bg-cyan-50 px-4 py-2 rounded-lg">
              <span className="text-cyan-600 font-medium">
                1. Start with Shared-DB
              </span>
            </div>
            <FiArrowRight className="text-gray-400 hidden md:block" />
            <div className="flex items-center bg-teal-50 px-4 py-2 rounded-lg">
              <span className="text-teal-600 font-medium">
                2. Upgrade to Dedicated Schema
              </span>
            </div>
            <FiArrowRight className="text-gray-400 hidden md:block" />
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-lg">
              <span className="text-purple-600 font-medium">
                3. Graduate to Full DB
              </span>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Begin with our affordable Standard plan and seamlessly upgrade as
            your needs grow. We'll help you transition with zero downtime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;

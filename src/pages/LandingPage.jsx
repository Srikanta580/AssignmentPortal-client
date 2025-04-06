import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/atoms/Logo";

// Header Component
const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Logo size="regular" />
      </div>
      <nav className="hidden md:flex space-x-8">
        <a
          href="#features"
          className="text-[#001219] hover:text-[#0A9396] transition"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-[#001219] hover:text-[#0A9396] transition"
        >
          How It Works
        </a>
        <a
          href="#alumni"
          className="text-[#001219] hover:text-[#0A9396] transition"
        >
          Alumni Connect
        </a>
        <a
          href="#faq"
          className="text-[#001219] hover:text-[#0A9396] transition"
        >
          FAQ
        </a>
      </nav>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-[#94D2BD] hover:bg-[#0A9396] hover:text-white text-[#001219] px-4 py-2 rounded-lg transition"
        >
          Log In
        </Link>
      </div>
    </div>
  </header>
);

// Hero Component with Hexagonal Pattern
const Hero = () => (
  <section className="bg-[#E9D8A6] py-20 relative overflow-hidden">
    {/* Decorative hexagon pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -left-16 top-20 w-64 h-64 bg-[#005F73] rounded-full"></div>
      <div className="absolute right-40 bottom-10 w-40 h-40 bg-[#0A9396] rounded-full"></div>
      <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-[#EE9B00] rounded-full"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-[#001219] mb-4">
            Elevate Your Academic Experience
          </h1>
          <p className="text-lg text-[#001219] opacity-80 mb-8">
            A modern platform designed by students, for students – manage
            assignments, collaborate with peers, and build your professional
            portfolio.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-[#EE9B00] hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg transition">
              Get Started
            </button>
            <button className="bg-[#005F73] hover:bg-[#003844] text-white px-6 py-3 rounded-lg text-lg transition">
              Take a Tour
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute -right-4 -bottom-4 w-full h-full bg-[#0A9396] rounded-lg"></div>
          <img
            src="/assets/dashboard.jpg"
            alt="Dashboard preview"
            className="rounded-lg shadow-lg relative z-10 border-4 border-white"
          />
        </div>
      </div>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-[#94D2BD] p-6 rounded-xl shadow-md border border-[#0A9396] hover:shadow-lg transition transform hover:-translate-y-1">
    <div className="text-[#EE9B00] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#001219]">{title}</h3>
    <p className="text-[#001219] opacity-75">{description}</p>
  </div>
);

// Features Section with Asymmetrical Layout
const Features = () => {
  // Sample icons (would be replaced with actual icons)
  const clipboardIcon = (
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005F73] text-xl">
      📋
    </div>
  );
  const usersIcon = (
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005F73] text-xl">
      👥
    </div>
  );
  const chartIcon = (
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005F73] text-xl">
      📊
    </div>
  );
  const calendarIcon = (
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005F73] text-xl">
      📅
    </div>
  );
  const badgeIcon = (
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005F73] text-xl">
      🏆
    </div>
  );
  const lockIcon = (
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#005F73] text-xl">
      🔒
    </div>
  );

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#005F73] mb-4">
            Powerful Features
          </h2>
          <p className="text-[#001219] opacity-75 max-w-2xl mx-auto">
            Our platform offers everything you need to excel in your academic
            career and build a professional portfolio.
          </p>
        </div>

        {/* Asymmetrical layout with main feature at top */}
        <div className="mb-8">
          <div className="bg-[#E9D8A6] p-8 rounded-xl shadow-md flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              {clipboardIcon}
              <h3 className="text-2xl font-bold mt-4 text-[#001219]">
                Assignment Management
              </h3>
              <p className="text-[#001219] opacity-75 mt-2">
                Our flagship feature that lets you organize assignments by
                course, due date, and priority. Never miss a deadline again.
              </p>
            </div>
            <div className="md:w-2/3 md:pl-12">
              <img
                src="/assets/assignment-dashboard.png"
                alt="Assignment Dashboard"
                className="w-full h-[35rem] rounded-lg shadow-md border-2 border-[#0A9396]"
              />
            </div>
          </div>
        </div>

        {/* Grid layout for remaining features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={usersIcon}
            title="Group Collaboration"
            description="Work seamlessly with classmates on group projects with real-time collaboration tools."
          />
          <FeatureCard
            icon={chartIcon}
            title="Progress Tracking"
            description="Visualize your academic progress and identify areas for improvement."
          />
          <FeatureCard
            icon={calendarIcon}
            title="Smart Scheduling"
            description="AI-powered scheduling suggestions to optimize your study time and workload."
          />
          <FeatureCard
            icon={badgeIcon}
            title="Portfolio Builder"
            description="Showcase your best work and academic achievements in a professional portfolio."
          />
          <FeatureCard
            icon={lockIcon}
            title="Secure Submissions"
            description="Submit assignments with confidence using our secure and reliable submission system."
          />
        </div>
      </div>
    </section>
  );
};

// How It Works Section with Side Numbering
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Sign up with your college email address and set up your profile.",
    },
    {
      number: "02",
      title: "Organize Your Courses",
      description: "Add your current courses and import your syllabus details.",
    },
    {
      number: "03",
      title: "Manage Assignments",
      description:
        "Track deadlines, submit work, and receive feedback all in one place.",
    },
    {
      number: "04",
      title: "Build Your Portfolio",
      description:
        "Showcase your best assignments and projects for future opportunities.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#005F73]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Getting started with EduAssign is easy. Follow these simple steps to
            enhance your academic experience.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="md:w-1/4 bg-[#0A9396] text-white p-6 flex items-center justify-center">
                <span className="text-5xl font-bold">{step.number}</span>
              </div>
              <div className="md:w-3/4 p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#001219]">
                  {step.title}
                </h3>
                <p className="text-[#001219] opacity-75">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Alumni Project Card Component with Angular Design
const AlumniProjectCard = ({
  name,
  year,
  major,
  projectTitle,
  description,
  image,
}) => (
  <div className="bg-[#94D2BD] rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
    <div className="relative">
      <img
        src={image}
        alt={projectTitle}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-0 right-0 bg-[#EE9B00] text-white px-3 py-1 rounded-bl-lg">
        {year}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-[#001219]">{name}</h3>
        <span className="text-sm text-[#001219] opacity-75">{major}</span>
      </div>
      <h4 className="text-[#005F73] font-medium mb-2">{projectTitle}</h4>
      <p className="text-[#001219] opacity-75 text-sm mb-4">{description}</p>
      <button className="text-[#005F73] hover:text-[#003844] text-sm font-medium flex items-center">
        View Project
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
);

// Connect Alumni Section with Hexagonal Element
const ConnectAlumni = () => {
  const [showAll, setShowAll] = useState(false);

  // Sample alumni projects data
  const alumniProjects = [
    {
      name: "Alex Johnson",
      year: "2023",
      major: "Computer Science",
      projectTitle: "AI-Powered Study Assistant",
      description:
        "A machine learning model that helps students optimize their study schedules based on learning patterns.",
      image: "/api/placeholder/400/300",
    },
    {
      name: "Maya Patel",
      year: "2022",
      major: "Graphic Design",
      projectTitle: "Sustainable Campus Initiative",
      description:
        "A comprehensive branding and awareness campaign for campus sustainability efforts.",
      image: "/api/placeholder/400/300",
    },
    {
      name: "Tyler Rodriguez",
      year: "2023",
      major: "Engineering",
      projectTitle: "Solar-Powered Water Purification",
      description:
        "A prototype for an affordable solar-powered water purification system for developing regions.",
      image: "/api/placeholder/400/300",
    },
    {
      name: "Sarah Kim",
      year: "2021",
      major: "Business Analytics",
      projectTitle: "Local Business Recovery Plan",
      description:
        "Data-driven strategies for local businesses to recover from economic downturns.",
      image: "/api/placeholder/400/300",
    },
    {
      name: "Jordan Wilson",
      year: "2022",
      major: "Environmental Science",
      projectTitle: "Campus Carbon Footprint Analysis",
      description:
        "A detailed analysis of the university's carbon footprint with recommendations for reduction.",
      image: "/api/placeholder/400/300",
    },
    {
      name: "Aisha Mohammed",
      year: "2023",
      major: "Digital Media",
      projectTitle: "Virtual Campus Tour Experience",
      description:
        "An immersive virtual reality tour of the campus for prospective students.",
      image: "/api/placeholder/400/300",
    },
  ];

  const displayedProjects = showAll
    ? alumniProjects
    : alumniProjects.slice(0, 3);

  return (
    <section id="alumni" className="py-16 relative bg-[#E9D8A6]">
      {/* Decorative element */}
      <div className="absolute left-0 top-0 w-32 h-32 bg-[#0A9396] opacity-20 rounded-br-full"></div>
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#005F73] opacity-20 rounded-tl-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#005F73] mb-4">
            Connect Alumni
          </h2>
          <p className="text-[#001219] opacity-75 max-w-2xl mx-auto">
            Explore outstanding projects from our alumni and get inspired for
            your own academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <AlumniProjectCard key={index} {...project} />
          ))}
        </div>

        {!showAll && alumniProjects.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#EE9B00] hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg shadow-md transition"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// FAQ Component with Custom Styled Accordion
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I join the platform?",
      answer:
        "You can sign up using your college email address. Once verified, you'll have access to all features of the platform.",
    },
    {
      question: "Is there a mobile application available?",
      answer:
        "Yes, we offer mobile apps for both iOS and Android devices, allowing you to manage your assignments on the go.",
    },
    {
      question:
        "Can I integrate this with my college's learning management system?",
      answer:
        "We support integration with major LMS platforms including Canvas, Blackboard, and Moodle. Contact your institution's IT department for implementation details.",
    },
    {
      question: "How secure is my submitted work?",
      answer:
        "All submissions are encrypted and stored securely. We implement industry-standard security measures to protect your intellectual property.",
    },
    {
      question: "Can alumni still access their previous work?",
      answer:
        "Yes, alumni retain access to their portfolio and submitted work even after graduation, making it easy to showcase your achievements to potential employers.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#005F73] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#001219] opacity-75 max-w-2xl mx-auto">
            Find answers to common questions about our platform and how it can
            benefit your academic journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className={`flex justify-between items-center w-full text-left p-4 rounded-lg font-medium ${
                  openIndex === index
                    ? "bg-[#005F73] text-white"
                    : "bg-[#94D2BD] text-[#001219] hover:bg-[#0A9396] hover:text-white"
                } transition`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform ${
                    openIndex === index ? "rotate-180" : ""
                  } transition-transform`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="mt-1 p-4 bg-[#E9D8A6] rounded-lg text-[#001219]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section with Diagonal Design
const CTA = () => (
  <section className="py-16 bg-[#005F73] relative overflow-hidden">
    {/* Diagonal decorative elements */}
    <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#0A9396] opacity-30 transform rotate-45"></div>
    <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#EE9B00] opacity-30 transform rotate-45"></div>

    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to Elevate Your Academic Experience?
      </h2>
      <p className="text-white opacity-80 mb-8 max-w-2xl mx-auto">
        Join thousands of students who are already benefiting from our
        comprehensive assignment management platform.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-[#EE9B00] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition">
          Sign Up Now
        </button>
        <button className="bg-transparent hover:bg-[#0A9396] text-white border border-white px-8 py-3 rounded-lg font-medium transition">
          Request Demo
        </button>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-[#001219] text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold mb-4 text-[#94D2BD]">Submit</div>
          <p className="text-white opacity-60 mb-4">
            Empowering students to excel through intelligent assignment
            management.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-[#0A9396] hover:bg-[#EE9B00] w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              <span className="sr-only">Facebook</span>
              <div>FB</div>
            </a>
            <a
              href="#"
              className="bg-[#0A9396] hover:bg-[#EE9B00] w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              <span className="sr-only">Twitter</span>
              <div>TW</div>
            </a>
            <a
              href="#"
              className="bg-[#0A9396] hover:bg-[#EE9B00] w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              <span className="sr-only">Instagram</span>
              <div>IG</div>
            </a>
            <a
              href="#"
              className="bg-[#0A9396] hover:bg-[#EE9B00] w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              <span className="sr-only">LinkedIn</span>
              <div>LI</div>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#94D2BD]">
            Features
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Assignment Management
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Group Collaboration
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Progress Tracking
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Portfolio Builder
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#94D2BD]">
            Resources
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Tutorials
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                API Documentation
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#94D2BD]">Company</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white opacity-60 hover:opacity-100 hover:text-[#EE9B00] transition"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#0A9396] opacity-30 mt-12 pt-8 text-center text-white opacity-60 text-sm">
        &copy; {new Date().getFullYear()} Submit. All rights reserved.
      </div>
    </div>
  </footer>
);

// Main App Component
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <ConnectAlumni />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

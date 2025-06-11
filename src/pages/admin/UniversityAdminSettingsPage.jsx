import SettingsForm from "../../components/forms/UniversityAdminSettingsForm";

const SettingsPage = () => {
  const handleSubmit = (values) => {
    console.log("Settings saved:", values);
    // API call would go here
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          System Settings
        </h1>
        <p className="text-gray-600">
          Manage university portal configuration and preferences
        </p>
      </div>

      <SettingsForm
        initialValues={{
          universityName: "State University",
          contactEmail: "admin@university.edu",
          timezone: "America/New_York",
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SettingsPage;

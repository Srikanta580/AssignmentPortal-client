import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  submitUniversityBasicInfo,
  submitUniversityVerification,
  setupUniversityAdmin,
} from "../../features/university/universityAPI";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const input = `w-full px-4 py-3 border border-gray-300 rounded-lg`;

const error = `text-red-500 text-sm mt-1`;

const btnprimary = `px-4 py-2 rounded-md text-white bg-cyan-600 hover:bg-cyan-700`;

const initialValues = {
  universityName: "",
  country: "",
  website: "",
  institutionType: "",
  fullName: "",
  position: "",
  email: "",
  document: null,
  firstName: "",
  lastName: "",
  adminEmail: "",
  password: "",
  confirmPassword: "",
};

const validationSchemas = [
  // Step 1
  Yup.object({
    universityName: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    website: Yup.string().url("Invalid URL").required("Required"),
    institutionType: Yup.string().required("Required"),
  }),
  // Step 2
  Yup.object({
    fullName: Yup.string().required("Required"),
    position: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    document: Yup.mixed().required("Required"),
  }),
  // Step 3
  Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    adminEmail: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8).required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  }),
];

export default function UniversityRegistrationForm({
  setIsRegisteringUniversity,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();

  const handleNext = async (values, actions) => {
    try {
      if (currentStep === 0) {
        await dispatch(
          submitUniversityBasicInfo({
            universityName: values.universityName,
            country: values.country,
            website: values.website,
            institutionType: values.institutionType,
          })
        ).unwrap();
      } else if (currentStep === 1) {
        const formData = new FormData();
        // formData.append("document", values.document);
        formData.append("fullName", values.fullName);
        formData.append("position", values.position);
        formData.append("email", values.email);
        await dispatch(
          submitUniversityVerification({
            dto: formData,
            document: values.document,
          })
        ).unwrap();
      } else if (currentStep === 2) {
        await dispatch(
          setupUniversityAdmin({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.adminEmail,
            password: values.password,
          })
        ).unwrap();
      }
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[currentStep]}
      onSubmit={handleNext}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: BASIC INFO */}
              {currentStep === 0 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Institution Information
                  </h2>
                  <Field name="universityName">
                    {({ field }) => (
                      <div>
                        <label>University Name</label>
                        <input {...field} className={input} />
                        <ErrorMessage
                          name="universityName"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="country">
                    {({ field }) => (
                      <div>
                        <label>Country</label>
                        <select {...field} className={input}>
                          <option value="">Select country</option>
                          <option value="India">India</option>
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="website">
                    {({ field }) => (
                      <div>
                        <label>Website</label>
                        <input
                          type="url"
                          {...field}
                          className={input}
                          placeholder="https://"
                        />
                        <ErrorMessage
                          name="website"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <div>
                    <label>Institution Type</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {["Public", "Private", "Community", "Vocational"].map(
                        (type) => (
                          <label key={type} className="flex items-center gap-2">
                            <Field
                              type="radio"
                              name="institutionType"
                              value={type}
                            />
                            <span>{type}</span>
                          </label>
                        )
                      )}
                    </div>
                    <ErrorMessage
                      name="institutionType"
                      component="div"
                      className={error}
                    />
                  </div>
                </>
              )}

              {/* STEP 2: VERIFICATION */}
              {currentStep === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Verification
                  </h2>
                  <Field name="fullName">
                    {({ field }) => (
                      <div>
                        <label>Full Name</label>
                        <input {...field} className={input} />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="position">
                    {({ field }) => (
                      <div>
                        <label>Position</label>
                        <input {...field} className={input} />
                        <ErrorMessage
                          name="position"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field }) => (
                      <div>
                        <label>Email</label>
                        <input {...field} type="email" className={input} />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <div>
                    <label>Verification Document</label>
                    <input
                      type="file"
                      className={input}
                      onChange={(e) =>
                        setFieldValue("document", e.currentTarget.files[0])
                      }
                    />
                    <ErrorMessage
                      name="document"
                      component="div"
                      className={error}
                    />
                  </div>
                </>
              )}

              {/* STEP 3: ADMIN SETUP */}
              {currentStep === 2 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Admin Account Setup
                  </h2>

                  <Field name="firstName">
                    {({ field }) => (
                      <div>
                        <label>First Name</label>
                        <input {...field} className={input} />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="lastName">
                    {({ field }) => (
                      <div>
                        <label>Last Name</label>
                        <input {...field} className={input} />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="adminEmail">
                    {({ field }) => (
                      <div>
                        <label>Email</label>
                        <input {...field} type="email" className={input} />
                        <ErrorMessage
                          name="adminEmail"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field }) => (
                      <div>
                        <label>Password</label>
                        <input {...field} type="password" className={input} />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ field }) => (
                      <div>
                        <label>Confirm Password</label>
                        <input {...field} type="password" className={input} />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className={error}
                        />
                      </div>
                    )}
                  </Field>
                </>
              )}

              {/* STEP 4: COMPLETE */}
              {currentStep === 3 && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Registration Submitted
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We'll contact you in 2 business days.
                  </p>
                  <button
                    onClick={() => setIsRegisteringUniversity(false)}
                    className={`btn ${btnprimary}`}
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {currentStep < 3 && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn ${btnprimary} mt-4`}
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

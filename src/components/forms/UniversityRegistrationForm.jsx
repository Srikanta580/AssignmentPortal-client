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
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const input = `w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors`;
const error = `text-red-500 text-sm mt-1`;
const btnprimary = `px-4 py-2 rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors`;
const label = `block text-sm font-medium text-gray-700 mb-1`;
const infoText = `text-gray-500 text-sm mt-2 flex items-start gap-1`;

const initialValues = {
  // Basic Info
  universityName: "",
  country: "",
  website: "",
  institutionType: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  phone: "",
  yearFounded: "",

  // Verification
  contactFullName: "",
  contactPosition: "",
  contactEmail: "",
  contactPhone: "",
  documentType: "authorization_letter",
  document: null,

  // Admin Setup
  firstName: "",
  lastName: "",
  adminEmail: "",
  agreeToTerms: false,
};

const validationSchemas = [
  // Step 1: Basic Information
  Yup.object({
    universityName: Yup.string().required("University name is required"),
    country: Yup.string().required("Country is required"),
    website: Yup.string()
      .url("Invalid URL format")
      .required("Website is required"),
    institutionType: Yup.string().required("Institution type is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State/Province is required"),
    postalCode: Yup.string().required("Postal code is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
      .required("Phone number is required"),
    yearFounded: Yup.number()
      .min(1500, "Invalid year")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Year founded is required"),
  }),

  // Step 2: Verification
  Yup.object({
    contactFullName: Yup.string().required("Full name is required"),
    contactPosition: Yup.string().required("Position is required"),
    contactEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    contactPhone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number")
      .required("Phone number is required"),
    documentType: Yup.string().required("Document type is required"),
    document: Yup.mixed()
      .required("Document is required")
      .test(
        "fileSize",
        "File too large (max 5MB)",
        (value) => value && value.size <= 5 * 1024 * 1024
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      ),
  }),

  // Step 3: Admin Setup
  Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    adminEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  }),
];

export default function UniversityRegistrationForm({ setCurrentStep }) {
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState(0);
  const [universityId, setUniversityId] = useState(null);

  const handleNext = async (values, actions) => {
    try {
      if (formStep === 0) {
        const universityId = await dispatch(
          submitUniversityBasicInfo({
            universityName: values.universityName,
            country: values.country,
            website: values.website,
            institutionType: values.institutionType,
            address: values.address,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            phone: values.phone,
            yearFounded: values.yearFounded,
          })
        ).unwrap();

        setUniversityId(universityId);
      } else if (formStep === 1) {
        const dto = {
          contactFullName: values.contactFullName,
          contactPosition: values.contactPosition,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,
          documentType: values.documentType,
          universityId: universityId,
        };

        const formData = new FormData();
        formData.append(
          "dto",
          new Blob([JSON.stringify(dto)], { type: "application/json" })
        );
        formData.append("document", values.document); // must be a File

        await dispatch(submitUniversityVerification({ formData })).unwrap();
      } else if (formStep === 2) {
        await dispatch(
          setupUniversityAdmin({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.adminEmail,
            universityId: universityId,
          })
        ).unwrap();
      }
      setCurrentStep((prev) => prev + 1);
      setFormStep((prev) => prev + 1);
    } catch (err) {
      actions.setSubmitting(false);
      actions.setErrors({
        form: err.message || "Submission failed. Please try again.",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[formStep]}
      onSubmit={handleNext}
    >
      {({ setFieldValue, isSubmitting, errors }) => (
        <Form className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={formStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 1: BASIC INFO */}
              {formStep === 0 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Institution Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="universityName" className={label}>
                        University Name
                      </label>
                      <Field
                        name="universityName"
                        type="text"
                        className={input}
                        placeholder="University of Education"
                      />
                      <ErrorMessage
                        name="universityName"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className={label}>
                        Country
                      </label>
                      <Field as="select" name="country" className={input}>
                        <option value="">Select country</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                        {/* Add more countries as needed */}
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className={label}>
                        Official Website
                      </label>
                      <Field
                        name="website"
                        type="url"
                        className={input}
                        placeholder="https://university.edu"
                      />
                      <ErrorMessage
                        name="website"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="institutionType" className={label}>
                        Institution Type
                      </label>
                      <Field
                        as="select"
                        name="institutionType"
                        className={input}
                      >
                        <option value="">Select type</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Community">Community College</option>
                        <option value="Vocational">
                          Vocational/Trade School
                        </option>
                        <option value="Research">Research University</option>
                        <option value="Liberal Arts">
                          Liberal Arts College
                        </option>
                      </Field>
                      <ErrorMessage
                        name="institutionType"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="yearFounded" className={label}>
                        Year Founded
                      </label>
                      <Field
                        name="yearFounded"
                        type="number"
                        className={input}
                        placeholder="e.g. 1900"
                        min="1500"
                        max={new Date().getFullYear()}
                      />
                      <ErrorMessage
                        name="yearFounded"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className={label}>
                        Contact Phone
                      </label>
                      <Field
                        name="phone"
                        type="tel"
                        className={input}
                        placeholder="+1 (555) 123-4567"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className={label}>
                        Street Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        className={input}
                        placeholder="123 Education Street"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className={label}>
                        City
                      </label>
                      <Field
                        name="city"
                        type="text"
                        className={input}
                        placeholder="City name"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className={label}>
                        State/Province
                      </label>
                      <Field
                        name="state"
                        type="text"
                        className={input}
                        placeholder="State/Province"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="postalCode" className={label}>
                        Postal Code
                      </label>
                      <Field
                        name="postalCode"
                        type="text"
                        className={input}
                        placeholder="ZIP/Postal code"
                      />
                      <ErrorMessage
                        name="postalCode"
                        component="div"
                        className={error}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: VERIFICATION */}
              {formStep === 1 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Verification & Authorization
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Please provide contact information for the authorized
                    representative and verification documents.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactFullName" className={label}>
                        Full Name
                      </label>
                      <Field
                        name="contactFullName"
                        type="text"
                        className={input}
                        placeholder="John Smith"
                      />
                      <ErrorMessage
                        name="contactFullName"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactPosition" className={label}>
                        Position/Title
                      </label>
                      <Field
                        name="contactPosition"
                        type="text"
                        className={input}
                        placeholder="Registrar, Dean, etc."
                      />
                      <ErrorMessage
                        name="contactPosition"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactEmail" className={label}>
                        Official Email
                      </label>
                      <Field
                        name="contactEmail"
                        type="email"
                        className={input}
                        placeholder="official@university.edu"
                      />
                      <ErrorMessage
                        name="contactEmail"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="contactPhone" className={label}>
                        Contact Phone
                      </label>
                      <Field
                        name="contactPhone"
                        type="tel"
                        className={input}
                        placeholder="+1 (555) 123-4567"
                      />
                      <ErrorMessage
                        name="contactPhone"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="documentType" className={label}>
                        Document Type
                      </label>
                      <Field as="select" name="documentType" className={input}>
                        <option value="authorization_letter">
                          Authorization Letter
                        </option>
                        <option value="government_document">
                          Government Accreditation
                        </option>
                        <option value="legal_document">Legal Document</option>
                        <option value="other">Other Official Document</option>
                      </Field>
                      <ErrorMessage
                        name="documentType"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="document" className={label}>
                        Verification Document
                      </label>
                      <input
                        id="document"
                        name="document"
                        type="file"
                        className={input}
                        onChange={(e) =>
                          setFieldValue("document", e.currentTarget.files[0])
                        }
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <ErrorMessage
                        name="document"
                        component="div"
                        className={error}
                      />
                      <div className={infoText}>
                        <FiInfo className="mt-0.5 flex-shrink-0" />
                        <span>
                          Upload official document proving your authorization to
                          represent the institution (PDF, JPG, PNG, max 5MB)
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 3: ADMIN SETUP */}
              {formStep === 2 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Administrator Account Setup
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Create the primary administrator account for your
                    institution.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className={label}>
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        className={input}
                        placeholder="First name"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className={label}>
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        className={input}
                        placeholder="Last name"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="adminEmail" className={label}>
                        Email Address
                      </label>
                      <Field
                        name="adminEmail"
                        type="email"
                        className={input}
                        placeholder="admin@university.edu"
                      />
                      <ErrorMessage
                        name="adminEmail"
                        component="div"
                        className={error}
                      />
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <div className="flex items-start">
                        <Field
                          type="checkbox"
                          name="agreeToTerms"
                          className="mt-1 h-4 w-4 text-cyan-600"
                        />
                        <label
                          htmlFor="agreeToTerms"
                          className="ml-2 text-sm text-gray-700"
                        >
                          I agree to the Orbit Platform{" "}
                          <a href="#" className="text-cyan-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-cyan-600 hover:underline">
                            Privacy Policy
                          </a>
                          . I confirm that I have the authority to register this
                          institution.
                        </label>
                      </div>
                      <ErrorMessage
                        name="agreeToTerms"
                        component="div"
                        className={error}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* STEP 4: COMPLETE */}
              {formStep === 3 && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <FiCheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Registration Submitted Successfully!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Thank you for registering your institution with Orbit.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Our team will review your application and contact you within
                    2 business days. You'll receive a confirmation email with
                    next steps.
                  </p>
                  <Link to="/auth" className={`${btnprimary} px-6 py-3`}>
                    Return to Login
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Error message for form submission */}
          {errors.form && (
            <div className="text-red-500 text-sm mt-2 bg-red-50 p-3 rounded">
              <FiInfo className="inline mr-1" /> {errors.form}
            </div>
          )}

          {/* Navigation Buttons */}
          {formStep < 3 && (
            <div className="flex justify-between pt-4">
              {formStep > 0 && (
                <button
                  type="button"
                  onClick={() => setFormStep((prev) => prev - 1)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-shadow ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? "Processing..."
                  : formStep === 2
                  ? "Complete Registration"
                  : "Continue"}
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

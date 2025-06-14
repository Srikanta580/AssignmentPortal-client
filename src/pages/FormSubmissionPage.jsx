import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchForm } from "../features/admin/formSlice";
import FormComponent from "../components/forms/FormComponent";
import apiClient from "../services/apiClient";
import {
  GoogleLogin,
  googleLogout,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import axios from "axios";

function FormSubmissionPage() {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const { submissionForm: form } = useSelector((state) => state.forms);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    dispatch(fetchForm(formId));
  }, [dispatch, formId]);

  // Auto login with One Tap
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      handleLoginSuccess(credentialResponse);
    },
    onError: () => {
      console.log("One Tap login failed");
    },
    disabled: isAuthenticating || userEmail !== null,
  });

  const handleLoginSuccess = async (credentialResponse) => {
    setIsAuthenticating(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credentialResponse.credential}`,
        {
          headers: {
            Authorization: `Bearer ${credentialResponse.credential}`,
            Accept: "application/json",
          },
        }
      );
      setUserEmail(res.data.email);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUserEmail(null);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const responses = form.questions.map((question, idx) => {
      const value = formData.get(`question-${idx}`);
      console.log(question.label, " : ", value);
      return {
        questionId: question.id ?? idx,
        label: question.label,
        answer: value,
      };
    });

    try {
      await apiClient.post("/form/submit", {
        formId: formId,
        submittedBy: userEmail, // Now using the actual user email
        answers: responses,
      });
      console.log("Form submitted");
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  if (!form || !form.questions) {
    return <p className="text-center text-gray-500">Loading form...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        {!userEmail ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
            size="medium"
            text="signin_with"
          />
        ) : (
          <div className="flex items-center gap-2 mb-4">
            <span>Signed in as: {userEmail}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              (Not you?)
            </button>
          </div>
        )}
      </div>

      <FormComponent
        form={form}
        onSubmit={handleSubmitForm}
        disabled={!userEmail} // Optional: disable form if not signed in
      />

      {!userEmail && (
        <div className="mt-2 text-sm text-gray-600">
          Please sign in with Google to submit this form.
        </div>
      )}
    </div>
  );
}

export default FormSubmissionPage;

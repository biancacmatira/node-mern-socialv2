import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextInput from "../../shared/components/CustomTextInput";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const auth = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const valSchema = Yup.object({
    username: Yup.string().required("Required!"),
    email: Yup.string()
      .email()
      .concat(!isLoginMode ? Yup.string().required("Yuyup") : null),
    password: Yup.string().required("Password required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null])
      .concat(!isLoginMode ? Yup.string().required("Yuyup") : null),
  });

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={valSchema}
        onSubmit={(value, { setSubmitting, resetForm }) => {
          // do api call for login/signup
          auth.login();
          resetForm();
          setSubmitting(false);
        }}
      >
        {(props) => {
          return (
            <div className="row">
              <Form>
                <h1>{isLoginMode ? "Sign In" : "Sign Up"}</h1>
                <CustomTextInput label="Username" name="username" type="text" />
                {!isLoginMode && (
                  <CustomTextInput label="Email" name="email" type="text" />
                )}
                <CustomTextInput
                  label="Password"
                  name="password"
                  type="password"
                />
                {!isLoginMode && (
                  <CustomTextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                )}

                <button type="submit" disabled={props.isSubmitting}>
                  {props.isSubmitting ? "Loading..." : "Submit"}
                </button>
              </Form>
              <button
                onClick={() => {
                  switchModeHandler();
                  props.resetForm();
                }}
              >
                Switch to {isLoginMode ? "Sign Up" : "Sign In"}
              </button>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Auth;

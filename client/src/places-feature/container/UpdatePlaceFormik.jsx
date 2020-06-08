import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../../shared/components/CustomTextInput";

import { DUMMY_PLACES } from "../../data";

const UpdatePlaceFormik = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initVal, setInitVal] = useState({
    title: "",
    description: "",
    address: "",
  });

  const placeId = useParams().pid;
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === +placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setInitVal({
        title: identifiedPlace.title,
        description: identifiedPlace.description,
        address: identifiedPlace.address,
      });
    }
    setIsLoading(false);
  }, [identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="row center">
        <h2>Could not find place.</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="row center">
        <p>Loading...</p>
      </div>
    );
  }

  const valSchema = Yup.object({
    title: Yup.string()
      .min(3, "Must have more than 3 characters.")
      .required("A title is required."),
    description: Yup.string().required("A description is required."),
    address: Yup.string().required("An address is required."),
  });

  return (
    <div>
      <Formik
        initialValues={initVal}
        validationSchema={valSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // async api post call here, submit code
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 500);
        }}
      >
        {(props) => {
          return (
            <div className="row">
              <div className="col s6 offset-s3">
                <Form>
                  <h1>Edit a Place</h1>
                  <CustomTextInput label="Title" name="title" type="text" />
                  <CustomTextInput
                    label="Description"
                    name="description"
                    type="textarea"
                  />
                  <CustomTextInput label="Address" name="address" type="text" />
                  <button
                    className="waves-effect waves-light btn white-text green darken-4"
                    type="submit"
                    disabled={!!props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading..." : "Submit"}
                    <i className="material-icons right">send</i>
                  </button>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdatePlaceFormik;

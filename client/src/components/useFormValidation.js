import React from 'react';

function useFormValidation(initialState, validate) {
  // state
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      // const noErrors = Object.keys(errors).length === 0;

      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

  function handleChange(event) {
    if (event.target.name === 'profilePicture') {
      setValues({
        ...values,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  }

  function handleSubmit(e, doSubmit) {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    setIsSubmitting(true);

    if (!validationErrors || Object.keys(validationErrors).length === 0) {
      // send request
      doSubmit(values);
    }
  }

  return {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;

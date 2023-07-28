import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../App.css'

const MyForm = () => {

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'Поле ім\'я обов\'язкове для заповнення';
    }
    return error;
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Поле електронної пошти обов\'язкове для заповнення';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Некоректний формат email';
    }
    return error;
  };

  const validatePhone = (value) => {
    let error;
    if (!value) {
      error = 'Поле телефону обов\'язкове для заповнення';
    } else if (!/^\d{12}$/.test(value)) {
      error = 'Телефон повинен містити тільки 12 цифр';
    }
    return error;
  };

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const handlePhoneInput = (e) => {
    const { value } = e.target;
    const onlyDigits = value.replace(/\D/g, '');
    e.target.value = onlyDigits;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form-container">
          <div className="form-field">
            <label htmlFor="name" className="form-label">Ім'я</label>
            <Field type="text" name="name" className="form-input" validate={validateName} />
            <ErrorMessage name="name" component="div" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-label">Електронна пошта</label>
            <Field type="email" name="email" className="form-input" validate={validateEmail} />
            <ErrorMessage name="email" component="div" className="form-error" />
          </div>

          <div className="form-field">
            <label htmlFor="phone" className="form-label">Телефон</label>
            <Field
              type="text"
              name="phone"
              className="form-input"
              validate={validatePhone}
              onKeyPress={handlePhoneInput}
            />
            <ErrorMessage name="phone" component="div" className="form-error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Відправити
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;

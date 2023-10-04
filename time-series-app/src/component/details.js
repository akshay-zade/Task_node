import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  variable1: Yup.number().required('Variable 1 is required'),
  variable2: Yup.number().required('Variable 2 is required'),
  timestamp: Yup.date().required('Timestamp is required'),
});

function TimeSeriesForm() {
  const initialValues = {
    variable1: '',
    variable2: '',

    timestamp: '',
  };

  const onSubmit = (values) => {
   
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="variable1">Variable 1</label>
          <Field type="number" name="variable1" />
          <ErrorMessage name="variable1" component="div" />
        </div>
        
        <div>
          <label htmlFor="timestamp">Timestamp</label>
          <Field type="datetime-local" name="timestamp" />
          <ErrorMessage name="timestamp" component="div" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default TimeSeriesForm;

import React from 'react';
import FormFieldPropTypes from './FormFieldPropTypes';
import FormDefaultComponentLibrary from './FormDefaultComponentLibrary';

const FormField = ({componentLibrary, ...props}) => {
   const Component = componentLibrary[props.type];
   return <Component {...props} />;
}

FormField.defaultProps = {
   checked: false,
   componentLibrary: FormDefaultComponentLibrary,
   type: 'text',
   value: '',
};

FormField.propTypes = FormFieldPropTypes;

export default FormField;

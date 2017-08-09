import React from 'react';
import FormDefaultComponentLibrary from './FormDefaultComponentLibrary';

let FormField = {};

FormField.Component = props => {
   const Component = props.componentLibrary[props.type];
   return <Component {...props} />;
}

FormField.Component.defaultProps = {
   type: 'text',
   value: '',
   label: '',
   placeholder: '',
   disabled: false,
   required: false,
   checked: false,
   radios: [],
   componentLibrary: FormDefaultComponentLibrary,
};

export default FormField;

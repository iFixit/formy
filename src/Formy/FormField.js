import React from 'react';

let FormField = {};

FormField.Component = ({ type, ...props }) => {
   const Component = props.componentLibrary[type];

   return (
      <Component {...props}/>
   );
};

FormField.fieldFactory = typeDefaults => instanceDefaults => ({
   ...FormField.default,
   ...typeDefaults,
   ...instanceDefaults,
});

FormField.default = {
   value: '',
   label: '',
   disabled: false,
   type: 'Default',
};

FormField.text = FormField.fieldFactory({
  placeholder: '',
  required: false,
  type: 'Text',
});

FormField.email = FormField.fieldFactory({
   placeholder: '',
   required: false,
   type: 'Email',
});

FormField.password = FormField.fieldFactory({
   placeholder: '',
   required: false,
   type: 'Password',
});

FormField.number = FormField.fieldFactory({
   placeholder: '' ,
   required: false,
   type: 'Number',
});

FormField.textarea = FormField.fieldFactory({
   placeholder: '',
   required: false,
   type: 'TextArea',
});

FormField.checkbox = FormField.fieldFactory({
   value: 'on',
   checked: false,
   required: false,
   type: 'Checkbox',
});

FormField.radio = FormField.fieldFactory({
   value: 'on',
   checked: false,
   required: false,
   type: 'Radio',
});

FormField.radiogroup = FormField.fieldFactory({
   radios: [],
   type: 'RadioGroup',
});

FormField.NON_COMPUTED_PROPERTIES = ['component'];

export default FormField;
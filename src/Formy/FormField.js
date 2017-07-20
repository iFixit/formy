import React from 'react';

let FormField = {};

FormField.Component = ({ type, ...props }) => {
   const Component = props.componentLibrary[type];

   return (
      <Component {...props}/>
   );
};

FormField.FieldFactory = typeDefaults => instanceDefaults => ({
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

FormField.Text = FormField.FieldFactory({
  placeholder: '',
  required: false,
  type: 'Text',
});

FormField.Email = FormField.FieldFactory({
   placeholder: '',
   required: false,
   type: 'Email',
});

FormField.Password = FormField.FieldFactory({
   placeholder: '',
   required: false,
   type: 'Password',
});

FormField.Number = FormField.FieldFactory({
   placeholder: '' ,
   required: false,
   type: 'Number',
});

FormField.Textarea = FormField.FieldFactory({
   placeholder: '',
   required: false,
   type: 'TextArea',
});

FormField.Checkbox = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   type: 'Checkbox',
});

FormField.Radio = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   type: 'Radio',
});

FormField.Radiogroup = FormField.FieldFactory({
   radios: [],
   type: 'RadioGroup',
});

FormField.NON_COMPUTED_PROPERTIES = ['component'];

export default FormField;
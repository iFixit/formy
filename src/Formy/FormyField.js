import React from 'react';

let FormField = {};

FormField.FieldFactory = typeDefaults => instanceDefaults => ({
   ...FormField.Default,
   ...typeDefaults,
   ...instanceDefaults,
});

FormField.Default = {
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

FormField.TextArea = FormField.FieldFactory({
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

FormField.RadioGroup = FormField.FieldFactory({
   radios: [],
   type: 'RadioGroup',
});

FormField.Component = ({ type, ...props }) => {
   const Component = props.componentLibrary[type];

   return (
      <Component {...props}/>
   );
};

FormField.NON_COMPUTED_PROPERTIES = ['component'];

export default FormField;
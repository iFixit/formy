import React from 'react';
import FormFieldComponentLibrary from './FormyFieldComponentLibrary';

let FormField = {};

FormField.ComponentLibrary = FormFieldComponentLibrary;

FormField.FieldFactory = typeDefaults => instanceDefaults => ({
   ...FormField.Default,
   ...typeDefaults,
   ...instanceDefaults,
});

FormField.Default = {
   value: '',
   label: '',
   disabled: false,
   component: FormField.ComponentLibrary.Default,
   type: 'default',
};

FormField.Text = FormField.FieldFactory({
  placeholder: '',
  required: false,
  component: FormField.ComponentLibrary.Text,
  type: 'text',
});

FormField.Email = FormField.FieldFactory({
   placeholder: '',
   required: false,
   component: FormField.ComponentLibrary.Email,
   type: 'email',
});

FormField.Password = FormField.FieldFactory({
   placeholder: '',
   required: false,
   component: FormField.ComponentLibrary.Password,
   type: 'password',
});

FormField.Number = FormField.FieldFactory({
   placeholder: '' ,
   required: false,
   component: FormField.ComponentLibrary.Number,
   type: 'number',
});

FormField.TextArea = FormField.FieldFactory({
   placeholder: '',
   required: false,
   component: FormField.ComponentLibrary.TextArea,
   type: 'textarea',
});

FormField.Checkbox = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   component: FormField.ComponentLibrary.Checkbox,
   type: 'checkbox',
});

FormField.Radio = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   component: FormField.ComponentLibrary.Radio,
   type: 'radio',
});

FormField.RadioGroup = FormField.FieldFactory({
   radios: [],
   component: FormField.ComponentLibrary.RadioGroup,
   type: 'radiogroup',
});

FormField.Component = props => (
   <props.component {...props}/>
);

FormField.NON_COMPUTED_PROPERTIES = ['component']

export default FormField;
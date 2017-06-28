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
};

FormField.Text = FormField.FieldFactory({
  placeHolder: '',
  required: false,
  component: FormField.ComponentLibrary.Text,
});

FormField.Email = FormField.FieldFactory({
   placeHolder: '',
   required: false,
   component: FormField.ComponentLibrary.Email,
});

FormField.Password = FormField.FieldFactory({
   placeHolder: '',
   required: false,
   component: FormField.ComponentLibrary.Password,
});

FormField.Number = FormField.FieldFactory({
   placeHolder: '' ,
   required: false,
   component: FormField.ComponentLibrary.Number,
});

FormField.TextArea = FormField.FieldFactory({
   placeHolder: '',
   required: false,
   component: FormField.ComponentLibrary.TextArea,
});

FormField.Checkbox = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   component: FormField.ComponentLibrary.Checkbox,
});

FormField.Radio = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   component: FormField.ComponentLibrary.Radio,
});

FormField.RadioGroup = FormField.FieldFactory({
   radios: [],
   component: FormField.ComponentLibrary.RadioGroup,
});

FormField.Component = props => (
   <props.component {...props}/>
);

FormField.NON_COMPUTED_PROPERTIES = ['component']

export default FormField;
import React from 'react';
import FormFieldComponentLibrary from './FormFieldComponentLibrary';

let FormField = {};

FormField.ComponentLibrary = FormFieldComponentLibrary;

FormField.FieldFactory = typeDefaults => appDefaults => ({
   ...FormField.Default(typeDefaults),
   ...appDefaults
});

FormField.Default = (typeDefaults) => ({ ...{
   value: '',
   label: '',
   required: false,
   disabled: false,
   component: FormField.ComponentLibrary.Default,
}, ...typeDefaults});

FormField.Text = FormField.FieldFactory({
  placeHolder: '',
  component: FormField.ComponentLibrary.Text,
});

FormField.Email = FormField.FieldFactory({
   placeHolder: '' ,
   component: FormField.ComponentLibrary.Email,
});

FormField.Password = FormField.FieldFactory({
   placeHolder: '' ,
   component: FormField.ComponentLibrary.Password,
});

FormField.Number = FormField.FieldFactory({
   placeHolder: '' ,
   component: FormField.ComponentLibrary.Number,
});

FormField.TextArea = FormField.FieldFactory({
   placeHolder: '',
   component: FormField.ComponentLibrary.TextArea,
});

FormField.Checkbox = FormField.FieldFactory({
   value: 'on',
   checked: false,
   component: FormField.ComponentLibrary.Checkbox,
});

FormField.Radio = FormField.FieldFactory({
   value: 'on',
   checked: false,
   component: FormField.ComponentLibrary.Radio,
});

FormField.RadioGroup = FormField.FieldFactory({
   radios: [],
   required: null,
   component: FormField.ComponentLibrary.RadioGroup,
});

FormField.Component = props => (
   <props.component {...props}/>
);

FormField.NON_COMPUTED_PROPERTIES = ['component']

export default FormField;
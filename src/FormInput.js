import React from 'react';
import FormInputComponentLibrary from './FormInputComponentLibrary.js';

let FormInput = {};

FormInput.InputComponentLibrary = FormInputComponentLibrary;

FormInput.InputFactory = typeDefaults => (
   state => Object.assign({}, FormInput.Default(), typeDefaults, state)
);

FormInput.Default = () => ({
   value: '',
   label: '',
   required: false,
   disabled: false,
   isValid: () => true,
   component: FormInput.InputComponentLibrary.Default,
});

FormInput.Text = FormInput.InputFactory({
  placeHolder: '',
  component: FormInput.InputComponentLibrary.Text,
});

FormInput.Email = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.InputComponentLibrary.Email,
});

FormInput.Password = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.InputComponentLibrary.Password,
});

FormInput.Number = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.InputComponentLibrary.Number,
});

FormInput.TextArea = FormInput.InputFactory({
   placeHolder: '',
   component: FormInput.InputComponentLibrary.TextArea,
});

FormInput.Checkbox = FormInput.InputFactory({
   value: false,
   component: FormInput.InputComponentLibrary.Checkbox,
});

FormInput.Radio = FormInput.InputFactory({ value: false });

FormInput.RadioGroup = FormInput.InputFactory({ radios: {} });

FormInput.Dropdown = FormInput.InputFactory({
   options: {},
   placeholder: false,
   customInput: false,
   customInputMaxLength: false,
   customInputOnlyNumbers: false,
});

FormInput.Component = props => (
   <props.component {...props}/>
);

export default FormInput;
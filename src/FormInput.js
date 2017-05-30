import React from 'react';
import FormInputComponentLibrary from './FormInputComponentLibrary';

let FormInput = {};

FormInput.ComponentLibrary = FormInputComponentLibrary;

FormInput.InputFactory = typeDefaults => (
   state => Object.assign({}, FormInput.Default(typeDefaults), state)
);

FormInput.Default = (typeDefaults) => Object.assign({}, {
   value: '',
   label: '',
   required: false,
   disabled: false,
   requestIsValid: () => Promise.resolve(),
   component: FormInput.ComponentLibrary.Default,
}, typeDefaults);

FormInput.Text = FormInput.InputFactory({
  placeHolder: '',
  component: FormInput.ComponentLibrary.Text,
});

FormInput.Email = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.ComponentLibrary.Email,
});

FormInput.Password = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.ComponentLibrary.Password,
});

FormInput.Number = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.ComponentLibrary.Number,
});

FormInput.TextArea = FormInput.InputFactory({
   placeHolder: '',
   component: FormInput.ComponentLibrary.TextArea,
});

FormInput.Checkbox = FormInput.InputFactory({
   value: false,
   component: FormInput.ComponentLibrary.Checkbox,
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
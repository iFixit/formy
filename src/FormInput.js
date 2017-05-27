import React from 'react';
import FormInputTypedComponent from './FormInputTypedComponent.js';

let FormInput = {};

FormInput.BASE_DEFAULTS = {
   value: '', // String
   label: '',
   required: false,
   disabled: false,
   isValid: () => true,
   component: FormInputTypedComponent.Default,
};

FormInput.InputFactory = typeDefaults => (
   options => Object.assign({}, FormInput.BASE_DEFAULTS, typeDefaults, options)
);

FormInput.Text = FormInput.InputFactory({
  placeHolder: '',
  component: FormInputTypedComponent.Text,
});

FormInput.Email = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInputTypedComponent.Email,
});

FormInput.Password = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInputTypedComponent.Password,
});

FormInput.Number = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInputTypedComponent.Number,
});

FormInput.TextArea = FormInput.InputFactory({
   placeHolder: '',
   component: FormInputTypedComponent.TextArea,
});

FormInput.Checkbox = FormInput.InputFactory({
   value: false,
   component: FormInputTypedComponent.Checkbox,
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
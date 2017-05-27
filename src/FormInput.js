import React from 'react';
import FormInputTypedComponent from './FormInputTypedComponent.js';

let FormInput = {};

FormInput.TypedComponent = FormInputTypedComponent;

FormInput.BASE_DEFAULTS = {
   value: '', // String
   label: '',
   required: false,
   disabled: false,
   isValid: () => true,
   component: FormInput.TypedComponent.Default,
};

FormInput.InputFactory = typeDefaults => (
   options => Object.assign({}, FormInput.BASE_DEFAULTS, typeDefaults, options)
);

FormInput.Text = FormInput.InputFactory({
  placeHolder: '',
  component: FormInput.TypedComponent.Text,
});

FormInput.Email = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.TypedComponent.Email,
});

FormInput.Password = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.TypedComponent.Password,
});

FormInput.Number = FormInput.InputFactory({
   placeHolder: '' ,
   component: FormInput.TypedComponent.Number,
});

FormInput.TextArea = FormInput.InputFactory({
   placeHolder: '',
   component: FormInput.TypedComponent.TextArea,
});

FormInput.Checkbox = FormInput.InputFactory({
   value: false,
   component: FormInput.TypedComponent.Checkbox,
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
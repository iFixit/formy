import React from 'react';
import FormComponent from './FormComponent';

let FormInput = {};

// FormInput.INPUT_TYPE = {
//
// }

FormInput.BASE_DEFAULTS = {
   value: '', // String
   label: '',
   required: false,
   disabled: false,
   isValid: () => true,
};

FormInput.InputFactory = typeDefaults => (
   options => Object.assign({}, FormInput.BASE_DEFAULTS, typeDefaults, options)
);

FormInput.Text = FormInput.InputFactory({
  placeHolder: '',
  component: FormComponent.Text
});

FormInput.Email = FormInput.InputFactory({ placeHolder: '' });

FormInput.Password = FormInput.InputFactory({ placeHolder: '' });

FormInput.Number = FormInput.InputFactory({ placeHolder: '' });

FormInput.TextBox = FormInput.InputFactory({ placeHolder: '' });

FormInput.Checkbox = FormInput.InputFactory({ value: false });

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
  <props.component {...props} />
);

export default FormInput;
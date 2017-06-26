import React from 'react';
import FormInputComponentLibrary from './FormInputComponentLibrary';

let FormInput = {};

FormInput.ComponentLibrary = FormInputComponentLibrary;

FormInput.InputFactory = typeDefaults => (
   state => ({ ...FormInput.Default(typeDefaults), ...state })
);

FormInput.Default = (typeDefaults) => ({ ...{
   value: '',
   label: '',
   required: false,
   disabled: false,
   component: FormInput.ComponentLibrary.Default,
}, ...typeDefaults});

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
   value: 'on',
   checked: false,
   component: FormInput.ComponentLibrary.Checkbox,
});

FormInput.Radio = FormInput.InputFactory({
   value: 'on',
   checked: false,
   component: FormInput.ComponentLibrary.Radio,
});

FormInput.Dropdown = FormInput.InputFactory({
   options: {},
   placeholder: false,
   customInput: false,
   customInputMaxLength: false,
   customInputOnlyNumbers: false,
});

FormInput.RadioGroup = FormInput.InputFactory({
   radios: {},
   component: class RadioGroup extends React.Component {
      render() {
         console.log(window.test = this.props.onChange)

         return(
            <div>
               {this.props.radios.map(radio => (
                  FormInput.Component({...radio, ...{
                     key: radio.value,
                     name: this.props.name,
                     onChange: ev => console.log('here'),
                     checked: this.props.value === radio.value,
                  }})
               ))}
            </div>
         )
      }
   },
});

FormInput.Component = props => (
   <props.component {...props}/>
);

FormInput.NON_COMPUTED_PROPERTIES = ['component']

export default FormInput;
import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Instance = (name, state) => ({ name, state });

Form.Component = class FormComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = Object.assign({}, props.instance.state);
      this.inputRefs = {}; // Populated in getInputsWithProps()
   }

   onChangeFactory(input) {
      return () => {
         let newInput = Object.assign({}, this.state[input]);
         newInput.value = this.inputRefs[input].value;
         if (newInput.checked !== undefined) {
            newInput.checked = this.inputRefs[input].checked;
         }

         this.setState({ [input]: newInput });
      }
   }

   getInputsWithProps() {
      return React.Children.map(this.props.children, input => (
         (input.type === Form.Input.Component) ? React.cloneElement(
          input, Object.assign({}, this.state[input.key], {
            name: input.key,
            onChange: this.onChangeFactory(input.key),
            inputRef: inputElement => this.inputRefs[input.key] = inputElement,
         })) : input
      ));
   }

   requestIsValid() {
      return Promise.all(Object.keys(this.state).map(input => {
         let newInput = Object.assign({}, this.state[input]);

         if (!newInput.isValid) {
            newInput.isValid = this.state[input].requestIsValid();
            this.setState({ [input]: newInput });
         }

         return newInput.isValid;
      }));
   }

   render() {
      return(
         <form name={this.props.instance.name}>
            {this.getInputsWithProps()}
         </form>
      );
   }
};

export default Form;
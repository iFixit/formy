import React from 'react';
import FormInput from './FormInput';

let Form = {};

Form.Input = FormInput;

Form.Component = class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = Object.assign({}, props.instance);
   }

   onChangeFactory(input) {
      return (ev) => {
         let newInput = Object.assign({}, this.state[input]);
         newInput.value = ev.target.value;
         newInput.checked = ev.target.checked;

         if (this.state[input].value !== newInput.value) {
            newInput.isValid = newInput.requestIsValid();
         }

         this.setState({ [input]: newInput });
      }
   }

   getInputsWithProps() {
      return React.Children.map(this.props.children,
         input => React.cloneElement(input, Object.assign(
            {}, this.state[input.key], {
               onChange: this.onChangeFactory(input.key),
            }
         ))
      );
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
         <form>
            {this.getInputsWithProps()}
         </form>
      );
   }
};

export default Form;
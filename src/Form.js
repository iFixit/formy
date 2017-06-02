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

   onChangeFactory(inputKey) {
      return () => {
         let newInput = Object.assign({}, this.state[inputKey]);
         newInput.value = this.inputRefs[inputKey].value;
         if (newInput.checked !== undefined) {
            newInput.checked = this.inputRefs[inputKey].checked;
         }

         this.setState({ [inputKey]: newInput });
      }
   }

   onBlurFactory(inputKey) {
      return() => {}
   }

   getComputedInputProps(input) {
      let computedState = Object.assign({}, this.state[input.key]);

      Object.keys(computedState)
       .filter(prop => prop !== 'component' && computedState[prop] instanceof Function)
       .forEach(prop => { computedState[prop] = computedState[prop](this.state) });

      computedState.name = input.key;
      computedState.onChange = this.onChangeFactory(input.key);
      computedState.onBlur = this.onBlurFactory(input.key);
      computedState.inputRef = inputRef => this.inputRefs[input.key] = inputRef;

      return computedState;
   }

   getInputsWithProps() {
      return React.Children.map(this.props.children, child => (
         child.type === Form.Input.Component ? React.cloneElement(
            child, this.getComputedInputProps(child)
         ) : child
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
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
      // only compute state of elements with type Form.Input.Component
      if (input.type !== Form.Input.Component) {
         return input.props;
      }

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

   getInputsWithProps(children) {
      return React.Children.map(children, child => {
         // handle leaves that are not valid react elements (e.g. text nodes)
         // note: valid react elements can be html tags (e.g. `h1`, `div`, etc.) in addition to React components
         if (!React.isValidElement(child)) {
            return child;
         }

         // handle parent nodes
         if (child.props.children) {
            children = this.getInputsWithProps(child.props.children)
            return React.cloneElement(child, {children});
         }

         // handle leaves that are valid react elements
         return React.cloneElement(child, this.getComputedInputProps(child));
      });
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
            {this.getInputsWithProps(this.props.children)}
         </form>
      );
   }
};

export default Form;
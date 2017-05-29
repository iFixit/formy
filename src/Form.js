import React from 'react';
import FormInput from './FormInput.js';

let Form = {};

Form.Input = FormInput;

Form.Component = class Form extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         inputs: Object.assign({}, this.props.instance)
      };
   }

   handleOnChange(input) {
      return (ev) => {
         let inputs = Object.assign({}, this.state.inputs);
         inputs[input].value = ev.target.value;
         this.setState({ inputs: inputs });
      }
   }

   getStatefulInputs() {
      return React.Children.map(this.props.children,
         input => React.cloneElement(input, Object.assign(
            {}, this.state.inputs[input.key], {onChange: this.handleOnChange(input.key)}
         ))
      );
   }

   requestIsValid() {
      return Promise.all(Object.keys(this.state.inputs).map(
         input => (this.state.inputs[input].requestIsValid())
      )).then(() => (true), () => (false));
   }

   render() {
      return(
         <form>
            Form Begins <br/><br/>

            {this.getStatefulInputs()}

            <br/><br/> Form Ends
         </form>
      );
   }
};

export default Form;
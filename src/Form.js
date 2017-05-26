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

   getStatefulInputs() {
      // return React.Children.map(this.props.children,
      //    input => React.cloneElement(input, this.state.inputs[input.key])
      // );
      // input => React.cloneElement(input, this.state.inputs[input.key])
      return React.Children.map(this.props.children,

         input => {
            const data = this.state.inputs[input.key];
            const Hehe = data.component;
            console.log(data.component)
            // return <Hehe {...data} />
            return React.createElement(data.component, data);
         }
      );
   }

   render() {
      return(
         <form>
            Form Begins <br/><br/>

            {this.getStatefulInputs()}

            <br/> Form Ends
         </form>
      );
   }
};

export default Form;
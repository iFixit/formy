import React from 'react';
import Form from './Form';

const SignupForm = props => {
   const form = Form.getProps(props);

   return(
      <Form.Component {...form}>
         <h1>Form</h1>
         <Form.Input.Component {...form.inputs.name}/>
         <Form.Input.Component {...form.inputs.email}/>
         <Form.Input.Component {...form.inputs.password}/>
         <Form.Input.Component {...form.inputs.newsletterSignup}/>
         <Form.Input.Component {...form.inputs.address}/>
         <button type="submit">Submit</button>
      </Form.Component>
   );
}

class App extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'signupForm',
         onSubmit: Form.onSubmit(values => this.submitForm(values)),
         inputs: Form.Inputs({
           onChange: Form.onChange(form => this.updateForm(form)),
         }, {
            name: Form.Input.Text({
               name: 'OtherName',
               label: 'Name',
               placeholder: 'Doc Brown',
            }),
            email: Form.Input.Email({
               label: 'Email',
            }),
            password: Form.Input.Password({
               label: 'Password',
            }),
            newsletterSignup: Form.Input.Checkbox({
               label: 'Signup for our newletter?',
            }),
            address: Form.Input.Text({
               label: 'Enter your address',
               disabled: form => !form.inputs.newsletterSignup.checked,
            }),
         }),
      };

      this.state = { form };
   }

   updateForm(form) {
      this.setState({ form });
   }

   submitForm(values) {
      console.log(values)
   }

   render() {
      return(
         <SignupForm {...this.state.form}/>
      );
   }
}

export default App;
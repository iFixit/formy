import React from 'react';
import Form from './Form';

const SignupForm = props => {
   const form = Form.getProps(props);

   return(
      <Form.Component>
         <h1>Form</h1>
         <Form.Input.Component {...form.name}/>
         <Form.Input.Component {...form.email}/>
         <Form.Input.Component {...form.password}/>
         <Form.Input.Component {...form.newsletterSignup}/>
         <Form.Input.Component {...form.address}/>
      </Form.Component>
   );
}

class App extends React.Component {
   constructor(props) {
      super(props);

      const form = Form.Instance({
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
            disabled: form => !form.newsletterSignup.checked,
         }),
      }, {
         onChange: Form.onChange(form => this.updateForm(form)),
      });

      this.state = {
         signupForm: form,
      };
   }

   updateForm(form) {
      this.setState({
         signupForm: form,
      });
   }

   render() {
      return(
         <SignupForm {...this.state.signupForm}/>
      );
   }
}

export default App;
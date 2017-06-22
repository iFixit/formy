import React from 'react';
import Form from './Form';

const SignupForm = props => {
   const form = Form.getProps(props);

   return(
      <Form.Component>
         <h1>Form</h1>
         <Form.Input.Component {...form.name}/>
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
         onChange: Form.onChange(updatedForm => {
            this.updateForm(updatedForm);
         }),
      });

      this.state = {
         signupForm: form,
      };
   }

   updateForm(updatedForm) {
      this.setState({
         signupForm: updatedForm,
      });
   }

   onChangeFactory(inputKey) {
      return ev => {
         console.log(inputKey)
         const form = this.state.signupForm;
         const input = form[inputKey];
         const updatedInput = { ...input, ...{value: ev.target.value} };
         const updatedForm = { ...form, ...{[inputKey]: updatedInput} };

         this.setState({ signupForm: updatedForm });
      };
   }

   render() {
      return(
         <SignupForm {...this.state.signupForm}/>
      );
   }
}

export default App;
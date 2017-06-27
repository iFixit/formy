import React from 'react';
import Form from './Form';

const SignupForm = props => {
   const form = Form.getProps(props);

   return(
      <Form.Component {...form}>
         <h1>Form</h1>
         <Form.Field.Component {...form.fields.name}/>
         <Form.Field.Component {...form.fields.email}/>
         <Form.Field.Component {...form.fields.password}/>
         <Form.Field.Component {...form.fields.newsletterSignup}/>
         <Form.Field.Component {...form.fields.address}/>
         <Form.Field.Component {...form.fields.faveFood}/>
         <button type="submit">Submit</button>
      </Form.Component>
   );
};

class App extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'signupForm',
         onSubmit: Form.onSubmit(values => this.submitForm(values)),
         fields: Form.Fields({
            onChange: Form.onChange(form => this.updateForm(form)),
         }, {
            name: Form.Field.Text({
               name: 'OtherName',
               label: 'Name',
               placeholder: 'Doc Brown',
            }),
            email: Form.Field.Email({
               label: 'Email',
            }),
            password: Form.Field.Password({
               label: 'Password',
            }),
            newsletterSignup: Form.Field.Checkbox({
               label: 'Signup for our newletter?',
            }),
            address: Form.Field.Text({
               label: 'Enter your address',
               disabled: form => !form.fields.newsletterSignup.checked,
            }),
            faveFood: Form.Field.RadioGroup({
               value: 'burrito',
               radios: [
                  Form.Field.Radio({ label: 'Burrito', value: 'burrito' }),
                  Form.Field.Radio({ label: 'Pasta', value: 'pasta' }),
               ],
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
};

export default App;
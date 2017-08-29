import React from 'react';
import Form from '../Formy/Form';

class ExampleValidityForm extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'signupForm',
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
            required: true,
         }, {
            name: {
               type: 'text',
               label: 'Name',
            },
            email: {
               type: 'email',
               label: 'Email',
            },
            password: {
               type: 'password',
               label: 'Password',
            },
            newsletterSignup: {
               type: 'checkbox',
               label: 'Signup for our newsletter?',
            },
         }),
      };

      this.state = { form };
   }

   render() {
      const form = Form.getProps(this.state.form);

      return(
         <Form.Component {...form}>
            <Form.Field {...form.fields.name}/>
            <Form.Field {...form.fields.email}/>
            <Form.Field {...form.fields.password}/>
            <Form.Field {...form.fields.newsletterSignup}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleValidityForm;

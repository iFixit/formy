import React from 'react';
import Form from '../Formy/Form';

class ExampleBasicForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         form: {
            name: 'signupForm',
            onSubmit: Form.onSubmitFactory(data => console.log(data)),
            fields: Form.fields({
               onChange: Form.onChangeFactory(form => this.setState({ form })),
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
                  label: 'Password'
               },
               newsletterSignup: {
                  type: 'checkbox',
                  label: 'Signup for our newsletter?',
               },
            }),
         },
      }
   }

   submitForm(data) {
      console.log(data);
   }

   render() {
      const form = Form.getProps(this.state.form);

      return(
         <Form.Component {...form}>
            <Form.Field.Component {...form.fields.name}/>
            <Form.Field.Component {...form.fields.email}/>
            <Form.Field.Component {...form.fields.password}/>
            <Form.Field.Component {...form.fields.newsletterSignup}/>
            <button type="submit"/>
         </Form.Component>
      );
   }
}

export default ExampleBasicForm;
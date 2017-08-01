import React from 'react';
import Form from '../Formy/Form';

class ExampleBasicForm extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'signupForm',
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            name: Form.Field.Text({ label: 'Name' }),
            email: Form.Field.Email({ label: 'Email' }),
            password: Form.Field.Password({ label: 'Password' }),
            newsletterSignup: Form.Field.Checkbox({ label: 'Signup for our newsletter?' }),
         }),
      };

      this.state = { form };
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
         </Form.Component>
      );
   }
}

export default ExampleBasicForm;
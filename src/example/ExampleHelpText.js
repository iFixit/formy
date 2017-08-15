import React from 'react';
import Form from '../Formy/Form';

class ExampleHelpText extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'signupForm',
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            name: {
               type: 'text',
               label: 'Name',
               description: 'This is where you can type your name!'
            },
            email: {
               type: 'email',
               label: 'Email',
               description: 'This great form can also accept your email address.'
            },
            help: {
               type: 'text',
               label: 'HelpText',
               value: form => form.fields.name.description
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
            <Form.Field {...form.fields.help}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleHelpText;

import React from 'react';
import Form from '../Formy/Form';

class ExampleCustomValidity extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            name: {
               type: 'text',
               label: 'dont even think about starting this with a "z"',
               customValidity: Form.customValidityFactory(
                  form => form.fields.name.value[0] !== 'z',
                  'names cant start with z sorry',
               ),
            },
            email: {
               type: 'email',
               label: 'sorry we dont allow @gmail.com users',
               customValidity: Form.customValidityFactory(
                  form => !form.fields.email.value.includes('@gmail.com'),
                  'sorry we dont allow gmail users',
               ),
            },
            bio: {
               type: 'textarea',
               label: 'Overriding the default "required" validation message',
               customValidity: Form.customValidityFactory(
                  form => form.fields.bio.value,
                  'PLEASE FILL THIS OUT!!!!!🤠',
               ),
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
            <Form.Field {...form.fields.bio}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleCustomValidity;

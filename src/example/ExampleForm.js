import React from 'react';
import Form from '../Formy/Form';

class ExampleForm extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'text',
         onSubmit: Form.onSubmitFactory(data => this.submitForm(data)),
         fields: Form.Fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            exampleField: props,
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
            <Form.Field.Component {...form.fields.exampleField}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleForm;
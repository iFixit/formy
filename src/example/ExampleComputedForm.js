import React from 'react';
import Form from '../Formy/Formy';

class ExampleComputedForm extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'text',
         onSubmit: Form.onSubmit(data => this.submitForm(data)),
         fields: Form.Fields({
            onChange: Form.onChange(form => this.setState({ form })),
         }, {
            disable: Form.Field.Checkbox({ label: 'Disable Text Input?' }),
            textInput: Form.Field.Text({ disabled: form => form.fields.disable.checked }),
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
            <Form.Field.Component {...form.fields.disable}/>
            <Form.Field.Component {...form.fields.textInput}/>
         </Form.Component>
      );
   }
}

export default ExampleComputedForm;
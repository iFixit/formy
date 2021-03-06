import React from 'react';
import Form from '../Formy/Form';

class ExampleComputedForm extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => this.submitForm(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            disable: { type: 'checkbox', label: 'Disable Text Input?' },
            textInput: { type: 'text', disabled: form => form.fields.disable.checked },
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
            <Form.Field {...form.fields.disable}/>
            <Form.Field {...form.fields.textInput}/>
         </Form.Component>
      );
   }
}

export default ExampleComputedForm;

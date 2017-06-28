import React from 'react';
import Form from '../Formy/Formy';

class Text extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'text',
         onSubmit: Form.onSubmit(data => this.submitForm(data)),
         fields: Form.Fields({
            onChange: Form.onChange(form => this.updateForm(form)),
         }, {
            name: Form.Field.Text(props),
         }),
      };

      this.state = { form };
   }

   updateForm(form) {
      this.setState({ form });
   }

   submitForm(data) {
      console.log(data);
   }

   render() {
      const form = Form.getProps(this.state.form);

      return(
         <Form.Component {...form}>
            <Form.Field.Component {...form.fields.name}/>
         </Form.Component>
      );
   }
}

export default Text;
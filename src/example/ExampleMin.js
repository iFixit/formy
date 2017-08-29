import React from 'react';
import Form from '../Formy/Form';

class ExampleMin extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         name: 'signupForm',
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            number: {
               min: 3,
               type: 'number',
            },
         }),
      };

      this.state = { form };
   }

   render() {
      const form = Form.getProps(this.state.form);

      return(
         <Form.Component {...form}>
            <Form.Field {...form.fields.number}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleMin;

import React from 'react';
import Form from '../Formy/Form';

class ExamplePattern extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            name: {
               pattern: "abcdefg",
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
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExamplePattern;

import React from 'react';
import Form from '../Formy/Form';

class ExampleSelect extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         id: 'signupForm',
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            faveFood: {
               type: 'select',
               label: "What's your favorite food?",
               value: 'pizza',
               options: [
                  { label: 'Burrito', value: 'burrito' },
                  { label: 'Pizza', value: 'pizza' },
                  { label: 'Pasta', value: 'pasta' },
               ],
            },
         }),
      };

      this.state = { form };
   }

   render() {
      const form = Form.getProps(this.state.form);

      console.log(form.fields)

      return(
         <Form.Component {...form}>
            <Form.Field {...form.fields.faveFood}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleSelect;

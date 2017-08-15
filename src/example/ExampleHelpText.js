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
            ...Form.onActiveFactory(form => this.setState({ form })),
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
               type: 'paragraph',
               label: 'HelpText',
               value: form => {
                  let maxTime = 0;
                  let maxDescription = 'No help text';

                  for (const fieldKey in form.fields) {
                     const field = form.fields[fieldKey];

                     if (field.focus && field.description &&
                      maxTime < field.focusTime) {
                        maxDescription = field.description;
                        maxTime = field.focusTime;
                     }

                     if (field.hover && field.description &&
                      maxTime < field.hoverTime) {
                        maxDescription = field.description;
                        maxTime = field.hoverTime;
                     }
                  }

                  return maxDescription;
               }
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

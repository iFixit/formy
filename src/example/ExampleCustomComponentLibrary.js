import React from 'react';
import Form from '../Formy/Form';

const customComponentLibrary = {
   ...Form.Field.Component.defaultProps.componentLibrary,
   ...{
      text: props => (
         <label>
            <em>{props.label}</em>
            <input
               type={props.type}
               checked={props.checked}
               value={props.value}
               name={props.name}
               disabled={props.disabled}
               required={props.required}
               placeholder={props.placeholder}
               onChange={props.onChange}
            />
         </label>
      ),
   },
};

class ExampleCustomComponentLibrary extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
            componentLibrary: customComponentLibrary,
         }, {
            text: { type: 'text', label: 'Whoah this is a seriously crazy custom component' },
            checkbox: { type: 'checkbox', label: 'This is a default component' },
         }),
      };

      this.state = { form };
   }

   render() {
      const form = Form.getProps(this.state.form);

      return(
         <Form.Component {...form}>
            <Form.Field.Component {...form.fields.text}/>
            <br/>
            <Form.Field.Component {...form.fields.checkbox}/>
         </Form.Component>
      );
   }
}

export default ExampleCustomComponentLibrary;
import React from 'react';
import Form from '../Formy/Form';

const customComponentLibrary = {
   Text: props => (
      <label>
         <marquee>🌀🌐🌀{props.label}🌀🌐🌀</marquee>
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
};

class ExampleCustomComponentLibrary extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => this.submitForm(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
            componentLibrary: { ...Form.defaultComponentLibrary, ...customComponentLibrary },
         }, {
            text: Form.Field.text({
               label: 'Whoah this is a seriously crazy custom component'
            }),
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
            <Form.Field.Component {...form.fields.text}/>
         </Form.Component>
      );
   }
}

export default ExampleCustomComponentLibrary;
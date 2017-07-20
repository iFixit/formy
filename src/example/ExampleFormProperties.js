import React from 'react';
import Form from '../Formy/Form';

class ExampleFormProperties extends React.Component {
   render() {
      const exampleFields = {
         text: Form.Field.Text(),
         email: Form.Field.Email(),
         password: Form.Field.Password(),
         number: Form.Field.Number(),
         textarea: Form.Field.Textarea(),
         checkbox: Form.Field.Checkbox(),
         radio: Form.Field.Radio(),
         radiogroup: Form.Field.Radiogroup({
            radios: [
               Form.Field.Radio({ value: 'value' }),
               Form.Field.Radio({ value: 'otherValue' }),
            ],
         }),
      };

      const exampleProps = {
         value: 'value',
         label: 'label',
         disabled: true,
         placeholder: 'placeholder',
         autocomplete: 'name',
         required: true,
         checked: true,
      };

      return(
         <div>
            {Object.keys(exampleFields).map(field => (
               <section key={field}>
                  <h1>{field}</h1>
                  <ExampleFormProperty {...exampleFields[field]}/>

                  {Object.keys(exampleFields[field])
                   .filter(prop => !['componentLibrary', 'type', 'radios'].includes(prop))
                   .map(prop => (
                     <section key={`${field}${prop}`}>
                        <br/>
                        <span>{prop}</span>
                        <ExampleFormProperty
                           {...exampleFields[field]}
                           {...{ [prop]: exampleProps[prop] }}
                        />
                     </section>
                  ))}
               </section>
            ))}
         </div>
      );
   }
}

class ExampleFormProperty extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => this.submitForm(data)),
         fields: Form.fields({
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

export default ExampleFormProperties;
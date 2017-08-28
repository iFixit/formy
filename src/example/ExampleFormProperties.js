import React from 'react';
import Form from '../Formy/Form';

class ExampleFormProperties extends React.Component {
   render() {
      const exampleFields = {
         text: { type: 'text' },
         email: { type: 'email' },
         password: { type: 'password' },
         number: { type: 'number' },
         textarea: { type: 'textarea' },
         checkbox: { type: 'checkbox' },
         radio: { type: 'radio' },
         radiogroup: {
            type: 'radiogroup',
            radios: [
               { label: 'value', value: 'value' },
               { label: 'otherValue', value: 'otherValue' },
            ],
         },
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
               <div key={field}>
                  <h2>{field}</h2>
                  <h3>Default</h3>
                  <ExampleFormProperty {...exampleFields[field]}/>

                  {Object.keys(exampleProps)
                   .filter(prop => prop !== 'checked' || ['checkbox', 'radio'].includes(field))
                   .filter(prop => !(field === 'radiogroup' && prop === 'required'))
                   .filter(prop => !(['checkbox', 'radio', 'radiogroup'].includes(field) && ['placeholder', 'autocomplete'].includes(prop)))
                   .map(prop => (
                     <div key={`${field}${prop}`}>
                        <br/>
                        <h3>{prop}</h3>
                        <ExampleFormProperty
                           {...exampleFields[field]}
                           {...{ [prop]: exampleProps[prop] }}
                        />
                     </div>
                  ))}
               </div>
            ))}
         </div>
      );
   }
}

class ExampleFormProperty extends React.Component {
   constructor(props) {
      super(props);

      const form = {
         onSubmit: Form.onSubmitFactory(data => console.log(data)),
         fields: Form.fields({
            onChange: Form.onChangeFactory(form => this.setState({ form })),
         }, {
            exampleField: props,
         }),
      };

      this.state = { form };
   }

   render() {
      const form = Form.getProps(this.state.form);

      return(
         <Form.Component {...form}>
            <Form.Field {...form.fields.exampleField}/>
            <button type="submit">Submit</button>
         </Form.Component>
      );
   }
}

export default ExampleFormProperties;

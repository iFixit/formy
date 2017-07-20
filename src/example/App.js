import React from 'react';
import ExampleForm from './ExampleForm';
import ExampleComputedForm from './ExampleComputedForm';
import Form from '../Formy/Form';

class App extends React.Component {
   render() {
      const exampleFields = {
         text: Form.Field.text(),
         email: Form.Field.email(),
         password: Form.Field.password(),
         number: Form.Field.number(),
         textarea: Form.Field.textarea(),
         checkbox: Form.Field.checkbox(),
         radio: Form.Field.radio(),
         radiogroup: Form.Field.radiogroup({
            radios: [
               Form.Field.radio({ value: 'value' }),
               Form.Field.radio({ value: 'otherValue' }),
            ],
         }),
      };

      const exampleProps = {
         value: 'value',
         label: 'label',
         disabled: true,
         placeholder: 'placeholder',
         required: true,
         checked: true,
      };

      return(
         <section>
            {Object.keys(exampleFields).map(field => (
               <section key={field}>
                  <h1>{field}</h1>
                  <ExampleForm {...exampleFields[field]}/>

                  {Object.keys(exampleFields[field])
                   .filter(prop => !['componentLibrary', 'type', 'radios'].includes(prop))
                   .map(prop => (
                     <section key={`${field}${prop}`}>
                        <br/>
                        <span>{prop}</span>
                        <ExampleForm
                           {...exampleFields[field]}
                           {...{ [prop]: exampleProps[prop] }}
                        />
                     </section>
                  ))}
               </section>
            ))}

            <section>
               <h1>Computed Form</h1>
               <ExampleComputedForm/>
            </section>
         </section>
      );
   }
};

export default App;
import React from 'react';
import ExampleForm from './ExampleForm';
import ExampleComputedForm from './ExampleComputedForm';
import Form from '../Formy/Formy';

class App extends React.Component {
   render() {
      const exampleFields = {
         Text: Form.Field.Text(),
         Email: Form.Field.Email(),
         Password: Form.Field.Password(),
         Number: Form.Field.Number(),
         TextArea: Form.Field.TextArea(),
         Checkbox: Form.Field.Checkbox(),
         Radio: Form.Field.Radio(),
         RadioGroup: Form.Field.RadioGroup({
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
                   .filter(prop => !['component', 'radios'].includes(prop))
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
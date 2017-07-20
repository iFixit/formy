import React from 'react';
import ExampleForm from './ExampleForm';
import ExampleComputedForm from './ExampleComputedForm';
import ExampleCustomComponentLibrary from './ExampleCustomComponentLibrary';
import Form from '../Formy/Form';

class App extends React.Component {
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
         required: true,
         checked: true,
      };

      return(
         <div>
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

            <section>
               <h1>Custom componentLibrary</h1>
               <ExampleCustomComponentLibrary/>
            </section>
         </div>
      );
   }
};

export default App;
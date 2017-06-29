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
               Form.Field.Radio({value: 'value'}),
               Form.Field.Radio({value: 'otherValue'}),
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
            {Object.keys(exampleFields).map(Field => (
               <section key={Field}>
                  <h1>{Field}</h1>
                  <ExampleForm {...exampleFields[Field]}/>

                  {Object.keys(exampleFields[Field])
                   .filter(prop => !['component', 'radios'].includes(prop))
                   .map(prop => (
                     <section key={`${Field}${prop}`}>
                        <br/>
                        <span>{prop}</span>
                        <ExampleForm
                           {...exampleFields[Field]}
                           {...{[prop]: exampleProps[prop]}}
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
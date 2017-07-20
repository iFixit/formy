import React from 'react';
import ExampleFormProperties from './ExampleFormProperties';
import ExampleComputedForm from './ExampleComputedForm';
import ExampleCustomComponentLibrary from './ExampleCustomComponentLibrary';
import Form from '../Formy/Form';

class App extends React.Component {
   render() {
      return(
         <div>
            <section>
               <h1>Computed Form</h1>
               <ExampleFormProperties/>
            </section>

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
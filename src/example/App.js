import React from 'react';
import ExampleBasicForm from './ExampleBasicForm';
import ExampleFormProperties from './ExampleFormProperties';
import ExampleComputedForm from './ExampleComputedForm';
import ExampleCustomComponentLibrary from './ExampleCustomComponentLibrary';
import ExampleValidityForm from './ExampleValidityForm';
import ExampleMaxLength from './ExampleMaxLength';
import ExampleMinLength from './ExampleMinLength';
import ExamplePattern from './ExamplePattern';
import ExampleMin from './ExampleMin';
import ExampleMax from './ExampleMax';

class App extends React.Component {
   render() {
      return(
         <div>
            <section>
               <h1>Basic form (start here)</h1>
               <ExampleBasicForm/>
            </section>

            <section>
               <h1>Setting Form Properties</h1>
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

            <section>
               <h1>Form with validity checking</h1>
               <p>Expected UX:</p>
               <ul>
                  <li>Clicking submit displays a field's invalid state if it's invalid</li>
                  <li>Focusing a field display's its validation message</li>
                  <li>Invalid state is removed when the value has been properly updated</li>
                  <li>The form isn't submitted (check the console.logs) if there's an invalid field</li>
               </ul>
               <ExampleValidityForm/>
            </section>

            <section>
               <h1>Max Number Value: 3</h1>
               <a href="https://www.w3.org/TR/html5/forms.html#attr-input-max">Spec</a>
               <ExampleMax/>
            </section>

            <section>
               <h1>Max Length: 3</h1>
               <a href="https://www.w3.org/TR/html5/forms.html#attr-fe-maxlength">Spec</a>
               <ExampleMaxLength/>
            </section>

            <section>
               <h1>Min Number Value: 3</h1>
               <a href="https://www.w3.org/TR/html5/forms.html#attr-input-min">Spec</a>
               <ExampleMin/>
            </section>

            <section>
               <h1>Min Length: 3</h1>
               <a href="https://www.w3.org/TR/html5/forms.html#attr-fe-minlength">Spec</a>
               <ExampleMinLength/>
            </section>

            <section>
               <h1>Pattern: abcdefg</h1>
               <a href="https://www.w3.org/TR/html5/forms.html#attr-input-pattern">Spec</a>
               <ExamplePattern/>
            </section>
         </div>
      );
   }
};

export default App;

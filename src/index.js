import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

let form = Form.Instance('signupForm', {
   name: Form.Input.Text({ label: 'Name', placeholder: 'Doc Brown' }),
   email: Form.Input.Email({ label: 'Email' }),
   password: Form.Input.Password({ label: 'Password' }),
   newsletterSignup: Form.Input.Checkbox({ label: 'Signup for our newletter?' }),
   address: Form.Input.Text({
      label: 'Enter your address',
      disabled: state => !state.newsletterSignup.checked,
   }),
});

ReactDOM.render(

   <Form.Component instance={form}>
      <h1>Form</h1>
      <div id="wrapper">
        <div>
          <div>
            <Form.Input.Component key="name"/>
          </div>
        </div>
      </div>
      <Form.Input.Component key="email"/>
      <Form.Input.Component key="password"/>
      <Form.Input.Component key="newsletterSignup"/>
      <Form.Input.Component key="address"/>
   </Form.Component>,

   document.getElementById('root')
);
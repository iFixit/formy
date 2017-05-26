# Form

## Example

``` jsx
let signupForm = {
   name: Form.Input.Text({ label: 'Name', placeholder: 'Doc Brown'}),
   email: Form.Input.Email({ label: 'Email' }),
   password: Form.Input.Password({ label: 'Password' }),
   newsletterSignup: Form.Input.Checkbox({ label: 'Signup for our newletter?' }),
};

ReactDOM.render(

   <Form.Component instance={signupForm}>
      <Form.Input.Component key="name"/>
      <Form.Input.Component key="email"/>
      <Form.Input.Component key="password"/>
      <Form.Input.Component key="newsletterSignup"/>
   </Form.Component>,

   document.getElementById('root')
);
```

## API
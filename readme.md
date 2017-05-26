# Form

## Example

``` jsx
// Create an object of your form's data
let signupForm = {
   name: Form.Input.Text(),
   email: Form.Input.Email(),
   password: Form.Input.Password(),
   newsletterSignup: Form.Input.Checkbox(),
};

// Render the form
ReactDOM.render(

   // Pass in the form data
   <Form.Component instance={signupForm}>

      // Structure the form layout however you want!
      // Add any extra elements you want!
      // Map a Form.Input.Component to a form data by using the same "key" value
      <Form.Input.Component key="name"/>
      <Form.Input.Component key="email"/>
      <Form.Input.Component key="password"/>
      <Form.Input.Component key="newsletterSignup"/>

   </Form.Component>,
   document.getElementById('root')
);
```

## API
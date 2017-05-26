# Form

## Example

``` jsx
let signupForm = {
   name: Form.Input.Text({ label: 'Name', placeholder: 'Doc Brown'}),
   email: Form.Input.Email({ label: 'Email' }),
   password: Form.Input.Password({ label: 'Password' }),
   newsletterSignup: Form.Input.Checkbox({ label: 'Signup for our newletter?' }),
};
```

## API
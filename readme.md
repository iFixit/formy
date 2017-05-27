# Form

`Form` is a form generation library in React that specializes in offloading complex HTML markup and separating a form's data from a form's layout.

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

   // Map a Form to a form data object by passing in the object as the "instance" value
   // Map a Form.Input.Component to a form data by using the same "key" value
   // Structure the form layout however you want!
   // Add any extra elements you want!
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

### `Form`

Library wrapper object.

### `Form.Component`

Top level form element.

Props:
```
instance: An object of Form.Input.[input type]s.
```

### `Form.Input`

Input wrapper object.

### `Form.Input.Component`

Input element in a Form.

Props:

```
key: A String that's a key to the Form instance object.
```

### `Form.Input.TypedComponent`
### `Form.Input.BASE_DEFAULTS`
### `Form.Input.InputFactory`
### `Form.Input.[input type]`
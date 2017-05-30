# Form

`Form` is a form generation library in React created to offload complex input HTML markup, separate a form's data from a form's layout, and handle asynchronous validation logic.

## Example

``` jsx
// Create an object of your form's initial state.
let form = Form.Instance('signupForm', {
   name: Form.Input.Text(),
   email: Form.Input.Email(),
   password: Form.Input.Password(),
   newsletterSignup: Form.Input.Checkbox(),
});

// Render the form
ReactDOM.render(

   // Map a Form.Component to a Form.Instance by assigning it as an "instance" value.
   // Map a Form.Input.Component to a Form.Instance state property by using the same "key" value.
   // Structure the form layout however you want!
   // Add any extra elements you want!
   <Form.Component instance={form}>
      <Form.Input.Component key="name"/>
      <Form.Input.Component key="email"/>
      <Form.Input.Component key="password"/>
      <Form.Input.Component key="newsletterSignup"/>
   </Form.Component>,

   document.getElementById('root')
);
```

This renders:
``` HTML
<form name="signupForm">
   <label>
      Name
      <input type="text" value="" name="name" placeholder="Doc Brown">
   </label>

   <label>
      Email
      <input type="email" value="" name="email">
   </label>

   <label>
      Password
      <input type="password" value="" name="password">
   </label>

   <label>
      Signup for our newletter?
      <input type="checkbox" value="on" name="newsletterSignup">
   </label>
</form>
```

## API

- [Form](#form-1)
  - [Component](#formcomponent)
  - [Instance](#forminstance)
  - [Input](#forminput)
    - [Component](#forminputcomponent)
    - [ComponentLibrary](#forminputcomponentlibrary)
    - [InputFactory](#forminputinputfactory)
    - [[Input Types]](#forminputinput-types)
      - [Component](#forminputinput-typescomponent)

##

### `Form`

Library wrapper object.

##

### `Form.Component`

Top level form element.

Props:

```
instance: A [`Form.Instance`](#forminstance).
```

Functions:
```
onChangeFactory(input): Returns an onChange event handler that maps an input's value to the form's state.

getInputsWithProps(): Returns the form's Form.Input.Component child elements with props matching the form's state.

requestIsValid(): Returns a promise that resolves every input's requestIsValid promise.
```

##

### `Form.Instance`

Function that returns a form instance object.

Parameters:

```
name: A string that's assigned as the form's name.

state: The initial state of the form.
```

##

### `Form.Input`

Input wrapper object.

##

### `Form.Input.Component`

High order input element to use in a Form template.

Props:

```
key: A String that's a key to the form's state.
```

##

### `Form.Input.ComponentLibrary`

Object of default input components used in [`Form.Input.[Input Types].Component`](#forminputinput-typescomponent).

##

### `Form.Input.InputFactory`

Factory function to create `Form.Input.[Input Types]`, extending the `Form.Input.Default` state.

##

### `Form.Input.[Input Types]`

Function that returns the state of a typed input.

Parameters:
```
state: A state object that extends the type's default state.
```

[Input Types]:

```
Default
   value: ''
   name: The state's key a Form.Input.[Input Types] is defined as (can be overridden).
   label: ''
   required: false
   disabled: false
   requestIsValid: () => (Promise.resolve())
   component: Form.Input.ComponentLibrary.Default

Text
   (extends Default)
   placeHolder: ''
   component: Form.Input.ComponentLibrary.Text

Email
   (extends Default)
   placeHolder: ''
   component: Form.Input.ComponentLibrary.Email

Password
   (extends Default)
   placeHolder: ''
   component: Form.Input.ComponentLibrary.Password

Number
   (extends Default)
   placeHolder: ''
   component: Form.Input.ComponentLibrary.Number

TextArea
   (extends Default)
   placeHolder: ''
   component: Form.Input.ComponentLibrary.TextArea

Checkbox
   (extends Default)
   value: 'on' // This is a checkbox's native default value
   checked: false
   component: Form.Input.ComponentLibrary.Checkbox

Radio
   (extends Default)
   value: 'on' // This is a radio's native default value
   checked: false
   component: Form.Input.ComponentLibrary.Radio

Dropdown
   (extends Default)
   options: {}
   placeholder: false
   customInput: false
   customInputMaxLength: false
   customInputOnlyNumbers: false
   component: Form.Input.ComponentLibrary.Dropdown
```

##

### `Form.Input.[Input Types].Component`

Typed input element generated from [`Form.Input.Component`](#forminputcomponent).

Props:

```
All state from the input type's `Form.Input.[Input Types]`
```
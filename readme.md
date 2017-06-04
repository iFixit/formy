# Formy

`Formy` is a form generation library in React. Create your form as a JS object and render it however you want.

## Benefits
⛓ **Total separation of a form's data and layout.**<br>
We were tired of input attributes getting mixed in with the HTML markup of a form. Declare an input's state as simple JS object and free up your HTML for what it's best for: layout. A dropdown with a million options is now `<Form.Input.Component/>`. An email input: `<Form.Input.Component/>`. A text input with some crazy pattern validation, a placeholder string, a required value, and an autofill value? `<Form.Input.Component/>`.

☑️ **Native HTML5 validation.**<br>
We didn't write a bunch of crappy regex. Browsers back to IE10 can validate any input type and any standard validation option (`required`, `pattern`, etc).

⏱ **Async validation.**<br>
Backend validation is handled as smoothly as frontend by handling everything as promises. A `resolve`
 means things are good and a `reject` means things are bad.

## Contents

- [Simple Example](#simple-example)
- [API](#api)
- [Harder Examples](#harder-examples)
  - [Computed State](#computed-state)
  - [Radio Controls](#radio-controls)
  - [Custom Components](#custom-components)

## Simple Example

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
      <input type="text" value="" name="name">
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

### `Form`

Library wrapper object.

### `Form.Component`

Top level form element.

Props:

```
instance: A Form.Instance.
```

Variables:

```
inputRefs: Object of references to an input's native input element.
```

Functions:
```
onChangeFactory(input): Returns an onChange event handler that maps an input's value to the form's state.

getInputsWithProps(): Returns the form's Form.Input.Component child elements with props matching the form's state.

requestIsValid(): Returns a promise that resolves every input's requestIsValid promise.
```

### `Form.Instance`

Function that returns a form instance object.

Parameters:

```
name: A string that's assigned as the form's name.

state: The initial state of the form.
```

### `Form.Input`

Input wrapper object.

### `Form.Input.Component`

High order input element to use in a Form template.

Props:

```
key: A String that's a key to the form's state.
```

### `Form.Input.ComponentLibrary`

Object of default input components used in [`Form.Input.[Input Types].Component`](#forminputinput-typescomponent).

### `Form.Input.InputFactory`

Factory function to create [`Form.Input.[Input Types]`](#forminputinput-types), extending the `Form.Input.Default` state.

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
   requestIsValid: () => Promise.resolve()
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

### `Form.Input.[Input Types].Component`

Typed input element generated from [`Form.Input.Component`](#forminputcomponent).

Props:

```
All state from the input type's `Form.Input.[Input Types]`
```

## Harder Examples

### Computed State

In Formy you can define input state as relative values to other properties in a form.

``` jsx
let form = Form.Instance('signupForm', {
   newsletterSignup: Form.Input.Checkbox({ label: 'Signup for our newletter?' }),
   address: Form.Input.Email({
      label: 'Enter your email address',
      disabled: state => !state.newsletterSignup.checked,
   }),
});
```

In this example, the email address input is disabled _only_ if the checkbox isn't checked. Normally to achieve this you would need to add javascript outside of a form's HTML markup. This is problematic though, since you now have two sources of form state: your declarative form data written as HTML attributes and your imperative form data written in JS as hooks from input events.

Formy combines computed state and static state all in the same initial `Form.Instance` function, keeping your data contained and easy to understand.

To create a computed state value, pass in a function as an input's property value. On render, Formy calls the function and passes in the current `state` object. This allows you to return a rendered value relative to all available data in the form.

### Radio Controls

### Custom Components
# Form

`Form` is a form generation library in React that specializes in offloading complex HTML markup and separating a form's data from a form's layout.

## Example

``` jsx
// Create an object of your form's initial state.
let signupForm = {
   name: Form.Input.Text(),
   email: Form.Input.Email(),
   password: Form.Input.Password(),
   newsletterSignup: Form.Input.Checkbox(),
};

// Render the form
ReactDOM.render(

   // Map a Form.Component to a form object by passing in an object as the "instance" value.
   // Map a Form.Input.Component to a form object property by using the same "key" value.
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

- [Form](#form-1)
  - [Component](#formcomponent)
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
instance: An object of Form.Input.[input type]s.
```

##

### `Form.Input`

Input wrapper object.

##

### `Form.Input.Component`

High order input element to use in a Form template.

Props:

```
key: A String that's a key to a value in the Form instance object.
```

##

### `Form.Input.ComponentLibrary`

Object of default input components assigned as [`Form.Input.[Input Types].Component`](#forminputinput-typescomponent).

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
   label: ''
   required: false
   disabled: false
   isValid: () => true
   component: Form.Input.ComponentLibrary.Default

Text
   placeHolder: ''
   component: Form.Input.ComponentLibrary.Text

Email
   placeHolder: ''
   component: Form.Input.ComponentLibrary.Email

Password
   placeHolder: ''
   component: FormInput.ComponentLibrary.Password

Number
   placeHolder: ''
   component: FormInput.ComponentLibrary.Number

TextArea
   placeHolder: ''
   component: FormInput.ComponentLibrary.TextArea

Checkbox
   value: false
   component: FormInput.ComponentLibrary.Checkbox

Radio
   value: false
   component: FormInput.ComponentLibrary.Radio

RadioGroup
   radios: {}
   component: FormInput.ComponentLibrary.RadioGroup

Dropdown
   options: {}
   placeholder: false
   customInput: false
   customInputMaxLength: false
   customInputOnlyNumbers: false
   component: FormInput.ComponentLibrary.Dropdown
```

##

### `Form.Input.[Input Types].Component`

Typed input element generated from [`Form.Input.Component`](#forminputcomponent).

Props:

```
All state from the input type's `Form.Input.[Input Types]`
```
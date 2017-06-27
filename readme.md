# Formy

Formy is a form generation library in React. Create your form as a JS object and render it however you want.

Comes with helper functions for input events to maintain internal state.

## Benefits

### ⛓ Total separation of data and layout

We were tired of input attributes getting mixed in with the HTML markup of a form.

Declare an input's state as simple JS object and free up your HTML for what it's best for: layout.

A dropdown with a million options is now `<Form.Input.Component/>`. A text input with some crazy pattern validation, a placeholder string, a required value, and an autofill value? `<Form.Input.Component/>`.

## Simple example

Create an object of your form's initial state.
``` jsx
const form = {
   name: 'signupForm',
   fields: Form.Fields({
      // Hook input onChange events to your own state control function.
      onChange: Form.onChange(form => this.updateForm(form)),
   }, {
      name: Form.Field.Text(label: 'Name'),
      email: Form.Field.Email(label: 'Email'),
      password: Form.Field.Password(label: 'Password'),
      newsletterSignup: Form.Field.Checkbox({label: 'Signup for our newsletter?'}),
   }),
};

this.state = { form };
```

Render the form.
``` jsx
const form = Form.getProps(this.state.form);

return(
   <Form.Component {...form}>
      <Form.Field.Component {...form.fields.name}/>
      <Form.Field.Component {...form.fields.email}/>
      <Form.Field.Component {...form.fields.password}/>
      <Form.Field.Component {...form.fields.newsletterSignup}/>
   </Form.Component>
);
```

HTML output:
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
      Signup for our newsletter?
      <input type="checkbox" value="on" name="newsletterSignup">
   </label>
</form>
```

## Harder examples

<details>
   <summary><strong>Computed state</strong></summary>

   In Formy you can define input state as relative values to other properties in a form.

   ``` jsx
   const form = {
      name: 'signupForm',
      fields: Form.Fields({
         onChange: Form.onChange(form => this.updateForm(form)),
      }, {
         newsletterSignup: Form.Field.Checkbox({label: 'Signup for our newsletter?'}),
         email: Form.Field.Text({
            label: 'Email',
            disabled: form => !form.newsletterSignup.checked,
         }),
      }),
   };
   ```

   In this example, the email address input is disabled _only_ if the checkbox isn't checked. Normally to achieve this you would need to add javascript outside of a form's HTML markup. This is problematic though, since you now have two sources of form state: your declarative form data written as HTML attributes and your imperative form data written in JS as hooks from input events.

   Formy combines computed state and static state all in the same initial `form` object, keeping your data contained and easy to understand.

   To create a computed state value, pass in a function as an input's property value. On render, Formy calls the function and passes in the current `form` object and `fieldKey` string. This allows you to return a rendered value relative to all available data in the form.
</details>

<details>
   <summary><strong>Radio buttons</strong></summary>

   Group radio buttons as an array in the `radios` property of a `RadioGroup` object. In this example, `'burrito'` is the default selected value.
   ``` jsx
   const form = {
      name: 'thingsYouLike',
      fields: Form.Fields({
         onChange: Form.onChange(form => this.updateForm(form)),
      }, {
         faveFood: Form.Field.RadioGroup({
            value: 'burrito',
            radios: [
               Form.Field.Radio({ label: 'Burrito', value: 'burrito' }),
               Form.Field.Radio({ label: 'Pasta', value: 'pasta' }),
            ],
         }),
      }),
   };
   ```

   Render the `RadioGroup` as a single component.
   ``` jsx
   const form = Form.getProps(this.state.form);

   return(
      <Form.Component {...form}>
         <Form.Field.Component {...form.fields.faveFood}/>
      </Form.Component>
   );
   ```

   This groups the radio buttons in a `fieldset` element, rendering the radio buttons in the order they're declared in the initial `radios` array.
   ``` HTML
   <form name="signupForm">
      <fieldset>
         <label>
            Burrito
            <input type="radio" value="burrito" name="faveFood">
         </label>

         <label>
            Pasta
            <input type="radio" value="pasta" name="faveFood">
         </label>
      </fieldset>
   </form>
   ```
</details>

## API

- [`Form`](#form-1)
  - [`onChange`](#)
  - [`onSubmit`](#)
  - [`getData`](#)
  - [`getProps`](#)
  - [`Component`](#formcomponent)
  - [`Fields`](#forminstance)
  - [`Field`](#forminput)
    - [`Component`](#forminputcomponent)
    - [`ComponentLibrary`](#forminputcomponentlibrary)
    - [`FieldFactory`](#forminputinputfactory)
    - [`[Field Types]`](#forminputinput-types)
      - [`Component`](#forminputinput-typescomponent)

##

### `Form`

Library wrapper object.

##

### `Form.onChange`

Factory function to hook into an input's `onChange` event.

#### Parameters

| Name | Type | Description |
| - | - | - |
| callbackFn | Function | Function to call in an `onChange` event. When called, it passes in the new form state object as a parameter.

##

### `Form.onSubmit`

Factory function to hook into a form's `submit` event. Cancels the native submit event.

#### Parameters

| Name | Type | Description |
| - | - | - |
| callbackFn | Function | Function to call in a `submit` event. When called, it passes in the form's data object as a parameter.

##

### `Form.getData`

Function to get a form's data.

#### Parameters

| Name | Type | Description |
| - | - | - |
| form | Object | Form props

##

### `Form.getProps`

Function to get a form state's props for rendering.

#### Parameters

| Name | Type | Description |
| - | - | - |
| form | Object | Form state

##

### `Form.Component`

Top level form element.

#### Props

A [`Form.getProps`](#formgetprops) return value.

##

### `Form.Field`

Field wrapper object.

##

### `Form.Field.Component`

High order input element to structure a form.

#### Props

A `fields` property of a [`Form.getProps`](#formgetprops) return value.

##

### `Form.Input.ComponentLibrary`

Object of default input components used in [`Form.Input.[Input Types].Component`](#forminputinput-typescomponent).

##

### `Form.Input.InputFactory`

Factory function to create [`Form.Input.[Input Types]`](#forminputinput-types), extending the `Form.Input.Default` state.

##

### `Form.Input.[Input Types]`

Function that returns the state of a typed input.

#### Parameters
```
state: A state object that extends the type's default state.
```

#### [Input Types]

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

##

### `Form.Input.[Input Types].Component`

Typed input element generated from [`Form.Input.Component`](#forminputcomponent).

#### Props

```
All state from the input type's `Form.Input.[Input Types]`
```
# Formy

Formy is a form generation library in React. Create your form as a JS object and render it however you want.

Comes with helper functions for input events to maintain internal state.

## Benefits

### ⛓ Total separation of data and layout

We were tired of input attributes getting mixed in with the HTML markup of a form.

Declare an input's state as a simple JS object and free up your HTML for what it's best for: layout.

A dropdown with a million options is now `<Form.Field/>`. A text input with some crazy pattern validation, a placeholder string, a required value, and an autofill value? `<Form.Field/>`.

## Simple example

Create an object of your form's initial state.
``` jsx
const form = {
   name: 'signupForm',
   onSubmit: Form.onSubmitFactory(data => console.log(data)),
   fields: Form.fields({
      onChange: Form.onChangeFactory(form => this.setState({ form })),
   }, {
      name: {
         type: 'text',
         label: 'Name',
      },
      email: {
         type: 'email',
         label: 'Email',
      },
      password: {
         type: 'password',
         label: 'Password',
      },
      newsletterSignup: {
         type: 'checkbox',
         label: 'Signup for our newsletter?',
      },
   }),
};

this.state = { form };
```

Render the form.
``` jsx
const form = Form.getProps(this.state.form);

return(
   <Form.Component {...form}>
      <Form.Field {...form.fields.name}/>
      <Form.Field {...form.fields.email}/>
      <Form.Field {...form.fields.password}/>
      <Form.Field {...form.fields.newsletterSignup}/>
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

<details><summary><strong>Computed properties</strong></summary>

In Formy you can define a field property's value as a computed function to resolve on render.

``` jsx
const form = {
   name: 'signupForm',
   fields: Form.fields({
      onChange: Form.onChangeFactory(form => this.updateForm(form)),
   }, {
      newsletterSignup: {
         type: 'checkbox',
         label: 'Signup for our newsletter?',
      },
      email: {
         type: 'email',
         label: 'Email',
         disabled: form => !form.newsletterSignup.checked,
      },
   }),
};
```

In this example, the email address input is disabled _only_ if the checkbox isn't checked. Normally to achieve this you would need to add javascript outside of a form's HTML markup. This is problematic though, since you now have two sources of form state: your declarative form data written as HTML attributes and your imperative form data written in JS as hooks from input events.

Formy combines computed values and static values all in the same initial `form` object, keeping your data contained and easy to understand.

To create a computed value, pass in a function as a field property's value. On render, Formy calls the function and passes in the current `form` object and `fieldKey` string. This allows you to return a rendered value relative to all available data in the form.
</details>

<details><summary><strong>Radio buttons</strong></summary>

Group radio buttons as an array in the `radios` property of a `RadioGroup` object. In this example, `'burrito'` is the default selected value.

``` jsx
const form = {
   name: 'thingsYouLike',
   fields: Form.fields({
      onChange: Form.onChangeFactory(form => this.updateForm(form)),
   }, {
      faveFood: {
         type: 'radiogroup',
         value: 'burrito',
         radios: [
            { label: 'Burrito', value: 'burrito' },
            { label: 'Pasta', value: 'pasta' },
         ],
      },
   }),
};
```

Render the `RadioGroup` as a single component.

``` jsx
const form = Form.getProps(this.state.form);

return(
   <Form.Component {...form}>
      <Form.Field {...form.fields.faveFood}/>
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

<details><summary><strong>Custom component library</strong></summary>

Custom components are necessary for customizing a form beyond the default styles.

When a field is rendered, it's component is retrieved by accessing its `componentLibrary` property and retrieving the component associated with its `type` property.

You can retrieve a [`Form.Field`'s](#formfield) default component library like this:

```js
Form.Field.defaultProps.componentLibrary
```

Here's an example of a custom component library extending Formy's default component library:

```jsx
const customComponentLibrary = {
   ...Form.Field.defaultProps.componentLibrary,
   ...{
      text: props => (
         <label>
            <em>{props.label}</em>
            <input
               type={props.type}
               checked={props.checked}
               value={props.value}
               name={props.name}
               disabled={props.disabled}
               required={props.required}
               placeholder={props.placeholder}
               onChange={props.onChange}
            />
         </label>
      ),
   },
};
```

You can add a default `componentLibrary` property to every field in a form with the [`Form.fields`](#formfields) function:

```jsx
const form = {
   onSubmit: Form.onSubmitFactory(data => this.submitForm(data)),
   fields: Form.fields({
      onChange: Form.onChangeFactory(form => this.setState({ form })),
      componentLibrary: customComponentLibrary,
   }, {
      text: {
         type: 'text',
         label: 'Whoah this is a seriously crazy custom component',
      },
      checkbox: {
         type: 'checkbox',
         label: 'This is a default component',
      },
   }),
};
```

If you have a super special field that you want to render with a custom component, while not setting a whole new component library for all fields, you can add the `componentLibrary` property to a specific field object in the [`Form.fields`](#formfields) function:

```jsx
const form = {
   onSubmit: Form.onSubmitFactory(data => this.submitForm(data)),
   fields: Form.fields({
      onChange: Form.onChangeFactory(form => this.setState({ form })),
   }, {
      text: {
         type: 'text',
         label: 'Whoah this is a seriously crazy custom component',
         componentLibrary: customComponentLibrary,
      },
      checkbox: {
         type: 'checkbox',
         label: 'This is a default component',
      },
   },
};
```
</details>

## Form properties

A form object can have these properties:

_Note: You can make any property a function that resolves to the appropriate type on render. See the "Computed properties" example above._

| Name | Type | Default | Description |
| fields | Object | no default | An object of form fields |
| name | String | no default | The name value of a form |
| onSubmit | function | no default | Function to hook to a form's onsubmit event. |

## Field properties

A field object can have these properties:

_Note: You can make any property a function that resolves to the appropriate type on render. See the "Computed properties" example above._

| Name | Type | Default | Description |
| - | - | - | - |
| autocomplete | String | `'off'` | The [autocomplete value](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute) of a field. |
| checked | Boolean | `false` | The checked state of a field. |
| componentLibrary | Object | [FormDefaultComponentLibrary.js](src/Formy/FormDefaultComponentLibrary.js) | Object of react components to render form fields, with properties corresponding to all available `type` values. |
| disabled | Boolean | `false` | The disabled state of a field. |
| label | String | `''` | The label of a field. |
| name | String | The field object's key | The name of a field. Defaults to the field object's key in the [`Form.fields`](#formfields) function. |
| onChange | function | no default | Function to hook to a field's onchange event. |
| placeholder | String | `''` | An input's placeholder value. |
| radios | Array | `[]` | An array of field objects to populate a radiogroup field. The `type` value doesn't need to be set since it will always be `'radio'`. |
| required | Boolean | `false` | The required state of a field. Radiogroup fields can _only_ have a `false` value. |
| type | String | `'text'` | The type of field to render. Available default types: `'text'`, `'email'`, `'password'`, `'number'`, `'textarea'`, `'checkbox'`, `'radio'`, `'radiogroup'`. Soon to be added: `'select'`. |
| value | String | `''` | The value of a field. |

## API

- [`Form`](#form)
  - [`Component`](#formcomponent)
  - [`Field`](#formfield)
  - [`onChangeFactory`](#formonchangefactory)
  - [`onSubmitFactory`](#formonsubmitfactory)
  - [`getData`](#formgetdata)
  - [`getProps`](#formgetprops)
  - [`fields`](#formfields)

##

### `Form`

Library wrapper object.

##

### `Form.Component`

Top level form component.

<details>

#### Props

A [`Form.getProps`](#formgetprops) return value.

#### Returns

```jsx
<form
name={props.name}
onSubmit={props.onSubmit}
>
{props.children}
</form>
```
</details>

##

### `Form.Field`

High order field element to structure a form.

<details>

#### Props

A `field` object of a [`Form.getProps`](#formgetprops) return value.

#### Returns

``` jsx
<props.componentLibrary[props.type] {...props}/>
```
</details>

##

### `Form.onChangeFactory`

Factory function to hook into an input's `onChange` event.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| callbackFn | Function | Function to call in an `onChange` event. When called, it passes in the new form state object as a parameter.
</details>

##

### `Form.onSubmitFactory`

Factory function to hook into a form's `submit` event. Cancels the native submit event.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| callbackFn | Function | Function to call in a `submit` event. When called, it passes in the form's data object as a parameter.
</details>

##

### `Form.getData`

Function to get a form's data.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| form | Object | Form props
</details>

##

### `Form.getProps`

Function to get a form state's props for rendering.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| form | Object | Form state
</details>

##

### `Form.fields`

Helper function to generate an object of fields.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| defaults | Object | Object of values to assign to every field
| fields | Object | Object of fields

#### Returns

| Name | Type | Description |
| - | - | - |
| fields | Object | The fields object, with every field now containing all the `default` values as well a `name` property with the value being the field object's key.

#### Example

``` jsx
Form.fields({
   onChange: event => {},
}, {
   phone: {},
   email: {},
})

/*
{
   phone: {
      name: phone,
      onChange: event => {},
   },

   email: {
      name: email,
      onChange: event => {},
   },
}
*/
```
</details>

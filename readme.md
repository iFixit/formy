# Formy

Formy is a form generation library in React. Create your form as a JS object and render it however you want.

Comes with helper functions for input events to maintain internal state.

## Benefits

### ⛓ Total separation of data and layout

We were tired of input attributes getting mixed in with the HTML markup of a form.

Declare an input's state as a simple JS object and free up your HTML for what it's best for: layout.

A text input is now `<Form.Field/>`. A dropdown with a million options is now `<Form.Field/>`. Formy abstracts all markup differences, allowing you to write unified and simple templates.

### ✅ Native validation

We didn't write a bunch of crappy regex. Browsers back to IE10 can validate any input type and [standard validation constraint](https://www.w3.org/TR/html5/forms.html#constraints). Declare your constraints up front and let the browser do all the work.

## Simple example

Create an object of your form's initial state.
``` jsx
const form = {
   id: 'signupForm',
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
<form id="signupForm">
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
      <input type="checkbox" value="" name="newsletterSignup">
   </label>
</form>
```

## Harder examples

<details><summary><strong>Computed properties</strong></summary>

In Formy you can define a field property's value as a computed function to resolve on render.

``` jsx
const form = {
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

In this example, the email address input is disabled _only_ if the checkbox isn't checked. Normally to achieve this you would need to add javascript outside of a form's HTML markup. However, you now have two sources of form state: your declarative form data written as HTML attributes and your imperative form data written in JS as hooks from input events.

Formy combines computed values and static values all in the same initial `form` object, keeping your data contained and easy to understand.

To create a computed value, pass in a function as a field property's value. On render, Formy calls the function and passes in the current `form` object and `fieldKey` string. This allows you to return a rendered value relative to all available data in the form.
</details>

<details><summary><strong>Radio buttons</strong></summary>

Group radio buttons as an array in the `radios` property of a `RadioGroup` object. In this example, `'burrito'` is the default selected value.

``` jsx
const form = {
   id: 'thingsYouLike',
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
               onChange={({ target: { value } }) => props.onChange({ value })}
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

| Name | Type | Description |
| - | - | - |
| fields | Object | An object of form fields |
| id | String | The `id` attribute of a form |
| name | String | The `name` attribute of a form |
| onSubmit | function | Function to hook to a form's onsubmit event. |

## Field properties

A field object can have these properties:

_Note: You can make any property a function that resolves to the appropriate type on render. See the "Computed properties" example above._

### Core properties

| Name | Type | Default | Description |
| - | - | - | - |
| checked | Boolean | `false` | The checked value of a field. |
| componentLibrary | Object | [`FormDefaultComponentLibrary`](src/Formy/FormDefaultComponentLibrary.js) | Object of react components to render form fields, with properties corresponding to all available `type` values. |
| name | String | The field object's key | The name value of a field. Defaults to the field object's key in the [`Form.fields`](#formfields) function. |
| type | String | `'text'` | The type of field to render. Available default types: `'text'`, `'email'`, `'password'`, `'number'`, `'textarea'`, `'checkbox'`, `'radio'`, `'radiogroup'`. Soon to be added: `'select'`. |
| value | String | `''` | The value of a field. |

### Supported properties

| Name | Type | Description |
| - | - | - |
| autocomplete | String | The [autocomplete value](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute) of a field. |
| disabled | Boolean | The disabled value of a field. |
| label | String | The label value of a field. |
| max | String OR Number | Constraint value for the [`max`](https://www.w3.org/TR/html5/forms.html#attr-input-max) attribute |
| maxLength | Non-negative integer | Constraint value for the [`maxlength`](https://www.w3.org/TR/html5/forms.html#attr-fe-maxlength) attribute |
| min | String OR Number | Constraint value for the [`min`](https://www.w3.org/TR/html5/forms.html#attr-input-min) attribute |
| minLength | Non-negative integer | Constraint value for the [`minlength`](https://www.w3.org/TR/html5/forms.html#attr-fe-minlength) attribute |
| onBlur | Function | Function to hook to a field's `onBlur` event. |
| onChange | Function | Function to hook to a field's `onChange` event. |
| onFocus | Function | Function to hook to a field's `onFocus` event. |
| onInvalid | Function | Function to hook to a field's `onInvalid` event. |
| onMouseEnter | Function | Function to hook to a field's `onMouseEnter` event. |
| onMouseLeave | Function | Function to hook to a field's `onMouseLeave` event. |
| pattern | String | Constraint value for the [`pattern`](https://www.w3.org/TR/html5/forms.html#attr-input-pattern) attribute |
| placeholder | String | An input's placeholder value. |
| radios | Array | An array of field objects to populate a radiogroup field. The `type` value of these radio objects doesn't need to be set since it's assumed to be `radio`. |
| required | Boolean | Constraint value for the [`required`](https://www.w3.org/TR/html5/forms.html#attr-input-required) attribute. Not applicable for a `radiogroup` field. |
| rows | Positive integer | The [rows value](https://www.w3.org/TR/html51/sec-forms.html#dom-htmltextareaelement-rows) of a textarea. Not valid for any other field. |
| step | Number or `'any'` | Constraint value for the [`step`](https://www.w3.org/TR/html5/forms.html#attr-input-step) attribute |

### Other properties

You are welcome to add any properties you want to a Form or Field object – they're just objects! The only downside is they won't be type checked like the core or supported properties. Functions will be executed just like all computed properties.

## API

- [`Form`](#form)
  - [`Component`](#formcomponent)
  - [`Field`](#formfield)
  - [`fields`](#formfields)
  - [`getData`](#formgetdata)
  - [`getProps`](#formgetprops)
  - [`onChangeFactory`](#formonchangefactory)
  - [`onSubmitFactory`](#formonsubmitfactory)

---

### `Form`

Library wrapper object.

---

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

---

### `Form.Field`

Container component used to structure a form.

<details>

#### Props

A `field` object of a [`Form.getProps`](#formgetprops) return value.

#### Returns

``` jsx
<props.componentLibrary[props.type] {...props}/>
```
</details>

---

### `Form.fields`

Helper function to generate an object of fields.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| globals | Object | Object of values to assign to every field
| fields | Object | Object of fields

#### Returns

| Name | Type | Description |
| - | - | - |
| fields | Object | The fields object, with every field now containing all the default field values, `globals` values, as well a `name` value with the value being the field object's key.

#### Example

``` jsx
Form.fields({
   onChange: event => {},
}, {
   firstName: {},
   lastName: {},
})

/*
{
   firstName: {
      checked: false,
      componentLibrary: {...},
      name: 'firstName',
      onChange: event => {},
      type: 'text',
      value: '',
   },
   lastName: {
      checked: false,
      componentLibrary: {...},
      name: 'lastName',
      onChange: event => {},
      type: 'text',
      value: '',
   },
}
*/
```
</details>

---

### `Form.getData`

Function to get a form's data to be submitted.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| form | Object | Form props from a [`Form.getProps`](#formgetprops) function call.
</details>

---

### `Form.getProps`

Function to get a form's props for rendering.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| form | Object | Form state
</details>

---

### `Form.onChangeFactory`

Factory function to hook into an input's `onChange` event.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| callbackFn | Function | Function to call in an `onChange` event. When called, it passes in the new form state object as a parameter.
</details>

---

### `Form.onSubmitFactory`

Factory function to hook into a form's `submit` event. Cancels the native submit event.

<details>

#### Parameters

| Name | Type | Description |
| - | - | - |
| callbackFn | Function | Function to call in a `submit` event. When called, it passes in the form's data object as a parameter.
</details>

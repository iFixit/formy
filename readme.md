# Formy

Formy is a form generation library in React. Create your form as a JS object and render it however you want.

Comes with helper functions for input events to maintain internal state.

## Benefits

### ⛓ Total separation of data and layout

We were tired of input attributes getting mixed in with the HTML markup of a form.

Declare an input's state as a simple JS object and free up your HTML for what it's best for: layout.

A dropdown with a million options is now `<Form.Field.Component/>`. A text input with some crazy pattern validation, a placeholder string, a required value, and an autofill value? `<Form.Field.Component/>`.

## Simple example

Create an object of your form's initial state.
``` jsx
const form = {
   name: 'signupForm',
   fields: Form.Fields({
      // Hook input onChange events to your own state control function.
      onChange: Form.onChangeFactory(form => this.setState({ form })),
   }, {
      name: Form.Field.Text({ label: 'Name' }),
      email: Form.Field.Email({ label: 'Email' }),
      password: Form.Field.Password({ label: 'Password' }),
      newsletterSignup: Form.Field.Checkbox({ label: 'Signup for our newsletter?' }),
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
         onChange: Form.onChangeFactory(form => this.updateForm(form)),
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
         onChange: Form.onChangeFactory(form => this.updateForm(form)),
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

- [`Form`](#form)
  - [`Component`](#formcomponent)
  - [`onChangeFactory`](#formonchangefactory)
  - [`onSubmitFactory`](#formonsubmitfactory)
  - [`getData`](#formgetdata)
  - [`getProps`](#formgetprops)
  - [`fields`](#formfields)
  - [`defaultComponentLibrary`](#)
  - [`Field`](#formfield)
    - [`Component`](#formfieldcomponent)
    - [`FieldFactory`](#formfieldfieldfactory)
    - [`Default`](#formfielddefault)
    - [`[Field types]`](#formfieldfield-types)

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
   Form.Fields({
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
      }
   }
   */
   ```
</details>

##

### `Form.defaultComponentLibrary`

Object of default field components assigned as [`Form.Field.[Field types].Component`](#formfieldfield-types).

##

### `Form.Field`

Field wrapper object.

##

### `Form.Field.Component`

High order field element to structure a form.

<details>

   #### Props

   A `field` object of a [`Form.getProps`](#formgetprops) return value.

   #### Returns

   ``` jsx
   <props.component {...props}/>
   ```
</details>

##

### `Form.Field.FieldFactory`

Factory function to create [`Form.Field.[Field types]`](#formfieldfield-types), extending [`Form.Field.Default`](#formfielddefault).

<details>

   #### Parameters

   | Name | Type | Description |
   | - | - | - |
   | typeDefaults | Object | Object to extend `Form.Field.Default` with
</details>

##

### `Form.Field.Default`

Default field object.

<details>

   ``` jsx
   {
      value: '',
      label: '',
      disabled: false,
      component: FormField.ComponentLibrary.Default,
   }
   ```
</details>

##

### `Form.Field.[Field types]`

Function that returns a field object.

<details>

   #### Parameters

   | Name | Type | Description |
   | - | - | - |
   | instanceDefaults | Object | Instance defaults to extend the type's default values with

   #### Field types

   ``` jsx
   FormField.Text = FormField.FieldFactory({
     placeHolder: '',
     required: false,
     component: FormField.ComponentLibrary.Text,
   });

   FormField.Email = FormField.FieldFactory({
      placeHolder: '',
      required: false,
      component: FormField.ComponentLibrary.Email,
   });

   FormField.Password = FormField.FieldFactory({
      placeHolder: '',
      required: false,
      component: FormField.ComponentLibrary.Password,
   });

   FormField.Number = FormField.FieldFactory({
      placeHolder: '' ,
      required: false,
      component: FormField.ComponentLibrary.Number,
   });

   FormField.TextArea = FormField.FieldFactory({
      placeHolder: '',
      required: false,
      component: FormField.ComponentLibrary.TextArea,
   });

   FormField.Checkbox = FormField.FieldFactory({
      value: 'on',
      checked: false,
      required: false,
      component: FormField.ComponentLibrary.Checkbox,
   });

   FormField.Radio = FormField.FieldFactory({
      value: 'on',
      checked: false,
      required: false,
      component: FormField.ComponentLibrary.Radio,
   });

   FormField.RadioGroup = FormField.FieldFactory({
      radios: [],
      component: FormField.ComponentLibrary.RadioGroup,
   });
   ```

   #### Example

   ``` jsx
   Form.Field.Text()

   /*
   {
      value: '',
      label: '',
      disabled: false,
      placeHolder: '',
      required: false,
      component: FormField.ComponentLibrary.Text,
   }
   */

   Form.Field.Text({ label: 'First name' })

   /*
   {
      value: '',
      label: 'First name',
      disabled: false,
      placeHolder: '',
      required: false,
      component: FormField.ComponentLibrary.Text,
   }
   */
   ```
</details>
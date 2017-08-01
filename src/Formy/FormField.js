import React from 'react';

let FormField = {};

FormField.Component = class FormField extends React.Component {
   constructor(props) {
      super(props);
      this.setFieldRef = this.setFieldRef.bind(this);
      this.fieldRef = {
         validationMessage: '',
         validity: { valid: true },
      };
   }

   setFieldRef(fieldRef) {
      this.fieldRef = fieldRef;
   }

   // Immediately re render when the validity state can be accessed
   componentDidMount() {
      this.forceUpdate();
   }

   render() {
      const Component = this.props.componentLibrary[this.props.type];

      return (
         <Component
            {...this.props}
            valid={this.fieldRef.validity.valid}
            validationMessage={this.fieldRef.validationMessage}
            fieldRef={this.setFieldRef}
         />
      );
   }
}

FormField.FieldFactory = typeDefaults => instanceDefaults => ({
   ...FormField.default,
   ...typeDefaults,
   ...instanceDefaults,
});

FormField.default = {
   value: '',
   label: '',
   disabled: false,
   type: 'Default',
};

FormField.Text = FormField.FieldFactory({
  placeholder: '',
  required: false,
  type: 'Text',
});

FormField.Email = FormField.FieldFactory({
   placeholder: '',
   required: false,
   type: 'Email',
});

FormField.Password = FormField.FieldFactory({
   placeholder: '',
   required: false,
   type: 'Password',
});

FormField.Number = FormField.FieldFactory({
   placeholder: '' ,
   required: false,
   type: 'Number',
});

FormField.Textarea = FormField.FieldFactory({
   placeholder: '',
   required: false,
   type: 'TextArea',
});

FormField.Checkbox = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   type: 'Checkbox',
});

FormField.Radio = FormField.FieldFactory({
   value: 'on',
   checked: false,
   required: false,
   type: 'Radio',
});

FormField.Radiogroup = FormField.FieldFactory({
   radios: [],
   type: 'RadioGroup',
});

FormField.NON_COMPUTED_PROPERTIES = ['component'];

export default FormField;
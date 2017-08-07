import React from 'react';

let FormField = {};

FormField.Component = class FormFieldComponent extends React.Component {
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

FormField.Component.defaultProps = {
   value: '',
   label: '',
   placeholder: '',
   disabled: false,
   required: false,
   checked: false,
   radios: [],
};

export default FormField;
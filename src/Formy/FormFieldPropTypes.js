import PropTypes from 'prop-types';

const customValidity = (constraint, required = false) => (
   props,
   propName,
   componentName
) => (
   (!required && typeof props[propName] === 'undefined') ||
   (
      typeof props[propName] !== 'undefined' &&
      constraint(props, propName, componentName)
   ) ?
   null : new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
   )
);

const FormFieldPropTypes = {
   // Required
   checked: PropTypes.bool.isRequired,
   componentLibrary: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,

   // Not required
   autocomplete: PropTypes.string,
   disabled: PropTypes.bool,
   label: PropTypes.string,
   onChange: PropTypes.func,
   placeholder: PropTypes.string,
   radios: PropTypes.array,
   rows: customValidity((props, propName) => (
      Number.isInteger(props[propName]) &&
      (props[propName] > 0)
   )),

   // Constraint validation
   // https://www.w3.org/TR/html5/forms.html#attr-input-max
   max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
   ]),
   // https://www.w3.org/TR/html5/forms.html#attr-fe-maxlength
   maxLength: customValidity((props, propName) => (
      Number.isInteger(props[propName]) &&
      (props[propName] >= 0)
   )),
   // https://www.w3.org/TR/html5/forms.html#attr-input-min
   min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
   ]),
   // https://www.w3.org/TR/html5/forms.html#attr-fe-minlength
   minLength: customValidity((props, propName) => (
      Number.isInteger(props[propName]) &&
      (props[propName] >= 0)
   )),
   // https://www.w3.org/TR/html5/forms.html#attr-input-pattern
   pattern: PropTypes.string,
   // https://www.w3.org/TR/html5/forms.html#attr-input-required
   required: customValidity((props, propName) => (
      typeof props[propName] === 'boolean' &&
      props.type !== 'radiogroup'
   )),
   // https://www.w3.org/TR/html5/forms.html#attr-input-step
   step: customValidity((props, propName) => (
      !Number.isNaN(props[propName]) ||
      (props[propName] === 'any')
   )),
};

export default FormFieldPropTypes;

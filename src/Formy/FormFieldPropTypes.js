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
   checked: PropTypes.bool.isRequired,
   componentLibrary: PropTypes.object.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
   autocomplete: PropTypes.string,
   customValidity: PropTypes.string,
   disabled: PropTypes.bool,
   label: PropTypes.string,
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
   onBlur: PropTypes.func,
   onChange: PropTypes.func,
   onFocus: PropTypes.func,
   onInvalid: PropTypes.func,
   onMouseEnter: PropTypes.func,
   onMouseLeave: PropTypes.func,
   // https://www.w3.org/TR/html5/forms.html#attr-input-pattern
   pattern: PropTypes.string,
   placeholder: PropTypes.string,
   radios: PropTypes.array,
   // https://www.w3.org/TR/html5/forms.html#attr-input-required
   required: customValidity((props, propName) => (
      typeof props[propName] === 'boolean' &&
      props.type !== 'radiogroup'
   )),
   rows: customValidity((props, propName) => (
      props.type === 'textarea' &&
      Number.isInteger(props[propName]) &&
      (props[propName] > 0)
   )),
   // https://www.w3.org/TR/html5/forms.html#attr-input-step
   step: customValidity((props, propName) => (
      !Number.isNaN(props[propName]) ||
      (props[propName] === 'any')
   )),
};

export default FormFieldPropTypes;

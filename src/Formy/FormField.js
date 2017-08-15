import React from 'react';
import PropTypes from 'prop-types';
import FormDefaultComponentLibrary from './FormDefaultComponentLibrary';

const FormField = ({componentLibrary, ...props}) => {
   const Component = componentLibrary[props.type];
   return <Component {...props} />;
}

FormField.defaultProps = {
   type: 'text',
   value: '',
   label: '',
   placeholder: '',
   autocomplete: 'off',
   disabled: false,
   required: false,
   checked: false,
   description: '',
   radios: [],
   focus: false,
   focusTime: 0,
   hover: false,
   hoverTime: 0,
   componentLibrary: FormDefaultComponentLibrary,
};

FormField.propTypes = {
   autocomplete: PropTypes.string.isRequired,
   checked: PropTypes.bool.isRequired,
   componentLibrary: PropTypes.object.isRequired,
   disabled: PropTypes.bool.isRequired,
   description: PropTypes.string.isRequired,
   focus: PropTypes.bool.isRequired,
   focusTime: PropTypes.number.isRequired,
   hover: PropTypes.bool.isRequired,
   hoverTime: PropTypes.number.isRequired,
   label: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   placeholder: PropTypes.string.isRequired,
   radios: PropTypes.array.isRequired,
   required: (props, propName, componentName) => (
      typeof props[propName] === 'boolean' &&
      props[propName] &&
      props.type === 'radiogroup' ?
      new Error(
         'Invalid prop `' + propName + '` supplied to' +
         ' `' + componentName + '`. Validation failed.'
      ) : null
   ),
   type: PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
};

export default FormField;

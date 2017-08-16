import { TextField, Checkbox, Radio, Textarea, RadioGroup } from 'toolbox';
import React from 'react';

const FormFieldComponentLibrary = {
   text: TextField,
   email: TextField,
   password: TextField,
   number: TextField,
   checkbox: Checkbox,
   radio: Radio,
   textarea: Textarea,
   radiogroup: RadioGroup,
   paragraph: ({ value }) => <p>{value}</p>,
};

export default FormFieldComponentLibrary;

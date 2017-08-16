let FormUtils = {};

FormUtils.getActiveFieldDescription = (form, defaultDescription = '') => {
   const [description, ] = Object.keys(form.fields)
    .reduce(([description, activeTime], fieldKey) => {
      const field = form.fields[fieldKey];

      if (field.description) {
         if (field.focus && field.focusTime > activeTime) {
            return [field.description, field.focusTime];
         }

         if (field.hover && field.hoverTime > activeTime) {
            return [field.description, field.hoverTime];
         }
      }

      return [description, activeTime];
   }, [defaultDescription, 0]);

   return description;
}

export default FormUtils;

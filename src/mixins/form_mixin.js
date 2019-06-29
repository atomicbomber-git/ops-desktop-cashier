import indicative from "indicative";
import validation_messages from "../validation_messages";
import { groupBy, get, pickBy } from "lodash";

const formMixin = {
 data() {
  return {
   form_errors: null
  };
 },

 methods: {
  get,

  validateFormPartially() {
   indicative
    .validate(this.form_data, this.form_validation_rules, validation_messages)
    .catch(errors => {
     this.form_errors = groupBy(errors, 'field');
    });
  },

  validateForm(options) {
   let validation_rules;

   if (options && "ignore_null" in options && options.ignore_null) {
    validation_rules = pickBy(this.form_validation_rules, (value, key) => {
     return this.form_data[key] !== null;
    });
   } else {
    validation_rules = this.form_validation_rules;
   }

   return new Promise((resolve, reject) => {
    indicative
     .validateAll(this.form_data, validation_rules, validation_messages)
     .then(() => {
      /* No validation error whatsoever */
      this.form_errors = [];
      resolve()
     })
     .catch(errors => {
      this.form_errors = groupBy(errors, 'field');
      reject({ message: 'Form data is invalid' })
    });
   });
  }
 },

 computed: {
  form_data() {},

  form_validation_rules() {}
 },

 watch: {
  form_data: {
   handler: function() {
    this.validateForm({ ignore_null: true })
      .catch(() => {})
   },
   deep: true
  }
 }
};

export default formMixin;

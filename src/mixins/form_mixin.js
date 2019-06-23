import indicative from 'indicative'
import validation_messages from '../validation_messages'
import { groupBy, get, pickBy } from 'lodash'
import swal from 'sweetalert'

const formMixin = {
  data() {
    return {
      form_errors: null,
    }
  },

  methods: {
    get,
    swal,

    validate_form_partial() {
      indicative.validate(this.form_data, this.form_validation_rules, validation_messages)
        .catch(errors => {
          this.form_errors = groupBy(errors, 'field')
        })
    },

    validate_form(options) {
      let validation_rules

      if (options && 'ignore_null' in options && options.ignore_null) {
        validation_rules = pickBy(this.form_validation_rules, (value, key) => {
          return this.form_data[key] !== null
        })
      }
      else {
        validation_rules = this.form_validation_rules
      }

      return indicative.validateAll(this.form_data, validation_rules, validation_messages)
        .then(() => {
          /* No validation error whatsoever */
          this.form_errors = []

          if (options && 'success' in options) {
            options.success()
          }
        })
        .catch(errors => {
          this.form_errors = groupBy(errors, 'field')
        })
    },
  },
  
  computed: {
    form_data() {

    },

    form_validation_rules() {
      
    },
  },

  watch: {
    form_data: {
      handler: function() {
        this.validate_form({ ignore_null: true })
      },
      deep: true,
    }
  }
}

export default formMixin
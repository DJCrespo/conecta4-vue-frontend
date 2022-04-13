<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.label"
    :rules="rules"
  >
    <b-field
      class="mb-3"
      v-bind="$attrs"
      :type="{
        'is-danger': errors[0],
        'is-success': valid && !$attrs.disabled
      }"
      :message="errors"
    >
      <b-select
        v-model="innerValue"
        v-bind="$attrs"
        class="index"
        placeholder="Selecciona una opción"
        expanded
      >
        <slot>
          <option value="">
            {{
              $attrs.placeholder || 'Seleccione una opción'
            }}
          </option>
          <option
            v-for="option in $attrs.options"
            :key="option.value || option"
            :value="option.value"
          >
            {{ option.label || option }}
          </option>
        </slot>
      </b-select>
    </b-field>
  </ValidationProvider>
</template>

<style scoped>
.index {
  z-index: 0;
}
</style>

<script>
export default {
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: ''
  }),
  watch: {
    // Handles internal model changes.
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value
    }
  }
}
</script>

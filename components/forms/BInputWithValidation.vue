<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
  >
    <b-field
      :class="margin"
      v-bind="$attrs"
      :type="{
        'is-danger': errors[0],
        'is-success': valid && !$attrs.readonly
      }"
      :message="getMessage(errors, valid, $attrs.message)"
    >
      <slot name="input">
        <b-input
          v-if="!normal"
          v-model="innerValue"
          v-bind="$attrs"
          @input="innerValue = innerValue.toUpperCase()"
        />
        <b-input v-else v-model="innerValue" v-bind="$attrs" />
      </slot>
    </b-field>
  </ValidationProvider>
</template>

<script>
import inputMixin from '@/mixins/input'

export default {
  mixins: [inputMixin],
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    normal: {
      type: Boolean,
      default: true
    },
    margin: {
      type: String,
      default: 'mb-3'
    }
  },
  methods: {
    getMessage (errors, valid, message) {
      if (errors[0]) {
        return errors[0]
      }
      return message
    }
  }
}
</script>

<template>
  <div class="form">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="['form-control', { 'is-invalid': error }]"
      :required="required"
      :min="min"
      :max="max"
    />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  error: String,
  required: Boolean,
  min: [String, Number],
  max: [String, Number],
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).slice(2)}`
  }
});
</script>

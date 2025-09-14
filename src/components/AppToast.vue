<template>
  <div v-if="visible" :class="['toast', type]">
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useToastStore } from '../stores/toastStore';

const toast = useToastStore();
const visible = computed(() => toast.visible);
const message = computed(() => toast.message);
const type = computed(() => toast.type);
</script>

<style>
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 1000;
  font-size: 1rem;
  opacity: 0.95;
  transition: opacity 0.3s;
}
.toast.info { background: #2196f3; }
.toast.success { background: #4caf50; }
.toast.error { background: #f44336; }
</style>

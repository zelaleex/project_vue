import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const message = ref('');
  const type = ref('info');
  const visible = ref(false);

  function showToast(msg, toastType = 'info', duration = 2500) {
    message.value = msg;
    type.value = toastType;
    visible.value = true;
    setTimeout(() => {
      visible.value = false;
    }, duration);
  }

  return { message, type, visible, showToast };
});

// Composable a Toast üzenetekhez
// valahol rosszul van meghívva
import { ref } from 'vue';

const toastMessage = ref('');
const toastType = ref('');
const toastVisible = ref(false);

function showToast(message, type = 'info', duration = 2500) {
  toastMessage.value = message;
  toastType.value = type;
  toastVisible.value = true;
  setTimeout(() => {
    toastVisible.value = false;
  }, duration);
}

export const useToast = () => ({
  toastMessage,
  toastType,
  toastVisible,
  showToast
});

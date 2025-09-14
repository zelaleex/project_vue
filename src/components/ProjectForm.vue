
<script setup>

import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProjects } from '../composables/useProjects';
import { useToastStore } from '../stores/toastStore';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { isValidBudget } from '../utils/format';

const route = useRoute();
const router = useRouter();
const toast = useToastStore();
const { addProject, updateProject, getProjects, loadProjects } = useProjects();


const editingId = route.params.id;
const isEditing = computed(() => !!editingId);


const name = ref('');
const description = ref('');
const startDate = ref('');
const budget = ref('');
const error = ref('');

const FORM_KEY = isEditing.value ? `project-form-${editingId}` : 'project-form-new';

function saveFormState() {
  sessionStorage.setItem(FORM_KEY, JSON.stringify({
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    budget: budget.value
  }));
}

function restoreFormState() {
  const raw = sessionStorage.getItem(FORM_KEY);
  if (raw) {
    const data = JSON.parse(raw);
    name.value = data.name || '';
    description.value = data.description || '';
    startDate.value = data.startDate || '';
    budget.value = data.budget || '';
  }
}

function clearFormState() {
  sessionStorage.removeItem(FORM_KEY);
}


onMounted(() => {
  restoreFormState();
  if (isEditing.value) {
    const project = getProjects().find(p => p.id === editingId);
    if (project) {
      if (!name.value && !description.value && !startDate.value && !budget.value) {
        name.value = project.name;
        description.value = project.description;
        startDate.value = project.startDate;
        budget.value = project.budget;
      }
    }
  }
});

watch([name, description, startDate, budget], saveFormState);

function validate() {
  if (!name.value) {
    error.value = 'A projekt neve kötelező.';
    return false;
  }
  if (!isValidBudget(budget.value)) {
    error.value = 'A költségvetésnek pozitív számnak kell lennie.';
    return false;
  }
  error.value = '';
  return true;
}


function handleSubmit() {
  if (!validate()) return;
  const projectData = {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    budget: budget.value
  };
  if (isEditing.value) {
    updateProject(editingId, projectData);
    // toast.showToast('Projekt módosítva!', 'success');
    toast.showToast('Projekt hozzáadva!', 'success');
  } else {
    addProject({
      id: Date.now().toString(),
      ...projectData
    });
    toast.showToast('Projekt hozzáadva!', 'success');
    loadProjects();
  }
  clearFormState();
  setTimeout(() => {
    router.push('/projects');
  }, 1000);
}
</script>

<template>
  <div class="container">
    <h2 class="mb-4">{{ isEditing ? 'Projekt szerkesztése' : 'Új projekt hozzáadása' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Projekt neve: *</label>
        <input v-model="name" type="text" required class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Leírás:</label>
        <textarea v-model="description" class="form-control"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Kezdési dátum:</label>
        <input v-model="startDate" type="date" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Költségvetés (HUF): *</label>
        <input v-model="budget" type="number" min="1" required class="form-control" />
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Mentés' : 'Hozzáadás' }}</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.back()">Vissza</button>
    </form>
        
  </div>
</template>
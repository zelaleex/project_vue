

<script setup>
function handleDelete(id) {
  if (confirm('Biztosan törölni szeretnéd?')) {
    deleteProject(id);
    loadProjects();
    toast.showToast('Projekt törölve!', 'success');
  }
}

import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProjects } from '../composables/useProjects';
import { useToastStore } from '../stores/toastStore';
import { formatDate, formatBudget } from '../utils/format';
import { watch } from 'vue';

const router = useRouter();
const toast = useToastStore();
const { projects, loadProjects, deleteProject } = useProjects();
const search = ref('');

onMounted(() => {
  loadProjects();
});

// Megjelenő lista mérete és keresőmező
const page = ref(1);
const pageSize = 5;
const filteredProjects = computed(() => {
  const allProjects = projects.value ?? [];
  if (!search.value) return allProjects;
  const term = search.value.toLowerCase();
  return allProjects.filter(p => {
    const nameMatch = p.name.toLowerCase().includes(term);
    const descMatch = p.description && p.description.toLowerCase().includes(term);
    const dateMatch = p.startDate && p.startDate.toLowerCase().includes(term);
    const budgetMatch = p.budget && p.budget.toString().toLowerCase().includes(term);
    return nameMatch || descMatch || dateMatch || budgetMatch;
  });
});

const pagedProjects = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredProjects.value.slice(start, start + pageSize);
});

// Összes oldal száma
const pageCount = computed(() => Math.max(1, Math.ceil((filteredProjects.value ?? []).length / pageSize)));

// keresésnél ugorjon az első oldalra
watch(filteredProjects, () => {
  page.value = 1;
});

</script>

<!-- Táblázat a megjelenítéshez -->
<template>
  <div class="container">
    <h2 class="mb-4">Projektek Listája</h2>
    <input v-model="search" placeholder="Keresés..." class="form-control mb-3" />
    <div style="overflow-x:auto; width:100%">
      <table class="table table-striped table-bordered" style="width:100%; min-width:600px; table-layout:fixed;">
        <thead class="table-dark">
          <tr>
            <th style="min-width:5em; width:10%;">Név</th>
            <th style="min-width:12em; width:40%;">Leírás</th>
            <th style="min-width:8em; width:15%;">Kezdési dátum</th>
            <th style="min-width:8em; width:15%; word-break:break-word;">Költségvetés</th>
            <th style="min-width:8em; width:20%; white-space:nowrap;">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in pagedProjects" :key="project.id">
            <td style="min-width:5em; width:10%;">{{ project.name }}</td>
            <td style="min-width:12em; width:40%;">
              <div style="max-height:4.5em; overflow-y:auto; line-height:1.5; white-space:pre-line;">{{ project.description }}</div>
            </td>
            <td style="min-width:8em; width:15%;" v-html="formatDate(project.startDate)"></td>
            <td style="min-width:8em; width:15%; word-break:break-word; white-space:normal;">{{ formatBudget(project.budget) }}</td>
            <td style="min-width:8em; width:20%;">
              <div style="display:flex; gap:0.5em; white-space:nowrap;">
                <button class="btn btn-sm btn-warning" @click.stop="() => router.push(`/projects/${project.id}/edit`)">Szerkesztés</button>
                <button class="btn btn-sm btn-danger" @click.stop="handleDelete(project.id)">Törlés</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-danger btn-sm me-2" :disabled="page === 1 || pageCount <= 1" @click="page = Math.max(1, page - 1)">Előző</button>
      <span class="align-self-center">{{ page }} / {{ pageCount }}</span>
      <button class="btn btn-danger btn-sm ms-2" :disabled="page >= pageCount || pageCount <= 1" @click="page = Math.min(pageCount, page + 1)">Következő</button>
    </div>
    <div class="text-center text-muted mb-3">
      <small>Lapozz a többi projekt megtekintéséhez.</small>
    </div>
  </div>
</template>
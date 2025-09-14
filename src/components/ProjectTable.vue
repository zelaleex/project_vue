<!-- Táblázat template a projektek megjelenítéséhez -->
<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>Név</th>
        <th>Leírás</th>
        <th>Kezdési dátum</th>
        <th>Költségvetés</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in projects" :key="project.id">
        <td>{{ project.name }}</td>
        <td>{{ project.description }}</td>
        <td>{{ formatDate(project.startDate) }}</td>
        <td>{{ formatBudget(project.budget) }}</td>
      </tr>
    </tbody>
  </table>
  <div v-for="project in projects" :key="'actions-' + project.id" class="actions">
    <button @click="$emit('edit', project.id)" class="edit">Szerkesztés</button>
    <button @click="$emit('delete', project.id)" class="delete">Törlés</button>
  </div>
</template>

<script setup>
import { formatDate, formatBudget } from '../utils/format';
defineProps({
  projects: Array
});
</script>

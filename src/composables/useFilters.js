import { computed, ref } from 'vue';

export function useFilters(projects) {
  const search = ref('');
  const filteredProjects = computed(() => {
    if (!search.value) return projects.value;
    return projects.value.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.value.toLowerCase()))
    );
  });
  return { search, filteredProjects };
}

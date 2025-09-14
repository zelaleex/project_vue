import { computed } from 'vue';
import { useProjectStore } from '../stores/projectStore';

export function useProjects() {
  const store = useProjectStore();
  return {
    projects: computed(() => store.projects),
    loadProjects: store.loadProjects,
    addProject: store.addProject,
    updateProject: store.updateProject,
    deleteProject: store.deleteProject,
    getProjects: () => store.projects
  };
}

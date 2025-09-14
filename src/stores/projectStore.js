import { defineStore } from 'pinia';
import { useProjectStorage } from '../composables/useProjectStorage';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: []
  }),
  actions: {
    loadProjects() {
      this.projects = useProjectStorage().getProjects();
    },
    addProject(project) {
      useProjectStorage().addProject(project);
      this.loadProjects();
    },
    updateProject(id, updated) {
      useProjectStorage().updateProject(id, updated);
      this.loadProjects();
    },
    deleteProject(id) {
      useProjectStorage().deleteProject(id);
      this.loadProjects();
    }
  }
});

// Composable a LocalStorage-hez 
export function useProjectStorage() {
  const STORAGE_KEY = 'projects';

  function getProjects() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  function addProject(project) {
    const projects = getProjects();
    projects.push(project);
    saveProjects(projects);
  }

  function updateProject(id, updated) {
    const projects = getProjects().map(p => p.id === id ? { ...p, ...updated } : p);
    saveProjects(projects);
  }

  function deleteProject(id) {
    const projects = getProjects().filter(p => p.id !== id);
    saveProjects(projects);
  }

  function getProjectById(id) {
    return getProjects().find(p => p.id === id);
  }

  return {
    getProjects,
    saveProjects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById
  };
}

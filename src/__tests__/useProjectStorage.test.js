import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStorage } from '../composables/useProjectStorage';

describe('useProjectStorage', () => {
  let storage;
  beforeEach(() => {
    localStorage.clear();
    storage = useProjectStorage();
  });

  it('should add and get projects', () => {
    const project = { id: '1', name: 'Teszt', budget: 100 };
    storage.addProject(project);
    const projects = storage.getProjects();
    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe('Teszt');
  });

  it('should update a project', () => {
    const project = { id: '1', name: 'Teszt', budget: 100 };
    storage.addProject(project);
    storage.updateProject('1', { name: 'Módosított' });
    const updated = storage.getProjectById('1');
    expect(updated.name).toBe('Módosított');
  });

  it('should delete a project', () => {
    const project = { id: '1', name: 'Teszt', budget: 100 };
    storage.addProject(project);
    storage.deleteProject('1');
    const projects = storage.getProjects();
    expect(projects.length).toBe(0);
  });
});

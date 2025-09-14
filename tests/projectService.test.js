import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStorage } from '../src/composables/useProjectStorage';

// Mock localStorage for testing
let mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, value) => { mockStorage[key] = value; },
  removeItem: (key) => { delete mockStorage[key]; }
};

const STORAGE_KEY = 'projects';

beforeEach(() => {
  mockStorage = {};
});

describe('ProjectService (useProjectStorage)', () => {
  it('hozzáad egy projektet', () => {
    const service = useProjectStorage();
    service.addProject({ id: '1', name: 'Teszt', budget: 100 });
    const projects = service.getProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Teszt');
  });

  it('frissít egy projektet', () => {
    const service = useProjectStorage();
    service.addProject({ id: '1', name: 'Teszt', budget: 100 });
    service.updateProject('1', { name: 'Módosított', budget: 200 });
    const projects = service.getProjects();
    expect(projects[0].name).toBe('Módosított');
    expect(projects[0].budget).toBe(200);
  });

  it('töröl egy projektet', () => {
    const service = useProjectStorage();
    service.addProject({ id: '1', name: 'Teszt', budget: 100 });
    service.deleteProject('1');
    const projects = service.getProjects();
    expect(projects).toHaveLength(0);
  });

  it('visszaadja a projektet id alapján', () => {
    const service = useProjectStorage();
    service.addProject({ id: '1', name: 'Teszt', budget: 100 });
    const project = service.getProjectById('1');
    expect(project).toBeDefined();
    expect(project.name).toBe('Teszt');
  });
});

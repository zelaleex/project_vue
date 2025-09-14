import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from './components/ProjectList.vue';
import ProjectForm from './components/ProjectForm.vue';

const routes = [
  {
    path: '/projects',
    name: 'ProjectList',
    component: ProjectList
  },
  {
    path: '/projects/new',
    name: 'ProjectForm',
    component: ProjectForm
  },
  {
    path: '/projects/:id/edit',
    name: 'ProjectEdit',
    component: ProjectForm,
    props: true
  },
  {
    path: '/',
    redirect: '/projects'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
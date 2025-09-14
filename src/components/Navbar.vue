<script setup>
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container-fluid">
      <span class="navbar-brand">Projekt Nyilvántartó</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Menü">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/projects" class="nav-link">Projektek Listája</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/projects/new" class="nav-link">Új Projekt Hozzáadása</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar {
  z-index: 2000;
  position: relative;
}
</style>
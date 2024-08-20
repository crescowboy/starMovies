<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo">
        <p>Star Movies🍿</p>
      </div>

      <!-- Botón de menú para dispositivos móviles -->
      <button class="navbar-toggle" @click="toggleMenu">
        <!-- Ícono de menú (hamburguesa) cuando el menú está cerrado -->
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <!-- Ícono de cierre (X) cuando el menú está abierto -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Enlaces del menú -->
      <nav :class="{ 'navbar-menu': true, open: menuOpen }">
        <ul class="navbar-links">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/">Peliculas</router-link></li>
          <li><router-link to="/">Series</router-link></li>
          <li><router-link to="/">Contacto</router-link></li>
        </ul>

        <!-- Botón para cambiar el idioma -->
        <div class="navbar-actions">
          <button class="language-switch">EN</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref(false); // Estado para controlar si el menú está abierto o cerrado

// Función para alternar el estado del menú
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 60px;
  background-color: #333;
  color: white;
  position: relative;
  z-index: 1;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-logo {
  font-size: 25px;
  transition: opacity 0.3s ease;
}

.navbar-logo p {
  margin: 0;
}

.navbar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-toggle svg {
  width: 20px;
  height: 20px;
  color: white;
  display: none;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin-left: 10px;
}

.navbar-links a:hover {
  color: rgba(0, 204, 255, 1);
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.language-switch {
  background-color: #555;
  color: white;
  border: none;
  padding: 3px 8px;
  cursor: pointer;
  font-size: 0.8rem;
}

/* Estilo responsive */
@media (max-width: 1200px) {
  .navbar-links li {
    margin-left: 8px;
  }

  .navbar-logo {
    font-size: 20px;
  }
}

@media (max-width: 900px) {
  .navbar-links li {
    margin-left: 7px;
  }

  .navbar-logo {
    font-size: 20px;
  }
}

@media (max-width: 600px) {
  .navbar {
    height: 50px;
    padding: 3px 10px;
  }
  .navbar-toggle {
    display: block;
  }

  .navbar-toggle svg {
    width: 20px;
    height: 20px;
    color: white;
    display: block;
  }

  .navbar-menu {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    background-color: #333;
    padding: 15px 0;
  }

  .navbar-menu.open {
    display: flex;
  }

  .navbar-links {
    flex-direction: column;
    width: 100%;
  }

  .navbar-links li {
    margin: 8px 0;
  }

  .navbar-actions {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .language-switch {
    display: none;
  }
}
</style>

<template>
  <div>
    <!-- Componente de la barra de navegación -->
    <NavbarComponent />

    <!-- Encabezado de la página -->
    <header class="page-header">
      <!-- Título principal de la página -->
      <h1 class="page-title">Las Películas Mejor Ranqueadas</h1>
      <!-- Subtítulo de la página -->
      <p class="page-subtitle">
        Explora las películas más populares y mejor valoradas
      </p>
      <!-- Contenedor de búsqueda -->
      <div class="search-container">
        <q-input
          v-model="searchQuery"
          placeholder="Buscar una película, serie, persona..."
          class="search-input"
          dense
        >
          <template v-slot:append>
            <!-- Botón de búsqueda -->
            <q-btn @click="fetchMovies" label="Search" class="search-button" />
          </template>
        </q-input>
      </div>
    </header>

    <!-- Contenedor de películas -->
    <div class="movie-container">
      <!-- Mensaje cuando no se encuentran películas -->
      <p
        v-if="!loading && !error && !movies.length && searchQuery"
        class="no-movies-message"
      >
        No se encontraron películas para "{{ searchQuery }}" en tu búsqueda.
      </p>
      <!-- Lista de películas -->
      <div class="movie-list">
        <!-- Componente MovieCard para cada película -->
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </div>

    <!-- Mensajes de carga y error -->
    <p v-if="loading">Loading movies...</p>
    <p v-if="error">{{ error }}</p>

    <!-- Componente del pie de página -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { api } from 'src/boot/axios';
import MovieCard from 'src/components/MovieCard.vue';
import { Movie } from 'src/types/Movie';
import AppFooter from 'src/components/AppFooter.vue';
import NavbarComponent from 'src/components/NavbarComponent.vue';

const searchQuery = ref(''); // Consulta de búsqueda del usuario
const movies = ref<Movie[]>([]); // Lista de películas
const loading = ref(false); // Indicador de carga de películas
const error = ref(''); // Mensaje de error

// Función para obtener las películas desde la API
async function fetchMovies() {
  loading.value = true;
  error.value = '';
  try {
    // Definir parámetros de búsqueda y endpoint según la consulta
    const params = searchQuery.value.trim() ? { query: searchQuery.value } : {};
    const endpoint = searchQuery.value.trim()
      ? '/search/movie'
      : '/movie/top_rated';
    // Hacer la solicitud a la API
    const response = await api.get(endpoint, { params });
    movies.value = response.data.results;
  } catch (err) {
    console.error('Error fetching movies:', err);
    error.value = 'Failed to fetch movies. Please try again later.';
  } finally {
    loading.value = false;
  }
}

// Observar cambios en searchQuery y obtener películas
watch(searchQuery, fetchMovies, { immediate: true });
</script>

<style scoped>
/* Estilos para el encabezado de la página */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 0;
  padding: 10px 10px;
  background: linear-gradient(
    135deg,
    rgba(58, 123, 213, 1) 0%,
    rgba(0, 204, 255, 1) 100%
  );
  color: white;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilo para el título de la página */
.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Estilo para el subtítulo de la página */
.page-subtitle {
  font-size: 1.2rem;
}

/* Contenedor de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  padding: 0 10px;
}

/* Estilo para el campo de búsqueda */
.search-input {
  border-radius: 50px;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  display: flex;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 5px 15px;
  margin-bottom: 20px;
}

/* Estilo para el botón de búsqueda */
.search-button {
  border-radius: 50px;
  padding: 0 20px;
  height: 100%;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px;
}

/* Estilo para el input dentro del campo de búsqueda */
.search-input input {
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px;
  width: calc(100% - 120px);
}

/* Contenedor de películas */
.movie-container {
  position: relative;
  min-height: 400px;
}

/* Lista de películas con diseño en cuadrícula */
.movie-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-items: center;
  margin: 0 auto;
  padding: 0 10px;
}

/* Estilos responsivos para pantallas más pequeñas */
@media (max-width: 1200px) {
  .movie-list {
    grid-template-columns: repeat(4, 1fr);
  }

  .search-button {
    padding: 0 18px;
  }
}

@media (max-width: 900px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .search-button {
    padding: 0 16px;
  }

  .search-container {
    margin: 0 auto;
    width: 90%;
  }

  .search-input input {
    font-size: 13px;
  }

  .search-input {
    padding: 5px 25px;
  }
}

@media (max-width: 600px) {
  .movie-list {
    grid-template-columns: repeat(1, 1fr);
  }

  .search-button {
    padding: 0 12px;
    font-size: 12px;
  }

  .search-input input {
    font-size: 12px;
  }

  .search-container {
    width: 100%;
  }

  .search-input {
    padding: 5px 10px;
  }
}

/* Mensaje cuando no se encuentran películas */
.no-movies-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin: 20px 0;
  padding: 10px 0;
}
</style>

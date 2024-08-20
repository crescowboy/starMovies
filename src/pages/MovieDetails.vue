<template>
  <NavbarComponent />
  <div class="content-wrapper">
    <div class="movie-details">
      <q-card v-if="movie" flat bordered>
        <div class="movie-content">
          <!-- Imagen de la película -->
          <q-img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="movie-poster"
          />

          <!-- Detalles de la película -->
          <q-card-section class="movie-info">
            <div class="text-h6">{{ movie.title }}</div>
            <div>{{ movie.overview }}</div>
            <div class="movie-meta">
              <!-- Fecha de lanzamiento -->
              <div><q-icon name="event" /> {{ movie.release_date }}</div>
              <!-- Duración en minutos -->
              <div><q-icon name="schedule" /> {{ movie.runtime }} min</div>
              <!-- Géneros de la película -->
              <div>
                <q-icon name="category" />
                {{ movie.genres.map((genre) => genre.name).join(', ') }}
              </div>
              <!-- Actores principales -->
              <div>
                <q-icon name="people" />
                {{ movie.cast.map((cast) => cast.name).join(', ') }}
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
      <!-- Mensaje de carga o error -->
      <p v-else>Loading movie details...</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import NavbarComponent from 'src/components/NavbarComponent.vue';

// Define la interfaz de la película
interface Movie {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Array<{ name: string }>;
  cast: Array<{ name: string }>;
}

const movie = ref<Movie | null>(null); // Película seleccionada
const error = ref<string | null>(null); // Mensaje de error

const route = useRoute(); // Obtiene la ruta actual
const movieId = route.params.id as string; // ID de la película desde los parámetros de la ruta

// Obtiene los detalles de la película al montar el componente
onMounted(async () => {
  if (!movieId) {
    error.value = 'Movie ID is missing'; // Error si falta el ID de la película
    return;
  }

  try {
    // Solicita los detalles de la película y el reparto
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        language: 'en-US',
        append_to_response: 'credits', // Incluye créditos (actores)
      },
    });
    const data = response.data;
    // Asigna los datos de la película y limita el reparto a 3 actores principales
    movie.value = {
      ...data,
      cast: data.credits.cast.slice(0, 3),
    };
  } catch (err) {
    console.error('Error fetching movie details:', err);
    error.value = 'Failed to fetch movie details. Please try again later.'; // Mensaje de error si falla la solicitud
  }
});
</script>

<style scoped>
/* Estilo general del contenedor */
.content-wrapper {
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

/* Estilo del contenedor de detalles de la película */
.movie-details {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* Estilo del contenido de la película (imagen y detalles) */
.movie-content {
  display: flex;
  max-width: 900px;
}

/* Estilo de la imagen de la película */
.movie-poster {
  flex-shrink: 0;
  width: 300px;
  height: auto;
  margin-right: 20px;
}

/* Estilo de la sección de información de la película */
.movie-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Estilo de la sección de metadatos de la película (fecha, duración, etc.) */
.movie-meta {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

/* Estilo de cada elemento en la sección de metadatos */
.movie-meta div {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

/* Estilo de los íconos en los metadatos */
.q-icon {
  margin-right: 5px;
  font-size: 16px;
}

/* Media Queries para ajustar el diseño en pantallas más pequeñas */
@media (max-width: 1200px) {
  .movie-content {
    max-width: 800px;
  }

  .movie-poster {
    width: 250px;
  }

  .movie-info {
    font-size: 16px;
  }
}

@media (max-width: 900px) {
  .movie-content {
    max-width: 600px;
    flex-direction: column;
    align-items: center;
  }

  .movie-poster {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
    max-width: 400px;
  }

  .movie-info {
    text-align: start;
  }
}

@media (max-width: 600px) {
  .movie-content {
    padding: 10px;
  }

  .movie-poster {
    width: 100%;
    max-width: 300px;
  }

  .movie-info {
    font-size: 14px;
  }

  .movie-meta {
    font-size: 12px;
  }
}
</style>

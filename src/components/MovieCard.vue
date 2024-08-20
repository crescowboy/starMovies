<template>
  <!-- Componente de la tarjeta de película -->
  <q-card class="movie-card" @click="showDetails">
    <!-- Imagen de la película -->
    <q-img
      :src="`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`"
      class="movie-image"
      :style="{ objectFit: 'contain' }"
    />
    <!-- Sección con la información de la película -->
    <q-card-section class="movie-info">
      <div class="title">{{ props.movie.title }}</div>
      <div>Rating: {{ props.movie.vote_average }}</div>
    </q-card-section>
    <!-- Acciones del card que se ocultan en pantallas móviles -->
    <q-card-actions v-if="!isMobile" class="card-actions">
      <!-- Botón de detalles -->
      <q-btn @click.stop="showDetails" label="Details" flat />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

// Definir la interfaz para la película
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  overview?: string;
  release_date?: string;
}

// Definir las propiedades del componente
const props = defineProps<{ movie: Movie }>();
const router = useRouter();

// Detectar si el dispositivo es móvil
const isMobile = ref(false);

onMounted(() => {
  // Inicializar el estado móvil basado en el ancho de la ventana
  isMobile.value = window.innerWidth <= 600; // Umbral para móviles
  // Actualizar el estado móvil al cambiar el tamaño de la ventana
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 600;
  });
});

// Función para mostrar los detalles de la película
function showDetails(event: Event) {
  // Prevenir la propagación del clic en dispositivos móviles si el botón está presente
  if (!isMobile.value && (event as MouseEvent).stopPropagation) {
    (event as MouseEvent).stopPropagation();
  }
  // Navegar a la página de detalles de la película
  router.push(`/movie/${props.movie.id}`);
}
</script>

<style scoped>
.movie-card {
  width: 190px;
  height: 370px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.movie-image {
  height: 80%;
  width: 100%;
  object-fit: contain;
}

.movie-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title:hover {
  color: #3b82f6;
  cursor: pointer;
}

.card-actions {
  display: flex;
  justify-content: center;
  padding: 8px;
}

.q-btn {
  width: 100%;
  background-color: black;
  color: white;
  box-shadow: none;
}

/* Estilos para pantallas móviles */
@media (max-width: 600px) {
  .movie-card {
    width: 100%;
    flex-direction: row;
    height: 200px;
  }

  .movie-image {
    width: 40%;
    height: 100%;
  }

  .movie-info {
    width: 60%;
    padding: 10px;
  }

  .card-actions {
    display: none;
  }
}
</style>

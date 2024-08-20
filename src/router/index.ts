import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MovieList from 'src/pages/MovieList.vue';
import MovieDetails from 'src/pages/MovieDetails.vue';

interface RouteMeta {
  title?: string;
}

// Definir las rutas de la aplicación
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: MovieList, meta: { title: 'Star Movies🍿' } },
  {
    path: '/movie/:id',
    component: MovieDetails,
    meta: { title: 'Star Movies🍿 - Movie Details' },
  },
];

// Crear la instancia del enrutador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Configurar el cambio de título de la página basado en los metadatos de la ruta
router.beforeEach((to, from, next) => {
  const meta = to.meta as RouteMeta;
  document.title = meta.title || 'Star Movies🍿'; // Título por defecto
  next();
});

export default router;

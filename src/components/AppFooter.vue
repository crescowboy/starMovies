<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-branding">
        <h3 class="footer-title">Star Movies🍿</h3>
        <p class="footer-description">
          Disfruta de las mejores películas y series en un solo lugar.
        </p>
      </div>
      <div class="footer-links">
        <h4 class="footer-heading">Enlaces Rápidos</h4>
        <ul class="footer-link-list">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Películas</a></li>
          <li><a href="#">Series</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-legal">
        <h4 class="footer-heading">Información Legal</h4>
        <ul class="footer-link-list">
          <li><a href="#">Términos de Servicio</a></li>
          <li><a href="#">Política de Privacidad</a></li>
        </ul>
      </div>
      <div class="footer-social">
        <h4 class="footer-heading">Síguenos</h4>
        <ul class="footer-social-list">
          <li>
            <a href="#"><i class="fab fa-facebook"></i> Facebook</a>
          </li>
          <li>
            <a href="#"><i class="fab fa-twitter"></i> Twitter</a>
          </li>
          <li>
            <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Star Movies. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #f5f5f5;
  padding: 40px 20px;
  text-align: center;
  margin-top: 40px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.footer-description {
  font-size: 0.9rem;
  line-height: 1.6;
}

.footer-heading {
  font-size: 1.1rem;
  margin-bottom: 15px;
  font-weight: bold;
}

.footer-link-list,
.footer-social-list {
  list-style: none;
  padding: 0;
}

.footer-link-list li,
.footer-social-list li {
  margin-bottom: 10px;
}

.footer-link-list a,
.footer-social-list a {
  color: #f5f5f5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link-list a:hover,
.footer-social-list a:hover {
  color: rgba(0, 204, 255, 1);
}

.footer-social-list i {
  margin-right: 10px;
}

.footer-bottom {
  margin-top: 30px;
  font-size: 0.85rem;
  border-top: 1px solid #333;
  padding-top: 20px;
}

/* Estilos Responsivos */

@media (max-width: 1200px) {
  .footer-container {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 columnas en pantallas medianas */
  }

  .footer-branding {
    grid-column: span 2; /* Ocupa ambas columnas */
  }
}

@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* Mantén 2 columnas en pantallas más pequeñas */
  }

  .footer-branding {
    grid-column: span 2; /* Ocupa ambas columnas */
  }
}

@media (max-width: 600px) {
  .footer-container {
    display: flex;
    flex-direction: column; /* Apila los elementos uno debajo del otro */
    align-items: center; /* Centra los elementos horizontalmente */
    text-align: center; /* Centra el texto en cada sección */
  }

  .footer-branding,
  .footer-links,
  .footer-legal,
  .footer-social {
    width: 100%; /* Asegura que cada sección ocupe todo el ancho disponible */
    margin-bottom: 20px; /* Añade espacio entre las secciones */
  }

  .footer-bottom {
    font-size: 0.75rem;
    text-align: center; /* Centra el texto en la parte inferior */
  }
}
</style>

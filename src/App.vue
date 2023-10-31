<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <!-- Cabezera -->
      <router-link class="navbar-brand" v-if="!isLogged" to="/login">WorkAway.com</router-link>
      <router-link class="navbar-brand" v-else to="/home">WorkAway.com</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Menu -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" v-if="esAdmin" to="/home">Administrar Offices</router-link>
            <router-link class="nav-link" v-if="isLogged" to="/home">Home</router-link>
          </li>

        </ul>
        <!-- Botones Para Acceder -->
        <div class="d-grid gap-4 d-md-block">
          <form class="d-flex" v-if="isLogged">
            <RouterLink class="btn btn-light ml-2" to="/login">
              <i class="fa fa-sign-out" aria-hidden="true"></i>
              Sign Out
            </RouterLink>
          </form>
          <form class="d-flex gap-2" v-else>
            <RouterLink class="btn btn-light mr-2" to="/login">Iniciar sesión</RouterLink>
            <RouterLink class="btn btn-light" to="/Register">Registrarse</RouterLink>
          </form>
        </div>


      </div>
    </div>
  </nav>
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      isLogged: false,
      esAdmin: false, // Inicialmente, no es un administrador
      esHost: false,
      esGuest: false
    };
  },
  created() {
    this.updateAdminStatus();
    window.addEventListener('storage', this.updateAdminStatus);
  },
  computed: {
    // Definir propiedades computadas aquí
    isAdmin() {
      // console.log("APPVIE isAdmin: " + this.esAdmin);
      return this.esAdmin;

    },
  },
  methods: {
    updateAdminStatus() {
      // Verifica el valor en localStorage y actualiza esAdmin en consecuencia
      const user = JSON.parse(localStorage.getItem('usuario'));
      // console.log(user);
      if (user != null) {
        this.esAdmin = user.user_type === 1;
        this.esHost = user.user_type === 2;
        this.esGuest = user.user_type === 3;
        this.isLogged = true;
        this.nombre = user.username;
      }

    },
  },
};
</script>


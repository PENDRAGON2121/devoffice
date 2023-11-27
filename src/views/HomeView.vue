<template>
  <div class="container-fluid mt-5 mb-5">
    <img src="@/assets/Workaway.png" class="img-fluid" alt="...">
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="row row-cols-1 g-4 " v-for="office in offices" :key="office.id">
      <div class="col">
        <div class="card h-100 ">
          <img :src="office.image" class="card-img-top" alt="...">
          <div class="card-body text-black bg-white mb-3y">
            <h5 class="card-title"> {{ office.name }}</h5>
            <hr>
            <p class="card-text">{{ office.description }}</p>
          </div>
          <div class="card-footer ">
            <div class="container">
              <div class="row">
                <div class="col">
                  <small class="text-muted  justify-content-">Noche: ${{ office.price }}
                  </small>
                </div>
                <div class="col col-4 ">
                 <!-- <button class="btn btn-primary" @click="showOffice(office.id)">Reservar</button> -->
                  <router-link class="btn btn-primary " :to="{path: '/office/info/' + office.id}">Información</router-link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      offices: null,
      cargando: false
    };
  },
  mounted() {
    this.getOffice();
  },
  methods: {
    getOffice() {
      this.cargando = true;
      axios.get('http://127.0.0.1:8000/api/office').then(
        res => {
          this.offices = res.data;
          this.cargando = false;
        }
      );
    },
    showOffice(id) {
      
    }
  }

}
</script>
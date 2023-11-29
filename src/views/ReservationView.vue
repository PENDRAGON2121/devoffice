<template>
  <div class="container-fluid">
    <div class="container-jutify mt-5">
      <img
        src="@/assets/Workaway.png"
        class="img-fluid"
        width="550"
        alt="..."
      />
    </div>

    <div class="card mt-5 mb-5">
      <div class="card-header">INFORMACION DE LA RESERVACION</div>
      <div class="container mt-1">
        <div class="row">
          <!-- IMAGEN -->
          <div class="col col-sm-5 mb-1">
            <img :src="image" class="img-fluid" alt="..." />
          </div>
          <!-- TITULO - DESCRIPCION - RESERVAR -->
          <div class="col col-sm-7 mt-1">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <i class="fa-solid fa-message fa-bounce"></i>
                Complete la informacion
              </div>
              <div class="card-body">
                <h4 class="card-title">
                  <strong>Información del cliente</strong>
                </h4>
                <h5 class="card-title">Nombre: {{ nombreUsuario }}</h5>
                <h5 class="card-title">Apellidos: {{ apellidoUsuario }}</h5>
                <h5 class="card-title">Correo: {{ correo }}</h5>
                <hr />
                <h4 class="card-title">
                  <strong>Información de la oficina</strong>
                </h4>
                <h5 class="card-title">Nombre: {{ name }}</h5>
                <h5 class="card-title">Price: ${{ price }}</h5>
                <p class="card-text">Descripción: {{ description }}</p>

                <hr />
                <h4 class="card-title">
                  <strong>Información de la Reservación</strong>
                </h4>
                <div class="card-body">
                  <h5>Escriba la fecha de entrada:</h5>
                  <div class="input-group mb-3">
                    <input
                      type="date"
                      id="check_in"
                      v-model="check_in"
                      :min="getCurrentDate()"
                    />
                  </div>
                </div>

                <div class="card-body">
                  <h5>Escriba la fecha de salida:</h5>
                  <div class="input-group mb-3">
                    <input
                      type="date"
                      id="check_out"
                      v-model="check_out"
                      :min="check_in ? check_in : getCurrentDate()"
                    />
                  </div>
                </div>
                <div class="card-body">
                  <div class="input-group mb-3">
                    <button
                      class="btn btn-success"
                      type="button"
                      v-on:click="postReservation"
                      id="button-addon3"
                    >
                      Aceptar
                    </button>
                  </div>
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
import {
  mostrarAlerta,
  registrarReservation,
  registrarActualizacionDeReservation,
} from "../funciones.js";
import { useRoute } from "vue-router";
import axios from "axios";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  data() {
    return {
      // variables para edicion de reviews
      updatedRevewId: "",
      isEditing: false,
      updateTextForReview: "",
      // data imagen
      id: 0,
      name: "",
      description: "",
      image: "",
      price: "",
      tags: "",
      reviews: "",
      // data de servidor
      url: "http://127.0.0.1:8000/api/office",
      urlTag: "http://127.0.0.1:8000/api/office/tags",
      urlReviews: "http://127.0.0.1:8000/api/office/reviews",
      //urlUpdate: 'http://127.0.0.1:8000/api/office/update',
      urlReviewsPost: "http://127.0.0.1:8000/api/reviews",
      urlReservationPost: "http://127.0.0.1:8000/api/reservations",
      urlUpdatedReviews: "http://127.0.0.1:8000/api/reviews",
      urlUsuario: "http://127.0.0.1:8000/api/usuarios",
      urlReservationPDF: "http://127.0.0.1:8000/api/reservations/pdf",
      //data de usuario
      userId: "",
      nombreUsuario: "",
      apellidoUsuario: "",
      correo: "",

      //Comprobante
      fecha: null,

      //data de envio de reserva

      check_in: null,
      check_out: null,
      cargando: false,
      userhost_id: 0,
    };
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
    this.url += "/" + this.id;

    this.urlTag += "/" + this.id;
    this.urlReviews += "/" + this.id;
    // this.update += '/' + this.id;
    this.getOffice();
    this.userId = "";
    this.urlUsuario += "/" + this.userId;
    this.getUser();
  },
  methods: {
    // Interfaz: pide los datos al api del office en especifico
    getOffice() {
      axios.get(this.url).then((res) => {
        this.name = res.data.name;
        this.apellido = res.data.apellido;
        this.description = res.data.description;
        this.image = res.data.image;
        this.price = res.data.price;
        this.cargando = false;
        this.userhost_id = res.data.user_id;
      });
    },
    // Pide los tags del office
    getTags() {
      axios.get(this.urlTag).then((res) => {
        this.tags = res.data;
      });
    },
    // Pide las reviews
    getReviews() {
      axios.get(this.urlReviews).then((res) => {
        this.reviews = res.data;
      });
    },

    //Interfaz: envia al api las reservation
    postReservation() {
      event.preventDefault();
      // if (this.fechaInicio.trim() === '') {
      //    mostrarAlerta('Debe escribir una reseña', 'warning', 'review');
      // } else {
      // user = JSON.parse(localStorage.getItem('usuario'));
      const user = JSON.parse(localStorage.getItem("usuario"));
      this.userId = user.id;
      var datosReservation = {
        office_id: this.id,
        user_id: this.userId,
        check_in: this.check_in,
        check_out: this.check_out,
      };

      // const url = `${this.urlReservationPost}/${this.id}`;
      var datosUpdateOffice = {
        name: this.name,
        description: this.description,
        price: this.price,
        user_id: this.userhost_id,
        office_state_id: 2,
        image: this.image,
      };

      registrarReservation(
        datosReservation,
        this.urlReservationPost,
        "Oficina Reservada"
      );
      registrarActualizacionDeReservation(datosUpdateOffice, this.url, "");

      
      const pdf = new jsPDF();

      pdf.setFontSize(16);
      //pdf.setTextColor(127, 195, 168);
      pdf.text(`***********COMPROBANTE***********`, 10, 10);
      pdf.text(` `, 10, 20); // Espacio en blanco

      // Información del Cliente
      pdf.setFontSize(16);
      pdf.text(`INFORMACIÓN DEL CLIENTE`, 10, 30);
      pdf.setFontSize(12);
      pdf.text(
        `Cliente: ${this.nombreUsuario} ${this.apellidoUsuario}`,
        10,
        40
      );
      pdf.text(`Correo: ${this.correo}`, 10, 50);
      pdf.text(` `, 10, 60); // Espacio en blanco

      // Información de la Oficina
      pdf.setFontSize(16);
      pdf.text(`INFORMACIÓN DE LA OFICINA`, 10, 70);
      pdf.setFontSize(12);
      pdf.text(`Oficina Reservada: ${this.name}`, 10, 80);
      pdf.text(`Descripción: ${this.description}`, 10, 90);
      pdf.text(`Precio: $${this.price}`, 10, 100);
      pdf.text(` `, 10, 110); // Espacio en blanco

      // Información de la Reserva
      pdf.setFontSize(16);
      pdf.text(`INFORMACIÓN DE LA RESERVA`, 10, 120);
      pdf.setFontSize(12);
      pdf.text(`Fecha de inicio: ${this.check_in}`, 10, 130);
      pdf.text(`Fecha final: ${this.check_out}`, 10, 140);
      pdf.text(`Estado: Pendiente`,10, 150);

      // Guardar el archivo PDF
      pdf.save("reserva.pdf");

      //}
    },
    formatDate(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2); // los meses empiezan desde 0 en JavaScript
      let day = ("0" + date.getDate()).slice(-2);
      return `${day}-${month}-${year}`;
    },
    getCurrentUser() {
      const user = JSON.parse(localStorage.getItem("usuario"));
      if (user != null) {
        return user.id;
      }
      return null;
    },

    getUser() {
      const user = JSON.parse(localStorage.getItem("usuario"));
      //this.userId = user.id;
      this.nombreUsuario = user.first_name;
      this.apellidoUsuario = user.last_name;
      this.correo = user.email;
    },

    getCurrentDate() {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
      let day = ("0" + currentDate.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

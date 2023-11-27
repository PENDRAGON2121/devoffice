<template> 
    <div class="container-fluid">

        <div class="container-jutify mt-5">
            <img src="@/assets/Workaway.png" class="img-fluid " width="550" alt="...">
        </div>

        <div class="card mt-5 mb-5">
        <div class="card-header">
                INFORMACION DEL OFFICE
            </div>
            <div class="container mt-1">
                <div class="row ">
                    <!-- IMAGEN -->
                    <div class="col col-sm-5 mb-1">
                        <img :src="image" class="img-fluid" alt="...">
                    </div>
                    <!-- TITULO - DESCRIPCION - RESERVAR -->
                    <div class="col col-sm-7 mt-1">

                        <div class="card">
                            <div class="card-header ">
                                Detalles
                            </div>
                            <div class="card-body">
                                <h3 class="card-title"> {{ name }}</h3>
                                <h5 class="card-title">Price ${{ price }}</h5>
                                <p class="card-text">{{ description }}</p>
                                <!-- Tags -->
                                <div class="container">
                                    <div class="row mb-3">
                                        <div class="col col-auto" v-for="(tag, index) in tags" :key="index">
                                            <!-- <div class="card"> -->
                                            <span class="badge rounded-pill bg-secondary">{{ tag.name }}</span>
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
           
            <!-- Contenedor Para Reservacion -->
            <div class="container mt-1 mb-5">
                <div class="row ">
                    <div class="col mb-1 mt-1">
                        
                        <!-- Encabezado -->
                        <div class="card  mt-5">
                            <div class="card-header bg-primary text-white">
                                <i class="fa-solid fa-message fa-bounce"></i>
                                Elija la fecha de Inicio y Fecha Final
                            </div>
                            <!-- Contenido de reseñas -->
                            <div class="card-body">
                                <div class="card-body">
                                    <h5>Escriba la fecha de inicio:</h5>
                                    <div class="input-group mb-3">
                                        <input type="date" id="check_in" v-model="check_in">
                                    </div>
                                </div>

                                <div class="card-body">
                                    <h5>Escriba la fecha final:</h5>
                                    <div class="input-group mb-3">
                                        <input type="date" id="check_out" v-model="check_out">
                                        
                                    </div>
                                </div>
                                <div class="card-body">    
                                    <div class="input-group mb-3">
                                        <button class="btn btn-success" type="button" v-on:click="postReservation"
                                            id="button-addon3">Aceptar</button>
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
import { mostrarAlerta, registrarReservation,registrarActualizacionDeReservation} from '../funciones.js';
import { useRoute } from 'vue-router';
import axios from 'axios';
export default {
    data() {
        return {
            // variables para edicion de reviews
            updatedRevewId: '',
            isEditing: false,
            updateTextForReview: '',
            // data imagen
            id: 0,
            name: '',
            description: '',
            image: '',
            price: '',
            tags: '',
            reviews: '',
            // data de servidor
            url: 'http://127.0.0.1:8000/api/office',
            urlTag: 'http://127.0.0.1:8000/api/office/tags',
            urlReviews: 'http://127.0.0.1:8000/api/office/reviews',
            //urlUpdate: 'http://127.0.0.1:8000/api/office/update',
            urlReviewsPost: 'http://127.0.0.1:8000/api/reviews',
            urlReservationPost:'http://127.0.0.1:8000/api/reservations',
            urlUpdatedReviews: 'http://127.0.0.1:8000/api/reviews',

            //data de envio de review
            userId: '',
            check_in: null,
            check_out: null,
            cargando: false,
            userhost_id: 0
        };
    },
    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.url += '/' + this.id;
        this.urlTag += '/' + this.id;
        this.urlReviews += '/' + this.id;
       // this.update += '/' + this.id;
        this.getOffice();
        this.userId = JSON.parse(localStorage.getItem('usuario'));
    },
    methods: {

       // Interfaz: pide los datos al api del office en especifico
        getOffice() {
            axios.get(this.url).then(
                res => {
                    this.name = res.data.name;
                    this.apellido = res.data.apellido;
                    this.description = res.data.description;
                    this.image = res.data.image;
                    this.price = res.data.price;
                    this.cargando = false;
                    this.userhost_id=res.data.user_id;
                }
            );
        },
        // Pide los tags del office
        getTags() {
            axios.get(this.urlTag).then(
                res => {
                    this.tags = res.data;
                }
            );
        },
        // Pide las reviews
        getReviews() {



            axios.get(this.urlReviews).then(
                res => {
                    this.reviews = res.data;
                }
            );
        },

        //Interfaz: envia al api las reservation
        postReservation() {
            event.preventDefault();
           // if (this.fechaInicio.trim() === '') {
            //    mostrarAlerta('Debe escribir una reseña', 'warning', 'review');
           // } else {
                // user = JSON.parse(localStorage.getItem('usuario'));
                const user = JSON.parse(localStorage.getItem('usuario'));
                this.userId = user.id;
                var datosReservation = {
  
                    office_id: this.id,
                    user_id: this.userId,
                    check_in: this.check_in,
                    check_out: this.check_out
                }

                // const url = `${this.urlReservationPost}/${this.id}`;
                var datosUpdateOffice = {
  
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    user_id: this.userhost_id,
                    office_state_id: 2,
                    image: this.image
                }


                registrarReservation(datosReservation, this.urlReservationPost, "Oficina Reservada");
                registrarActualizacionDeReservation(datosUpdateOffice, this.url, "");

            //}
        },
        formatDate(dateString) {
            let date = new Date(dateString);
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2); // los meses empiezan desde 0 en JavaScript
            let day = ('0' + date.getDate()).slice(-2);
            return `${day}-${month}-${year}`;
        },
        getCurrentUser() {
            const user = JSON.parse(localStorage.getItem('usuario'));
            if (user != null) {
                return user.id
            }
            return null
        }
       



    }
}
</script>
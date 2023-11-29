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
                                <router-link class="btn btn-primary " :to="{path: '/reservation/' + this.id}">Reservar</router-link>
                                <!-- TODO: cheking y checkout -->
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- Contenedor Para Reseñas -->
            <div class="container mt-1 mb-5">
                <div class="row ">
                    <div class="col mb-1 mt-1">
                        <!-- Encabezado -->
                        <div class="card  mt-5">
                            <div class="card-header ">
                                RESEÑAS
                            </div>
                            <!-- Contenido de reseñas -->
                            <div class="card-body" style="max-height: 400px; overflow-y: auto;">
                                <div class="container">
                                    <div class="card mb-3" v-for="(reviews, index) in reviews" :key="index">
                                        <!-- CAJON DE RESENAS -->
                                        <div class="card-header">
                                            <!-- Espacio del titulo de la reseña -->
                                            <div class="d-flex justify-content-between">
                                                <h5 class="card-title">
                                                    <i class="fa-solid fa-message fa-beat"></i>
                                                    Anonimo
                                                </h5>
                                                <h5 class="card-title">
                                                    <i class="fa-solid fa-calendar-days"></i>
                                                    {{ formatDate(reviews.created_at) }}
                                                </h5>
                                                <!-- Botones para editar y borrar -->
                                                <h5 class="card-title" v-if="reviews.user_id === getCurrentUser()">
                                                    <i class="fa-solid"
                                                        :class="{ 'fa-pen-to-square': !reviews.isEditing, 'fa-save': reviews.isEditing }"
                                                        @click="editReview(reviews)" style="cursor: pointer;"></i>
                                                    <i class="fa-solid fa-trash mx-3" @click="deleteReview(reviews)"
                                                        style="cursor: pointer;"></i>
                                                </h5>
                                            </div>
                                        </div>
                                        <!-- CONRENIDO DE LA RESEÑA -->
                                        <div class="card-body">
                                            <p class="card-text" v-if="!reviews.isEditing">{{ reviews.review }}</p>
                                            <div class="input-group mb-3" v-else>
                                                <textarea class="form-control" v-model="reviews.review" rows="1"></textarea>
                                                <button class="btn btn-success" type="button"
                                                    @click="saveUpdatedReview(reviews)">Actualizar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Encabezado -->
                        <div class="card  mt-5">
                            <div class="card-header bg-primary text-white">
                                <i class="fa-solid fa-message fa-bounce"></i>
                                Deje su reseña
                            </div>
                            <!-- Contenido de reseñas -->
                            <div class="card-body">
                                <div class="card-body">
                                    <h5>Escriba su reseña:</h5>
                                    <div class="input-group mb-3">
                                        <textarea class="form-control" v-model="review" id="review" rows="1"></textarea>
                                        <button class="btn btn-success" type="button" v-on:click="postReview"
                                            id="button-addon3">Enviar</button>
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
import { mostrarAlerta, registrarReview , registrarActualizacionDeReview, confirmarEliminacionDeReview} from '../funciones.js';
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
            urlReviewsPost: 'http://127.0.0.1:8000/api/reviews',
            urlUpdatedReviews: 'http://127.0.0.1:8000/api/reviews',

            //data de envio de review
            userId: '',
            review: '',

            cargando: false
        };
    },
    mounted() {
        const route = useRoute();
        this.id = route.params.id;
        this.url += '/' + this.id;
        this.urlTag += '/' + this.id;
        this.urlReviews += '/' + this.id;
        this.getOffice();
        this.getTags();
        this.getReviews();
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

        //Interfaz: envia al api las reviews
        postReview() {
            event.preventDefault();
            if (this.review.trim() === '') {
                mostrarAlerta('Debe escribir una reseña', 'warning', 'review');
            } else {
                // user = JSON.parse(localStorage.getItem('usuario'));
                const user = JSON.parse(localStorage.getItem('usuario'));
                this.userId = user.id;
                var datos = {
                    review: this.review,
                    office_id: this.id,
                    user_id: this.userId
                }
                registrarReview(datos, this.urlReviewsPost, "Reseña Agregada");

            }
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
        },
        // Método para habilitar la edición de una reseña
        editReview(review) {
            // Establece 'isEditing' en true para la reseña específica
            review.isEditing = !review.isEditing;

        },
        saveUpdatedReview(review) {
            // enviar id junto a la url
            const url = `${this.urlUpdatedReviews}/${review.id}`;
            const updatedReview = {
                review: review.review
            };
            // console.log(url);
            // console.log(updatedReview);

            registrarActualizacionDeReview(updatedReview,url,'Reseña Actualizada');

           
        },
        deleteReview(review){

            const url = `${this.urlUpdatedReviews}/${review.id}`;
            confirmarEliminacionDeReview(url,'Eliminacion De Review','¿Esta seguro de la accion?');
        }



    }
}
</script>
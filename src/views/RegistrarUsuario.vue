<template>
    <div class="row mt-4">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    <h2>Registrar Usuario</h2>
                </div>
                <div class="card-body">
                    <!-- Formulario -->
                    <form v-on:submit="registrar">
                        <!-- foto decorativa -->
                        <div class="d-grid col-6 mx-auto mb-3">
                            <img src="https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-256.png"
                                height="180" id="fotoimg" class="img-thumbnail">
                        </div>
                        <!-- NOMBRES -->
                        <div class="row g-3">
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                                    <input v-model="first_name" type="text" class="form-control" placeholder="first name" id="first_name" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                                    <input v-model="last_name" type="text" class="form-control" placeholder="last name" id="last_name" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                            </div>
                        </div>

                        <!-- USERNAME -->
                        <div class="input-group mb-1">
                            <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                            <input v-model="user_name" type="text" class="form-control" placeholder="Username" id="user_name" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <!-- EMAIL -->
                        <div class="input-group mb-1">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input v-model="email" type="text" class="form-control" placeholder="Email" aria-label="Username" id="email" aria-describedby="basic-addon1">
                        </div>
                        <!-- PASSWORD -->
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"> <i class="fa-solid fa-lock"></i></span>
                            <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" id="password">
                        </div>
                        <!-- boton succes -->
                        <div class="d-grid col-6 mx-auto mb-3">
                            <button class="btn btn-success"> <i class="fa-solid fa-floppy-disk"></i> Registrar</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mostrarAlerta, registrarUsuario } from '../funciones.js';

export default {
    data() {
        return {
            //variables del modelo
            first_name: '',
            last_name: '',
            user_name: '',
            email: '',
            password: '',
            url: 'http://127.0.0.1:8000/api/usuarios',
        };
    },
    mounted() {
        //al cargar el login elimina el localStorage y recarga la pagina
        const user = JSON.parse(localStorage.getItem('usuario'));
        if (user != null) {
            localStorage.clear();
            window.location.reload();
        }
    },
    methods: {//metodos
        registrar() {
            event.preventDefault();

            if(this.first_name.trim() === '') {
                mostrarAlerta('Ingrese un nombre', 'warning', 'first_name');
            }else if(this.last_name.trim() === '') {
                mostrarAlerta('Ingrese un apellido', 'warning', 'last_name');
            }else if(this.user_name.trim() === '') {
                mostrarAlerta('Ingrese un nombre de usuario', 'warning', 'user_name');
            } else if (this.email.trim() === '') {
                mostrarAlerta('Ingrese un correo', 'warning', 'email');
            } else if (this.password.trim() === '') {
                mostrarAlerta('Ingrese una contraseña', 'warning', 'password');
            } else if (validateEmail(this.email)) {
                //si el correo es correcto en formato ..@..
                var parametros = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    username: this.user_name,
                    email: this.email,
                    password: this.password
                }
                console.log(parametros);
                registrarUsuario(parametros, this.url, 'Registrado con Exitoso');



            }
        },
    },

};
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
</script>
  
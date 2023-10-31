<template>
    <div class="row mt-4">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-primary text-white text-center">
                    <h2>Welcome</h2>
                </div>
                <div class="card-body">
                    <form v-on:submit="registrar">
                        <!-- foto -->
                        <div class="d-grid col-6 mx-auto mb-3">
                            <img src="https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/user-256.png"
                                height="180" id="fotoimg" class="img-thumbnail">
                        </div>
                        <!-- EMAIL -->
                        <div class="input-group mb-1">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input v-model="email" type="text" class="form-control" placeholder="Username"
                                aria-label="Username" id="email" aria-describedby="basic-addon1">
                        </div>
                        <!-- PASSWORD -->
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"> <i class="fa-solid fa-lock"></i></span>
                            <input v-model="password" type="password" class="form-control" placeholder="password"
                                aria-label="Username" aria-describedby="basic-addon1" id="password">
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
import { mostrarAlerta, validarLogin } from '../funciones.js';

export default {
    data() {
        return {
            email: '',
            password: '',
            url: 'http://127.0.0.1:8000/api/login',
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

            if (this.email.trim() === '') {
                mostrarAlerta('Ingrese un correo', 'warning', 'email');
            } else if (this.password.trim() === '') {
                mostrarAlerta('Ingrese una contraseña', 'warning', 'password');
            } else if (validateEmail(this.email)) {
                //si el correo es correcto en formato ..@..
                var parametros = {
                    email: this.email,
                    password: this.password
                }
                validarLogin(parametros, this.url, 'Login Exitoso');



            }
        },
    },

};
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
</script>
  
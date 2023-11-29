import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo, icono, foco = '') {
    if (foco != '') {
        document.getElementById(foco).focus();

    }
    Swal.fire({
        title: titulo,
        icon: icono,
        customClass: {
            confirmButton: 'btn btn-primary',
            popup: 'animated zoonIn',
            buttonsStyle: false
        }
    })
}

//codigo de solicitud universal (metodos: post,put,delete , parametros: body, el url , mensaje es para la alerta)
export function enviarSolicitud(metodo, parametros, url, mensaje) {
    axios({
        method: metodo,
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var estado = resp.status;
            if (estado == 200 || estado == 201) {
                mostrarAlerta(mensaje, 'success');
                window.setTimeout(function () {
                    window.location.href = '/';
                }, 1000);
            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });

}
export function registrarUsuario(parametros, url, mensaje) {
    axios({
        method: 'post',
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var estado = resp.status;
            var respuesta = resp.data;

            console.log(respuesta);

            if (estado == 200 || estado == 201) {
                mostrarAlerta(mensaje, 'success');


                //probar guardar respuesta en localStorage
                localStorage.setItem('usuario', JSON.stringify(respuesta));

                /**
                //recuperacion de los datos
                var user = JSON.parse(localStorage.getItem('usuario'));
                console.log(user.first_name);
                 */



                window.setTimeout(function () {
                    window.location.href = '/home';
                }, 1000);
            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });

}
export function validarLogin(parametros, url, mensaje) {
    axios({
        method: 'post',
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var ADMIN = 1; //valor indicativo para el tipo de usuario
            var respuesta = resp.data;


            if (respuesta.message != 'Usuario no encontrado') {
                mostrarAlerta(mensaje, 'success');

                console.log(respuesta);

                //probar guardar respuesta en localStorage
                localStorage.setItem('usuario', JSON.stringify(respuesta));


                //recuperacion de los datos
                // var user = JSON.parse(localStorage.getItem('usuario'));
                if (respuesta.user_type_id == ADMIN) {
                    //TODO: panel admin
                } else {
                    window.setTimeout(function () {
                        window.location.href = '/home';
                    }, 1000);
                }

            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });
}
export function registrarReview(parametros, url, mensaje) {
    axios({
        method: 'post',
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var estado = resp.status;
            var respuesta = resp.data;

            console.log(respuesta);

            if (estado == 200 || estado == 201) {
                mostrarAlerta(mensaje, 'success');
                

                window.setTimeout(function () {
                    location.reload();
                }, 1000);
            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });
}
export function registrarActualizacionDeReview(parametros, url, mensaje) {
    axios({
        method: 'put',
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var estado = resp.status;
            var respuesta = resp.data;

            console.log(respuesta);

            if (estado == 200 || estado == 201) {
                mostrarAlerta(mensaje, 'success');
                

                window.setTimeout(function () {
                    location.reload();
                }, 1000);
            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });
}
export function confirmarEliminacionDeReview(urlConSlash, titulo, mensaje) {
    var url = urlConSlash;
    const swalWithBootstrap = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success m-3',
            cancelButton: 'btn btn-danger m-3',
        },
        buttonsStyling: false
    })


    swalWithBootstrap.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa fa-check"></i> si, eliminar',
        cancelButtonText: '<i class="fa fa-times"></i> cancelar',
        reverseButtons: true
    }).then((res) => {
        if (res.isConfirmed) {
            // Realiza la solicitud DELETE
            axios.delete(url)
                .then(function (resp) {
                    var estado = resp.status;
                    if (estado == 200) {
                        mostrarAlerta('Eliminado con éxito', 'success');
                        window.setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        mostrarAlerta('No se pudo finalizar la operación', 'error');
                    }
                })
                .catch(function (error) {
                    mostrarAlerta('Servidor no disponible', 'error');
                });
        } else {
            mostrarAlerta('Eliminación cancelada', 'info');
        }
    });



}

export function registrarReservation(parametros, url, mensaje) {
    axios({
        method: 'post',
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var estado = resp.status;
            var respuesta = resp.data;

            console.log(respuesta);

            if (estado == 200 || estado == 201) {
                mostrarAlerta(mensaje, 'success');
                window.setTimeout(function () {
                    window.location.href = '/home';
                }, 1000);
          
            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });
}
export function registrarActualizacionDeReservation(parametros, url, mensaje) {
    axios({
        method: 'put',
        url: url,
        data: parametros
    })
        .then(function (resp) {
            var estado = resp.status;
            var respuesta = resp.data;

            console.log(respuesta);

            if (estado == 200 || estado == 201) {
                mostrarAlerta(mensaje, 'success');
                

                window.setTimeout(function () {
                    location.reload();
                }, 1000);
            } else {
                mostrarAlerta('No se pudo finalizar la operación', 'error');

            }
        }).catch(function (error) {
            mostrarAlerta('Servidor no disponible', 'error');
        });
}



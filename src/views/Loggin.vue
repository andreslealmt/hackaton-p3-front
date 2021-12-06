<template>
<div class="body">
    <div class="container container-tarjeta">
        <div class="row">
            <div class="col-sm-6">
                <div class="card card-login mt-5" style="width: 18rem;">
                    <div class="card-body">

                         <h5 class="card-title">Ingreso</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Sistema</h6>
                        <!-- <p class="card-text">
                            para poder realizar pruebas como crear categorias debe ingresar
                            cons el siguiente usuario con privilegios de administrador.
                            <span class="verde">usuario:</span> <span class="azul-claro">admin@gmail.com</span><br>
                            <span class="verde">contraseña:</span> <span class="azul-claro">1234</span>
                        </p> -->

                        <div class="input-group mb-3">                      
                            <input v-model="usuario.email" type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">                      
                            <input v-model="usuario.password" type="password" class="form-control" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1">
                        </div>

                        <br>

                       <div class="input-group mb-3 ancla">                      
                            <a href="#" @click="loggin()" class="card-link">Iniciar Sesión </a>
                       </div>
                       <div class="input-group mb-3 ancla">  
                           <p>si no tienes usuario, registrate</p>                    
                            <router-link to="/registro"  class="card-link">Registro </router-link>
                       </div>
                       
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    name:'Loggin',
    setup() {

        const store = useStore();

        const usuario = {
            email:'',
            password:''
        };

        const loggin = () => {
            store.dispatch('login',usuario);
        }
        


        return {
            usuario, loggin
        }
    },
}
</script>

<style>

.container-tarjeta, .ancla {
    display: flex;
    justify-content: center;
    color: white;
}

.card-login {
    background-color: rgb(44, 53, 61);
    margin-bottom: 10vh;
}
.verde {
    color: rgb(39, 167, 39);
}

.azul-claro {
    color: rgb(138, 138, 214);
}



</style>
<template>
    
<div class="body">
    <div class="container container-registro">
        <div class="row">
            <div class="col-sm-6">
                <div class="card card-registro mt-5" style="width: 18rem;">
                    <div class="card-body">

                         <h5 class="card-title">Formulario De Registro</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Sistema</h6>
                        <p class="card-text">
                            Debe registrarse en el sistema para poder realizar los test.
                        </p>

                        <div class="input-group mb-3">                      
                            <input v-model="usuario.name" type="text" class="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="basic-addon1">                            
                        </div>
                        <p class="rojo">{{ usuarioValidar.name }}</p>

                        <div class="input-group mb-3">                      
                            <input v-model="usuario.age" type="number" class="form-control" placeholder="Edad" aria-label="Username" aria-describedby="basic-addon1">                            
                        </div>
                        <p class="rojo">{{ usuarioValidar.age }}</p>

                        <div class="input-group mb-3">                      
                            <input v-model="usuario.email" type="email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">                            
                        </div>
                        <p class="rojo">{{ usuarioValidar.email }}</p>

                        <div class="input-group mb-3">                      
                            <input v-model="usuario.password" type="password" class="form-control" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1">                       
                        </div>
                        <p class="rojo">{{ usuarioValidar.password }}</p>

                        <br>

                       <div class="input-group mb-3 ancla">                      
                            <a href="#" @click="registrarUsuario()"  class="card-link">Registrar</a>
                       </div>
                       
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import router from '../router';
export default {
    name:'Registro',
    setup() {

        const store = useStore();

        const url = store.state.url;

         const usuarioValidar = ref({ name:'', age:'', email:'', password:'' });

        const usuario = ref({ name:'',  age:'', email:'', password:'' });

        const registrarUsuario = async () => {
            let validacion = validarDatos();
            console.log(validacion)
            if(!validacion){
                return 
            }

            try {
                const res = await fetch(`${url}`+'/api/Client/save',{
                    method:'POST',
                    mode: 'cors',
                    headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(usuario.value)
                });
                const datos = await res.json();
                router.push('/loggin')
            } catch (error) {
                console.log(error)
            }
            console.log(usuario.value)            
        }


        const validarDatos = () => {
            let boleano = true;
            if(usuario.value.name == ''){ 
                usuarioValidar.value.name = 'debe ingresar nombre';
                boleano = false;
            }else{usuarioValidar.value.name = '';}
            if(usuario.value.age == ''){
                usuarioValidar.value.age = 'debe ingresar edad';
                boleano = false;
            }else{usuarioValidar.value.age = '';}
            if(usuario.value.email == ''){
                usuarioValidar.value.email = 'debe ingresar correo';
                boleano = false;
            }else{usuarioValidar.value.email = '';}
            if(usuario.value.password == ''){
                 usuarioValidar.value.password = 'debe ingresar contraseña';
                 boleano = false;
            }else{usuarioValidar.value.password = '';}
            return boleano;

        }


        
        return {
            usuario, registrarUsuario, usuarioValidar
        }
    },
}
</script>

<style>
.container-registro, .ancla {
    display: flex;
    justify-content: center;
    color: white;
}

.card-registro {
    background-color: rgb(44, 53, 61);
    margin-bottom: 10vh;
}



.rojo {
    color: red;
}
</style>
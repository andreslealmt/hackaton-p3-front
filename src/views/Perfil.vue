<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-12">
                <div class="imagen">
                    <img class="imagen-perfil" src="https://i.pinimg.com/236x/62/b0/ec/62b0ec7da4e393b681db9a38dd27f80f.jpg" alt="">
                </div>
                <hr class="dropdown-divider">
                <div class="imagen">
                        <div class="card tarjeta-perfil" >                            
                            <div class="card-body">
                                <h5 class="card-title">Información Cuenta</h5>
                                <p class="card-text"><span class="black" style="font-weight:bold;">Nombre: </span>{{usuario.name}} </p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><span class="black" style="font-weight:bold;">Correo: </span>{{usuario.email}} </li>
                                <li class="list-group-item"><span class="black" style="font-weight:bold;">Edad: </span>{{usuario.age}} </li>
                                
                            </ul>
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Actualizar</button>                               

                            </div>
                        </div>

                </div>
                
            </div>
        </div>
    </div>

    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Actualizar Perfil</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="input-group flex-nowrap mt-3">                        
            <span class="input-group-text" id="addon-wrapping">Nombre</span>
            <input v-model="usuario.name" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
        </div>
        <div class="input-group mb-3 mt-3">
            <span class="input-group-text" id="addon-wrapping">Edad</span>
            <input v-model="usuario.age" type="text" class="form-control" placeholder="edad" aria-label="Recipient's username" aria-describedby="basic-addon2">
            
        </div>  

        

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="actualizarUsuario()">Actualizar</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core';
export default {
    name:'Perfil',
    setup() {
        
        const store = useStore();
        const url = store.state.url;        
        const usuario = computed(() => store.state.usuario.usuario);
        const password = ref();
        

        
        const actualizarUsuario = async () => {
           
            //console.log(usuario.value.password)
            try {
                const res = await fetch(`${url}`+'/api/Client/update',{
                    method:'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                     // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(usuario.value)
                });
                const datos = await res.json();
                console.log(datos)
                store.dispatch('actualizarUsuario',datos);

            } catch (error) {
                console.error(error)
            }
        }        

        return {
            usuario, password, actualizarUsuario
        }
        
    },
}
</script>

<style>
.imagen{
    display: flex;
    justify-content: center;    
}

.imagen-perfil {
    border-radius: 50%;
}

.tarjeta-perfil {
    width: 60vw;
}

.black{
    color: black;
}







</style>
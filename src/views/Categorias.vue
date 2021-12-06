<template>
   <div class="container mt-5">
       <div class="row">
           <div class="col-sm-4">
               <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nombre</span>
                    <input v-model="categoria.name" type="text" class="form-control" placeholder="nombre categoria" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                   
                <button @click="guardarCategoria()" type="button" class="btn btn-outline-success" >                               
                    Agregar
                </button> 
           </div>
           <div class="col-sm-12">
                <table class="table mt-5">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        
                        <th scope="col">Eliminar</th>
                        <th scope="col">Actualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="categoria in categorias" :key="categoria.id">
                        <th scope="row">{{categoria.name}}</th>                        
                        <td>
                            <button @click="eliminarCategoria(categoria.id)"  type="button" class="btn btn-outline-danger">                               
                                            eliminar
                            </button> 
                        </td>
                        <td>
                            <button  type="button" class="btn btn-outline-info" >                               
                                            Editar
                            </button> 
                        </td>
                        </tr>
                        
                    </tbody>
                    </table>
           </div>
       </div>
   </div>
</template>
<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';



export default {
    name:'Categorias',
    setup() {

        const store = useStore();
        const url = store.state.url;
        const categorias = ref([]);
        const categoria = ref({name:''});

        const cargarCategorias = async () => {
            try {
                const res = await fetch(`${url}`+'/api/categoria/all');
                categorias.value = await res.json();
            } catch (error) {
                console.log(error)
            }
        }

        const guardarCategoria = async () => {

            try {
                const res = await fetch(`${url}`+'/api/categoria/save',{
                    method:'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                     // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(categoria.value)
                });
                const datos = await res.json();
                limpiarCategoria();
                cargarCategorias();

            } catch (error) {
                console.log(error)
            }            
        }

        const eliminarCategoria = async (id) => {
            console.log(id)
            try {
                const res = await fetch(`${url}`+'/api/categoria/'+id,{
                    method:'DELETE'
                });
                const datos = await res.text();
                cargarCategorias();
            } catch (error) {
                console.log(error)
                alert('no se puede elimiar, restrigsion de clave foranea en tabla Disfraz');
            }
        }

        const limpiarCategoria = () => {
            categoria.value = {};
        }


        onMounted(() => {
            cargarCategorias();
        });
        

        return {
            cargarCategorias, categorias, categoria, limpiarCategoria, guardarCategoria,
            eliminarCategoria
        }
        
    },
}
</script>
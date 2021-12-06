<template>
    <div class="container container-preguntas">
        <div class="row">
            <div class="col-sm-12">
                                <!-- Button trigger modal -->

                               
                            
                <div class="centrar-boton">
                    <button class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#agregarTestModal">
                        Agregar Test
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>    

                <!-- cargar tests table -->
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Dificultad</th>                        
                        <th scope="col">Preguntas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="test, key in categorias" :key="key">
                            <th scope="row">{{test.name}}</th>
                            <td >{{test.categoria}}</td>
                            <td >{{test.dificultad}}</td>                         
                            <td v-if="test.preguntas.length == 0">
                                    <!-- Boton ir a preguntas -->
                                <router-link :to="'/preguntas/'+test.testId">
                                    <button type="button" class="btn btn-outline-success">                                    
                                        <i class="bi bi-arrow-right-square-fill"></i>
                                    </button>
                                </router-link>      
                            </td>
                            <td v-else></td>
                        </tr> 
                                           
                    </tbody>
                    </table>
              
            </div>
        </div>
    </div>




            <!-- Modal -->
            <div class="modal fade" id="agregarTestModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Test</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <!-- input Nombre -->
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Nombre:</label>
                        <input v-model="name" type="text" class="form-control" id="recipient-name">
                    </div>

                    <!-- select option categoria -->
                    <label for="" class="col-form-label">Selecciona una categoria</label>
                    <select v-model="categoria" class="form-select" aria-label="Default select example">                        
                        <option v-for="item,key in categoriasLoaded" :key="key" :value="item.name">{{item.name}}</option>                        
                    </select>
                    
                    <!-- input rage dificultad -->
                    <div class="mb-3 mt-5">
                        <label for="" class="col-form-label">Dificultad</label>                        
                        <input v-model="valorDificultad" type="range" list="tickmarks" class="form-range" min="1" max="5">
                        <label for="" class="col-form-label">{{valorDificultad}}</label>
                        <datalist id="tickmarks">
                            <option v-for="valor,key in dificultad" :key="key" value="valor" label="valor" ></option>                    
                        </datalist>
                    </div>

                    <button @click="guardar()" class="btn btn-success form-control">Guardar</button>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
                </div>
            </div>
            </div>

            <div class="footer">
                <br><br><br><br>
            </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import getCategorias from './../composables/getCategorias';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const dificultad = ref([1,2,3,4,5]);
        const valorDificultad = ref(3);   
        const categorias = ref();  
        const categoria = ref();
        const name = ref();
        const url = store.state.url; 

        const {loadCategorias, categoriasLoaded} = getCategorias();
        loadCategorias();

        const cargar = async () => {

            try {
                
                const res = await fetch(`${url}/api/test/all`);
                categorias.value = await res.json();
                //console.log(categorias.value)
            } catch (error) {
                console.log(error)
            }
        }
        cargar();


        const guardar = async () => {
            const test = {
                name:name.value,
                categoria:categoria.value,
                dificultad:valorDificultad.value
            }
            
            try {
                
                const res = await fetch(`${url}/api/test/new`,{
                    method:'POST',
                    body:JSON.stringify(test),
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const datos = await res.json();
                cargar();
            } catch (error) {
                console.error(error)
            }

        }


        
        

        return {
            dificultad, valorDificultad, categorias, categoriasLoaded,
            guardar, categoria, name
        }
    },
}
</script>

<style>

.centrar-boton{
    display: flex;
    justify-content: center;
    margin-top: 10vh;
}

.footer{
    height: 50hv;
    margin-bottom: 100hv;
}
.table-striped{
    margin-top: 10vh;
}

.yellow{
    color: yellowgreen;
}


</style>
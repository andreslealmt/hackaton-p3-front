<template>
    <div class="container container-preguntas">
        <div class="row">
            <div class="col-sm-12">
                

                <!-- boton modal agregar preguntas -->
                <div class="centrar-boton">
                    <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#agregarPrguntaModal">
                        agregar preguntas
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>

                    
                <!-- acordeon -->
                <div v-for="item,key in preguntas" :key="key" class="accordion mt-3">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#abc'+key" aria-expanded="true" aria-controls="collapseOne">
                            {{item.texto}}
                        </button>
                        </h2>
                        <div :id="'abc'+key" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        
                        <div class="accordion-body">
                            <button @click="mostrarModal(item.preguntaId)" type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#agregarRespuestaModal">
                                Agregar Respuesta
                                <i class="bi bi-plus-circle"></i>
                            </button>
                        </div>
                            <ul class="list-group">                                
                              
                                <li v-for="res,key in item.respuestas" :key="key" class="list-group-item">{{res.texto}}</li>
                                
                            </ul>                            
                       
                        </div>
                    </div>                      
                </div>
                


            </div>
        </div>
    </div>

     <!-- Modal Agregar Pregunta -->
            <div class="modal fade" id="agregarPrguntaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Pregunta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <!-- input Nombre -->
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Pregunta:</label>
                        <input v-model="pregunta.texto" type="text" class="form-control" id="recipient-name">
                    </div>

                    <!-- select option categoria -->
                    <label for="" class="col-form-label">Selecciona una categoria</label>
                    <select v-model="pregunta.tipo" class="form-select" aria-label="Default select example">                        
                        <option value="unica">Unica</option>                        
                        <!-- <option value="multiple">Multiple</option> -->
                    </select>                    
                   

                    <button @click="guardarPregunta()" class="btn btn-success form-control mt-4">Guardar</button>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
                </div>
            </div>
            </div>


            <!-- Modal Agregar Rrespuesta-->
            <div class="modal fade" id="agregarRespuestaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar Respuesta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    
                    <!-- input Respuesta -->
                    <div class="mb-3">
                        <label for="recipient-name" class="col-form-label">Respuesta:</label>
                        <input v-model="respuesta.texto" type="text" class="form-control" id="recipient-name">
                    </div>

                    <!-- Check respuesta correcta -->
                    <div class="form-check">
                        <input @change="check()" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Seleccione solo si es la respuesta correcta.
                        </label>
                    </div>
                        
                   

                    <button @click="guardarRespuesta()" class="btn btn-success form-control mt-4">Guardar</button>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
                </div>
            </div>
            </div>
    
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {

        swal("Empecemos!", "Una vez que inicies debes asignar todas las preguntas, ya que despues no sera posible, debido a que el test debe ser el mismo para todos los usuarios, por lo tanto no se podra editar!", "info");
        const route = useRoute();
        const store = useStore();
        const preguntas = ref([]);
        const pregunta = ref({});
        const respuesta = ref({correcta:false});
        const url = store.state.url;

        //asignar el id del test
        pregunta.value.test = {testId:route.params.id}

        // cambia la de false a true y viseversa
        const check= async()=>{
            respuesta.value.correcta = !respuesta.value.correcta;
            //console.log(respuesta.value.correcta)
        }

        //almacenar el id de la pregunta
        const mostrarModal = async (id) => {
            respuesta.value.pregunta = {preguntaId:id}
            //console.log(id)
        }

        // guarda la respuesta
        const guardarRespuesta = async () => {
            //console.log(respuesta.value)

            try {
                
                const res = await fetch(`${url}/api/respuesta/save`,{
                    method:'POST',
                    body:JSON.stringify(respuesta.value),
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const datos = await res.json();
                //console.log(datos)
                cargar();
                //respuesta.value.correcta = false;
                respuesta.value.texto = '';

            } catch (error) {
                console.error(error)
            }
        }
        
        
        const cargar = async () => {
            //console.log(route.params.id)
            try {

                const res = await fetch(`${url}/api/test/${route.params.id}`);
                const datos = await res.json();
                //console.log(datos.preguntas)
                preguntas.value = datos.preguntas;
                //console.log(preguntas.value)
                
            } catch (error) {
                console.error(error)
            }
        }
        cargar();
        const guardarPregunta = async () => {
            
            try{

                const res = await fetch(`${url}/api/pregunta/save`,{
                    method:'POST',
                    body:JSON.stringify(pregunta.value),
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const datos = await res.json();
                //console.log(datos)
                cargar();
                pregunta.value.texto = '';
                pregunta.value.tipo = '';
                

            }catch(error){
                console.error(error)
            }


        }

        //console.log(route.params)

        return {
            pregunta, guardarPregunta, preguntas, respuesta,
            guardarRespuesta,check, mostrarModal
        }
    },
}
</script>

<style>
.accordion-body {
    display: flex;
    justify-content: center;
}

.centrar-boton{
    display: flex;
    justify-content: center;
}

.container-preguntas {
    margin-top: 10vh;
    height: 100vh;
    /* background-image: linear-gradient(to bottom right, rgb(35, 92, 167), rgb(47, 30, 146)); */
}

body {
    background-image: linear-gradient(to bottom right, rgba(45, 117, 165, 0.972), rgb(101, 42, 156));
    background-size: 100%;
    height: 100%;
}
</style>
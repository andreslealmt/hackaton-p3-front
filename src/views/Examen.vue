<template>
    <div class="container container-examen">
        <div class="row">
            <div class="col-sm-12 mt-5">              
                        <h1 id="titu"></h1>

                <ol class="list-group list-group-numbered">
                    <li v-for="pregunta,key in preguntasArreglo" :key="key" class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                        <div class="fw-bold">{{pregunta.texto}}</div>
                        
                        <!-- radio buttons -->
                        <div v-for="respuesta,key in pregunta.respuestas" :key="key">
                            <div  class="form-check mt-1">
                                <input @change="asignar(pregunta.preguntaId, respuesta.respuestaId)" class="form-check-input" type="radio" :name="'radio'+pregunta.preguntaId" :id="'flexRadioDefault1'+respuesta.respuestaId">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    {{respuesta.texto}}
                                </label>
                            </div>
                        </div>
                           

                        </div>
                        <!-- <span class="badge bg-primary rounded-pill">14</span> -->
                    </li>                  
                </ol>
                
                <!-- button realizar -->
                <div class="centrar-examen">
                    <button @click="evaluar()" class="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Realizado</button>
                </div>


            </div>
        </div>
    </div>

        <!-- modal -->
   




            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-examen">
                   <span class="titulo-puntaje"> Tu puntaje es de: </span>
                   <span class="puntaje"> {{puntaje}} / {{maxPuntaje}}</span>
                </div>
                <div class="modal-footer modal-examen">
                    <button @click="redirect()" type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>                    
                </div>
                </div>
            </div>
            </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        // console.log(route.params)
        const preguntasArreglo = ref([]);
        const maxPuntaje = ref();
        const router = useRouter();
        const url = store.state.url;

        const puntaje = ref();
        
        const redirect = () => {
            router.push('/detalleTest/'+route.params.id)
        }
        

        const asignar = (preguntaId, respuestaId) => {

            
                   
            let longitud = preguntasArreglo.value.length;

            for(let i=0; i<longitud; i++){

                if(preguntasArreglo.value[i].preguntaId == preguntaId){
                    
                    for(let j=0; j< preguntasArreglo.value[i].respuestas.length; j++){
                        preguntasArreglo.value[i].respuestas[j].correcta = false;           
                    }

                    for(let j=0; j< preguntasArreglo.value[i].respuestas.length; j++){
                        
                        if(preguntasArreglo.value[i].respuestas[j].respuestaId == respuestaId){
                            preguntasArreglo.value[i].respuestas[j].correcta =true;
                        }                 
                    }                    
                }           
            }           

        }
        
        const evaluar = async () => {   

            let longitud = preguntasArreglo.value.length;
            let preguntasArregloOriginal = [];
            try {
                
                const res = await fetch(`${url}/api/test/${route.params.id}`);
                const datos = await res.json();                   
                preguntasArregloOriginal = datos.preguntas;                         

            } catch (error) {
                console.log(error)
            }

            //console.log(preguntasArregloOriginal)
            //console.log(preguntasArreglo.value)
            
            let contador = 0;
            
            
            for(let i=0; i<longitud; i++){
            
                for(let j=0; j< preguntasArreglo.value[i].respuestas.length; j++){
            
                    if(preguntasArregloOriginal[i].respuestas[j].correcta == true){
                        if(preguntasArreglo.value[i].respuestas[j].correcta == preguntasArregloOriginal[i].respuestas[j].correcta){
                            contador = contador + 1;                    
                        }                        
                    }             
                }
            }

            //console.log('cueanta: ',contador)
            puntaje.value = contador;
        }

        const cargarExamen = async () => {

            try {
                
                const res = await fetch(`${url}/api/test/${route.params.id}`);
                const datos = await res.json();   
                preguntasArreglo.value = datos.preguntas;  
                maxPuntaje.value = preguntasArreglo.value.length;
                
                                          
                //console.log(preguntasArreglo.value)
                

            } catch (error) {
                console.log(error)
            }

        }
        cargarExamen();



        return {
            preguntasArreglo, evaluar, asignar,puntaje,maxPuntaje, redirect
        }




    },
}
</script>

<style>
.container-examen{
     margin-top: 10vh;
    height: 100vh;    
    background-color: white;
}

.centrar-examen{
    display: flex;
    justify-content: center;
}

.modal-examen{
    display: flex;
    justify-content: center;
}

.titulo-puntaje{
    font-size: 20px;
    color: coral;
}

.puntaje {
    font-size: 20px;
    color: rgb(47, 168, 47);
    margin-bottom: 5px;
    padding-left: 2vw;
}
</style>
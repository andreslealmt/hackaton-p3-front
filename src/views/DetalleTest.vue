<template>
    <div class="container container-detalle">
        <div class="row">
            <div class="col-sm-12 col-detalle">


                <div class="card card-detalle" >
                    <div class="card-body">
                        <h5 class="card-title card-title-detalle">{{detalleTest.name}}</h5><br>
                        <h6 class="card-subtitle mb-2 text-muted tamaño-h6">Categoria: <span class="verde">{{detalleTest.categoria}}</span></h6>
                        <h6 class="card-subtitle mb-2 text-muted tamaño-h6">Dificultad: <span class="verde">{{detalleTest.dificultad}}</span></h6>
                        <h6 class="card-subtitle mb-2 text-muted tamaño-h6">Preguntas: <span class="verde">{{cantidadPreguntas}}</span></h6>

                        <p class="card-text">El test tiene un reloj que medira el tiempo que gastes en la prueba, ademas solo se dara por realizado hasta que des click en el boton Finalizar.</p>
                        
                        <div v-if=" usuario == null"  class="footer-card-detalle">
                            <p class="rojo">Debe iniciar sesion para continuar.</p>
                        </div>
                        <div v-else class="footer-card-detalle" >
                            <router-link :to="'/examen/'+route.params.id" class="card-link">
                                Realizar Test
                            </router-link>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
export default {
    setup() {
        const route = useRoute();
        const detalleTest = ref({});
        const cantidadPreguntas = ref(0);
        const store = useStore();

        const url = store.state.url;
        
        const usuario = computed(() => store.state.usuario);
        // console.log(route.params)  


        const cargarTest = async () => {

            try {
                
                const res = await fetch(`${url}/api/test/${route.params.id}`);
                detalleTest.value = await res.json();
                cantidadPreguntas.value = detalleTest.value.preguntas.length;
                //console.log(detalleTest.value)
                

            } catch (error) {
                console.log(error)
            }

        }
        cargarTest();


        return {
            route, detalleTest, cantidadPreguntas, usuario
        }

    },
}
</script>

<style>

.container-detalle{
    margin-top: 10vh;
    height: 100vh;    
    background-color: white;
}

.col-detalle {
    display: flex;
    justify-content: center;
}

.card-detalle {
    margin-top: 9vh;
    border-color: cadetblue;
    width: 40vw;
}

.footer-card-detalle{
    display: flex;
    justify-content: center;
}

.verde{
    color: yellowgreen;
}

.card-title-detalle {
    font-weight: bolder;
    font-size: 32px;
    color: rgb(223, 114, 37);
}

.tamaño-h6{
    font-size: 25px;
}
.rojo {
    color: rgb(228, 51, 51);
}
</style>
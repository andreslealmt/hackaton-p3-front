<template>
  
<div class="container container-home">
  <div  v-for="card, key in cards" :key="key" class="row">
    <div class="col-sm-12 centrar-home">


      <div  class="card card-home zoom">

                    <h2 class="blanco">{{card.name}}</h2>
                    <div class="form">                        
                            <div class="mb-3">
                                <p class="oranje form-label">
                                 Dificultad:  {{card.dificultad}}
                                </p>   
                                 <p class="verde form-label">
                                 Categoria:  {{card.categoria}}
                                </p>                            
                            </div>                         
                            <div class="link-registro centrar-home">                            
                            
                                <router-link :to="'/detalleTest/'+card.testId"> 
                                    Ir a detalles del Test
                                    <i class="bi bi-arrow-right"></i>
                                </router-link>
                            </div>
                    </div>


                </div>
    </div>
  </div>
</div>



</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// @ is an alias to /src


export default {
  name: 'Home',
  setup(){
      const store = useStore();
      const cards = ref();
      const url = store.state.url;
      


      const cargarCards = async () => {

        try {
                
                const res = await fetch(`${url}/api/test/all`);
                cards.value = await res.json();
                //console.log(cards.value)

            } catch (error) {
                console.log(error)
            }

      }

      cargarCards();


    return {
        cards
    }

  }
}
</script>
<style>

.container-home {
  height: 100vh;
}

.card-home {
    
    width: 32rem;
    margin-top: 5vh;
    margin-bottom: 5vh;
    background-color: rgb(59, 61, 68);
    
}

body {
    background-image: linear-gradient(to bottom right, rgba(45, 117, 165, 0.972), rgb(101, 42, 156));
    background-size: 100%;
    width: 100%;
    height: 100vh;
}

.form {
    padding: 20px;
}
.container {
    height: 100%;
}

.blanco {
    color: rgb(245, 245, 245);
}

.oranje {
  color: rgb(218, 124, 69);

}

.verde{
  color: rgb(82, 204, 82);
}

.link-registro {
    padding-top: 5vh;    
}

.link-registro a {
    color: rgb(138, 180, 167);
    
}

.link-registro a:hover {
    color: rgb(93, 111, 133);
    
}

.bi {
    padding-left: 10px;    
}

span{
    color: whitesmoke;
}

.form-text {
    color: rgb(161, 76, 143);
}

h2 {
    text-align:center;
}

.centrar-home{
  display: flex;
  justify-content: center;  
}
.zoom {
   transition: 0.1s;
}
.zoom:hover {
  transform: scale(1.04); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  
}
</style>
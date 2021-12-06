<template>
<NavBar></NavBar>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |    
    <router-link to="/misCuestionarios">MisCuestionarios</router-link>  -->
  </div>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import NavBar from './components/NavBar.vue';
import { useStore } from 'vuex';

export default {
  components:{
    NavBar,
    
  },
  setup() {

    const store = useStore();

    store.dispatch('leerUsuario');
    
  },
}
</script>

<style>

/* .nav{
    background-image: linear-gradient(to bottom right, rgba(45, 117, 165, 0.972), rgb(101, 42, 156));
    background-size: 100%;
    height: 100%;
} */
</style>

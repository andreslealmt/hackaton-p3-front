<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img class="logo" src="https://admin.google.com/u/1/ac/images/logo.gif?uid=104443892163288069027&service=google_gsuite" alt="">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">                
                    <router-link to="/" class="nav-link" aria-current="page">Inicio</router-link>
                </li>               
                <li class="nav-item dropdown">
                    <!-- drop downnnnn -->

                    <!-- <div class="dropdown">
                        <span class="nav-link">Categorias</span>
                        <div class="dropdown-content oscuro">
                            <p class="item-category" @click="cambioCategoria('todo')">todo</p>
                            <p class="item-category" v-for="item in categorias" :key="item.id" @click="cambioCategoria(item.name)">{{item.name}}</p>
                        
                        </div>
                    </div> -->


                    <!-- <div class="dropdown">
                            <a class="nav-link dropdown-toggle dropdown" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            categories
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                <li @click="cambioCategoria('todo')"><a class="dropdown-item" href="#">Todo</a></li>                    
                                <li><hr class="dropdown-divider"></li>
                                <li v-for="item in categorias" :key="item.id" @click="cambioCategoria(item.name)"><a class="dropdown-item" href="#">{{item.name}}</a></li>                                                                        
                            </ul>

                    </div> -->
                
                </li>
                 <li class="nav-item left" >
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                </li>
                
               
            
            
            </ul>     

                <!-- sección sesiones Usuarios  -->
                    
                <div v-if=" usuario == null">
                    <Login></Login>
                </div>  

                <div v-else>
                    <div v-if="usuario.usuario.admin">
                        <Administrador></Administrador>
                    </div>
                    <div v-else>
                        <Cliente></Cliente>
                    </div>
                </div>                  
                          
            </div>
        </div>
    </nav>
</template>

<script>

import { useStore } from 'vuex';
import { onBeforeMount, onMounted } from '@vue/runtime-core';
import { computed, ref } from '@vue/reactivity';

import Login from './../components/Login.vue';
import Administrador from './../components/Administrador.vue';
import Cliente from './../components/Cliente.vue';

export default {
    name:'NavBar',
    components:{
        Login, Administrador, Cliente
    },
    setup() {
        
        const store = useStore();
        
        const usuario = computed(() => store.state.usuario);

        let categorias = ref();

        const cambioCategoria = (categoria) => {
            //console.log(categoria)
            store.commit('setCategoria', categoria);
        }
        

        // const cargarCategorias = async () => {
        //     const url = store.state.url;            

        //     try{
        //         const res = await fetch(`${url}`+'/api/Category/all');
        //         categorias.value = await res.json();       

        //     }catch(error){
        //         console.log(error)
        //     }
        // }

       

        onMounted(() => {
           //cargarCategorias();           
        });

        return {
            // cambioCategoria,
            categorias, usuario
        }
        
    },
}
</script>

<style>


.item-category:hover {
    background-color: rgb(67, 67, 167);
    color: white;
    border-radius: 10px;
    padding-left: 10px;
}

.item-category:active {
    box-shadow:3px 3px 8px 5px #5c5c5d; ;
}

.oscuro {
    background-color: aquamarine;
}
.item-category {
    cursor: pointer;
}

.logo {
    width: 5vw;
    height: 5vh;
}
.nav-link {
   font-size: 20px;
   margin-left: 5vw;
}
.icon-user{    
    width: 7vw;
    height: 7vh;    
    padding-top: 3px;
    padding-bottom: 3px;
}

.left{
    margin-left: 10vw;
}

.link-usuario {
    border:1px solid red;
    
}

.link-usuario:hover {    
    cursor: pointer;
    border-radius: 10px;    
}

.link-usuario:active {
    box-shadow: 3px 3px 8px 5px #5c5c5d;
}


.nombre-usuario {
    color: whitesmoke;
    padding-left: 5px;
    padding-top: 5px;
}


.nombre-usuario:active {
    color: white;    
}

.dropdown-menu {
    margin-left: 100vw;
}

.cerrar-sesion:hover {
    cursor: pointer;
    color: blue;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}



</style>
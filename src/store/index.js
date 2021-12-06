import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    //url:'http://localhost',
    url:'http://168.138.233.89',
    categoria:'',
    arregloCards:[],
    cards:[],
    usuario:null,    
  },
  mutations: {    
    setCategoria(state, payload){
      let arreglo = [];
      if(payload == "todo"){
        state.cards = state.arregloCards;
      }else{
        state.arregloCards.forEach((element) => {
          if(element.category != null){
             element.category.name == payload ? arreglo.push(element): element;          
          }       
        });
        state.cards = arreglo;      
        state.categoria = payload;  
      }
          
    },
    setCards(state, payload){
      state.cards = payload;
      state.arregloCards = payload;
    },
    setUsuario(state, payload){
      state.usuario = payload;
    },
    setUsuarioUpdate(state, payload){
      state.usuario.usuario = payload;
      localStorage.setItem('usuario', JSON.stringify(state.usuario));
    },
    
  },
  actions: {
    async login({commit, state},usuario){
      try {
        const res = await fetch(`${state.url}`+'/api/auth/login',{
          method:'POST',
          mode: 'cors',
          headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(usuario)
        });
        const datos = await res.json();
        //console.log(datos.usuario)
        if(datos.usuario != null){          
          commit('setUsuario',datos);
          localStorage.setItem('usuario', JSON.stringify(datos));
          router.push('/');
        }else{
          console.log('error de usuario o contraseña')
          swal("Error!", "error de usuario o contraseñar!", "error");
          // alert('error de usuario o contraseña');
        }
        
        

      } catch (error) {
        console.log(error)
      }
    },
    leerUsuario({commit}){
      commit('setUsuario',JSON.parse(localStorage.getItem('usuario')));
    },
    cerrarSesion({commit}){
      localStorage.removeItem('usuario');
      commit('setUsuario', null);
      router.push('/');
    },
    actualizarUsuario({commit},usuario){
      commit('setUsuarioUpdate', usuario);
    },
     async cargarCards({commit}){      
        //console.log(this.state.url)
      try {
        const res = await fetch(`${this.state.url}`+'/api/Costume/all');
        const datos = await res.json();
        //console.log(datos)
        commit('setCards',datos);
        
      } catch (error) {
        console.log(error)
      }

    }
  },
  modules: {
  }
})

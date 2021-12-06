import { ref } from '@vue/reactivity';

const getCategorias = () => {

    const categoriasLoaded = ref([]);
  

    const loadCategorias = async () => {
        

        try {
            
            const res = await fetch('http://localhost/api/categoria/all');
            categoriasLoaded.value = await res.json();

        } catch (error) {
            console.error(error)
        }

        
    }


    return {
        loadCategorias, categoriasLoaded
    }
}

export default getCategorias;
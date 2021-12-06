<template>

                    
                        <router-link class="link-usuario  " to="/loggin">
                            <span class="nombre-usuario">Login</span>    
                            <svg  xmlns="http://www.w3.org/2000/svg" fill="rgb(129, 45, 45)" class="bi bi-person-circle icon-user" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" fill="rgb(129, 45, 45)" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>                                                  
                        </router-link>
                      
                    
    
</template>
<script>

export default {
    name:'Login',
    setup() {       

    },
}
</script>

<style>
.pad {
    padding-left: 10px;
    padding-right: 10px;
}

.link-usuario {
    padding: 12px;
    text-decoration: none;
}
</style>
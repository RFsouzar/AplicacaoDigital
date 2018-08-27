<template>
     <div class="corpo">

        
       <router-view></router-view>
         
     </div>
        
</template>

<script>
export default{
  name:'App',
  data() {
            return {
                
                mockAccount: {
                    username: "802.364.457-23",
                    password: "teste"
                }
            }
        },

}

</script>


<style>

.corpo {
    font-family: Helvetica, sans-serif;
    width: 100%;
  }


    
</style>

<template>
  <div>
<meu-painel :titulo="titulo">

  
  
        <meu-modal>
              

        </meu-modal>


    </meu-painel>
    </div>
    
</template>
<script>
import Painel from "../shared/painel/Painel.vue";
import modal from "../shared/modal/modal.vue";
export default {
  props:['titulo'],
  components: {
    "meu-painel": Painel,
    "meu-modal":modal
  },

  data() {
    return {
      modalShow: true
      
    };
  },

  methods: {

  
  }
};
</script>
<style scoped>

</style>

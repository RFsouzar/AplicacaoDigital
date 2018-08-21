<template>
<div>

<meu-painel :titulo="titulo">
    <h5>Acesse sua conta</h5>
    <div class="container-fluid" id="login">
        
      <form @submit.prevent="login()">
        <div class="form-group">
            <label for="username1">CPF</label>
            <input type="text" class="form-control" id="username1" v-model="input.username" name="username" placeholder="Entre com o CPF">    
        </div>

        <div class="form-group">
            <label for="password2">Senha</label>
            <input type="password" class="form-control" id="password2" v-model="input.password" name="password" placeholder="Digite sua senha">
        </div>

        <div id="btnlogin"> 
            <button class="btn btn-primary" v-on:Click="login()">Acessar</button>
        </div>
      </form>

    </div>
     
    </meu-painel>

            

  </div>
    
</template>
<script>
import Painel from '../shared/painel/Painel.vue'

export default {
    name:'Login',
    components:{
    'meu-painel': Painel,

  },

  data () {
    return {
      titulo: 'App da IF',
      menuVisible: false,

        input:{
          username:"",
          password:""
        }
    }
  },
  methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        console.log("é valido");   
                        window.location.replace("/Home");          
                      //this.$emit("authenticated", true);                      
                      //this.$router.replace({ name: "/Home" });
                    } else {
                        alert("The username and / or password is incorrect");
                    }
                } else {
                    alert("A username and password must be present");
                }
            }
          }
 
}
</script>
<style scoped>

#btnlogin{
  display: -webkit-flex;
  align-items: center;
  -webkit-justify-content: center;
  padding-top: 15px;

}

#login{
padding-top: 50px;

}

h5{
  text-align: center;
  padding-top: 40px;
  font-style:unset;
  font-weight: bold;
}


</style>

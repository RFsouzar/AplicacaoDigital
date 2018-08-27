<template>
<div>

      <div class="page-container">
        <md-app md-mode="reveal">
          <md-app-toolbar class="md-primary" id="teste">
            <md-button class="md-icon-button">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{titulo}}</span>
          </md-app-toolbar>
        </md-app>
      </div>

    <h5>Acesse sua conta</h5>
    <div class="container-fluid" id="login">
        
      <form @submit.prevent="login()">
        <div class="form-group">
            <label for="username1">CPF</label>
            <input type="text" class="form-control" id="username1" v-model="input.username" name="username" 
            placeholder="Entre com o CPF" v-mask="['###.###.###-##']" />    
        </div>

        <div class="form-group">
            <label for="password2">Senha</label>
            <input type="password" class="form-control" id="password2" v-model="input.password" name="password" placeholder="Digite sua senha">
        </div>

        <div id="btnlogin"> 
            <button class="btn btn-primary" type="submit" v-on:click="validarCPF(input.username)">Acessar</button>
        </div>
      </form>

    </div>  

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
                        alert("CPF ou Senha Inválidos!");
                    }
                } else {
                    alert("CPF e Senha não podem estar em branco!");
                }
            },


      validarCPF(username) {
              var cpf= username;	
              cpf = cpf.replace(/[^\d]+/g,'');	
              if(cpf == '') return false;	
              // Elimina CPFs invalidos conhecidos	
              if (cpf.length != 11 || 
                cpf == "00000000000" || 
                cpf == "11111111111" || 
                cpf == "22222222222" || 
                cpf == "33333333333" || 
                cpf == "44444444444" || 
                cpf == "55555555555" || 
                cpf == "66666666666" || 
                cpf == "77777777777" || 
                cpf == "88888888888" || 
                cpf == "99999999999"){

                
                alert("CPF inválido");
                event.preventDefault();
                  return false;	
                }

              // Valida 1o digito	
              var add = 0;	
              for (var i=0; i < 9; i ++)		
                add += parseInt(cpf.charAt(i)) * (10 - i);	

                var rev = 11 - (add % 11);	
                if (rev == 10 || rev == 11)		
                  rev = 0;	
                if (rev != parseInt(cpf.charAt(9)))	{
                    alert("CPF inválido");
                    event.preventDefault();
                  return false;	
                }
                    
              // Valida 2o digito	
              add = 0;	
              for (var i = 0; i < 10; i ++)		
                add += parseInt(cpf.charAt(i)) * (11 - i);	
              rev = 11 - (add % 11);	
              if (rev == 10 || rev == 11)	
                rev = 0;	
              if (rev != parseInt(cpf.charAt(10))){
                alert("CPF inválido");
                event.preventDefault();
                return false;	
              }
                console.log("CPF Válido");
                return true; 
        },
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

#teste{
  background-color:#c41313;
}


</style>

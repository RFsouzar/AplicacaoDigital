<template>
<div class="principalDiv">
<meu-painel :titulo="titulo">

      
        <div class="container" id="modalfake" v-show="mensagem"><!---->
          <p class="centralizado" style="font-weight:bold;text-align:center;">{{ mensagem }}</p>
          <p class="centralizado" style="text-align:center;font-weight:bold;">{{ token }}</p>
          <h6 style="text-align:center;">Obrigado por utilizar nossos Serviços</h6>
          <div class="container" style="text-align:center;">
            <router-link to="/Home">
                <button class="btn btn-primary" v-show="!msg" tipo="button" id="msgsair">Sair</button>
                <button class="btn btn-primary" v-show="msg" tipo="button" id="msgsair">Compartilhar</button>
            </router-link>
          </div>
        </div>

        <div v-if="!mensagem" class="divPagamento" id="teste1">
             <div class="container" id="containerTeste">
                <h5>Saldo em conta</h5>
            </div>
            
          <div class="container" id="containerTeste">
              <div class="div-responsive">
                <h4 id="teste123" > R$ {{formatPrice(valoratual)}} </h4>
              </div>
            </div>

    <div class="container-fluid" id="divSecundaria">
        <form id="form1" @submit.prevent="pagar()">

      <div class="form-group">
        <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
          <div class="input-group">
            <div class="input-group-addon">$</div>
              <input type="text" class="form-control" id="saldopg" placeholder="00,00" 
               v-on:input="Payment.value = $event.target.value" :value="Payment.value" required />
               <!--v-mask="['##,##', '###.###,##', '###,##', '#.###,##']"-->    
                <div class="input-group-addon">.00</div>
          </div>
      </div>

      <div class="container" id="btnValores">
          <md-button class="md-dense md-raised md-primary" id="btn20"  v-on:click="addvalor(20)"> +20 </md-button>
          <md-button class="md-dense md-raised md-primary" id="btn50"  v-on:click="addvalor(50)"> +50 </md-button>
          <md-button class="md-dense md-raised md-primary" id="btn100" v-on:click="addvalor(100)"> +100 </md-button>
      </div>

  <div class="form-group">
      <label for="inputNome">Nome</label>
      
      <div class="teste" style="display:flex;">
      <input type="text" class="form-control" id="inputNome" 
      v-on:input="Payment.destName = $event.target.value" placeholder="Nome" :value="Payment.destName" required/>
      <md-button class="md-icon-button md-dense md-primary" v-on:click="show()">
        <md-icon>assignment_ind</md-icon>
      </md-button>
      </div>
  </div>

  <div class="form-group">
      <label for="inputCPF">CPF</label>
      <span class='msg-erro msg-nome' id="invalidcpf"></span>
      <input type="cpf" class="form-control" id="inputCPF" 
      v-on:input="Payment.destCpf = $event.target.value" placeholder="000.000.000-00" maxlengh="11" :value="Payment.destCpf" required
      v-mask="['###.###.###-##']"/>
      
      
  </div>

  <div class="form-group">
      <label for="inputTelefone">Telefone</label>
      <input type="telefone" class="form-control" id="inputTelefone" v-on:input="Payment.destTelephone = $event.target.value" 
      placeholder="(00) 00000-0000" :value="Payment.destTelephone" v-mask="['(##) ####-####', '(##) #####-####']" required/> 
  </div>

      <div class="container" id="btnpagar">
        <button class="btn btn-primary" type="submit" v-on:click="validarCPF(Payment.destCpf)">Pagar</button>
      </div>
      
      </form>
        </div>
        </div>

        <modal name="hello-world" id="modal1" :width="'38%'" :minWidth="355" :maxWidth="500" :adaptive="true" height="259px" >
        <div id="divtable">
                <md-table v-model="people" md-card @md-selected="onSelect" id="table">
            <md-table-toolbar>
                <h1 class="md-title">Contatos</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
                <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Telefone" md-sort-by="email">{{ item.telefone }}</md-table-cell>
            </md-table-row>
            </md-table>

    <!--<p>Selected:</p>
    {{ selected }}-->
        </div>
    </modal>

    </meu-painel>

        </div>
    
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import { TheMask } from "vue-the-mask";


export default {
  components: { TheMask },
  components: {
    "meu-painel": Painel,
    
  },

  data() {
    return {
      selected: {},
      titulo: "App da IF",
      menuVisible: false,
      valoratual: "",
      mensagem: "",
      token:"",
      msg:"",
      invalidcpf:"",
      people: [
        {  
          name: 'Shawna Dubbin',
          telefone: '11957847878',     
        },
        {  
          name: 'Odette Demageard',
          telefone: '11958658478',
        },
        {
          name: 'Lonnie Izkovitz',
          telefone: '1154878978',
        },
        ],
      

      Payment: {

        srcCpf: "349705544444",
        srcName: "Ricardo",
        destName: "",
        destCpf: "",
        destTelephone: "",
        value: "",   
      }
    };
  },

  created() {
    let promise = this.$http.get("http://tbnd29543:8080/partner/balance?cpf=349705544444");
    promise
      .then(res => res.json())
      .then(saldo => (this.valoratual = saldo.value), err => console.log(err));
  },

  methods: {

    validarCPF(destCpf) {
      var cpf= destCpf;	
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


    getClass: ({ id }) => ({
        'md-primary': id === 2,
        'md-accent': id === 3
      }),
      onSelect (item) {
        this.selected = item.name
        this.Payment.destName=item.name;
        this.Payment.destTelephone=item.telefone;
        this.$modal.hide('hello-world');
        
      },

    show () {
        this.$modal.show('hello-world');
},
    hide () {
        this.$modal.hide('hello-world');
  },
  
  /*FormatReal(int){
    var tmp = int+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
  },*/

    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },

    addvalor(val){
      var element=0;
      var result=0;
     
      element= this.Payment.value;
      
      if (element == ""){
        element=val;
      }else{
        element=parseInt(element)+val;   
      }
      //alert(typeof (element));
      //element=element.replace( '.', '' ); 
      //element=element.replace( ',', '.' );
      //element=parseInt(element);
      this.Payment.value=element;
      //this.Payment.value=this.formatPrice(parseInt(element));
      //element=element+20;

      //result=result+element;
      
      //element=parseInt(element);
      //element.value=result;
       
    },

    pagar() {
     
        this.$http
        .post('http://tbnd29543:8080/partner/payment', this.Payment)
        .then(res =>res.json())
        .then(saldo => {this.valoratual = saldo.balance, 
        this.mensagem=saldo.mensagem
        this.token="token "+saldo.token
        this.msg="compartilhar"},
        err => {console.log(err)
        this.mensagem="Pagamento não Realizado"});


      this.Payment = {
        srcName: "",
        srcCpf: "",
        destName: "",
        destCpf: "",
        destTelephone: "",
        value: ""
      };
    }
    /*post:function(){
        this.$http.post('http://tbnd29543:8080/partner/payment',{
          srcName:this.Payment.srcName,
          srcTelephone:this.Payment.srcTelephone,
          srcNumberAccount:this.Payment.srcNumberAccount,   
          srcAgency:this.Payment.srcAgency,   
          srcCpf:this.Payment.srcCpf,
          destName:this.Payment.destName,
          destCpf:this.Payment.destCpf,
          destTelephone:this.Payment.destTelephone,
          valor:this.Payment.value,

        }).then(function(data){
          console.log(data);
        });

    }*/
  }
};
</script>
<style scoped>
.imagem-responsiva {
  position: relative;
}
.h5 {
  text-align: center;
}

.div-responsive {
  border-style: solid;
  border-radius: 100%;
  width: 150px;
  height: 150px;
  border-color: #d6d6d6;
  border-width: 15px;
  display: -webkit-flex;
  align-items: center;
  -webkit-justify-content: center;
  font-size: 20px;
  margin-bottom: 10px;
}

#containerTeste {
  display: -webkit-flex;
  align-items: center;
  -webkit-justify-content: center;
}

#btnpagar {
  display: -webkit-flex;
  align-items: center;
  -webkit-justify-content: center;
}

.principalDiv {
  max-height: 555px;
  /*overflow-y: scroll;*/
}

#btnValores {
  display: -webkit-flex;
  align-items: center;
  -webkit-justify-content: center;
}
h5 {
  font-weight: bold;
}

#origemvalor {
  border: none;
  width: 116px;
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
  background: none;
}

#modalfake {
  background-color: #ddd9ce;
  width: 263px;
  margin: 165px auto;
  padding: 36px;
}

#msgsair {
  background: #c41313;
  width: 92px;
  padding: 3px;
  border: none;
}
</style>
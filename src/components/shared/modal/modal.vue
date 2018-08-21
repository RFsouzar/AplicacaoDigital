<template>
<div>
        
    <modal name="hello-world" id="modal1" :width="'38%'" :minWidth="355" :maxWidth="500" :adaptive="true" height="50%" >
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

    <p>Selected:</p>
    {{ selected }}
        </div>
    </modal>
    
 
</div>
   
</template>
<script>
export default {
    props:['titulo'],
    name:'TableSingle',
    
    data(){
        return{
        selected: {},
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
        ]

        }
        

    },
    
   methods:{

       getClass: ({ id }) => ({
        'md-primary': id === 2,
        'md-accent': id === 3
      }),
      onSelect (item) {
        this.selected = item
      }
    
    }
  
}

</script>
<style scoped>

divtable{
    width: 100%;   
}

.v--modal-box{
    width: 50px;
    position: relative;
}
#table{
    width: 100%;
    padding-right: 50px;
}



</style>

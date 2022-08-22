<template>
  <div>
    <v-banner>
        <h3>Companies Managment</h3>
    </v-banner>
    <v-divider></v-divider>
   <v-row>
    <v-col>
        <v-btn
        @click="[
            (Company.Type = 'Create'),
            (Company.Open = true),
            (Company.Item = {}),

        ]">
            <v-icon>mdi-pencil-plus-outline</v-icon>
        </v-btn>
    </v-col>
   </v-row>
   <v-dialog v-model="Company.Open" width="90vw">
   <v-container class="background pa-3" fluid>
    <v-form ref="InputForm" lazy-validation>
      <v-card flat>
        <v-card-title>
           <v-row align="center" justify="start" class="my-0 mx-1 caption">
            <h1 class="font-weight-regular">
                <v-icon large >mdi-pencil-plus-outline</v-icon>
                {{Company.Type}}
            </h1>
           </v-row> 
        </v-card-title>
        <v-divider />
        <v-text-field
        label="Company Name"
                    filled
                    rounded
                    prepend-inner-icon="mdi-star"
                    v-model="Company.Item.name"   
                  ></v-text-field>
                  <v-divider />
               <v-card-actions>
                <v-row align="center" justify="center" class="my-1">
                    <v-btn
                    large
                  class="mx-2 mt-3"
                  color="error"
                  @click="
                    [
                      (Company.Type = ''),
                      (Company.Open = false),
                      (Company.Item = {}),
                      (GetCompaniesAPI())
                    ]
                  "
                  rounded>
                   <v-icon
                    color="white"
                    >mdi-close-circle-outline</v-icon
                  >
                  Cancle
                    </v-btn>
                    <v-btn
                  large
                  class="mx-2 mt-3"
                  color="success"
                  rounded
                  @click="Submit(Company.Item)"

                >
                  <v-icon
                    color="white"
                    >mdi-content-save-all-outline</v-icon
                  >
                   Save 
                </v-btn>
                </v-row>
               </v-card-actions>   

      </v-card>  
    </v-form>
   </v-container>
   </v-dialog>
   <v-data-table
   :headers="Companies.headers"
   :items="Companies.Items">
   <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="[
            (Company.Type = 'Edit'),
            (Company.Open = true),
            (Company.Item = item),

        ]"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="Delete(item)"
      >
        mdi-delete
      </v-icon>
    </template>
   </v-data-table>
  </div>
</template>

<script>
import GeneralClasses  from '@/SubClasses/GeneralClasses'
export default {
name:'ComaniesView',
  data () {
      return {
        GeneralClasses: GeneralClasses,
        Companies :
        {
            Items :[],
            headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Name', value: 'name' },
          { text: 'Created at', value: 'created_at' },
          { text: 'Updated at', value: 'updated_at' },
          { text: 'Actions', value: 'actions', sortable: false }
          
          
        ],
        },
        Company:
        {
            Open:false,
            Item:{},
            Type:""
        }
      }
  },
  methods:{
    GetCompaniesAPI: function () {
    this.Companies.Items = []
    this.$http.get(GeneralClasses.Domain() + '/api/company').then((Result)=>{
        this.Companies.Items = Result.data.data
        
    })    
    },
    Delete(Item)
    {
     this.$http.delete(GeneralClasses.Domain() + '/api/company/'+Item.id).then((Result)=>{
        this.GetCompaniesAPI()
        
    })     
    },
    Submit(Item) {
     var Source = this.Company.Type =='Edit'? this.GeneralClasses.Domain() + '/api/company/'+Item.id : this.GeneralClasses.Domain() + '/api/company'
     
      
      
      this.$http.post(Source,this.Company.Item,).then((Result)=>{
        this.GetCompaniesAPI()
        this.Company.Open = false
        this.Company.Item = {}
        this.Company.Type = ''
        
    })

       
    },
  },
  mounted()
  {
    this.GetCompaniesAPI()
  }
 
}
</script>

<style>

</style>
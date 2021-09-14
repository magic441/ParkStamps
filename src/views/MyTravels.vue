<template>
    <v-app>
        <v-container fluid>
            <v-list-item>
                <v-list-item-content>
                    <TravelCard v-for="travel in travels" v-bind:key="travel.id" v-bind:travel="travel"
                    v-on:deleteTravel="deleteTravel"  v-on:editTravel="editTravel" />
                </v-list-item-content>
            </v-list-item>
            <v-row>
                <v-col cols="10">
                </v-col>
                <v-col cols="2">
                    <v-btn outlined @click="isCreateTravel=true">
                        <v-icon>
                            mdi-pencil
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-dialog v-model="isCreateTravel" max-width="800px" v-if="isCreateTravel">
                <v-card>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field v-model="date" label="日付" v-on:click="isShowDatePicker=true"></v-text-field>
                                    <v-dialog v-model="isShowDatePicker" max-width="400px">
                                        <v-date-picker v-model="date"/>
                                    </v-dialog>
                            </v-col>
                            <v-col cols="8" align-self="center">
                                <v-text-field v-model="name" label="名前"></v-text-field>
                            </v-col>
                            <v-col cols="2" align-self="center">
                                <v-btn>登録</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import sampleData from '../consts/sample-data'
  import TravelCard from '../components/TravelCard.vue'

  export default {
  components: { TravelCard },
    name: 'MyTravels',
    data () {
        return {
            debug: false,
            travels: [],
            isCreateTravel: false,
            isShowDatePicker: false,
            date: new Date().toISOString().substr(0, 10),
            name:''
        }
    },
    props: {
    },
    computed:{
    },
    methods: {
        deleteTravel: function(travel){
            console.log('travelの削除をする')
            this.axios.delete('http://localhost:3000/api/deletetravel',{
            params: {
                userId: travel.userId,
                travelId: travel.id
            }})
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                alert(e)
            })
        },
        createTravel: function(){
            console.log('travelをCreateする')
            
            
        },
        deleteTravel: function(travel){
            console.log('travelの削除をする')
            this.axios.delete('http://localhost:3000/api/deletetravel',{
            params: {
                userId: travel.userId,
                travelId: travel.id
            }})
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                alert(e)
            })
        },
    },
    mounted() {
        //travelIdからtravelsを持ってくる  
        console.log('GETの実行')
        this.axios.get('http://localhost:3000/api/showtravel',{
            params: {
                userId: 1
            }
        })
          .then((response) => {
              console.log(response)
              this.travels = response.data
          })
          .catch((e) => {
            alert(e)
          })
    },
  }
</script>

<style scoped>

</style>
<template>
    <v-app>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="9">
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
                            <v-btn outlined @click="isCreateTravel=true" color="secondary">
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-dialog v-model="isCreateTravel" max-width="800px" v-if="isCreateTravel">
                        <v-card>
                            <v-container>
                                <v-row>
                                    <v-col cols="3">
                                        <v-text-field v-model="date" label="日付" v-on:click="isShowDatePicker=true"></v-text-field>
                                            <v-dialog v-model="isShowDatePicker" max-width="400px">
                                                <v-date-picker v-model="date"/>
                                            </v-dialog>
                                    </v-col>
                                    <v-col cols="6" align-self="center">
                                        <v-text-field v-model="name" label="名前"></v-text-field>
                                    </v-col>
                                    <v-col cols="2" align-self="center">
                                        <v-btn @click="createTravel">登録</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
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
        createTravel: function(){
            console.log('travelをCreateする')
            const newTravel = {
                userId: this.$store.state.user.id,
                date: new Date(this.date),
                name: this.name
            }
            //console.log(newTravel)
            this.axios.post('http://localhost:3000/api/createtravel',newTravel)
            .then((response) => {
                console.log(response)
                this.travels = response.data
            })
            .catch((e) => {
                alert(e);
            })
            this.isCreateTravel = false
        },
        deleteTravel: function(travel){
            console.log('travelの削除をする')
            this.axios.delete('http://localhost:3000/api/deletetravel',{
            params: {
                userId: travel.userId,
                travelId: travel.id
            }})
            .then((response) => {
                this.travels = response.data
            })
            .catch((e) => {
                alert(e)
            })
        },
        editTravel: function(travel){
            console.log('travelの編集')
            console.log(travel)
            this.$store.commit('changeTmpTravel', travel)
            //以降はtravel.dateはdate型ではなくyyyy/mm/ddのStringで扱う
            this.$router.push({ name: "MyScheduleChart"}).catch(() => {}) 
        },
    },
    mounted() {
        //travelIdからtravelsを持ってくる  
        console.log('GETの実行')
        this.axios.get('http://localhost:3000/api/showtravel',{
            params: {
                userId: this.$store.state.user.id
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
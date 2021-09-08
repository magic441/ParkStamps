<template>
    <v-app>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="9">
                        <v-row class="ma-1">
                            <h1>{{travelInfo.name}}</h1>
                            <v-spacer></v-spacer>                        
                            <v-btn class="mx-1" fab dark color="primary" @click="isCreateSchedule=true">
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </v-row>
                    <ScheduleCard v-for="schedule in schedules" v-bind:key="schedule.name" v-bind:schedule="schedule"
                     v-on:deleteSchedule="deleteSchedule" v-on:editSchedule="editSchedule"/>                    
                </v-col>
            </v-row>             
        <v-dialog v-model="isCreateSchedule" max-width="800px" v-if="isCreateSchedule">
            <ScheduleForm v-on:submitNewSchedule="recordSchedule" :mode="'create'"/>
        </v-dialog>
        <v-dialog v-model="isEditSchedule" max-width="800px" v-if="isEditSchedule">
            <ScheduleForm :mode="'edit'" :schedule="tmpSchedule"/>
        </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import sampleData from '../consts/sample-data'
  import spotList from '../consts/spot-list'
  import About from './About.vue'
  import ScheduleCard from '../components/ScheduleCard.vue'
  import ScheduleForm from '../components/ScheduleForm.vue'

  export default {
  components: { ScheduleCard, ScheduleForm },
    name: 'MySchedule',
    data () {
        return {
            debug: false,
            travelInfo: {
                id: 2 ,
                name: 'さんぷる',
                date: '08/04'
            },
            isCreateSchedule:false,
            isEditSchedule:false,
            tmpSchedule:{},
            schedules: []
        }
    },
    props: {
    },
    computed:{
    },
    methods: {
        recordSchedule: function(newSchedule){
            this.schedules.push(newSchedule)
            console.log('POSTの実行')        
            //postの確認
            /*
            this.axios.post('http://localhost:3000/api/createschedule',{
                travelId: 1,
                schedule: newSchedule
            })
            .then((response) => {
                console.log(response);
            })
            .catch((e) => {
                alert(e);
            });
            */
        },
        updateSchedule: function(newSchedule){
            console.log('UPDATEの実行')        
        },

        deleteSchedule: function(schedule){
            console.log(this.schedules)
            this.schedules = this.schedules.filter(s => {
            return ! (s == schedule)
            })
            console.log(this.schedules)
        },
        editSchedule: async function(schedule){
            console.log(schedule)
            this.isEditSchedule = true
            this.tmpSchedule = schedule

        }

    },
    mounted() {
        //travelIdからschedulesを持ってくる  
        console.log('GETの実行')
        this.axios.get('http://localhost:3000/api/showschedule',{
            params: {
                travelId: 1
            }
        })
          .then((response) => {
            this.schedules = response.data.map(obj=>{
                //spotCodeしか来ないので、spotlistから情報を加えておく
                const spot = spotList.filter(spot => {
                    if(spot["Code"] == obj.spotCode){
                        return spot
                    }
                })
                obj.spot = spot[0]
                return obj
            })
          })
          .catch((e) => {
            alert(e);
          });
        
    },


  }
</script>

<style scoped>

</style>
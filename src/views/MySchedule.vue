<template>
    <v-app>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="9">
                        <v-row class="ma-1">
                            <h1>{{travelName}}</h1>
                            <v-spacer></v-spacer>                        
                            <v-btn class="mx-1" fab dark color="primary" @click="showScheduleForm=true">
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </v-row>
                    <ScheduleCard v-for="schedule in schedules" v-bind:key="schedule.name" v-bind:schedule="schedule" v-on:deleteSchedule="deleteSchedule"/>                    
                </v-col>
            </v-row>             
        <v-dialog v-model="showScheduleForm" max-width="800px">
            <ScheduleForm v-on:submitNewSchedule="recordSchedule"/>
        </v-dialog>

        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import sampleData from '../consts/sample-data'
  //import spotList from '../consts/spot-list'
  import About from './About.vue'
  import ScheduleCard from '../components/ScheduleCard.vue'
  import ScheduleForm from '../components/ScheduleForm.vue'

  export default {
  components: { ScheduleCard, ScheduleForm },
    name: 'MySchedule',
    data () {
        return {
            debug: false,
            travelName:'さんぷる',
            showScheduleForm:false,
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
        },
        deleteSchedule: function(schedule){
            console.log(this.schedules)
            this.schedules = this.schedules.filter(s => {
            return ! (s == schedule)
            })
            console.log(this.schedules)
        }
    },
    mounted() {
        console.log(sampleData)
        this.axios.get('http://localhost:3000/api')
          .then((response) => {
            console.log(response);
          })
          .catch((e) => {
            alert(e);
          });

    },


  }
</script>

<style scoped>

</style>
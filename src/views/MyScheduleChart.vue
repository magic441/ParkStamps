<template>
    <v-app>
        <v-container fluid>
            <v-row class="ma-1">
                <h1>{{`${$store.state.travel.date}　${$store.state.travel.name}`}}</h1>
            </v-row>
            <v-row>
                <v-timeline dense align-top>
                    <TimeLineItem v-for="schedule in schedules" v-bind:key="schedule.name" v-bind:schedule="schedule"/>
                </v-timeline>
            </v-row>
            <v-row>
                <v-spacer/>
                <v-btn color="secondary" @click="isCreateSchedule=true" elevation="0">
                    <v-icon>
                        mdi-pencil
                    </v-icon>
                </v-btn>
            </v-row>
            <v-dialog v-model="isCreateSchedule" max-width="800px" v-if="isCreateSchedule">
                <ScheduleForm v-on:submitNewSchedule="recordSchedule" :mode="'create'"/>
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
  import TimeLineItem from '../components/TimeLineItem.vue'


  export default {
  components: {ScheduleForm, TimeLineItem },
    name: 'MyScheduleChart',
    data () {
        return {
            debug: false,
            isCreateSchedule:false,
            isEditSchedule:false,
            tmpSchedule:{},
            schedules: []
        }
    },
    props: {
        //travel: Object
    },
    computed:{
    },
    methods: {
        recordSchedule: function(newSchedule){
            console.log('POSTの実行')        
            this.axios.post('http://localhost:3000/api/createschedule',{
                travelId: this.$store.state.travel.id,
                schedule: newSchedule
            })
            .then((response) => {
                console.log(response)
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
            })
            this.isCreateSchedule = false
        },
        updateSchedule: function(newSchedule){
            console.log('UPDATEの実行')
            console.log(newSchedule)
            this.axios.put('http://localhost:3000/api/updateschedule',{
                scheduleId: newSchedule.id,
                travelId: newSchedule.travelId,
                startTime: newSchedule.startTime,
                spotCode: newSchedule.spot.Code,
                memo: newSchedule.memo
            })
            .then((response) => {
                console.log(response);
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
            })
            this.isEditSchedule = false
        },
        deleteSchedule: function(schedule){
            console.log('削除前のschedules')
            console.log(this.schedules)
            this.axios.delete('http://localhost:3000/api/deleteschedule',{
            params: {
                scheduleId: schedule.id,
                travelId: schedule.travelId
            }})
            .then((response) => {
                console.log(response)
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
                alert(e)
            })
            console.log('削除後のschedules')
            console.log(this.schedules)
        },
        editSchedule: function(schedule){
            //モーダルの表示を行う（編集内容の更新はupdateSchedule）
            console.log('scheduleの編集')
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
                travelId: this.$store.state.travel.id
            }
        })
          .then((response) => {
            console.log(response)
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
            alert(e)
          })
        //console.log(this.$store.state.travel)
    },


  }
</script>

<style scoped>

</style>
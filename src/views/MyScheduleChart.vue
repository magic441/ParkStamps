<template>
    <v-app>
        <v-container fluid>
            <v-timeline dense align-top>
                <TimeLineItem/>
                <TimeLineItem/>
                <TimeLineItem/>
            </v-timeline>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import ScheduleChart from '../components/ScheduleChart.vue'
  import TimeLineItem from '../components/TimeLineItem.vue'


  export default {
  components: { ScheduleChart, TimeLineItem },
    name: 'MyScheduleChart',
    data () {
        return {
            debug: false,
        }
    },
    props: {
        //travel: Object
    },
    computed:{
    },
    methods: {
    },
  }
</script>

<style scoped>

</style>
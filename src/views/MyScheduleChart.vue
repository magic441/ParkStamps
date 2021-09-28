<template>
    <v-app>
        <v-container fluid>
            <v-divider></v-divider>
                <v-card outlined>
                    ああああ
                </v-card>
                <v-card outlined>
                    ああああ
                </v-card>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import ScheduleChart from '../components/ScheduleChart.vue'

  export default {
  components: { ScheduleChart },
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
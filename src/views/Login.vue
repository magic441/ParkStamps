<template>
    <v-app>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" md="9">
                        <v-row class="ma-1">
                            aaaa
                        </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import spotList from '../consts/spot-list'

  export default {
  components: { },
    name: 'Login',
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

    },
    mounted() {
    },


  }
</script>

<style scoped>

</style>
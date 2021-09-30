<template>
    <v-timeline-item color="sea">
      <v-row>
        <v-col cols="2">
            <strong>{{startTimeStr}}</strong>
        </v-col>
        <v-col cols="8">
          <strong>{{schedule.spot.name}}</strong>
          <div class="text-caption">
            {{schedule.memo}}
          </div>
        </v-col>
      </v-row>
    </v-timeline-item>
</template>

<script>
  export default {
    name: 'TimeLineItem',
    props: {
        schedule: Object
    },
    data: () => ({
        isDeleteTravel: false
    }),
    computed:{
        startTimeStr: function(){
            const date = new Date(this.schedule.startTime)
            return `${date.getHours()}:${('00' + date.getMinutes()).slice(-2)}`            
        }
    },
    methods: {
    },
    mounted() {
    }
    
  }
</script>

<style scoped>
</style>

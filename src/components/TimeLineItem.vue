<template>
    <v-timeline-item v-bind:color="colortype">
      <v-hover v-slot:default="{ hover }">
        <v-row>
          <v-col cols="2">
              <strong>{{startTimeStr}}</strong>
          </v-col>
          <v-col cols="7">
            <strong>{{schedule.spot.name}}</strong>
            <div class="text-caption">
              {{schedule.memo}}
            </div>
          </v-col>
          <v-col cols="1" v-if="hover">
              <v-icon @click="editSchedule(schedule)">mdi-square-edit-outline</v-icon>
          </v-col>
          <v-col cols="1" v-if="hover">
              <v-icon @click="isDeleteSchedule=true">mdi-delete-outline</v-icon>
          </v-col>
        </v-row>
      </v-hover>
      <v-dialog v-model="isDeleteSchedule" max-width="400px">
        <v-card>
            <v-container fluid>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="6" align-self="center">
                            削除しますか？
                    </v-col>
                    <v-col cols="3">
                        <v-btn @click="deleteSchedule(schedule)">削除</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
      </v-dialog>
    </v-timeline-item>
</template>

<script>
  export default {
    name: 'TimeLineItem',
    props: {
        schedule: Object
    },
    data: () => ({
        isDeleteSchedule: false
    }),
    computed:{
        startTimeStr: function(){
            const date = new Date(this.schedule.startTime)
            return `${date.getHours()}:${('00' + date.getMinutes()).slice(-2)}`            
        },
        colortype: function(){
          switch(this.schedule.spot.type){
            case "アトラクション":
              return "attraction"
            case "レストラン":
              return "restaurant"
            case "ショップ":
              return "shop"
            case "パレード/ショー":
              return "show"
            case "グリーティング":
              return "greeting"
          }
          return "none"
        }
        
    },
    methods: {
      deleteSchedule: function(schedule){
          this.isDeleteSchedule=false
          this.$emit("deleteSchedule",schedule)
      },
      editSchedule: function(schedule){
          this.$emit("editSchedule",schedule)
      }
    },
    mounted() {
    }
    
  }
</script>

<style scoped>
</style>

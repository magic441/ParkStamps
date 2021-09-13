<template>
    <v-card outlined>
        <v-row>
            <v-col cols="3">
                <v-img min-height="100%" :src="schedule.spot.src"></v-img>
            </v-col>
            <v-col cols="9">
                <v-card-title>
                    <div class="text">{{schedule.spot.name}}</div>
                </v-card-title>
                <v-card-subtitle>
                    <div class="text">{{startTimeStr}}</div>
                </v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col cols="10">
                            <div class="text">{{schedule.memo}}</div>
                        </v-col>
                        <v-col cols="1" >
                            <v-icon @click="editSchedule(schedule)">mdi-square-edit-outline</v-icon>
                        </v-col>
                        <v-col cols="1">
                            <v-icon @click="isDeleteSchedule=true">mdi-delete-outline</v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-col>
        </v-row>
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
    </v-card>    
</template>

<script>
  export default {
    name: 'ActionCard',
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
    
  }
</script>

<style scoped>
.text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
}
</style>

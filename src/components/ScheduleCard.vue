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
                    <div class="text">{{schedule.dtStart}}</div></v-card-subtitle>
                <v-card-text>
                    <v-row>
                        <v-col cols="10">
                            <div class="text">{{schedule.memo}}</div>
                        </v-col>
                        <v-col cols="1">
                            <v-icon>mdi-square-edit-outline</v-icon>
                        </v-col>
                        <v-col cols="1">
                            <v-icon @click="deleteSchedule(schedule)">mdi-delete-outline</v-icon>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
  export default {
    name: 'ActionCard',
    props: {
        schedule: Object
    },
    data: () => ({
        
    }),
    methods: {
        deleteSchedule: function(schedule){
            console.log(schedule)
            this.$emit("deleteSchedule",schedule)
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

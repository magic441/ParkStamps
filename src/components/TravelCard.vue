<template>
    <v-hover v-slot:default="{ hover }">
        <v-card outlined color="">
            <v-card-title>
                    <v-row>
                        <v-col cols="10">
                            {{date}}　 {{travel.name}}
                        </v-col>
                        <v-col cols="1" v-if="hover">
                            <v-icon @click="editTravel(travel)">mdi-square-edit-outline</v-icon>
                        </v-col>
                        <v-col cols="1" v-if="hover">
                            <v-icon @click="isDeleteSchedule=true">mdi-delete-outline</v-icon>
                        </v-col>
                    </v-row>
            </v-card-title>
        </v-card>
    </v-hover>
</template>

<script>
  export default {
    name: 'TravelCard',
    props: {
        travel: Object
    },
    data: () => ({
        isDeleteTravel: false
    }),
    computed:{
        date: function(){
            const datetime = new Date(this.travel.date)
            return `${datetime.getFullYear()}/${datetime.getMonth() +1}/${datetime.getDate()}`
        }
    },
    methods: {
        deleteTravel: function(travel){
            this.isDeleteTravel=false
            this.$emit("deleteTravel",travel)
        },
        editTravel: function(travel){
            travel.date = this.date
            this.$emit("editTravel",travel)
        }
    },
    mounted() {
        //console.log(this.travel)
    }
    
  }
</script>

<style scoped>

</style>

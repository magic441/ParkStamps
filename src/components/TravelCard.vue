<template>
    <v-card outlined>
        <v-card-title>
            <v-row>
                <v-col cols="2">
                    {{date}}
                </v-col>
                <v-col cols="8">
                    {{travel.name}}
                </v-col>
                <v-col cols="1" >
                    <v-icon @click="editTravel(travel)">mdi-square-edit-outline</v-icon>
                </v-col>
                <v-col cols="1">
                    <v-icon @click="isDeleteTravel=true">mdi-delete-outline</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-dialog v-model="isDeleteTravel" max-width="400px">
            <v-card>
                <v-container fluid>
                    <v-row>
                        <v-col cols="3">
                        </v-col>
                        <v-col cols="6" align-self="center">
                                削除しますか？
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click="deleteTravel(travel)">削除</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>       
    </v-card>
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
            return `${datetime.getFullYear()}/${datetime.getMonth()}/${datetime.getDay()}`
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

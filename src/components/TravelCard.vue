<template>
    <v-card outlined color="" @click="editTravel(travel)" hover>
        <v-card-title :style="{ color: $vuetify.theme.themes.light.title}">
            {{date}}　 {{travel.name}}
        </v-card-title>
        <v-card-text>
           
        </v-card-text>

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

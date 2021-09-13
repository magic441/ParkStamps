<template>
    <v-app>
        <v-container fluid>
            <v-list-item>
                <v-list-item-content>
                    <TravelCard v-for="travel in travels" v-bind:key="travel.id" v-bind:travel="travel"
                    v-on:deleteTravel="deleteTravel"  v-on:editTravel="editTravel" />
                </v-list-item-content>
            </v-list-item>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import sampleData from '../consts/sample-data'
  import TravelCard from '../components/TravelCard.vue'

  export default {
  components: { TravelCard },
    name: 'MyTravels',
    data () {
        return {
            debug: false,
            travels: []
        }
    },
    props: {
    },
    computed:{
    },
    methods: {
        deleteTravel: function(travel){
            console.log('travelの削除をする')
            this.axios.delete('http://localhost:3000/api/deletetravel',{
            params: {
                userId: travel.userId,
                travelId: travel.id
            }})
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                alert(e)
            })
        },
        editTravel: function(travel){
            console.log('travelの編集')
            console.log(travel)
            //以降はtravel.dateはdate型ではなくyyyy/mm/ddのStringで扱う
            this.$router.push({ name: "MySchedule" , params: {travel : travel}}).catch(() => {}) 
        }
    },
    mounted() {
        //travelIdからtravelsを持ってくる  
        console.log('GETの実行')
        this.axios.get('http://localhost:3000/api/showtravel',{
            params: {
                userId: 1
            }
        })
          .then((response) => {
              console.log(response)
              this.travels = response.data
          })
          .catch((e) => {
            alert(e)
          })
    },
  }
</script>

<style scoped>

</style>
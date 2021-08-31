<template>
    <v-card>
        <v-card-title>予定を追加</v-card-title>
        <v-divider></v-divider>
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="dtStart" label="Start" v-on:click="showTimePicker=true"></v-text-field>
                    <v-dialog  v-model="showTimePicker" max-width="400px">
                        <v-time-picker v-model="dtStart" elevation="15" format="ampm"></v-time-picker>
                    </v-dialog>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6">
                    <v-select :items="['すべて','東京ディズニーランド', '東京ディズニーシー']" label="park" v-model="park"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-select :items="['すべて','アトラクション', 'レストラン', 'ショップ','パレード/ショー', 'グリーティング' ]" label="type" v-model="type"></v-select>
                </v-col>
                <v-col cols="8">
                    <v-select :items="areaListFiltered" label="area" v-model="area"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-select :items="spotListFiltered" label="spot" v-model="spot" no-data-text="該当の場所がありません"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field label="memo" v-model="memo"></v-text-field>
                </v-col>
            </v-row>
            <v-row start="end">
                <v-col cols="4">
                    <v-btn @click="submitSchedule()">登録</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
  import spotList from '../consts/spot-list'

  export default {
    name: 'ScheduleForm',
    props: {
                
    },
    data: () => ({
        showTimePicker:false,
        park: 'すべて',
        area: 'すべて',
        type:'すべて',
        dtStart: `${new Date().getHours()}:${new Date().getMinutes()}`,
        spot: '',
        memo: ''
    }),
    computed:{
        parkFiltered:function(){
            //パークでのフィルタリング
            const parkFiltered = spotList.filter(spot => {
                if(spot["park"] == this.park || this.park == 'すべて'){
                    return spot
                }
            })
            return parkFiltered
        },
        areaListFiltered:function(){
            //選択されたパーク情報をもとに、テーマランド、テーマポートの選択肢を用意
            const areaList = []
            this.parkFiltered.forEach(spot => {
                const area = spot["area"]
                if(!areaList.includes(area)){
                    areaList.push(area)
                }
            })
            return areaList
        },
        spotListFiltered:function(){
            //テーマランド、テーマポートでのフィルタリング
            const areaFiltered = this.parkFiltered.filter(spot => {
                if(spot["area"] == this.area || this.area == 'すべて'){
                    return spot
                }
            })
            //タイプ（アトラクション、レストランなど）でのフィルタリング
            const typeFiltered = areaFiltered.filter(spot => {
                if(spot["type"] == this.type || this.type == 'すべて'){
                    return spot
                }
            })
            return typeFiltered.map(spot => spot["name"])
        },
    },
    methods: {
        submitSchedule: function(){
            const spot = spotList.filter(spot => spot['name'] == this.spot)[0]
            const newSchedule = {
                "dtStart" : this.dtStart,
                "spot" : spot,
                "memo" : this.memo
            }
            this.$emit("submitNewSchedule",newSchedule)
        }
    },
    mounted() {
        //dtStartに現在時刻を入れる
        this.dtStart = `${new Date().getHours()}:${new Date().getMinutes()}`
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

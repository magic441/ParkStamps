<template>
    <v-card>
        <v-card-title v-if="mode=='create'">予定を追加</v-card-title>
        <v-card-title v-if="mode=='edit'">予定を編集</v-card-title>
        <v-divider></v-divider>
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-text-field v-model="startTime" label="Start" v-on:click="showTimePicker=true"></v-text-field>
                    <v-dialog  v-model="showTimePicker" max-width="400px">
                        <v-time-picker v-model="startTime" elevation="15" format="ampm"></v-time-picker>
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
                    <v-btn  v-if="mode=='create'" @click="submitSchedule()">登録</v-btn>
                    <v-btn  v-if="mode=='edit'" @click="updateSchedule()">登録</v-btn>
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
        mode: String,
        schedule: Object
    },
    data: () => ({
        showTimePicker:false,
        park: 'すべて',
        area: 'すべて',
        type:'すべて',
        startTime: '',
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
            if(!spot){
                return
            }
            const newSchedule = {
                "startTime" : new Date(`2021/09/08 ${this.startTime}`),
                "spot" : spot,
                "memo" : this.memo
            }
            this.$emit("submitNewSchedule",newSchedule)
        },
        updateSchedule: function(){
            const newSchedule = this.schedule
            const spot = spotList.filter(spot => spot['name'] == this.spot)[0]
            //newScheduleに対して、入力されたstart、memo、spotを上書き
            newSchedule.memo = this.memo
            newSchedule.spot = spot
            console.log(newSchedule)
            const date = new Date(newSchedule.startTime)
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            console.log(`${year}/${month}/${day} ${this.startTime}`)
            newSchedule.startTime = new Date (`${year}/${month}/${day} ${this.startTime}`)
            this.$emit("updateSchedule",newSchedule)
        }
    },
    mounted() {
        //編集の場合はpropsの情報でdataを上書きする
        if(this.mode == 'edit'){
            this.spot = this.schedule.spot.name
            this.park = this.schedule.spot.park
            this.area = this.schedule.spot.area
            this.type = this.schedule.spot.type
            const date = new Date(this.schedule.startTime)
            this.startTime = `${date.getHours()}:${('00' + date.getMinutes()).slice(-2)}`
            this.memo = this.schedule.memo
        }
        else{
        //新規の場合startTimeに現在時刻を入れる
        this.startTime = `${new Date().getHours()}:${('00' + new Date().getMinutes()).slice(-2)}`
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

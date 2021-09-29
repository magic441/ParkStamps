<template>
    <v-timeline-item color="sea">
      <v-row>
        <v-col cols="2">
            <strong>14:50</strong>
        </v-col>
        <v-col cols="3">
          <strong>カリブの海賊</strong>
          <div class="text-caption">
            メモメモ
          </div>
        </v-col>
      </v-row>
    </v-timeline-item>
</template>

<script>
  export default {
    name: 'TimeLineItem',
    props: {
    },
    data: () => ({
        isDeleteTravel: false
    }),
    computed:{
    },
    methods: {
    },
    mounted() {
    }
    
  }
</script>

<style scoped>
</style>

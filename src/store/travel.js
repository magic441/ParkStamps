export default{
    namespaced: true,
    state: {
      travel:{},
    },
    mutations: {
      changeTmpTravel:function(state, newTravel){
        //console.log(state.travel)
        //console.log(newTravel)
        state.travel = newTravel
      }
    },
    actions: {
    }
  }
  
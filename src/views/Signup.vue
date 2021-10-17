<template>
    <v-app :style="{ background: $vuetify.theme.themes.light.base}">
        <v-container fill-height>
            <v-row>
                <v-col>
                    <v-row>
                        <v-card width="80vw" class="mx-auto mt-5" rounded="xl">
                            <v-card-text>
                            <v-form>
                                <v-text-field prepend-icon="mdi-email" v-model="mail" label="e-mail"/>
                                <v-text-field prepend-icon="mdi-account-circle" v-model="loginId" label="ユーザ名"/>
                                <v-text-field prepend-icon="mdi-lock" type="password" label="パスワード" v-model="password"/>
                            </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text @click="signup" color="primary">登録</v-btn>
                            </v-card-actions>            
                        </v-card>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import spotList from '../consts/spot-list'

  export default {
  components: { },
    name: 'Login',
    data () {
        return {
            debug: false,
            loginId:'',
            password: '',
            mail:''
        }
    },
    props: {
        //travel: Object
    },
    computed:{
    },
    methods: {
        auth: function(){
            let self = this
            console.log('Auth')
            this.axios.post('https://pure-gorge-50096.herokuapp.com/api/auth',{
                username: this.loginId,
                password: this.password
            })
            .then((response) => {
                this.$store.commit('changeUser', response.data)
                console.log(response)
                console.log(this.$store.state.user.id)
                self.$router.push({ name: "MyTravels"}).catch(() => {}) 
            })
            .catch((e) => {
                alert("ログインに失敗しました");
            })
        },
        signup:function(){
            let self = this
            console.log(this.mail)
            this.axios.post('https://pure-gorge-50096.herokuapp.com/api/signup',{
                mail: this.mail,
                username: this.loginId,
                password: this.password
            })
            .then((response) => {
                console.log(response)
                if(!response.data.signup){
                    alert('既に登録されています')
                    return
                }
                self.$router.push({ name: "Login"}).catch(() => {}) 
            })
            .catch((e) => {
                alert("登録に失敗しました");
            })

        }

    },
    mounted() {
    },


  }
</script>

<style scoped>

</style>
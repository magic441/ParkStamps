<template>
    <v-app>
        <v-card width="400px" class="mx-auto mt-5">
            <v-card-title>
            <h1 class="display-1">ログイン</h1>
            </v-card-title>
            <v-card-text>
            <v-form>
                <v-text-field prepend-icon="mdi-account-circle" v-model="loginId" label="ユーザ名" />
                <v-text-field prepend-icon="mdi-lock" type="password" label="パスワード" v-model="password"/>
            </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="auth">ログイン</v-btn>
            </v-card-actions>            
        </v-card>
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
            password: ''
        }
    },
    props: {
        //travel: Object
    },
    computed:{
    },
    methods: {
        auth: function(){
            console.log('Auth')
            this.axios.post('http://localhost:3000/api/auth',{
                loginId: this.loginId,
                password: this.password
            })
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                alert(e);
            })
        }

    },
    mounted() {
    },


  }
</script>

<style scoped>

</style>
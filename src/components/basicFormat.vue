<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-tile v-else :key="item.text" @click="route(item.route)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">URPX</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
	  	<span class = "message">{{ loginMessage }}</span>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view :isLoggedIn = "isLoggedIn"></router-view>
      </v-container>
    </v-content>
   
  </v-app>
</template>

<script>
  import homeContent from './homeContent'
  import expenseContent from './expenseContent'
  import boardContent from './boardContent'
  import requestContent from './requestContent'
  import loginContent from './loginContent'
	
  var jwtDecode = require('jwt-decode');
	
  export default {
    components: {
      homeContent : homeContent,
	  expenseContent : expenseContent,
	  boardContent : boardContent,
	  requestContent : requestContent,
	  loginContent : loginContent,
	  
    },
	created(){
		this.$EventBus.$on('logout', ()=>{
			this.isLoggedIn = false
			console.log("dddfdf");
		})
	},
    data: () => ({
      dialog: false,
	  token : "",
	  isLoggedIn : false,
	  component : "",
	  username : "",
      drawer: null,
	  loginMessage : "",
      items: [
        { icon: 'contacts', text: '메인' , route : '/' },
        { icon: 'history', text: '지출관리', route : '/expense'},
        { icon: 'content_copy', text: '판매현황', route : '/board'},
		{ icon: 'content_copy', text: '물품추천', route : '/request'},
        { icon: 'chat_bubble', text: '로그인', route : '/login' },
        // { icon: 'help', text: 'Help', route :  '/' },
        // { icon: 'phonelink', text: 'App downloads', route :  '/' },

      ]
    }),
    props: {
      source: String
    },
	watch:{
		$route (to, from){
			
			var self = this
			console.log(to, from)
			this.checkLoggedIn().then(() =>{
				this.isLoggedIn = true
				this.$EventBus.$emit('auth-token')
			}).catch(function () {
				alert("로그인 해주세요");
				self.$router.push("/login")
			})
		}
	},
	methods : {
		route(routelink){
		
			this.$router.push(`${routelink}`)
		},
		checkLoggedIn(){

			return new Promise((resolve, reject) => {
				let token = this.$cookies.get("urpx_access_token");
			    this.$http.defaults.headers.common = {'Authorization': `Bearer ${token}`}
				try{
					let decoded = jwtDecode(token);
					this.getUserInfo(decoded.identity).then((res, rej)=>{
						return resolve()
					}).catch(()=>{
						console.log("에러 났는데요")
						return reject()
					})

				} catch(err){
					this.loginMessage = "로그인 하세요"
					return reject()

				}
				
			})
			
		},
		getUserInfo(id){
			return new Promise((resolve, reject)=>{

				this.$http.get(`/api/users/${id}`).then((res) => {
					console.log(res)
					console.log("유저정보")
					this.username = res.data.username
					this.loginMessage = `안녕하세요 ${this.username}님`
					return resolve()
				})
				.catch((e) => {

					this.loginMessage = "로그인 하세요"
					return reject()
				})
			})
		}
	},
	mounted(){
		
		var self = this
		this.$EventBus.$on('logout', ()=>{
			this.isLoggedIn = false
			console.log("dddfdf");
		})
		
		this.checkLoggedIn().then(() =>{
			this.isLoggedIn = true
			this.$EventBus.$emit('auth-token')
		}).catch(()=>{
			self.$router.push("/login")
		})
		
	}
  }
</script>

<style lang="scss" scoped>

	.v-content{
		padding : 0 !important;
	}
	.message{
		display : block;
		min-width : 100px;
	}
	
</style>
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
	  	<span>{{ loginMessage }}</span>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view></router-view>
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
		this.token = this.$cookies.get("urpx_access_token");
		this.changewindow();
	},
    data: () => ({
      dialog: false,
	  token : "",
	  component : "",
      drawer: null,
	  loinMessage : "로그인 하세요",
      items: [
        { icon: 'contacts', text: '메인' , route : '/' },
        { icon: 'history', text: '지출관리', route : '/expense'},
        { icon: 'content_copy', text: '판매현황', route : '/board'},
		{ icon: 'content_copy', text: '물품추천', route : '/request'},
        { icon: 'chat_bubble', text: '로그인', route : '/login' },
        { icon: 'help', text: 'Help', route :  '/' },
        { icon: 'phonelink', text: 'App downloads', route :  '/' },

      ]
    }),
    props: {
      source: String
    },
	watch:{
		'token'(){
			this.checkLoggedIn()
			try{
				let token = this.$cookies.get("urpx_access_token")
				this.$http.defaults.headers.common = {'Authorization': `Bearer ${token}`}
				this.$EventBus.$emit('auth-token')
			}catch(err){
				
			}
		}
	},
	methods : {
		route(routelink){
		
			this.$router.push(`${routelink}`)
		},
		changewindow(){
			let route = window.location.href.split('/').pop()

			switch(route){
				case "" : this.component = "homeContent"; break;
				case "expense" : this.component = "expenseContent"; break;
				case "board" : this.component = "boardContent" ; break;
				case "request" : this.component = "requestContent" ; break;
				case "request" : this.component = "requestContent" ; break;
				case "login" : this.component = "loginContent" ; break;
			}
		},
		checkLoggedIn(){
			let token = this.$cookies.get("urpx_access_token");

			try{
				let decoded = jwtDecode(token);
				this.getUserInfo(decoded.identity)
				this.loginMessage = "안녕하세요"
				
				
			} catch(err){
				this.loginMessage = "로그인 하세요"
				
			}
		},
		getUserInfo(id){
			this.$http.get(`/api/users/${id}`).then((res) => {
				console.log(res)
			})
			.catch((e) => {
				
				this.loginMessage = "로그인 하세요"
			})
		}
	},
	mounted(){
		// this.changewindow();
		// this.checkLoggedIn();
		
	}
  }
</script>

<style lang="scss" scoped>

	.v-content{
		padding : 0 !important;
	}
	
</style>
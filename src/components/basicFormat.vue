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
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
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
	
  export default {
    components: {
      homeContent : homeContent,
	  expenseContent : expenseContent,
	  boardContent : boardContent,
	  requestContent : requestContent,
	  loginContent : loginContent,
	  
    },
	created(){
		this.changewindow();
	},
    data: () => ({
      dialog: false,
	  component : "",
      drawer: null,
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
		}
	},
	mounted(){
		this.changewindow();
	}
  }
</script>

<style lang="scss" scoped>

	.v-content{
		padding : 0 !important;
	}
	
</style>
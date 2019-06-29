<template>
	    <v-container xs12 md12 lg6 xl4>
        <v-layout align-center="align-center" justify-center="justify-center">
            <v-flex class="login-form text-xs-center">
                <v-card light="light">
                    <v-card-text v-if="!isLoggedIn">
                        <div class="subheading"><template v-if="isLoggingIn">URPX 로그인</template><template v-else="v-else">Crate a new account</template></div>
                        <v-form>
                            <v-text-field v-if="!isLoggingIn" v-model="user.name" light="light" prepend-icon="person" label="Name"></v-text-field>
                            <v-text-field v-model="user.email" light="light" prepend-icon="email" label="Email" type="email"></v-text-field>
                            <v-text-field v-model="user.password" light="light" prepend-icon="lock" label="Password" type="password"></v-text-field>
                            <v-text-field v-if="!isLoggingIn" v-model="user.passwordRepeat" light="light" prepend-icon="lock" label="Password Repeat" type="password"></v-text-field>
                            <v-btn v-if="isLoggingIn" @click.prevent="login()" block="block" type="submit">Sign in</v-btn>
                            <v-btn v-if="!isLoggingIn" block="block" type="submit" @click.prevent="sign();">Sign up</v-btn>
							<v-btn v-if="!isLoggingIn" block="block" type="submit" @click.prevent="back();">return</v-btn>
                        </v-form>
                    </v-card-text>
					<v-card-text v-else>
						<span class = 'login-message'> URPX 로그아웃</span>
						<v-btn @click.prevent="logout()">로그 아웃</v-btn>
					</v-card-text>
                </v-card>
                <div v-if="isLoggingIn && !isLoggedIn">Don't have an account?
                    <v-btn light="light" @click="isLoggingIn = false;">Sign up</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
 var jwtDecode = require('jwt-decode');
  export default {
	  
    props: {
	  isLoggedIn : String
    },
    data: () => ({
		user: {
			name : '',
			email : '',
			password : '',
			passwordRepeat : '',
    	},
      isLoggingIn: true,
    
    }),
	
	methods : {
		back(){
			this.initialize()
			this.isLoggingIn = true
		},
		login(){
			let data = {
				email : this.user.email,
				password : this.user.password,
			}
			
			this.$http.post('/api/auth/login', data).then((res) => {
				this.$cookies.set("urpx_access_token",res.data.access_token, 60 * 60 * 24 * 30)
				this.$router.push(`/`)
			})
			.catch((e) => {
				alert("아이디 또는 패스워드가 틀립니다.")
				this.initialize()
			})
		},
		sign(){
			if(this.user.password !== this.user.passwordRepeat){
				alert('패스워드가 일치하지 않습니다.')
				this.user.password = ''
				this.user.passwordRepeat = ''
				return
			}
			
			let data = {
				email : this.user.email,
				username : this.user.name,
				password : this.user.password
				
			}
			this.$http.post('/api/users', data).then((res) => {
				 this.isLoggingIn = true
				 this.initialize()
			})
			.catch((e) => {
				var msg = e.response.status
				switch(msg){
					case 422 : alert("이미 등록된 계정입니다."); break;
					default : alert("서버 오류입니다."); break;
				}

			})
		},
		logout(){
			this.isLoggingIn = true,
			this.isLoggedIn = false//false 되어야 함
			this.$cookies.remove("urpx_access_token")
			this.$EventBus.$emit('logout')
			
		},
		initialize(){
			this.user.email = "",
			this.user.name = "",
			this.user.password = "",
			this.user.passwordRepeat = ""
		}
		

		
	},
	mounted(){
		
	}
  }
</script>

<style lang="scss" scoped>
	.login-form{
		max-width : 500px;
	}
	.login-message{
		display : block;
	}
	
</style>
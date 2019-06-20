<template>
	    <v-container xs12 md12 lg6 xl4>
        <v-layout align-center="align-center" justify-center="justify-center">
            <v-flex class="login-form text-xs-center">
                <v-card light="light">
                    <v-card-text>
                        <div class="subheading"><template v-if="options.isLoggingIn">URPX 로그인</template><template v-else="v-else">Crate a new account</template></div>
                        <v-form>
                            <v-text-field v-if="!options.isLoggingIn" v-model="user.name" light="light" prepend-icon="person" label="Name"></v-text-field>
                            <v-text-field v-model="user.email" light="light" prepend-icon="email" label="Email" type="email"></v-text-field>
                            <v-text-field v-model="user.password" light="light" prepend-icon="lock" label="Password" type="password"></v-text-field>
                            <v-text-field v-if="!options.isLoggingIn" v-model="user.passwordRepeat" light="light" prepend-icon="lock" label="Password Repeat" type="password"></v-text-field>
                            <v-btn v-if="options.isLoggingIn" @click.prevent="login()" block="block" type="submit">Sign in</v-btn>
                            <v-btn v-if="!options.isLoggingIn" block="block" type="submit" @click.prevent="sign();">Sign up</v-btn>
							<v-btn v-if="!options.isLoggingIn" block="block" type="submit" @click.prevent="">return</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
                <div v-if="options.isLoggingIn">Don't have an account?
                    <v-btn light="light" @click="options.isLoggingIn = false;">Sign up</v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
// https://codepen.io/madyanalj/pen/KRXxpN
  export default {
    data: () => ({
		user: {
			name : '',
			email : '',
			password : '',
			passwordRepeat : '',
    	},
    options: {
      isLoggingIn: true,
      shouldStayLoggedIn: true,
    },
    }),
	methods : {
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
				 this.options.isLoggingIn = true
				 this.initialize()
			})
			.catch((e) => {
				var msg = e.response.status
				console.log(msg)
				switch(msg){
					case 422 : alert("이미 등록된 계정입니다."); break;
					default : alert("서버 오류입니다."); break;
				}

			})
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
	
</style>
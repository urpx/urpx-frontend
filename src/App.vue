<template>
	<v-content>
	  <basicFormat />
	</v-content>
</template>

<script>
import basicFormat from './components/basicFormat'

export default {
  name: 'App',
  components: {
    basicFormat
  },
  created(){
	  let token = this.$cookies.get("urpx_access_token")
	  console.log(token)
	  this.$http.defaults.headers.common = {'Authorization': `Bearer ${token}`}
	  // this.$http.defaults.withCredentials = true
  },
  data () {
    return {
      
    }
  }
}
</script>

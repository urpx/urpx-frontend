<template>
	<div class = "request-container">
		<span class="display-1 font-weight-bold">요청 상품 전송</span>
		  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="productName"
      :rules="Rules"
      label="제품명"
      required
    ></v-text-field>

    <v-text-field
      v-model="company"
	  :rules="Rules"
      label="제조사"
      required
    ></v-text-field>

    <v-text-field
      v-model="belongto"
      :rules="Rules"
      label="소속 부대"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="sendData"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      Reset Form
    </v-btn>

  </v-form>
	</div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      productName: '',
	  company : '',
	  belongto : '',
	  
      Rules: [
        v => !!v || 'required',
        v => (v && v.length <= 10) || 'Name must be less than 30 characters'
      ],
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          	this.snackbar = true
			return true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
	  sendData(){
		let data = {
			product_name : this.productName,
			company : this.company,
			belongto : this.belongto
		} 
		if(this.validate()){
			this.$http.post(`/api/request`, data).then((res) => {

				alert("접수 완료되었습니다.")
				this.$refs.form.resetValidation()
			})
			.catch((e) => {
				alert("서버 오류")
			})
		  }
	 	}

    }
  }
</script>

<style lang="scss" scoped>
	
	
</style>
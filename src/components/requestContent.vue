<template>
	<div class = "request-container">
		<span class="display-1 font-weight-bold">요청 상품</span>
		  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="dialog-btn" color="primary" dark v-on="on">상품 요청하기</v-btn>
      </template>
      <v-card class = "request-card">
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
      @click="sendData();"
    >
      전송
    </v-btn>

    <v-btn
      color="error"
      @click="dialog = false"
    >
      취소
    </v-btn>
  </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
<!-- dialog로 감쌀것 	 -->
		<v-data-table
			:headers="headers"
			:items="itemlists"
			:rows-per-page-items = [10]
			class="elevation-1"
		 >
			<template v-slot:items="props">
				
			  <td class="text-xs-left">{{ props.item.product_name }} </td> 
			  <td class="text-xs-left">{{ props.item.company }}</td>
			  <td class="text-xs-left">{{ props.item.belongto }}</td>
			</template>
		  </v-data-table>
	</div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      productName: '',
	  company : '',
	  belongto : '',
	  dialog: false,
	  
      Rules: [
        v => !!v || 'required',
        v => (v && v.length <= 10) || 'Name must be less than 20 characters'
      ],
		 headers: [
		  { text : '상품명', value : 'index', sortable : false},
          {
            text: '제조사',
            align: 'left',
            sortable: false,
            value: 'img'
          },
          { text: '소속 부대', value: 'name', sortable : false},
          
        ],
        itemlists: []
    }),
	

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          	this.snackbar = true
			this.dialog = false
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
				this.getData()
			})
			.catch((e) => {
				alert("서버 오류")
			})
		  }
	 	},
	  getData(){
			this.$http.get(`api/request`).then((res) => {
				this.itemlists = res.data
			})
			.catch((e) => {
				alert("서버 오류")
			})
			
	  }

    },
	mounted(){
		this.getData()
	}
  }
</script>

<style lang="scss" scoped>
	.request-container{
		
		.dialog-btn{
			margin: 1rem 0;
		}

	}
			.request-card{
			padding : 2rem !important;
		}
</style>
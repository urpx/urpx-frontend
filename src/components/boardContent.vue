<template>
	<div class = "board-container">
		<span class="display-1 font-weight-bold">판매 현황 : {{picker }}</span>
		<v-container class="btn-container">
			<v-btn color="info" @click="toggleData()">{{ toggleButton }}</v-btn>
			<v-btn color='success' @click="toggle=!toggle ; ">달력</v-btn>
			<v-flex v-show='toggle' class = "calendar" xs12 sm6>
        		<v-date-picker v-model="picker" color="green lighten-1" type="month"></v-date-picker>
      		</v-flex>
		</v-container>
		
		  <v-data-table
			:headers="headers"
			:items="itemlists"
			:rows-per-page-items = [10]
			class="elevation-1"
		  >
			<template v-slot:items="props">
			  <td>{{ props.index + 1 }}</td>
			  <td><img class = "productimg" :src="props.item.image_100px"/></td>
			  <td class="text-xs-left">{{ props.item.name }}</td>
			</template>
		  </v-data-table>

	</div>
</template>

<script>

  export default {
	data: () => ({
		 headers: [
		  { text : '순위', value : 'index'},
          {
            text: '상품',
            align: 'left',
            sortable: false,
            value: 'img'
          },
          { text: '상품명', value: 'name' },
          
        ],
		picker: new Date().toISOString().substr(0, 7),
		toggle : false,
		category : 'cost',
        itemlists: []
		
	}),
	watch : {
		picker(){
			//picker 달라질때 마다 데이터 갱신
			this.getData()
		}
	},
	computed : {
		toggleButton(){
			let returnMessage = this.category == "cost" ? "금액순" : "판매량순"
			return returnMessage
		}
	},
	methods : {
		getData(){
			
			this.itemlists = []
			let year = Number(this.picker.split('-')[0])
			let month = Number(this.picker.split('-')[1])
			
			let query = {
				offset : 0,
				count : 20
			}
			
			console.log(year)
			console.log(month)
			
			this.$http.get(`/api/products/${this.category}/${year}/${month}`, {params : query}).then((res) => {
				this.itemlists = res.data
			})
			.catch((e) => {
				
			})			
		},
		toggleData(){
			console.log("클릭")
			
			
			if(this.category == "cost"){
				this.category = "amount"
				this.getData()
			}else{
				this.category = "cost"
				this.getData()
			}
			console.log(this.category)
		}
	},
	mounted(){
		this.getData()
	},
  }
</script>

<style lang="scss" scoped>
	
	.board-container{
		.calendar{
			z-index: 5;
			position : absolute;
		}
		.btn-container{
			padding : 1rem 0;
			
		}
		.productimg{
			width : 100px;
		}
	}
</style>
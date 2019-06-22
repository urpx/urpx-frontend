<template>
	<div class = "board-container">
		<span class="display-1 font-weight-bold">판매 현황</span>
		<v-container class="btn-container">
			<v-btn color="info">기준</v-btn>
			<v-btn color='success'>달력</v-btn>
		</v-container>
		
		  <v-data-table
			:headers="headers"
			:items="itemlists"
			:rows-per-page-items = [10]
			class="elevation-1"
		  >
			<template v-slot:items="props">
			  <td>{{ props.index }}</td>
			  <td><img class = "productimg" :src="props.item.img"/></td>
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
        itemlists: [
          {
           	img : "http://gdimg.gmarket.co.kr/193395843/still/300",
			name : "사과"
          },
        ]
		
	}),
	methods : {
		getData(){
			
			this.itemlists = []
			
			this.$http.get(`/api/products`).then((res) => {
				this.itemlists = res.data
				this.itemlist.forEach((v, i) => {
					v.img = "http://gdimg.gmarket.co.kr/193395843/still/300"
				})
			})
			.catch((e) => {
				
			})			
		}	
	},
	mounted(){
		//getData에 year month 넣기 정렬 기준
		// this.getData()
		// console.log(process.env)
		// let apiKey = process.env.VUE_APP_11API
		// let requestURL = `https://openapi.11st.co.kr/openapi/OpenApiService.tmall`
		// let data = {
		// 	key : apiKey,
		// 	apiCode : `ProductSearch`,
		// 	keyword : `사과`
			
		// }
		// this.$http.get(requestURL, {params:data, headers: { 'crossDomain': true }}).then((res) => {
		// 	console.log(res)
		// })
	},
  }
</script>

<style lang="scss" scoped>
	
	.board-container{
		.btn-container{
			padding : 1rem 0;
			
		}
		.productimg{
			width : 100px;
		}
	}
</style>
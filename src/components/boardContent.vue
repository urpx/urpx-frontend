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
			  <td>{{ props.index + 1 }}</td>
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
				img : "http://gdimg.gmarket.co.kr/1507538029/still/160?ver=0",
				name : "코카콜라250ml"
			},
			{
				img : "http://gdimg.gmarket.co.kr/1112652990/still/160?ver=1544589650",
				name : "홍삼보운"
			},
			{
				img : "http://gdimg.gmarket.co.kr/966567971/still/160?ver=1555999403",
				name : "참존 마유크림 엑스트라 골든컴플렉스"
			},
			{
				img : "http://gdimg.gmarket.co.kr/1216642161/still/160?ver=1514905503",
				name : "포카리스웨트 분말"
			},
			{
				img : "http://gdimg.gmarket.co.kr/1486631715/still/160?ver=1561286178",
				name : "맥심카누콜롬비아블랜드마일드로스트아메리카노"
			},
			{
				img : "http://gdimg.gmarket.co.kr/1482460053/still/160?ver=1535095442",
				name : "하루홍삼"
			},
			{
				img : "http://gdimg.gmarket.co.kr/1543141243/still/160?ver=1546584557",
				name : "뉴트리팩"
			},
			{
				img : "http://gdimg.gmarket.co.kr/1284603631/still/160?ver=0",
				name : "육개장 컵라면"
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
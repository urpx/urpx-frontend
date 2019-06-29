<template>
	<div class ="home-container" >
		<span class="display-1 font-weight-bold">월 별 판매량 최다 품목</span>
			<v-container fluid grid-list-md >
			  <v-layout row wrap>
				<v-flex xs4 sm3 md2 lg2 xl1
				  v-for="(card, idx) in cardItem"
				  :key="idx"
				>
							<v-img
					  :src="card.image_200px"
				
					></v-img>
					<!-- {{ card.image_100px }} -->
				</v-flex>
			  </v-layout>
			</v-container>
		<span class="display-1 font-weight-bold">나의 지출</span>
		<homeCard />
		
	</div>
</template>

<script>
import homeCard from './homeComponents/homeCard'
import moment from 'moment'
	
  export default {
    components: {
      homeCard
    },
	data : () => ({
		cardItem : []
	}),
	methods : {
		  getData(){
			let date = moment().format()

			let query = {
				offset : 0,
				count : 9
			}

			let year = moment(date).year()
			let month = moment(date).month()

			year = 2019
			month = 4
			
			this.$http.get(`/api/products/amount/${year}/${month}`, {params : query}).then((res) => {
				this.cardItem = res.data
				if(this.cardItem.length){
					
					
				}else{
					date = moment(date).subtract(1, 'month')
				}
			})
			.catch((e) => {
			
				alert("사진 받기 실패")
				
			})

	  }
	  
  },
	mounted(){
		this.$EventBus.$on('auth-token', () => {  this.getData()});

	}
//online ide 만들기 코딩 채점 테스트 환경 만들기
	  
  }
</script>

<style lang="scss" scoped>
	.top-container{
		max-height : 210px !important;
	}

	.home-container{
		.top-container{
			margin : 2rem 0;
		}
	}
	
</style>
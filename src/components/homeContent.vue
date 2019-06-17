<template>
	<div class ="home-container" >
		<span class="display-1 font-weight-bold">월 별 판매량 최다 품목</span>
		<v-flex xs12 md12 class="top-container">
		  <v-card>
			<v-container v-bind="{ [`grid-list-md`]: true }" fluid>
			  <v-layout row wrap>
				<v-flex
				  v-for="n in 9"
				  :key="n"
				  xs4
				>
		
					<v-img
					  :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
					  height="150px"
					></v-img>

				</v-flex>
			  </v-layout>
			</v-container>
		  </v-card>
		</v-flex>
		<span class="display-1 font-weight-bold">나의 지출</span>
		<homeCard />
		
	</div>
</template>

<script>
import homeCard from './homeComponents/homeCard'
  export default {
    components: {
      homeCard
    }
  }
</script>

<style lang="scss" scoped>

	.home-container{
		.top-container{
			margin : 2rem 0;
		}
	}
	
</style>
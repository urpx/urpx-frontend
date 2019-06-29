<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex class="card-section" xs12 sm12 md12 lg6 xl4>
		<v-btn class="toggle-button" outline color="indigo" @click='toggleMsg = !toggleMsg; drawGraph()'> {{buttonMsg }} </v-btn>
		<GChart class="spendchart"
		  type="ColumnChart"
		  :data="chartData"
		  :options="chartOptions"
		/> 
    </v-flex>
    <v-flex class="card-section" xs12 sm12 md12 lg6 xl4>
	  <v-data-table
		:headers="headers"
		:items="rowItems"
		:rows-per-page-items = [6]
		class="elevation-1"
	  >
		<template v-slot:items="props">
        <td>{{ props.item.created_at }}</td>
        <td class="text-xs-left">{{ props.item.amount }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
	
		</template>
	  </v-data-table>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>

  import { GChart } from 'vue-google-charts'
  import Moment from 'moment';
  import { extendMoment } from 'moment-range';

  const moment = extendMoment(Moment);
	
  export default {
	components : {
	  GChart	
	},
    data: () => ({
	  toggleMsg : true,
      chartData: [["Date", "Value"]],
      chartOptions: {
		legend: { position: "none" },
      },
	  rowItems : [],
   headers: [
          {
            text: 'Record Time',
            align: 'left',
            sortable: false,
            value: 'created_at'
          },
          { text: 'Amount', value: 'value' ,sortable : false},
          { text: 'Description', value: 'description' ,sortable : false },
        ],
    }),
	computed:{
		buttonMsg(){
			return (this.toggleMsg ? '5일' : '5개월')
		}
	},
	methods:{
	  drawGraph(){
		  
		  this.chartData = []
		  //toggleMsg true면 5일치에 대한 차트 계산 false면 5개월치에 대한 차트 계산
		  let criteriaMsg = this.toggleMsg ? 'days' : 'months';
		  let criteriaFormat = this.toggleMsg ? 'YYYY/MM/DD' : 'YYYY/MM';
		  
		  let today = moment().format(criteriaFormat)
		  let todayplus = moment(today).add(criteriaMsg, 1)
		  
		  
		  for(let i = 0 ; i< 5; i++){
			let range = moment.range(moment(today).subtract(criteriaMsg, i),moment(todayplus).subtract(criteriaMsg, i))
			let graphArray = [], graphValue = 0
			graphArray.push(moment(today).subtract(criteriaMsg, i).format(criteriaFormat))

			this.rowItems.forEach((v, i) => {
				let day = moment(v.created_at, criteriaFormat)
				if(range.contains(day, { excludeEnd: true })){
					graphValue += Number(v.amount)
				}
			})
			graphArray.push(graphValue)  
			this.chartData.unshift(graphArray)

		  }  
		  
		  this.chartData.unshift(["Date", "Value"])
	  },
	  getData(){
		  
		this.rowItems = []
		this.$http.get(`/api/expenses`).then((res) => {
			res.data.forEach((v, i) => {
				v.created_at = this.timeformat(v.created_at)
			})
			this.rowItems = res.data
			this.drawGraph()
		})
		.catch((e) => {
			
		})
	  },
	  timeformat(time){
		  	
			Number.prototype.padLeft = function(base,chr){
			   var  len = (String(base || 10).length - String(this).length)+1;
			   return len > 0? new Array(len).join(chr || '0')+this : this;
			}	
			// 			UTC to KR +9hour
			var tmp = new Date(time)
			tmp.setHours(tmp.getHours() + 9);
			
			var d = tmp,
			
			dformat = [ d.getFullYear(),
			(d.getMonth()+1).padLeft(),
			d.getDate().padLeft()].join('/')+
			' ' +
		  [ d.getHours().padLeft(),
			d.getMinutes().padLeft(),
			d.getSeconds().padLeft()].join(':');
		  return dformat

	  }
	},
	  
	mounted(){
		this.$EventBus.$once('auth-token', () => { this.getData()});

	}
  }
</script>

<style lang="scss" scoped>
	.container{
		padding : 1.5rem 0;
		
		.card-section{
		
			position : relative;
			border:	1px solid #dddddd;
			border-radius : 10px;
			margin-bottom : 1.5rem;
			
			.toggle-button{
				position : absolute;
				z-index : 5 !important;
			}
			
			.spendchart{
				height : 400px;
			}
			.elevation-1{
				box-shadow : none !important;
			}
		}
	}
	
</style>
<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex class="card-section" xs12 sm12 md12 lg6 xl4>
		<v-btn class="toggle-button" outline color="indigo" @click='drawGraph(); toggleMsg = !toggleMsg'> {{buttonMsg }} </v-btn>
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
		  
		  if(this.toggleMsg){
			  //5일치에 대한 차트 계산
			  //https://stackoverflow.com/questions/10430321/how-to-parse-a-dd-mm-yyyy-or-dd-mm-yyyy-or-dd-mmm-yyyy-formatted-date-stri
			  
			  var today = moment().format('L')
			  var todayplus = moment(today).add(1,'days')
			  
			  for(let i = 0 ; i< 5; i++){
				let range = moment.range(moment(today).subtract(i, 'days'),moment(todayplus).subtract(i, 'days'))
				let graphArray = [], graphValue = 0
				graphArray.push(moment(today).subtract(i, 'days').format('YYYY/MM/DD'))
				  
				this.rowItems.forEach((v, i) => {
					var day = moment(v.created_at, "YYYY/MM/DD")
					if(range.contains(day, { excludeEnd: true })){
						graphValue += Number(v.amount)
					}
				})
				graphArray.push(graphValue)  
				this.chartData.unshift(graphArray)
				
			  }  
		  }else{
			  //5개월치에 대한 차트 계산
		  }
		  this.chartData.unshift(["Date", "Value"])
		  console.log(this.chartData)
	  },
	  getData(){
		  
		this.rowItems = []
		this.$http.get(`/api/expenses`).then((res) => {
			console.log(res)
			res.data.forEach((v, i) => {
				v.created_at = this.timeformat(v.created_at)
			})
			this.rowItems = res.data.reverse()
			console.log(this.rowItems)
			this.drawGraph()
		})
		.catch((e) => {
			alert("서버오류")
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
		this.getData()
		
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
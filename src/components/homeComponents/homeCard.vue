<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex class="card-section" xs12 sm12 md12 lg6 xl4>
		<v-btn class="toggle-button" outline color="indigo" @click='drawGraph'> {{buttonMsg }} </v-btn>
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
  import moment from 'moment'
	
  export default {
	components : {
	  GChart	
	},
    data: () => ({
	  toggleMsg : true,
      chartData: [
        ["Year", "Value"],
        ["2014-08", 1000],
        ["2015-07", 1170],
        ["2016-06", 660],
        ["2017-05", 1030],
		["2018-06", 200]  
      ],
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
          { text: 'Amount', value: 'value' },
          { text: 'Description', value: 'description' },
        ],
    }),
	computed:{
		buttonMsg(){
			return (this.toggleMsg ? '5일' : '5개월')
		}
	},
	methods:{
	  drawGraph(){
		  this.toggleMsg = !this.toggleMsg
		  if(this.toggleMsg){
			  //5일치에 대한 차트 계산
			  //https://stackoverflow.com/questions/10430321/how-to-parse-a-dd-mm-yyyy-or-dd-mm-yyyy-or-dd-mmm-yyyy-formatted-date-stri
			 
			  
		  }else{
			  //5개월치에 대한 차트 계산
		  }
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
            //UTC to KR +9hour
			
			var d = new Date(time),
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
				z-index : 9999 !important;
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
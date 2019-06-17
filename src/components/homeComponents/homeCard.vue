<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12 lg6 xl4>
	<GChart class="spendchart"
	  type="ColumnChart"
	  :data="chartData"
	  :options="chartOptions"
	/> 
    </v-flex>
    <v-flex xs12 sm12 md12 lg6 xl4>
	  <v-data-table
		:headers="headers"
		:items="desserts"
		class="elevation-1"
	  >
		<template slot="headerCell" slot-scope="props">
		  <v-tooltip bottom>
			<template v-slot:activator="{ on }">
			  <span v-on="on">
				{{ props.header.text }}
			  </span>
			</template>
			<span>
			  {{ props.header.text }}
			</span>
		  </v-tooltip>
		</template>
		<template v-slot:items="props">
		  <td class="text-xs-left">{{ props.item.time }}</td>
		  <td class="text-xs-left">{{ props.item.value }}</td>
		  <td class="text-xs-left">{{ props.item.description }}</td>
	
		</template>
	  </v-data-table>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>

  import { GChart } from 'vue-google-charts'
	
  export default {
	components : {
	  GChart	
	},
    data: () => ({
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
   headers: [
          {
            text: 'Record Time',
            align: 'left',
            sortable: false,
            value: 'time'
          },
          { text: 'Amount', value: 'value' },
          { text: 'Description', value: 'description' },
        ],
        desserts: [
          {
            time : '2014-09-07 08:10:26',
            value : 10000,
            description : '슈넬치킨 맛있다.',
          },
          {
            time : '2014-09-06 08:10:16',
            value : 20000,
            description : '근데 집에 가고 싶다.',
          },

        ]
    }),
	methods:{

	},
	  
	mounted(){
	
	}
  }
</script>

<style lang="scss" scoped>

	.spendchart{
		height : 400px;
	}
	
</style>
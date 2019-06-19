<template>
	<div class ="expense-container" >
		<span class="display-1 font-weight-bold">지출 관리</span>
		<v-container xs12 md12 lg12 xl8 class="expense-container-inner">
			<v-layout row wrap>
			<v-form ref="form" v-model="valid"  row wrap class = "form-validation">
			  <v-flex xs12 sm4 md4>
				<v-text-field
				  label="금액"
				  v-model="addItem.value"
				  :rules="valueRules"
				  outline
				  required
				></v-text-field>
			  </v-flex>
			  <v-flex xs12 sm8 md8>
				<v-text-field
				  label="설명"
				  v-model="addItem.description"
				  outline
				></v-text-field>
			  </v-flex>
			  
			  <v-btn :disabled = "!valid" color="success" @click="save" >전송</v-btn>
			</v-form>
				
			
			</v-layout>
		</v-container>
		 
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.value" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.description" label="Calories"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="rowItems"
	  :rows-per-page-items = [20]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.time }}</td>
        <td class="text-xs-left">{{ props.item.value }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
	</div>
</template>
		


<script>
  export default {
    data: () => ({
      dialog: false,
	  valid : true,
      headers: [
        {
          text: 'Record Time',
          align: 'left',
          sortable: false,
          value: 'time'
        },
        { text: 'Amount', value: 'value', sortable : false },
        { text: 'Description', value: 'description', sortable:false },
      ],
      rowItems: [],
	  valueRules : [
		v => !!v || '금액을 적어주세요',
		v => !isNaN(v) || '숫자를 입력해주세요'
	  ],
      editedIndex: -1,
      addItem: {
        time: '',
        value: '',
        description: '',

      },
      editedItem: {
        time: '',
        value: '',
        description: '',

      },
      defaultItem: {
        time: '',
        value: '',
        description: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.rowItems = [
          {
            time : '2014-09-07 08:10:26',
            value : 10000,
            description : '슈넬치킨 맛있다.',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.rowItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.rowItems.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.rowItems.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
		  this.addItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
		  this.$refs.form.resetValidation()
        }, 300)
      },

      save () {
		  
        if (this.$refs.form.validate()) {
          this.snackbar = true
        } 
		 
        if (this.editedIndex > -1) {
		  // 수정할경우
		  this.editedItem.time = this.timeformat('2019-06-19T13:09:15.132Z')
          Object.assign(this.rowItems[this.editedIndex], this.editedItem)
        } else {
          //새로 추가할경우
		  this.addItem.time= this.timeformat('2019-06-19T13:09:15.132Z')
          this.rowItems.unshift(this.addItem)
        }
		this.$refs.form.resetValidation()
        this.close()
		
		
		console.log(this.rowItems)
      },
	  
	  timeformat(time){
			Number.prototype.padLeft = function(base,chr){
			   var  len = (String(base || 10).length - String(this).length)+1;
			   return len > 0? new Array(len).join(chr || '0')+this : this;
			}
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
		console.log(this.timeformat('2019-06-19T13:09:15.132Z'))
	}
  }
</script>
</script>

<style lang="scss" scoped>
	
.expense-container-inner{
	padding : 1rem 0;

	.form-validation{
		width : 100%;
		display : flex;
		flex-flow: row wrap;

	}
	.v-btn{
		margin : 0;
	}
}

	
</style>
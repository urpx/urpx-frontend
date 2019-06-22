<template>
	<div class ="expense-container" >
		<span class="display-1 font-weight-bold">지출 관리</span>
		<v-container xs12 md12 lg12 xl8 class="expense-container-inner">
			<v-layout row wrap>
			<v-form ref="form" v-model="valid"  row wrap class = "form-validation">
			  <v-flex xs12 sm4 md4>
				<v-text-field
				  label="금액"
				  v-model="addItem.amount"
				  :rules="amountRules"
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
                  <v-text-field v-model="editedItem.amount" label="Dessert name"></v-text-field>
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
	  :rows-per-page-items = [15]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.created_at }}</td>
        <td class="text-xs-left">{{ props.item.amount }}</td>
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
          value: 'created_at'
        },
        { text: 'Amount', value: 'amount', sortable : false },
        { text: 'Description', value: 'description', sortable:false },
      ],
      rowItems: [],
	  amountRules : [
		v => !!v || '금액을 적어주세요',
		v => !isNaN(v) || '숫자를 입력해주세요'
	  ],
      editedIndex: -1,
      addItem: {
        created_at: '',
        amount: '',
        description: '',
		id : '',

      },
      editedItem: {
        created_at: '',
        amount: '',
        description: '',
		id : '',

      },
      defaultItem: {
        created_at: '',
        amount: '',
        description: '',
		id : '',
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

      editItem (item) {
        this.editedIndex = this.rowItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.rowItems.indexOf(item)
		let id = item.id
		if(confirm('Are you sure you want to delete this item?')){
			this.$http.delete(`/api/expenses/${id}`, ).then((res) => {
				this.rowItems.splice(index, 1)
			})
		} 
		  
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
          this.editData()
        } else {
          //새로 추가할경우
		  this.sendData()
        }
		this.$refs.form.resetValidation()
      },
	  getData(){
		  
		this.rowItems = []
		this.$http.get(`/api/expenses`).then((res) => {
			res.data.forEach((v, i) => {
				v.created_at = this.timeformat(v.created_at)
			})
			this.rowItems = res.data.reverse()
		})
		.catch((e) => {
			alert("서버 오류")
		})
	  },
	  sendData(){
		let data = {
			description : this.addItem.description,
			amount : Number(this.addItem.amount)
		}  
		this.$http.post(`/api/expenses`, data).then((res) => {
			this.addItem = res.data;
			this.addItem.created_at = this.timeformat(res.data.created_at)
			this.rowItems.unshift(this.addItem)
			this.addItem = Object.assign({}, this.defaultItem)
			
			this.$refs.form.resetValidation()
		})
		.catch((e) => {
			alert("서버 오류")
		})
	  },
	  editData(){
		  
		let data = {
			description : this.editedItem.description,
			amount : Number(this.editedItem.amount),
		}  
		let id = this.editedItem.id
		  
		this.$http.put(`/api/expenses/${id}`, data).then((res) => {

			Object.assign(this.rowItems[this.editedIndex], this.editedItem)
			this.close()
		})
		.catch((e) => {
		
			alert("서버 오류")
		})
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
		this.getData()
		// this.$EventBus.$on('auth-token', () => {this.getData() });

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
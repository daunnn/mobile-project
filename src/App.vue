<template>
  <div id="app">
    
    <TodoHeader></TodoHeader>
    <p > 오늘 날짜 : {{today_info}} </p>
    <p v-if="showdday"> {{newwork}} 
    D-{{elapsedDay}} </p>

     <!--d-day-->
    <button @click="ddayTodo()" type="button">d-day</button>


     <button @click="removedday()" >
          <i class="addBtn fas fa-times" ></i>
      </button>

     <modal v-if="ddayModify">
       <span slot="footer" > 할 일의 마감기한을 설정해주세요.
        <h1></h1> 
        <input type="text" placeholder="할 일" v-on:change="setwork" class="shadow"> 
        <h1></h1> 
        <input type="date" v-on:change="setdday">
           <button @click="ddayModify = false" >
              <i class="addBtn fas fa-times" aria-hidden="true"></i>
           </button>
          </span>
      </modal>


    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="filter_search_push" @removeTodo="removeTodo" @toggleTodo="toggleTodo"
    @modifyTodo="modifyTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>

  <!-- 카테고리 필터링 부분 수정중 !!!-->
  <form class="s-form">
    <select v-model="option" @change="filter_search">
      <option value="undefined">-선택-</option>
      <option value="All">All</option>
      <option value="식단">식단</option>
      <option value="운동">운동</option>
    </select> <!-- {{option}}-->
  </form>

   <input class="stage-search" type="text" v-model="search" @keyup.enter="filter_search" placeholder="검색"  />


  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import dayjs from 'dayjs'
import Modal from './components/common/AlertModal.vue'

export default {
  data() {
     const temp_today = dayjs().format("YYYY-MM-DD").split('-').map(str => Number(str));
     // const temp_deadline = dayjs("2022-04-13").format("YYYY-MM-DD").split('-').map(str => Number(str)); 
    return {
      todoItems: [], //todos

      option:'',

      filter_search_push:[],

      search : '',
      today_info : dayjs().format("YYYY-MM-DD"), // 오늘 날짜

      
      // 날짜를 초로 변경
      today : new Date(temp_today[0], temp_today[1], temp_today[2]).getTime(),
      // deadline: new Date(temp_deadline[0], temp_deadline[1], temp_deadline[2]).getTime(),
      elapsedDay: '',

      ddayModify: false,
      showdday:false,

      newdday: '',
      newwork: '',
      deadline:'',


    }
  },
  methods: {
    removedday(){
      localStorage.removeItem(localStorage.key('dday_info'));
      this.showdday = false;

    },
    setdday(e){
      this.newdday = e.target.value; // 입력 받은 날짜를 newdday에 할당
      const newdday_str = this.newdday.split('-').map(str => Number(str)); // 계산 format으로 변경

      this.deadline = new Date(newdday_str[0], newdday_str[1], newdday_str[2]).getTime(); // 초로 변경
      
          //d-day 계산
       const elapsedMSec = this.deadline - this.today;
       this.elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
      this.showdday = true;
      this.ddayModify = false;
      var dday_info ={work:this.newwork, dday:this.elapsedDay};
      localStorage.setItem('dday_info',JSON.stringify(dday_info));
      

    },

    setwork(e){
     return this.newwork=e.target.value;
    },
    ddayTodo(){
      this.ddayModify = !this.ddayModify;
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, diet_exer, cate, attri, amount, calorie) {
      
      var obj={completed: false, item: todoItem, diet_exer:diet_exer, category:cate, attribute: attri, amount: amount,
               calorie: calorie};
			localStorage.setItem(todoItem, JSON.stringify(obj));
			this.todoItems.push(obj);
      this.filter_search_push=this.todoItems;
		},
    removeTodo(todo, index) {
      localStorage.removeItem(todo.item);
      this.todoItems.splice(index, 1);
      this.filter_search_push=this.todoItems;
    },
    toggleTodo(todo, index){
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todo.item);
      localStorage.setItem(todo.item, JSON.stringify(todo));
    },
    modifyTodo(todo, index, newitem){
      localStorage.removeItem(todo.item);
      this.todoItems[index].item = newitem;
      localStorage.setItem(newitem, JSON.stringify(todo));
    },
    filter_search(){
      var filter_search_data = [];
      this.filter_search_push=[];

      // 검색 기능
      for (var m = 0; m < this.todoItems.length; m++){
        if (this.todoItems[m].item.includes(this.search)) {
          filter_search_data.push(this.todoItems[m]);
        } 

      }this.filter_search_push=filter_search_data;

      // 필터 기능
      if (this.option=='식단'){
        filter_search_data = [];
        for (var i=0; i<this.todoItems.length; i++){
          if (this.todoItems[i].diet_exer.includes('식단')){
            filter_search_data.push(this.todoItems[i]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='운동'){
        filter_search_data = [];
        for (var j=0; j<this.todoItems.length; j++){
          if (this.todoItems[j].diet_exer.includes('운동')){
            filter_search_data.push(this.todoItems[j]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='All'){ 
        filter_search_data = [];
        for (var k=0; k<this.todoItems.length; k++){
          filter_search_data.push(this.todoItems[k]);
        }
      }this.filter_search_push=filter_search_data;

    }
  },
  created() {

		if (localStorage.length > 0) {
      
			for (var i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) != 'dday_info'){
        var temp =JSON.parse(localStorage.getItem(localStorage.key(i)))
        this.todoItems.push(temp);
        this.filter_search_push.push(temp);
			}else{
        if(localStorage.key(i).length>0){
          this.showdday = true
        var temps = localStorage.getItem(localStorage.key(i));
        
        // console.log(temps.substring(temps.indexOf('dday')+6,temps.length-1))
        this.newwork = temps.substring(temps.indexOf('work')+7,temps.indexOf(',')-1)

        this.elapsedDay = temps.substring(temps.indexOf('dday')+6,temps.length-1)
        

        }
      }
      }
		}
    
   
    
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
     Modal : Modal
  }
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
</style>

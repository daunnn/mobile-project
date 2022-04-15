<template>
  <div id="app">
    <TodoHeader></TodoHeader>
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
   <button @click="TodoCompletePer()" type="button" >진행상황 퍼센트</button>{{todo_per}}
   
   <!-- vue-chartkick 이용-->
   <bar-chart :data="chartData" width="300" height="300" min="0" max="1"></bar-chart>
   <button @click="updateChart()">차트 업데이트</button>

   
  </div>

</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  name: 'app',
  data() {
    return {

      todoItems: [], //todos

      option:'',
      filter_search_push:[],
      search : '',

      todo_per : 0,
      todo_per2 : 0,

      chartData:{
        'percentage': 0
      }
    }
  },
  methods: {
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
    },
    TodoCompletePer(){
      this.todo_per = 0;
      var count = 0;
      for (var i=0; i<this.todoItems.length; i++){
          if (this.todoItems[i].completed == true){
            count = count + 1;
          }
    } this.todo_per = count / this.todoItems.length;
      this.todo_per = this.todo_per.toFixed(3);
      this.todo_per2 = this.todo_per;
    },
    updateChart(){
      this.chartData = {
        'percentage': parseFloat(this.todo_per2)
      }
    }

  },
  created() {
    
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        var temp =JSON.parse(localStorage.getItem(localStorage.key(i)))
        this.todoItems.push(temp);
        this.filter_search_push.push(temp);
			}
		}
    /*console.log(this.todoItems)*/
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
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

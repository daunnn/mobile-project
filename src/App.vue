<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="filter_search_push" @removeTodo="removeTodo" @toggleTodo="toggleTodo"
    @modifyTodo="modifyTodo"></TodoList>{{todo_per2}} {{calorie}} {{total_cal}}
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>

  <!-- 카테고리 필터링 -->
  <button @click="clickDiet">식단</button>
  <button @click="clickExer">운동</button>
  
  <!--식단버튼을 누르면 (true)-->
  <form class="s-form" v-if="click_diet">
    <select v-model="option" @change="filter_search">
      <option value="undefined">-선택-</option>
      <option value="All">All</option>
      <option value="아침">아침</option>
      <option value="점심">점심</option>
      <option value="저녁">저녁</option>
      <option value="탄수화물">탄수화물</option>
      <option value="단백질">단백질</option>
      <option value="지방">지방</option>
    </select> <!-- {{option}}-->
  </form>

  <!--운동버튼을 누르면 (true)-->
  <form class="s-form" v-if="click_exer">
    <select v-model="option" @change="filter_search">
      <option value="undefined">-선택-</option>
      <option value="All">All</option>
      <option value="유산소">유산소</option>
      <option value="무산소">무산소</option>
      <option value="스트레칭">스트레칭</option>
    </select> <!-- {{option}}-->
  </form>

   <input class="stage-search" type="text" v-model="search" @keyup.enter="filter_search" placeholder="검색"  />
   
   <!-- vue-chartkick 이용-->
   <bar-chart :data="chartData"  width="300" height="300" min="0" max="1"></bar-chart> <!--:data="chart"-->
   <bar-chart :data="chartData1" width="300" height="300" min="0" :max="total_cal"></bar-chart> <!-- :data="chart1"  -->

   
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

      click_diet : false,
      click_exer : false,

      calorie:0,
      total_cal:0,

      chartData:{
        'percentage': 1
      },
      chartData1:{
        'calorie': 1
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
      // 완료 기능
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todo.item);
      localStorage.setItem(todo.item, JSON.stringify(todo));

      // 진행상황 퍼센트 및 칼로리 업데이트
      this.todo_per = 0;
      var count = 0;
      this.calorie = 0;
      this.total_cal = 0;

      for (var i=0; i<this.todoItems.length; i++){
          if (this.todoItems[i].completed == true){
            count = count + 1;
          }
          if (this.todoItems[i].diet_exer.includes('식단')){
            this.total_cal = this.total_cal + parseInt(this.todoItems[i].calorie);
            if (this.todoItems[i].completed == true){
              this.calorie = this.calorie + parseInt(this.todoItems[i].calorie);
            }
          }
    } this.todo_per = count / this.todoItems.length;
      this.todo_per = this.todo_per.toFixed(3);
      this.todo_per2 = this.todo_per;

      // 차트 업데이트
      this.chartData = {
        'percentage': parseFloat(this.todo_per2)
      }
      this.chartData1 = {
        'calorie': parseInt(this.calorie)
      }

      // 로컬 스토리지 저장
      localStorage.setItem('todo 퍼센트', parseFloat(this.todo_per2) );
      localStorage.setItem('calorie', parseInt(this.calorie) );
      localStorage.setItem('total_calorie', parseInt(this.total_cal) );


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
      if (this.option=='아침'){
        filter_search_data = [];
        for (var i=0; i<this.todoItems.length; i++){
          if (this.todoItems[i].category.includes('아침')){
            filter_search_data.push(this.todoItems[i]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='점심'){
        filter_search_data = [];
        for (var j=0; j<this.todoItems.length; j++){
          if (this.todoItems[j].category.includes('점심')){
            filter_search_data.push(this.todoItems[j]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='저녁'){
        filter_search_data = [];
        for (var a=0; a<this.todoItems.length; a++){
          if (this.todoItems[a].category.includes('저녁')){
            filter_search_data.push(this.todoItems[a]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='탄수화물'){
        filter_search_data = [];
        for (var b=0; b<this.todoItems.length; b++){
          if (this.todoItems[b].attribute.includes('탄수화물')){
            filter_search_data.push(this.todoItems[b]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='단백질'){
        filter_search_data = [];
        for (var c=0; c<this.todoItems.length; c++){
          if (this.todoItems[c].attribute.includes('단백질')){
            filter_search_data.push(this.todoItems[c]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='지방'){
        filter_search_data = [];
        for (var d=0; d<this.todoItems.length; d++){
          if (this.todoItems[d].attribute.includes('지방')){
            filter_search_data.push(this.todoItems[d]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='유산소'){
        filter_search_data = [];
        for (var e=0; e<this.todoItems.length; e++){
          if (this.todoItems[e].category.includes('유산소')){
            filter_search_data.push(this.todoItems[e]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='무산소'){
        filter_search_data = [];
        for (var f=0; f<this.todoItems.length; f++){
          if (this.todoItems[f].category.includes('무산소')){
            filter_search_data.push(this.todoItems[f]);
        }
      }this.filter_search_push=filter_search_data;
      }
      else if (this.option=='스트레칭'){
        filter_search_data = [];
        for (var g=0; g<this.todoItems.length; g++){
          if (this.todoItems[g].category.includes('스트레칭')){
            filter_search_data.push(this.todoItems[g]);
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
    clickDiet(){
      this.click_diet = !this.click_diet;
    },
    clickExer(){
      this.click_exer = !this.click_exer;
    }

  },
  created() {
    
		if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i)=='todo 퍼센트'){
          this.todo_per2 = JSON.parse(localStorage.getItem(localStorage.key(i)));
          console.log(typeof this.todo_per2);
          console.log(this.todo_per2);
        }else if(localStorage.key(i)=='calorie') {
          this.calorie = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }else if(localStorage.key(i)=='total_calorie') {
          this.total_cal = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }else{
            var temp =JSON.parse(localStorage.getItem(localStorage.key(i)));
            this.todoItems.push(temp);
            this.filter_search_push.push(temp);
        }
      }
    }
    // 자동으로 차트 업데이트
    this.chartData = {
        'percentage': parseFloat(this.todo_per2)
      }
    this.chartData1 = {
        'calorie': parseInt(this.calorie)
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

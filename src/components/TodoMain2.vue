<template>
 
  <div id="app">

    <v-card>
    <v-toolbar
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      absolute style="right: 0px; "
      dark
      height="45px"
      scroll-target="#scrolling-techniques-6"
    >
      <v-toolbar-title>
        <input color='white' class="stage-search" type="text" v-model="search" @keyup.enter="filter_search" placeholder="검색"  />
      </v-toolbar-title>

      
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <vid class="material-icons" @click="collapseOnScroll=!collapseOnScroll">search</vid>

      
    </v-toolbar>
    </v-card>


    <TodoHeader></TodoHeader>

  



      <div data-app>
  <v-layout class="boxOuter" align-end style="position: fixed; top: 10px;">
    <!-- <v-row align="end"> -->
       <!-- <v-col
        class="d-inline"
        cols="2"
        sm="5"
      >  -->
        <v-select
          :items="d_items"
          v-model="option"
          @change="filter_search"
          label="식단"
          dense
          solo
          
        ></v-select>

        <v-select
          :items="e_items"
          v-model="option"
          @change="filter_search"
          label="운동"
          dense
          solo
        ></v-select>
      <!-- </v-col> -->
    <!-- </v-row> -->
    </v-layout>
  </div>
    

    <TodoList v-bind:propsdata="filter_search_push" @removeTodo="removeTodo" @toggleTodo="toggleTodo"
    @modifyTodo="modifyTodo"></TodoList>


    <TodoInput @addTodo="addTodo" @addTodoDiet="addTodoDiet"></TodoInput>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
<!--
  <v-spacer></v-spacer>
  <v-btn @click=startCam> Cam </v-btn>

  <div id="cam"></div>
  <h1> {{message}} </h1>-->

  </div>



</template>

<script>
import TodoHeader from './TodoHeader.vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import TodoFooter from './TodoFooter.vue'
import dayjs from 'dayjs'


//import * as tf from '@tensorflow/tfjs'
//import * as tmImage from '@teachablemachine/image'


export default {
  name: 'app',
  
  data() {
     const temp_today = dayjs().format("YYYY-MM-DD").split('-').map(str => Number(str));
     // const temp_deadline = dayjs("2022-04-13").format("YYYY-MM-DD").split('-').map(str => Number(str)); 
    return {
      todoItems: [], //todos
      option:'',
      filter_search_push:[],
      search : '',
      // today_info : dayjs().format("MM/DD"), // 오늘 날짜
      
      // 날짜를 초로 변경
      today : new Date(temp_today[0], temp_today[1], temp_today[2]).getTime(),
      // deadline: new Date(temp_deadline[0], temp_deadline[1], temp_deadline[2]).getTime(),
      elapsedDay: '',
      ddayModify: false,
      showdday:false,
      newdday: '',
      newwork: '',
      deadline:'',
      todo_per : 0,
      todo_per2 : 0,
      click_diet : false,
      click_exer : false,
      calorie:0,
      total_cal:0,
      chartData:{
        'percent': 0
      },
      chartData1:{
        'calorie': 0
      },
      

      collapseOnScroll: false,

      d_items: ['All','식단','아침','점심','저녁','탄수화물','단백질','지방'],
      e_items: ['All','운동','유산소','무산소','스트레칭'],

      message:'식단 촬영',

      model:null,
      webcam:null,
      predicted:""

    };
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
      this.$router.push({path:"todo"});
      localStorage.clear();
      this.todoItems = [];
      this.temp=[];
      this.filter_search_push=[];

       // 차트 업데이트
      this.chartData = {
        'percent': 0
      }
      this.chartData1 = {
        'calorie': 0
      }
    },
		addTodo(todoItem, diet_exer, cate, attri, amount, calorie) {
      var obj={completed: false, item: todoItem, diet_exer:diet_exer, category:cate, attribute: attri, amount: amount,
               calorie: calorie, geoloca: ''};
			localStorage.setItem(todoItem, JSON.stringify(obj));
			this.todoItems.push(obj);
      this.filter_search_push=this.todoItems;
		},
    addTodoDiet(todoItem, diet_exer, cate, attri, amount, calorie){
      var obj={completed: false, item: todoItem, diet_exer:diet_exer, category:cate, attribute: attri, amount: amount,
               calorie: calorie, geoloca: ''};
      localStorage.setItem(todoItem, JSON.stringify(obj));
			this.todoItems.push(obj);
      this.filter_search_push=this.todoItems;
    },

    removeTodo(todo, index) {
      localStorage.removeItem(todo.item);
      this.todoItems.splice(index, 1);
      this.filter_search_push=this.todoItems;
    },
   toggleTodo(todo, index, geoloca_info){
      // 완료 기능
      this.todoItems[index].completed = !this.todoItems[index].completed;
      if (this.todoItems[index].completed==true && this.todoItems[index].diet_exer=='식단')
        {this.todoItems[index].geoloca = geoloca_info;}
      else{this.todoItems[index].geoloca='';}
      
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
          if (this.todoItems[i].diet_exer=="식단"){
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
        'percent': parseFloat(this.todo_per2)
      }
      this.chartData1 = {
        'calorie': parseInt(this.calorie)
      }

      // 로컬 스토리지 저장
      localStorage.setItem('todo 퍼센트', parseFloat(this.todo_per2) );
      localStorage.setItem('calorie', parseInt(this.calorie) );
      localStorage.setItem('total_calorie', parseInt(this.total_cal) );
    },
    modifyTodo(todo, index, newitem, newamount, newcate, newattri, newcal){
      localStorage.removeItem(todo.item);
      
      
      var obj={completed: this.todoItems[index].completed, item: newitem, diet_exer:this.todoItems[index].diet_exer, 
              category:newcate, attribute: newattri, amount: newamount, calorie: newcal};
      this.todoItems.splice(index, 1);
      this.todoItems.push(obj);
      this.filter_search_push=this.todoItems;
      
      localStorage.setItem(newitem, JSON.stringify(obj));
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
      }else if (this.option=='식단'){
        filter_search_data = [];
        for (var h=0; h<this.todoItems.length; h++){
          if (this.todoItems[h].diet_exer.includes('식단')){
            filter_search_data.push(this.todoItems[h]);
        }
      }this.filter_search_push=filter_search_data;
      }else if (this.option=='운동'){
        filter_search_data = [];
        for (var k=0; k<this.todoItems.length; k++){
          if (this.todoItems[k].diet_exer.includes('운동')){
            filter_search_data.push(this.todoItems[k]);
        }
      }this.filter_search_push=filter_search_data;
      }else if (this.option=='All'){ 
        filter_search_data = [];
        for (var l=0; l<this.todoItems.length; l++){
          filter_search_data.push(this.todoItems[l]);
        }
      }this.filter_search_push=filter_search_data;
    },
    clickDiet(){
      this.click_diet = !this.click_diet;
    },
    clickExer(){
      this.click_exer = !this.click_exer;
    }/*,
    async loop() {
      this.webcam.update(); // update the webcam frame
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      // predict can take in an image, video or canvas html element
      let prediction = await this.model.predictTopK(
        this.webcam.canvas,
        1,
        true
      );
      this.message = prediction[0].className;
    },
    async startCam() {
      this.webcam = new tmImage.Webcam(200, 200, true);
      await this.webcam.setup(); // request access to the webcam
      await this.webcam.play();
      document.getElementById("cam").appendChild(this.webcam.canvas);
      window.requestAnimationFrame(this.loop);
    }*/
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
        }else if(localStorage.key(i) != 'dday_info'){
            var temp =JSON.parse(localStorage.getItem(localStorage.key(i)));
            this.todoItems.push(temp);
            this.filter_search_push.push(temp);       
        }
        else{
        if(localStorage.key(i).length>0){
          this.showdday = true
        var temps = localStorage.getItem(localStorage.key(i));
        
        this.newwork = temps.substring(temps.indexOf('work')+7,temps.indexOf(',')-1)
        this.elapsedDay = temps.substring(temps.indexOf('dday')+6,temps.length-1)
      }
     }
    }
    // 자동으로 차트 업데이트
    this.chartData = {
        'percent': parseFloat(this.todo_per2)
        
      }
    this.chartData1 = {
        'calorie': parseInt(this.calorie)
        
      }
    /*console.log(this.todoItems)*/
    
   }  
  },
  
  /*async mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
    let baseURL = "https://teachablemachine.withgoogle.com/models/X-b-IdQJS/";
    this.model = await tmImage.load(
      baseURL + "model.json",
      baseURL + "metadata.json"
    );
    let maxPredictions = this.model.getTotalClasses();
    console.log(maxPredictions);
  },*/

  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
    
  }
}
</script>





<style>


@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Poor+Story&display=swap');

  p{
    position: fixed;
    font-size: 25px;
    top:50px;
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    border-style: dashed;
    text-align: center;

  }
  
.margins{
  font-family: 'Do Hyeon', sans-serif;
  margin-bottom: 10px;
  margin-left:50px;
  margin-top:10px;
}
.margin1{
  margin-top: 10px;
  margin-left:8px;
}
 
 .stage-search{
   color:white;
 }


  body {
    
    font-family: 'Do Hyeon', sans-serif;
    text-align: center;
    background-color: rgb(236, 242, 255);
  }
  
 
  input {
    font-family: 'Do Hyeon', sans-serif;
    border-style: groove;
    width: 200px;
  }
  .button1 {
    float:left; 
    margin-left:35px;
    display: inline;
    font-family: 'Do Hyeon', sans-serif;
    border-style: groove;
    margin-top : 4px;
   
  }
  .button2 {
    float:left;
    margin-left:5px; 
    display: inline;
    font-family: 'Do Hyeon', sans-serif;
    border-style: groove;
    margin-top : 4px;
   
  }

  span {
  font-family: 'Do Hyeon', sans-serif; 
  display: flex;
  max-width: 100%; 
  width: auto; 
  display: table;
  text-align: center;
  
}
  .shadow {
    font-family: 'Do Hyeon', sans-serif;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }

  .bar{

    
    font-family: 'Do Hyeon', sans-serif;
    position: relative;
    top:10px;

    width: 85%;
    height: 100px;
    border: 1px solid #dcdcdc;
    line-height: 50%; /* 세로 가운데 정렬 : line-height와 height값을 동일하게 처리합니다.*/ 
    text-align: center;
    display: inline-block; /* inline-block일때에만 가운데 정렬 가능 */ 
    padding: 10px;

  }
  .boxOuter {
  color: #7d37ff;
  height: 40px;
  width: 150px;
  float:right;
  /* margin-bottom: 30px; */
  position:relative;
  margin-top:40px;
  right:10px;
}

</style>
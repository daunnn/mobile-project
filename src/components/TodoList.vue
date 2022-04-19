<template>
  <section>
    <transition-group name="list" tag="ul">

      <li v-for="(todo, index) in propsdata" v-bind:key="todo.item" class="shadow">
        <i class="checkBtn fas fa-check" @click="toggleTodo(todo, index)" v-bind:class="{checkBtnCompleted: todo.completed}" aria-hidden="true"></i>
        <span @click="toggleTodo(todo, index)" v-bind:class="{textCompleted: todo.completed}"> 
          {{ todo.category }}      {{todo.item}}
        </span>


        <!--=================수정======================-->

        <span class="updateBtn" type="button" @click="edit(todo, index)">
          <i class="fas fa-pencil-alt" aria-hidden="true"></i> 
        </span>

        <modal v-if="showModify">
          <span slot ="header">

            <!--식단-->
            <div v-if="modifyTodo.diet_exer=='식단'">

            <input type="text" :value="todoItem" v-on:change="editItem"> <!--item 수정-->
            
            <v-btn class="buttons" v-if="clickbreak" color="rgb(115, 115, 115)" @click="[editCategory('아침'), clickCategory('아침')]">아침</v-btn>
            <v-btn class="buttons" v-if="!clickbreak" @click="[editCategory('아침'), clickCategory('아침')]">아침</v-btn>

            <v-btn class="buttons" v-if="clicklaunch" color="rgb(115, 115, 115)" @click="[editCategory('점심'), clickCategory('점심')]">점심</v-btn>
            <v-btn class="buttons" v-if="!clicklaunch" @click="[editCategory('점심'), clickCategory('점심')]">점심</v-btn>

            <v-btn class="buttons" v-if="clickeven" color="rgb(115, 115, 115)" @click="[editCategory('저녁'), clickCategory('저녁')]">저녁</v-btn>
            <v-btn class="buttons" v-if="!clickeven" @click="[editCategory('저녁'), clickCategory('저녁')]">저녁</v-btn>
        
        
            <v-btn class="buttons" v-if="clickcarbo" color="rgb(115, 115, 115)" @click="[editAttribute('탄수화물'), clickAttribute('탄수화물')]">탄수화물</v-btn>
            <v-btn class="buttons" v-if="!clickcarbo" @click="[editAttribute('탄수화물'), clickAttribute('탄수화물')]" >탄수화물</v-btn>

            <v-btn class="buttons" v-if="clickprotein" color="rgb(115, 115, 115)" @click="[editAttribute('단백질'), clickAttribute('단백질')]">단백질</v-btn>
            <v-btn class="buttons" v-if="!clickprotein" @click="[editAttribute('단백질'), clickAttribute('단백질')]" >단백질</v-btn>
        
            <v-btn class="buttons" v-if="clickfat" color="rgb(115, 115, 115)" @click="[editAttribute('지방'), clickAttribute('지방')]">지방</v-btn>
            <v-btn class="buttons" v-if="!clickfat" @click="[editAttribute('지방'), clickAttribute('지방')]" >지방</v-btn>


            <input type="text" :value="todoAmount" v-on:change="editAmount" class="shadow"><!--amount 수정-->
            <input type="text" :value="todoCal" v-on:change="editCal"> <!--calorie 수정-->

            <v-btn class="buttons" @click="submitEdit()">수정</v-btn>
            <v-btn class="buttons" @click="showModify = false" color="rgb(115,115,115)">
              <i class="addBtn fas fa-times" aria-hidden="true"></i>
            </v-btn>

            
            
           
            </div>

            <!--운동-->
            <div v-if="modifyTodo.diet_exer=='운동'">
            <input type="text" :value="todoItem" v-on:change="editItem"> <!--item 수정-->

            <v-btn class="buttons" v-if="clickaero" color="rgb(115, 115, 115)" @click="[editCategory('유산소'), clickCategory('유산소')]">유산소</v-btn>
            <v-btn class="buttons" v-if="!clickaero" @click="[editCategory('유산소'), clickCategory('유산소')]">유산소</v-btn>

            <v-btn class="buttons" v-if="clickana" color="rgb(115, 115, 115)" @click="[editCategory('무산소'), clickCategory('무산소')]">무산소</v-btn>
            <v-btn class="buttons" v-if="!clickana" @click="[editCategory('무산소'), clickCategory('무산소')]">무산소</v-btn>

            <v-btn class="buttons" v-if="clickstrech" color="rgb(115, 115, 115)" @click="[editCategory('스트레칭'), clickCategory('스트레칭')]">스트레칭</v-btn>
            <v-btn class="buttons" v-if="!clickstrech" @click="[editCategory('스트레칭'), clickCategory('스트레칭')]">스트레칭</v-btn>

            <input type="text" :value="todoAmount" v-on:change="editAmount" class="shadow"><!--amount 수정-->
            <input type="text" :value="todoCal" v-on:change="editCal"> <!--calorie 수정-->

            <v-btn class="buttons" @click="submitEdit()">수정</v-btn>
            <v-btn class="buttons" @click="showModify = false" color="rgb(115,115,115)">
              <i class="addBtn fas fa-times" aria-hidden="true"></i>
            </v-btn>
            
            </div>
            

          </span>
        </modal>

        <!--삭제-->
        <span class="removeBtn" type="button" @click="removeTodo(todo, index)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>


<script>
import Modal from './common/AlertModal.vue'
export default {
  data(){
    return{
      showModify: false,
      modifyTodo: {},
      modifyIndex: 0,
      todoItem:'',
      todoDietExer: '', //(식단/ 운동)
      todoCate: '', //(아침/ 유산소)
      todoAttri: '', //(탄단지/ )
      todoAmount: '', //(몇 g/ 운동 횟수)
      todoCal: '', //(칼로리/ 운동 시간)
      //수정한 내용 저장하는 변수들
      edititem: '',
      editamount: '',
      editattri: '',
      editcate: '',
      editcal:'',
      //카테고리 별 버튼 클릭 여부  
      clickbreak: false,
      
      clicklaunch: false,
      clickeven: false,
      clickaero: false,
      clickana: false,
      clickstrech: false,
      //attribute 버튼 클릭 여부
      clickcarbo: false,
      clickprotein: false,
      clickfat: false
    }
  },
  props: ['propsdata'],
  methods: {
    removeTodo(todo, index) {
      this.$emit('removeTodo', todo, index);
    },
    toggleTodo(todo, index){
      this.$emit('toggleTodo', todo, index);
    },
    edit(todo, index){
      this.showModify=!this.showModify;
      this.modifyTodo=todo;
      this.modifyIndex=index;
      this.todoDietExer = todo['diet_exer'];
      this.todoItem=todo['item'];
      this.todoCate = todo['category'];
      this.todoAttri = todo['attribute'];
      this.todoAmount = todo['amount'];
      this.todoCal = todo['calorie'];
      this.edititem=this.todoItem;
      this.editattri=this.todoAttri;
      this.editcate=this.todoCate;
      this.editcal=this.todoCal;
      this.editamount=this.todoAmount;
      this.edititem=this.modifyTodo['item'];
      //버튼 클릭 초기화
      this.clickbreak=this.clicklaunch=this.clickeven=this.clickaero=this.clickana=this.clickstrech=this.clickcarbo=this.clickprotein=this.clickfat=false;
  
      if (this.todoCate=="아침") this.clickbreak=true;
   
      else if (this.todoCate=="점심") this.clicklaunch=true;
      else if (this.todoCate=="저녁") this.clickeven=true;
      else if (this.todoCate=="유산소") this.clickaero=true;
      else if (this.todoCate=="무산소") this.clickana=true;
      else if (this.todoCate=="스트레칭") this.clickstrech=true;
      if (this.todoAttri=="탄수화물") this.clickcarbo=true;
      else if (this.todoAttri=="단백질") this.clickprotein=true;
      else if (this.todoAttri=="지방") this.clickfat=true;
      
    },
    editAttribute(attr){
      return this.editattri=attr;
    },
    editItem(e){
      this.edititem=e.target.value;
    },
    editAmount(e){
      this.editamount=e.target.value;
    },
    editCal(e){
      this.editcal=e.target.value;
    },
    editCategory(cate){      
      return this.editcate=cate;
    },
    //카테고리 선택 버튼 클릭 시 스타일 변화 위한 메소드
    clickCategory(str){
      if (str=='아침') this.clickbreak=!this.clickbreak;
      if (str=='점심') this.clicklaunch=!this.clicklaunch;
      if (str=='저녁') this.clickeven =! this.clickeven;
      if (str=='유산소') this.clickaero =! this.clickaero;
      if (str=='무산소') this.clickana =! this.clickana;
      if (str=='스트레칭') this.clickstrech =! this.clickstrech;
    },
    clickAttribute(str){
      if (str=='탄수화물') this.clickcarbo = ! this.clickcarbo;
      if (str=='단백질') this.clickprotein =! this.clickprotein;
      if (str=='지방') this.clickfat =! this.clickfat;
    },
    submitEdit(){
      
      this.$emit('modifyTodo', this.modifyTodo, this.modifyIndex, this.edititem, this.editamount,  this.editcate, this.editattri, this.editcal);
      this.showModify=!this.showModify;
    },
  },
  components: {
    Modal: Modal,
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }
  
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-left: 10px;
    margin-right: 20px;
  }
  .removeBtn {
    margin-left: 20px;
    color: #de4343;
  }
  .updateBtn{
    margin-left : auto;
    margin-right: 5px;
  }
  .checkBtnCompleted {
    color:#9b9898
  }
  .textCompleted {
    text-decoration: line-through;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  input:focus {
    outline: none;
  }

  span {
    display: flex;
    max-width: 100%;
    display: table;
  }

  .inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
  }
  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }



  .buttons{
    margin-top : 10px;
    margin-right:10px;
    margin-bottom: 5px;
    display:inline;
    padding:5px;
  }


  .texts{
    margin-top:10px;
    margin-bottom: 10px;
    margin-right:10px;
  }

  
</style>
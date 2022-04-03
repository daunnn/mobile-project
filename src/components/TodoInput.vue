<template>
  <div class="inputBox shadow">
  <button @click="DietExercise">Click to add list</button>
<!--  <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:click="DietExercise">
-->    <modal v-if="popup">
      <span slot="footer">식단, 운동 중 하나를 선택하세요.
        <h1></h1>  
        <button @click="diet" type="button">식단</button>
        <button @click="exer" type="button">운동</button>
 
       <button @click="popup = false">
        <i class="addBtn fas fa-times" aria-hidden="true"></i>
       </button>

      </span>
    </modal>

<!-- 식단 입력 부분 -->
    <modal v-if="showDiet" @close="showDiet = false">
      <span slot="footer">
        <input type="text" placeholder="type" v-on:change="setItem">
        <h1></h1> 
        <button @click="setCategory('아침')">아침</button>
        <button @click="setCategory('점심')">점심</button>
        <button @click="setCategory('저녁')">저녁</button>

        <button class="addContainer" v-on:click="addTodo">
           <i class="addBtn fas fa-check" aria-hidden="true"></i>
        </button> 

        <button @click="showDiet = false">
          <i class="addBtn fas fa-times" aria-hidden="true"></i>
          </button>
      </span>
    </modal>

<!-- 운동 입력 부분 -->
      <modal v-if="showExercise" @close="showExercise = false">
      <span slot="footer">
        <input type="text" placeholder="type" v-on:change="setItem">
        <h1></h1> 
        <button @click="setCategory('유산소')">유산소</button>
        <button @click="setCategory('무산소')">무산소</button>
        <button @click="setCategory('스트레칭')">스트레칭</button>

        <button class="addContainer" v-on:click="addTodo">
           <i class="addBtn fas fa-check" aria-hidden="true"></i>
        </button> 

        <button @click="showExercise = false" >
          <i class="addBtn fas fa-times" aria-hidden="true"></i>
          </button>
      </span>
    </modal>  

<!-- 아무것도 입력 안했을 때 경고 부분 -->
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>


  </div>
</template>

<script>
import Modal from './common/AlertModal.vue'
export default {
  data() {
    return {
      newTodoItem: '',
      category: '',
      popup: false,
      showModal: false,
      showDiet: false,
      showExercise: false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        var value = this.newTodoItem && this.newTodoItem.trim();
				this.$emit('addTodo', value, this.category);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;

      }
    },
    setItem(e){
      return this.newTodoItem=e.target.value;
    },
    setCategory(cate){
      return this.category=cate;
    },

    clearInput() {
      this.newTodoItem = '';
    },
    DietExercise(){
      this.popup=!this.popup;
    },
    diet(){
      this.showDiet=!this.showDiet;
      this.popup = !this.popup;
    },
    exer(){
      this.showExercise=!this.showExercise;
      this.popup = !this.popup;
    }
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
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
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: inline-block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
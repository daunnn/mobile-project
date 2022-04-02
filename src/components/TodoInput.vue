<template>
  <div class="inputBox shadow">  
  <input type="text" v-model="newTodoItem" placeholder="Type what you have to do" v-on:click="DietExercise">

    <modal v-if="popup">
      <span slot="footer">식단, 운동 중 하나를 선택하세요.
        <button @click="diet" type="button">식단</button>
        <button @click="exer" type="button">운동</button>
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>


    <modal v-if="showDiet" @close="showDiet = false">
      <span slot="footer">
        <input type="text" v-model="newTodoItem" placeholder="type" v-on:keyup="addTodo">
        <button @click="newTodoItem.item=='아침'">아침</button>
        <button @click="newTodoItem.item=='점심'">점심</button>
        <button @click="newTodoItem.item=='저녁'">저녁</button>
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
				this.$emit('addTodo', value)
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
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

<template>
  <section>
    
    <transition-group name="list" tag="ul">
      <li v-for="(todo, index) in propsdata" v-bind:key="todo.item" class="shadow">
        <i class="checkBtn fas fa-check" @click="toggleTodo(todo, index)" v-bind:class="{checkBtnCompleted: todo.completed}" aria-hidden="true"></i>
        <span @click="toggleTodo(todo, index)" v-bind:class="{textCompleted: todo.completed}"> 
          {{ todo.item }}
        </span>

        <!--수정-->
        <span class="updateBtn" type="button" @click="edit(todo, index)">
          <i class="fas fa-pencil-alt" aria-hidden="true"></i> 
        </span>
        <modal v-if="showModify">
          <span slot ="footer">
            <div class="inputBox shadow">
            <input type="text" placeholder="type modified contents" v-on:change="editTodo">
            <button @click="showModify = false" >
              <i class="addBtn fas fa-times" aria-hidden="true"></i>
            </button>
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
      editItem: ''

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
    },
    editTodo(e){
      this.editItem=e.target.value;
      this.$emit('modifyTodo', this.modifyTodo, this.modifyIndex, this.editItem);
      this.showModify=!this.showModify
    }

  },
  components: {
    Modal: Modal
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
    margin-right: 5px;
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
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
</style>

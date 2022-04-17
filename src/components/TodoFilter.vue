<template>
  <section>
 <!-- 카테고리 필터링 부분 수정중 !!!-->
  <form class="s-form">
    <select v-model="option" @change="changeOption">
      <option value="All">All</option>
      <option value="식단">식단</option>
      <option value="운동">운동</option>
    </select> {{option}}
  </form>

  </section>
</template>

<script>
import Modal from './common/AlertModal.vue'
export default {
  data(){
    return{
        todoItems_filter: [],

        option:'',
        showDiet:false,
        showExer:false,

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
    },
    changeOption(){ // Todo를 가져와서 해당 리스트만 추출해서 배열2에 새로 저장한다음 배열2를 보여줌

        if (this.option=='식단'){
			for (var i = 0; i < localStorage.length; i++) {
                if ((JSON.parse(localStorage.getItem(localStorage.key(i))).diet_exer) == '식단') {
                    this.todoItems_filter.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }          
			}
            this.$emit('filterTodo', this.todoItems_filter);
            this.todoItems_filter=[];
        }/*else if (this.option=='운동'){
			for (var i = 0; i < propsdata.length; i++) {
                if (this.propsdata.diet_exer(i) == '운동'){
                    this.todoItems_filter.push(this.propsdata.item(i));
                }		
			}
        }*/
    },
  components: {
    Modal: Modal
  }
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

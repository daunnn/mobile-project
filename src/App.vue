<template>
  <div id="app">
    
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="search_push" @removeTodo="removeTodo" @toggleTodo="toggleTodo"
    @modifyTodo="modifyTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
    <TodoFilter v-bind:propsdata="todoItems" @removeTodo="removeTodo" @toggleTodo="toggleTodo"
    @modifyTodo="modifyTodo" @filterTodo="filterTodo"></TodoFilter>

   <input class="stage-search" type="text" v-model="search" @keyup.enter="searchitem" placeholder="검색"  />


  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import TodoFilter from './components/TodoFilter.vue'

export default {
  data() {
    return {
      todoItems: [], //todos
      todoItems_filter:[],
      search : '',
      search_push : []

    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
		addTodo(todoItem, diet_exer, cate, attri, amount, calorie, d_tf, e_tf, a_tf) {
      var obj={completed: false, item: todoItem, diet_exer:diet_exer, category:cate, attribute: attri, amount: amount,
               calorie: calorie, diet_tf:d_tf, exer_tf:e_tf, all_tf:a_tf};
			localStorage.setItem(todoItem, JSON.stringify(obj));
			this.todoItems.push(obj);
      this.search_push=this.todoItems
		},
    removeTodo(todo, index) {
      localStorage.removeItem(todo.item);
      this.todoItems.splice(index, 1);
      this.search_push=this.todoItems
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
    filterTodo(todo_filter){
      this.todoItems_filter.push(JSON.stringify(todo_filter));
      alert(this.todoItems_filter);      
    },


    searchitem(){
      var searcheddata = [];
      console.log(this.todoItems)
      for (var i = 0; i < this.todoItems.length; i++){
        console.log(this.todoItems[i].item)
        if (this.todoItems[i].item.includes(this.search)) {
          searcheddata.push(this.todoItems[i])
        } 

      }this.search_push=searcheddata
      console.log(this.search_push)
      

    }
  },
  created() {
    
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        var temp =JSON.parse(localStorage.getItem(localStorage.key(i)))
        this.todoItems.push(temp);
        this.search_push.push(temp);
			}
		}
    console.log(this.todoItems)
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
    'TodoFilter': TodoFilter
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

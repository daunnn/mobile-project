<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="clearTodo">Clear All</span>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$emit('removeAll');
    }
  }
}
</script>

<style scoped>
  .clearAllContainer {
    width: 36%;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    position:absolute;
    bottom:10px;
    left:32%;
    
  }
  .clearAllBtn {
    color: #e20303;
    display: block;
  }
</style>

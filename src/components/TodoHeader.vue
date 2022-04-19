<template>
  <header>
    <h3> {{today_info}} </h3>
        <h1 style="display: inline">다이어트 TODO</h1> 
    
  </header>
</template>

<script>
import dayjs from 'dayjs'
export default {
  
  data(){
    return {
    today_info : dayjs().format("MM/DD"),
  
    }
  }
}
</script>

<style scoped>
 h3 {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 20px;
      font-size:30px;
      margin-left:5%
      
      

      }

  h1 {
 
    position: relative;
    top: 10px;
    color: #657084;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
    
  }
</style>

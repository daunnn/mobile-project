<template>
  <header>
    <v-tool-bar @click="convert_main" color=rgb(236,242,255)>
      <div style="float: left; margin: 15px"> {{today_info}} </div>
      <div style ="font-weight:bold; font-size: 20px; margin: 10px; position: absolute; left: 50%; transform: translateX(-50%);"> 다이어트 ToDo </div>
    </v-tool-bar>

    
  </header>
</template>

<script>
import dayjs from 'dayjs'
export default {
  
  data(){
    return {
    today_info : dayjs().format("MM/DD"),
  
    }
  },

  methods: {
    convert_main(){
        this.$router.push({path:"main"});
    }
}
}
</script>

<style scoped>
  h3 {
      position: absolute;
      top: 10px;
      left: 0;
      padding: 10px;
      font-size:25px;
      margin-left:5%;
      color:#657084;
      
      

      }

  button {
    background-color: rgb(236,242,255);
    border-color :rgb(236,242,255);
    font-size:30;
    position: relative;
    top: 10px;
    font-weight: 900;
    margin: 0;
    
  }
</style>

<template>
  <div>

  <!-- <button @click="DietExercise">Click to add list</button> -->

    <modal v-if="popup">
      <span slot="footer">식단, 운동 중 하나를 선택하세요.


        <v-btn  class="buttons" @click="[diet(), setDiet_Exer('식단')]" type="button">식단</v-btn>
        <v-btn class="buttons" @click="[exer(), setDiet_Exer('운동')]" type="button">운동</v-btn>
        
        
        <button @click="popup = false" class="removeContainer">
          <i class="addBtn fas fa-times" aria-hidden="true"></i>
        </button>
        
 
       
      </span>
    </modal>
  

<!-- 식단 입력 부분 -->
    <modal v-if="showDiet" @close="showDiet = false">
    
      <span slot="header"> 
        <input type="text" placeholder="type" :value="now_message" v-on:change="setItem"> <!-- v-model="now_message" -->

        <v-btn class="buttons" v-if="clickbreak" color="rgb(115, 115, 115)" @click="[setCategory('아침'), clickCategory('아침')]">아침</v-btn>
        <v-btn class="buttons" v-if="!clickbreak" @click="[setCategory('아침'), clickCategory('아침')]">아침</v-btn>

        <v-btn class="buttons" v-if="clicklaunch" color="rgb(115, 115, 115)" @click="[setCategory('점심'), clickCategory('점심')]">점심</v-btn>
        <v-btn class="buttons" v-if="!clicklaunch" @click="[setCategory('점심'), clickCategory('점심')]">점심</v-btn>

        <v-btn class="buttons" v-if="clickeven" color="rgb(115, 115, 115)" @click="[setCategory('저녁'), clickCategory('저녁')]">저녁</v-btn>
        <v-btn class="buttons" v-if="!clickeven" @click="[setCategory('저녁'), clickCategory('저녁')]">저녁</v-btn>
        
        
        <v-btn class="buttons" v-if="clickcarbo" color="rgb(115, 115, 115)" @click="[setAttribute('탄수화물'), clickAttribute('탄수화물')]">탄수화물</v-btn>
        <v-btn class="buttons" v-if="!clickcarbo" @click="[setAttribute('탄수화물'), clickAttribute('탄수화물')]" >탄수화물</v-btn>

        <v-btn class="buttons" v-if="clickprotein" color="rgb(115, 115, 115)" @click="[setAttribute('단백질'), clickAttribute('단백질')]">단백질</v-btn>
        <v-btn class="buttons" v-if="!clickprotein" @click="[setAttribute('단백질'), clickAttribute('단백질')]" >단백질</v-btn>
        
        <v-btn class="buttons" v-if="clickfat" color="rgb(115, 115, 115)" @click="[setAttribute('지방'), clickAttribute('지방')]">지방</v-btn>
        <v-btn class="buttons" v-if="!clickfat" @click="[setAttribute('지방'), clickAttribute('지방')]" >지방</v-btn>

   
        <input type="text" placeholder="양(g, 개수)" v-on:change="setAmount" class="texts">     
        <input type="text" placeholder="칼로리" v-on:change="setCalorie" class="texts">
    
        <v-btn class="buttons" v-if="categorySelect" v-on:click="addTodo" color="rgb(107,97,255)">
           <i class="addBtn fas fa-check" aria-hidden="true"></i>
        </v-btn> 


        <v-spacer></v-spacer>
        <v-btn @click=startCam> Cam </v-btn>
        <div id="cam"></div>

        <v-btn @click=saveImage> 촬영 </v-btn>

        <v-btn class="buttons" @click="showDiet = false" color="rgb(115,115,115)">
        <i class="addBtn fas fa-times" aria-hidden="true"></i>
        </v-btn>

      </span>
    </modal>



<!-- 운동 입력 부분 -->
      <modal v-if="showExercise" @close="showExercise = false">
      <span slot="footer">
        <input type="text" placeholder="type" v-on:change="setItem" class="texts">

        
        <v-btn class="buttons" v-if="clickaero" color="rgb(115, 115, 115)" @click="[setCategory('유산소'), clickCategory('유산소')]">유산소</v-btn>
        <v-btn class="buttons" v-if="!clickaero" @click="[setCategory('유산소'), clickCategory('유산소')]">유산소</v-btn>

        <v-btn class="buttons" v-if="clickana" color="rgb(115, 115, 115)" @click="[setCategory('무산소'), clickCategory('무산소')]">무산소</v-btn>
        <v-btn class="buttons" v-if="!clickana" @click="[setCategory('무산소'), clickCategory('무산소')]">무산소</v-btn>

        <v-btn class="buttons" v-if="clickstrech" color="rgb(115, 115, 115)" @click="[setCategory('스트레칭'), clickCategory('스트레칭')]">스트레칭</v-btn>
        <v-btn class="buttons" v-if="!clickstrech" @click="[setCategory('스트레칭'), clickCategory('스트레칭')]">스트레칭</v-btn>

          
        <input type="text" placeholder="횟수" v-on:change="setAmount" class="shadow">
        <input type="text" placeholder="시간" v-on:change="setCalorie">
   
   
        <v-btn class="buttons" v-if="categorySelect" v-on:click="addTodo" color="rgb(107,97,255)">
           <i class="addBtn fas fa-check" aria-hidden="true"></i>
        </v-btn> 

        <v-btn class="buttons" @click="showExercise = false" color="rgb(115,115,115)">
          <i class="addBtn fas fa-times" aria-hidden="true"></i>
        </v-btn>
      </span>
    </modal>  

<!-- 아무것도 입력 안했을 때 경고 부분 -->
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span class="margin" slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </modal>
    
<v-layout class="plus_location">
    <v-btn 
      class="mx-2" fab dark color="indigo" @click="DietExercise">
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-layout>


  </div>
</template>

<script>
import Modal from './common/AlertModal.vue'
import * as tmImage from '@teachablemachine/image'

export default {
  data() {
    return {
      newTodoItem: '',
      newAmount:'',
      newCalorie:0,
      diet_exer:'',
      category: '',
      attribute: '',
      popup: false,
      showModal: false,
      showDiet: false,
      showExercise: false, 
      //카테고리 별 버튼 클릭 여부  
      clickbreak: false,
      clicklaunch: false,
      clickeven: false,
      clickaero: false,
      clickana: false,
      clickstrech: false,
      //카테고리 선택 여부
      categorySelect: false,
      //attribute 버튼 클릭 여부
      clickcarbo: false,
      clickprotein: false,
      clickfat: false,
      
      message:'식단 촬영',
      now_message:'',

      model:null,
      webcam:null,
      predicted:""
    }
  },
  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {
        var value = this.newTodoItem && this.newTodoItem.trim();
				this.$emit('addTodo', value, this.diet_exer , this.category, this.attribute, this.newAmount, this.newCalorie);
        this.clearInput();
        //modal 창 삭제
        this.showDiet = false;
        this.showExercise = false;
      } 
      else {
        this.showModal = !this.showModal;
      }
    },
    setItem(e){
      return this.newTodoItem=e.target.value;
    },
    setAmount(e){
      return this.newAmount=e.target.value;
    },
    setCalorie(e){
      return this.newCalorie=e.target.value;
    },
    setCategory(cate){      
      return this.category=cate;
    },
    setAttribute(attr){
      return this.attribute=attr;
    },
    setDiet_Exer(de){
      return this.diet_exer=de;
    },
    //카테고리 선택 버튼 클릭 시 스타일 변화 위한 메소드
    clickCategory(str){
      this.categorySelect =! this.categorySelect;
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
    clearInput() {
      this.newTodoItem = '';
      this.newAmount=' ';
      this.newCalorie=0;
      this.attribute=' ';
      this.category=' ';
      },
    DietExercise(){
      this.popup=!this.popup;
      //버튼 클릭 여부 초기화
      this.clickbreak=false;
      this.clicklaunch=false;
      this.clickeven=false;
      this.clickaero=false;
      this.clickana=false;
      this.clickstrech=false;
      this.categorySelect=false;
      this.clickcarbo = false;
      this.clickprotein = false;
      this.clickfat =false;     
    },
    diet(){
      this.showDiet=!this.showDiet;
      this.popup = !this.popup;     
      this.now_message=""; 
    },
    exer(){
      this.showExercise=!this.showExercise;
      this.popup = !this.popup;      
    },
    saveImage(){
      this.now_message = this.message;
      this.newTodoItem = this.now_message;
    },
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
    }
  },
  async mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
    let baseURL = "https://teachablemachine.withgoogle.com/models/X-b-IdQJS/";
    this.model = await tmImage.load(
      baseURL + "model.json",
      baseURL + "metadata.json"
    );
    let maxPredictions = this.model.getTotalClasses();
    console.log(maxPredictions);
  },
  components: {
    Modal: Modal
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Poor+Story&display=swap');
input:focus {
  outline: none;
}
.margin{
  margin-left: 25%;
}
span {
  font-family: 'Do Hyeon', sans-serif;
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
  font-family: 'Do Hyeon', sans-serif;
  border-style: none;
  font-size: 0.9rem;
}

.addBtn {
  color: white;
  vertical-align: middle;
}

.buttons{
  font-family: 'Do Hyeon', sans-serif;
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
.plus_location{
  /* margin:auto; */
  display: block;
  /* left:75%; */
  position:relative;
  top: 80px;
  align-content: center;


}
</style>
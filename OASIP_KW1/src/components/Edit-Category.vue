<script setup>
import { computed } from '@vue/reactivity';
import { ref , onBeforeMount} from 'vue'
import { useRouter, useRoute } from 'vue-router'
defineEmits(['edit'])
const prop = defineProps({
  categoryDetail: {
    type: Array,
    require: true
  },
})
const allCategory = ref([])
const nameOfCategory = ref([])
const getAllCategory = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/eventCategory`)
    if(res.status === 200) {
    allCategory.value = await res.json()
    allCategory.value.forEach((category)=>{
      nameOfCategory.value.push(category.eventCategoryName)
    })
    }
}
onBeforeMount( async () => {
   await getAllCategory()
})
const myRouter = useRouter()
const { params } = useRoute()

const categoryName = ref(params.name);
const categoryDescription = ref(params.detail);
const categoryDuration = ref(params.duration);

const check_name = ref(false);
const check_name_over = ref(false);
const check_duration = ref(false);
const check_name_duplicate = ref(false);
const updateComplete = ref(false);

const getUpdate = computed(() =>{
  if(categoryName.value == undefined || categoryName.value == "" || categoryName.value.length == 0){
    check_name.value = true;
  }else{
    if(nameOfCategory.value.includes(categoryName.value) && categoryName.value != params.name){
      check_name_duplicate.value = true;
      check_name.value = false;
    }else{
    if(categoryName.value.length > 100){
      check_name_over.value = true;
      check_name.value = false;
      check_name_duplicate.value = false;
    }else{
      if(categoryDuration.value > 480 || categoryDuration.value < 1){
        check_duration.value = true;
        check_name.value = false;
        check_name_over.value = false;
        check_name_duplicate.value = false;
      }else{
        updateComplete.value = true;
        check_duration.value = false;
        check_name.value = false;
        check_name_over.value = false;
        check_name_duplicate.value = false;
        setTimeout(()=>{
          myRouter.go(-2);
        },950)
        return {id: params.id , name: categoryName.value , detail: categoryDescription.value , duration: categoryDuration.value , categoryName: categoryName.value}
      }
    }
  }
  }
})

</script>
 
<template>
    <div class="card" style="max-width: 1000px;">
  <div class="row g-0">
    <div class="col-md-4">
        <img src="../assets/project-manage.png" alt="" v-if="categoryDetail.id ==1" class="id1">
        <img src="../assets/devops.png" alt="" v-if="categoryDetail.id ==2" class="id2">
        <img src="../assets/data.png" alt="" v-if="categoryDetail.id ==3" class="id3">
        <img src="../assets/client.png" alt="" v-if="categoryDetail.id ==4" class="id4">
        <img src="../assets/back.png" alt="" v-if="categoryDetail.id ==5" class="id5">
    </div>
    <div class="col-md-8">
      <div class="card-body">
          <p v-show="check_name" style="color: red;">
            <div class="alert alert-danger" role="alert">
                Please input Category Name
            </div>
          </p>
          <p v-show="check_name_over" style="color: red;">
            <div class="alert alert-danger" role="alert">
                CategoryName Must not exceed 100 characters.
            </div>
          </p>
          <p v-show="check_name_duplicate" style="color: red;">
            <div class="alert alert-danger" role="alert">
                CategoryName is Duplicate
            </div>
          </p>
          <p v-show="check_duration" style="color: red;">
            <div class="alert alert-danger" role="alert">
                Please validate duration is between 1-480
            </div>
          </p>
          <p v-show="updateComplete" style="color: darkolivegreen;">
            <div class="alert alert-success" role="alert" style="box-shadow: 5px 5px 10px darkolivegreen;">
                Loading...
              <div class="spinner-border spinner-border-sm text-success" role="status"></div>
            </div>
          </p>
          
        <b>Category Name : </b> <input class="card-title2" v-model="categoryName">
        <hr style="width:80%;text-align:left;margin-left:0">
        <b>Description : </b> <br> <textarea class="card-text" v-model="categoryDescription" rows="4" cols="50"> </textarea><br>
        <b>Duration : </b> <input class="card-text" type="number" min=1 max=480 v-model="categoryDuration"> <br><br>
        <!-- <div class="button" ><button type="button" class="Close btn btn-light btn-lg"
                @click="$emit('edit', getUpdate)">Cancel</button></div>
        </div>
        <div class="button" ><button type="button" class="Close btn btn-light btn-lg"
                @click="$emit('edit', getUpdate)">Update Appointment</button></div>
        </div> -->
        <button type="button" class="btn btn-1 btn-success" @click="$emit('edit', getUpdate)">Update Appointment</button> &nbsp; &nbsp; &nbsp;
        <button type="button" class="btn btn-1 btn-danger" @click="myRouter.go(-2)">Cancel</button>
      </div>
    </div>
    </div>
    </div>
</template>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali:wght@500&display=swap');
.titled{
  margin-top: -5em;
}
.card{
  margin-top: -38em;
  margin-left: 19em;
  border-radius: 2em;
  margin-bottom: -2em;
}
.card-text{
  font-family: 'Mali', cursive;
}
.card-title2{
  margin-top: 2em;
  font-family: 'Mali', cursive;
}
.iconpeople{
  margin-left: -35em;
  margin-top: -5em;
}
.edit{
  margin-left: 4em;
  margin-right: 5.35em;
  margin-top: -2.5em;
  font-family: 'Mali', cursive;
  
}
.close{
  margin-left: -1em;
  margin-right: 0.5em;
  font-family: 'Mali', cursive;
}
.id{
  margin-top: -2em;
  font-family: 'Mali', cursive;
}
</style>
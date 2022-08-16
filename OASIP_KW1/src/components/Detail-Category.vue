<script setup>

defineEmits(['edit'])
defineProps({
  categoryDetail: {
    type: Object,
    require: true
  },
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
        <h6 class="card-title2"><b>Category Name : </b>{{categoryDetail.eventCategoryName}}</h6>
        <hr style="width:80%;text-align:left;margin-left:0">
        <p class="card-text" v-if="categoryDetail.eventCategoryDescription == null"><b>Description : - </b></p>
        <p class="card-text" v-else><b>Description : </b>{{categoryDetail.eventCategoryDescription}}</p>
        <p class="card-text"><b>Duration : </b>{{categoryDetail.eventDuration}}</p>
        <div class ="close"><router-link :to="{  name: 'EventCategory' }"><button type="button" class="btn btn-dark">Back</button></router-link></div>
        <div class ="edit">
          <router-link :to="{  name: 'editCategory' , params:{
            id:categoryDetail.id, name:categoryDetail.eventCategoryName , detail:categoryDetail.eventCategoryDescription , duration: categoryDetail.eventDuration
          }}">
            <button type="button" class="btn btn-1 btn-danger">Edit Category</button>
          </router-link>
        </div>
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
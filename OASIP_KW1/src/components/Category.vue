<script setup>
const props = defineProps({
  eventCategory: {
    type: Array,
    require: true
  },
})
</script>
 
<template>
<!-- <div id="grad1"> -->
  <p class="titleCategory">CATEGORY</p>
  <div class="flex-container" >
   <div v-for="category in eventCategory">
   <img src="../assets/project-manage.png" alt="" v-if="category.id ==1" class="id1">
   <img src="../assets/devops.png" alt="" v-if="category.id ==2" class="id2">
   <img src="../assets/data.png" alt="" v-if="category.id ==3" class="id3">
   <img src="../assets/client.png" alt="" v-if="category.id ==4" class="id4">
   <img src="../assets/back.png" alt="" v-if="category.id ==5" class="id5">
    <h6 class="clinics"><b>{{category.eventCategoryName}}</b></h6>
    <!-- <p v-if="category.eventCategoryDescription == null">Description : - </p>
    <p v-else>Description : {{category.eventCategoryDescription}}</p>
    <p>Duration : {{category.eventDuration}} minutes</p> -->
    <router-link :to="{ name: 'categorydetail' , params:{id:category.id}}"><button class="details">Detail</button></router-link>                
  </div>
</div>
<!-- </div> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
.id1 {
  margin-left: 1em;
}
.id2 , .id4 , .id5{
  margin-left: 1.5em;
}
.id3{
  margin-left: 2em;
}
.details{
  background-color: #E59866 ;
  border-radius: 10px;
  font-family: 'Mali', cursive;
  font-weight: bolder;
  margin-top: 1.5em;
  margin-left: 5.5em;
  
  /* padding-left: 5em; */
  /* padding-right: 5em; */
}
.titleCategory{
  font-family: 'Mali', cursive;
  text-align: center;
  margin-top: -16.55em;
  font-size: 2.5em;
  font-weight: bolder;
  padding-top: 0.5em;
  }
.clinics{
  text-align: center;
}
.flex-container {
  display: flex;
  /* grid-auto-rows: 1fr; */
  height: -90%;
  font-family: 'Mali', cursive;
  /* width: 60%; */
  /* margin-left: 5em; */
}
.flex-container > div {
  background: linear-gradient(#7DC8CA,#CECBD6,#CAE9E0,#AAC9CE);
  margin: 10px;
  padding: 20px;
  width: 20%;
  height: 22em;
  box-shadow: 5px 5px 10px #D0D3D4;
  border-radius: 5px;
}

.id2{
  /* padding-bottom: 2em; */
}
</style>
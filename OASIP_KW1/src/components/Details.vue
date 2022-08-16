<script setup>
import { ref } from 'vue';

defineEmits(['edit'])
defineProps({
  eventDetails: {
    type: Object,
    require: true
  },
})

const time = (time) => {
   const timezone = new Date(time)
   return `${timezone.getHours()}:${String(timezone.getMinutes()).padStart(2,"0")}`
}
const monthName = ref(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])

const date = (date) => {
   const datezone = new Date(date)
   return `${datezone.getDate()} ${monthName.value[datezone.getMonth()]} ${datezone.getFullYear()}`
}
</script>
 
<template>
<!-- <div id="grad1"> -->
  <div v-if="eventDetails.eventCategory !== null">
  <!-- <h2 class="titled">Details</h2> -->
  <div class="card" style="max-width: 1000px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="../assets/icon.png" class="img-fluid rounded-start" alt="people">
      <p class="id">ID : {{eventDetails.id}}</p>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h6 class="card-title2"><b>BookingName : </b>{{eventDetails.bookingName}}</h6>
        <hr style="width:80%;text-align:left;margin-left:0">
        <p class="card-text"><b>Email : </b>{{eventDetails.bookingEmail}}</p>
        <p class="card-text"><b>Date : </b>{{date(eventDetails.eventStartTime)}}</p>
        <p class="card-text"><b>Start Time : </b>{{time(eventDetails.eventStartTime)}}</p>
        <p class="card-text"><b>Duration : </b>{{eventDetails.eventDuration}} minutes</p>
        <p class="card-text"><b>Category Name : </b>{{eventDetails.eventCategory.eventCategoryName}}</p>
        <p class="card-text"><b>Category Description : </b>{{eventDetails.eventCategory.eventCategoryDescription}}</p>
        <p class="card-text" v-if="eventDetails.eventNote == null"><b>Note : </b>-</p>
        <p class="card-text" v-else><b>Note : </b>{{eventDetails.eventNote}}</p>
        <div class ="close"><router-link :to="{  name: 'EventListAll' }"><button type="button" class="btn btn-dark">Back</button></router-link></div>
        <div class ="edit"><router-link :to="{  name: 'AddEvents' , params:{name:eventDetails.bookingName 
                                                                                ,email:eventDetails.bookingEmail
                                                                                ,eventCategory:eventDetails.eventCategory.eventCategoryName
                                                                                ,time:eventDetails.eventStartTime
                                                                                ,note:eventDetails.eventNote
                                                                                ,id:eventDetails.id}}">
                                                                                <button type="button" class="btn btn-1 btn-danger">Reschedule</button></router-link></div>
      </div>
    </div>
  </div>
</div>
</div> 
<!-- </div> -->

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
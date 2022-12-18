<script setup>
import { computed, onBeforeUpdate } from "vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import BaseLoading from "../components/BaseLoading.vue";
const eventList = ref([]);
const categoryList = ref([]);
const categoryCheck = ref(false);
const filterReservationList = ref([]);
const token=ref(undefined)

// const db = "http://localhost:5000/booking";
const eventLink = `${import.meta.env.BASE_URL}api/events`;
const categoryLink = `${import.meta.env.BASE_URL}api/eventCategory`;
const refreshTLink =`${import.meta.env.BASE_URL}api/refresh`



//GET event
const checkGetEvent = ref(undefined);
const resGetEvent = ref(undefined);
// get every 10 sec
// setInterval(async () => {
//   checkGetEvent.value = undefined;
//   resGetEvent.value = await fetch(eventLink);
//   if (resGetEvent.value.status === 200) {
//     eventList.value = await resGetEvent.value.json();
//     checkGetEvent.value = true;
//     filterReservationList.value = eventList.value;
//   } else checkGetEvent.value = false;
// }, 10000);

// first get event
const getEvent = async () => {
  const auther=ref(localStorage.getItem('tokenA'))
  const refreshT=ref(localStorage.getItem('tokenR'))
  const res = await fetch(eventLink,{
    method:'GET',
    headers:{
      "Authorization":`Bearer ${auther.value}`
    }
  });
  if (res.status === 200) {
    eventList.value = await res.json();
    filterReservationList.value = eventList.value;
    checkGetEvent.value=true
    console.log(eventList.value)
  }else if(res.status === 401){
    const ress= await fetch(refreshTLink,{
      method:'GET',
      headers:{
        "Authorization":`Bearer ${refreshT.value}`
      }
    });

    if(ress.status === 200){
      token.value =await ress.json()
      saveLocal()
      console.log('refresh token successful')
      getEvent()
    }else console.log('something waring to get token')


  }else{
    console.log('can not get event ,something warng')
    checkGetEvent.value=false
    console.log(checkGetEvent.value)
  } 
};

//GET category
const getCategory = async () => {
  const auther=ref(localStorage.getItem('tokenA'))
  const refreshT=ref(localStorage.getItem('tokenR'))
  const res = await fetch(categoryLink,{
    method:'GET',
    headers:{
      "Authorization":`Bearer ${auther.value}`
    }
  });
  if (res.status === 200) {
    categoryList.value = await res.json();
    categoryCheck.value = true;
    //console.log(getCategory.value)
    // console.log(localStorage.length)
    
  }else if(res.status === 401){
    const ress= await fetch(refreshTLink,{
      method:'GET',
      headers:{
        "Authorization":`Bearer ${refreshT.value}`
      }
    });

    if(ress.status === 200){
      token.value =await ress.json()
      saveLocal()
      console.log('refresh token successful')
      getCategory()
    }else console.log('something waring to get token')


  } else {
    categoryCheck.value = false;
  }
};

//router
const myRouter = useRouter();
const goReservation = (input) =>
  myRouter.push({
    name: "Reservation",
    params: {
      id: input.id,
    },
  });

onBeforeMount(() => {
   getEvent();
   getCategory();
});

// timer
const day = ref();
const month = ref();
const year = ref();
const hours = ref();
const minutes = ref();
const date = ref("");
const time = ref("");

let clock = () => {
  let dateToday = new Date();
  day.value =
    dateToday.getDate() < 10
      ? `0${dateToday.getDate()}`.toString()
      : dateToday.getDate(); // day
  month.value =
    dateToday.getMonth() + 1 < 10
      ? `0${dateToday.getMonth() + 1}`.toString()
      : dateToday.getMonth() + 1; // month
  year.value = dateToday.getFullYear().toString(); // year

  hours.value =
    dateToday.getHours() < 10
      ? `0${dateToday.getHours()}`.toString()
      : dateToday.getHours(); // hour
  minutes.value =
    dateToday.getMinutes() < 10
      ? `0${dateToday.getMinutes()}`.toString()
      : dateToday.getMinutes(); // minute

  //  combine
  time.value = `${hours.value}:${minutes.value}`;
  date.value = `${year.value}-${month.value}-${day.value}`;
};
setInterval(clock, 1000);

// filter
const fStartDate = ref("");
const fStatus = ref("");
const fCategory = ref("");
const fEmail = ref("")
const noInputFilter = ref(undefined);

const searchLastest = () => {
  noInputFilter.value = undefined;

  if (fStartDate.value == "" && fStatus.value == "" && fCategory.value == "") {
    // alert("input in form if you want to filter");
    noInputFilter.value = true;
  } else {
    filterReservationList.value = [];

    // หากมีแค่ start date จะทำการเลือก start date ตามนั้นแต่ว่าจะเลือกเวลาทั้งวัน
    if (
      fStartDate.value.length>0  &&
      fStatus.value.length==0  &&
      fCategory.value.length==0  &&
      fEmail.value.length==0 
    ) {
      for (let filter of eventList.value) {
        if (
          Date.parse(filter.eventStartTime) >=
            Date.parse(`${fStartDate.value}T00:00:00+07:00`) &&
          Date.parse(filter.eventStartTime) <=
            Date.parse(`${fStartDate.value}T23:59:00+07:00`)
        ) {
          filterReservationList.value.push(filter);
        }
      }
      // console.log(filterReservationList.value)
    }
    // สำหรับ past and upcoming จะ show ข้อมูลที่จะมีในอนาคต หรืออดีต
    else if (
      fStatus.value.length>0  &&
      fStartDate.value.length==0  &&
      fCategory.value.length==0  &&
      fEmail.value.length==0 
    ) {
      if (fStatus.value == "upcoming") {
        for (let filter of eventList.value) {
          if (
            Date.parse(filter.eventStartTime) >
            Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        }
      } else if (fStatus.value == "past") {
        for (let filter of eventList.value) {
          if (
            Date.parse(filter.eventStartTime) <=
            Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        }
      }
    }
    // category
    else if (
      fCategory.value.length>0  &&
      fStatus.value.length==0  &&
      fStartDate.value.length==0  &&
      fEmail.value.length==0 
    ) {
      for (let filter of eventList.value) {
        if (filter.categoryName == fCategory.value) {
          filterReservationList.value.push(filter);
        }
      }
    }
    // start date and status
    else if (
      fStatus.value.length>0  &&
      fStartDate.value.length>0  &&
      fCategory.value.length==0 &&
      fEmail.value.length==0
    ) {
      for (let filter of eventList.value) {
        if (fStatus.value == "upcoming") {
          if (
            Date.parse(filter.eventStartTime) >=
              Date.parse(`${fStartDate.value}T00:00:00+07:00`) &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${fStartDate.value}T23:59:00+07:00`) &&
            Date.parse(filter.eventStartTime) >
              Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        } else if (fStatus.value == "past") {
          if (
            Date.parse(filter.eventStartTime) >=
              Date.parse(`${fStartDate.value}T00:00:00+07:00`) &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${fStartDate.value}T23:59:00+07:00`) &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        }
      }
    }
    // status and category
    else if (
      fStatus.value.length>0  &&
      fStartDate.value.length==0  &&
      fCategory.value.length>0 &&
      fEmail.value.length==0 
    ) {
      for (let filter of eventList.value) {
        if (fStatus.value == "upcoming") {
          if (
            filter.categoryName == fCategory.value &&
            Date.parse(filter.eventStartTime) >
              Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        } else if (fStatus.value == "past") {
          if (
            filter.categoryName == fCategory.value &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        }
      }
    }
    // start date and category
    else if (
      fStatus.value.length==0  &&
      fStartDate.value.length>0  &&
      fCategory.value.length>0 &&
      fEmail.value.length==0 
    ) {
      for (let filter of eventList.value) {
        if (
          filter.categoryName == fCategory.value &&
          Date.parse(filter.eventStartTime) >=
            Date.parse(`${fStartDate.value}T00:00:00+07:00`) &&
          Date.parse(filter.eventStartTime) <=
            Date.parse(`${fStartDate.value}T23:59:00+07:00`)
        ) {
          filterReservationList.value.push(filter);
        }
      }
    }
    // e-mail
    else if(
      fStatus.value.length==0  &&
      fStartDate.value.length==0  &&
      fCategory.value.length==0 &&
      fEmail.value.length>0       
    ){
      for(let filter of eventList.value){
        if(
          filter.bookingEmail==fEmail.value
        ){
          filterReservationList.value.push(filter)
        }
      }
    }
    else if(
      fStatus.value.length>0  &&
      fStartDate.value.length==0  &&
      fCategory.value.length==0 &&
      fEmail.value.length>0       
    ){
      for(let filter in eventList.value){
        if(
          filter.boo
        ){

        }
      }

    }
    // start date ,status, category
    else if (
      fStatus.value.length>0  &&
      fStartDate.value.length>0  &&
      fCategory.value.length>0 &&
      fEmail.value.length>0 
    ) {
      for (let filter of eventList.value) {
        if (fStatus.value == "upcoming") {
          if (
            filter.categoryName == fCategory.value &&
            Date.parse(filter.eventStartTime) >=
              Date.parse(`${fStartDate.value}T00:00:00+07:00`) &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${fStartDate.value}T23:59:00+07:00`) &&
            Date.parse(filter.eventStartTime) >
              Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        } else if (fStatus.value == "past") {
          if (
            filter.categoryName == fCategory.value &&
            Date.parse(filter.eventStartTime) >=
              Date.parse(`${fStartDate.value}T00:00:00+07:00`) &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${fStartDate.value}T23:59:00+07:00`) &&
            Date.parse(filter.eventStartTime) <=
              Date.parse(`${date.value}T${time.value}:00+07:00`)
          ) {
            filterReservationList.value.push(filter);
          }
        }
      }
    }
  }
};

// reset filter
const reset = () => {
  fStartDate.value = "";
  fStatus.value = "";
  fCategory.value = "";
  filterReservationList.value = eventList.value;
};

const search = () =>{
   filterReservationList.value = eventList.value
    if(fEmail.value !== ''){
      filterReservationList.value = filterReservationList.value.filter((event) =>{
      return event.bookingEmail == fEmail.value.trim()
    })
    }
    if(fCategory.value !== ''){
      filterReservationList.value = filterReservationList.value.filter((event) => {
      return event.eventCategoryName == fCategory.value
    })
    }
    if(fStartDate.value !== ''){
      filterReservationList.value = filterReservationList.value.filter((event) => {
      return new Date(fStartDate.value).setHours(0,0,0,0) == new Date(event.eventStartTime).setHours(0,0,0,0)
    })
      filterReservationList.value.reverse();
    }else{
      if(fStatus.value == 'Past'){
          filterReservationList.value = filterReservationList.value.filter((event) => {
            return new Date() > new Date(event.eventStartTime)
          })
      }else if(fStatus.value == 'Upcoming'){
          filterReservationList.value = filterReservationList.value.filter((event) => {
            return new Date() < new Date(event.eventStartTime)
          })
          filterReservationList.value.reverse();
      }
    }
    console.log(filterReservationList.value)
}

// local storage
const saveLocal=()=>{
  console.log('save to local')
  localStorage.setItem('tokenA',`${token.value.accessToken}`)
  localStorage.setItem('tokenR',`${token.value.refreshToken}`)
}
</script>

<template>

<!-- filter and reservation -->
<div class="block w-[100%] bg-gray-400">
  <!-- for filter -->
  <div class=" block  h-[20%]">
    <h1 class="mt-5 mb-1 text-xl font-semibold text-gray-700 w-fit m-auto">Reservation List</h1>
    <div class="w-fit mt-4 mx-auto flex ">
      <!-- start date -->
      <div class=" mx-2">
        <div class="w-fit mx-auto">
           <label for="date" class=" font-medium text-sm text-gray-600">Date</label>
        </div>
        <div>
          <input id="date"
            class="w-full drop-shadow-md px-2 py-1 placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            type="date" v-model="fStartDate"/>
        </div>
      </div >
      <!-- status -->
      <div class=" mx-2">
        <div class="w-fit mx-auto">
          <label for="category" class="font-medium text-sm text-gray-600">Status</label>
        </div>
        <div>
          <select id="category"
            class="w-full text-ellipsis overflow-hidden drop-shadow-md cursor-pointer px-3 py-1  placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            v-model="fStatus">
            <option value="" disable selected>All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
      <!-- category -->
      <div class=" mx-2">
        <div class="w-fit mx-auto">
          <label for="category" class=" font-medium text-sm text-gray-600">Category</label>
        </div>
        <div>
          <select id="category"
            class="w-full text-ellipsis w-[170px] overflow-hidden drop-shadow-md cursor-pointer px-2 py-1  placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            v-model="fCategory">
            <option value="" disable selected>All</option>
            <option v-for="cat in categoryList" :key="cat.id" :value="cat.eventCategoryName">{{ cat.eventCategoryName }}</option>
          </select>
        </div>
      </div>
      <!-- email -->
      <div class=" mx-2">
        <div class="w-fit mx-auto">
          <label for="category" class="font-medium text-sm text-gray-600">Email</label>
        </div>
        <div>
          <input
            class="w-full text-ellipsis overflow-hidden drop-shadow-md cursor-pointer px-2 py-1  placeholder-gray-300 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            type="text" v-model="fEmail"/>
        </div>
      </div>
      <!-- search button -->
      <div class=" m-auto mx-2 w-fit">
          <button @click="reset" class="mx-1 transition duration-200 hover:bg-rose-300 font-bold  rounded-md px-3">Reset</button>
<!-- custom-btn reset -->
          <button @click="search" class="mx-1 transition duration-200 hover:bg-blue-300 hover:text-gray-700 font-bold  rounded-md px-3">Search</button>
        
      </div>
<!-- custom-btn search -->
    </div>
    
  </div>
  <!-- for show events -->
  <div class="bg-gray-200 h-[70%]">
    <div class="showUp      h-[100%] w-[100%]" >
    <div v-if="checkGetEvent==undefined" class="m-auto w-fit p-[10%] ">
      <BaseLoading :heightt="70" :widthh="70" :thick="15" />
    </div>

    <div v-if="checkGetEvent==false">
      <h1 class="drop-shadow-2xl mx-auto w-fit  font-semibold p-[10%]  ">No event</h1>
    </div>

    <div v-if="checkGetEvent==true" class=" bg-white overflow-y-auto mx-auto h-fit h-[100%] w-[100%]" >
      <table class="table-fixed mx-auto md:table-flexed w-full">
        <thead class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-3 py-3">Start date</th>
            <th scope="col" class="px-6 py-3">Duration</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">more detail</th>
          </tr>
        </thead>
        <tbody>
          <!-- show data -->
          <tr v-for="Booking in filterReservationList" :key="Booking.id"
            class="text-center border-y border-t-0 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
              {{ Booking.bookingName }}
            </th>
            <td class="px-1 py-4">
              <div class="block m-auto">
                <span class="px-5 w-full block font-semibold">
                  {{ Booking.eventStartTime.substring(11, 16) }}
                </span>
                <span class="px-5 w-full block font-normal">
                  {{ Booking.eventStartTime.substring(0, 10) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="font-semibold">{{ Booking.eventDuration }}</span>
              <span>Min.</span>
            </td>
            <td class="px-6 py-4 text-ellipsis overflow-hidden">
              {{ Booking.eventCategory.eventCategoryName }}
            </td>
            <td class="px-14 py-4">
              <button @click="goReservation(Booking)"
                class="text-black hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- for alert -->
    <div class="alert-area">
      <div v-if="noInputFilter == true" class="alert info text-sm">
        <span class="closebtn" @click="noInputFilter = undefined">x</span>
        <strong class="block">Info!</strong> Please input information to filter
      </div>

      <div v-else-if="checkGetEvent == false && categoryList.length == 0 " class="alert warning text-sm">
        <strong class="block">Warning!</strong> A system error has occurred,please try again.</div>
    </div>
  </div>

  
  </div>

</div>


 
</template>

<style scoped>
/* slice bar */
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(111, 129, 151);
  border-radius: 0px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #53719d;
}

/* filter button */
.custom-btn {
  width: 130px;
  height: 40px;
  padding: 10px 25px;

  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

/* search */
.search {
  box-shadow: -7px -7px 20px 0px #00000011, -4px -4px 5px 0px #00000011,
    7px 7px 20px 0px #00000011, 4px 4px 5px 0px #00000011;
}
.search:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(58, 58, 58);
  color: white;
}

/* reset */
.reset {
  box-shadow: -7px -7px 20px 0px #00000011, -4px -4px 5px 0px #00000011,
    7px 7px 20px 0px #00000011, 4px 4px 5px 0px #00000011;
}
.reset:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(90, 26, 26);
  color: white;
}
/* alert */
.alert-area {
  position: fixed;
  top: 70px;
  right: 0;
  background-color: transparent;
  width: 23%;
  height: 10%;
  margin-right: 10px;
}

.alert {
  position: relative;
  width: 100%;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  animation: moveLeft 0.9s;
  animation-timing-function: ease-in-out;
  background-color: #f44336;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  margin-bottom: 15px;
}

.alert.success {
  background-color: #04aa6d;
}

.alert.info {
  background-color: #2196f3;
}

.alert.warning {
  background-color: #ff9800;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}

/* animetion */
@keyframes moveLeft {
  0% {
    right: -300px;
    top: 0px;
    opacity: 0;
  }

  100% {
    right: 0px;
    top: 0px;
    opacity: 1.5;
  }
}
@keyframes wii {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1.5;
  }
}

.showUp {
  position: relative;

  animation: wii 1s;
  animation-timing-function: ease-in-out;
}
</style>

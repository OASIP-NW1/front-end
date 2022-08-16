<script setup>
import { computed } from '@vue/reactivity';
import { ref , onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router'

defineEmits(['createAppointment', 'edit'])
const props = defineProps({
    categories: {
        type: Array,
        default: []
    }
})

let allData = ref([])
const getDate = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/events`)
    if(res.status === 200) {
    allData.value = await res.json()
    }
}
onBeforeMount( async () => {
   await getDate()
})

const myRouter = useRouter()
const { params } = useRoute()

const name = ref(params.name)
const email = ref(params.email)
const category = ref(params.eventCategory)
const date = ref(params.time)
const addnotes = ref(params.note)

let checked = ref(false)
let checked_email = ref(false)
let checked_time = ref(false)
let checked_date = ref(false)
let popup = ref(false)
let create = ref(true)
const edit = ref(params.name == undefined?true:false)
const view = ref(params.name == undefined?false:true)

const alldata = computed(() => {
    if(view.value){
        if(eventStartTime.value.includes(checktime())){
        checked_time.value = false;
        create.value = false;
        popup.value = true;
        console.log("pai wayla sump");
        return {
                bookingName: name.value, bookingEmail: email.value, eventCategory: {
                    "id": categoryId.value,
                    "eventCategoryName": category.value,
                    "eventCategoryDescription": null,
                    "eventDuration": duration.value
                }, eventStartTime: datetime(), eventDuration: duration.value, eventNote: addnotes.value, status: 1 , id: params.id
            }
    }else{
        if(checkSchedule(datetime())){
            checked_time.value = true;
            console.log("mai pai");
            return { status : 0 }
        }else{
            checked_time.value = false;
            create.value = false;
            popup.value = true;
            console.log("pai wayla mai");
            return {
                bookingName: name.value, bookingEmail: email.value, eventCategory: {
                    "id": categoryId.value,
                    "eventCategoryName": category.value,
                    "eventCategoryDescription": null,
                    "eventDuration": duration.value
                }, eventStartTime: datetime(), eventDuration: duration.value, eventNote: addnotes.value, status: 1 , id: params.id
            }
        }
    }
    }else{
    if (name.value == undefined || email.value == undefined || date.value == undefined || category.value == undefined
        || name.value == "" || email.value == "" || date.value == "" || category.value == "" || name.value.length == 0 || email.value.length == 0) {
        checked.value = true;
        checked_email.value = false;
        return { status: 0 }
    } else {
        if (checkemail(email.value)) {
            if(isFuture()){
                console.log(checktime());
            if(eventStartTime.value.includes(checktime()) || checkSchedule(datetime())){
                checked_time.value = true;
                checked.value = false
                checked_email.value = false
                return { status: 0 }
            }else{
            create.value = false;
            popup.value = true;
            return {
                bookingName: name.value, bookingEmail: email.value, eventCategory: {
                    "id": categoryId.value,
                    "eventCategoryName": category.value,
                    "eventCategoryDescription": null,
                    "eventDuration": duration.value
                }, eventStartTime: datetime(), eventDuration: duration.value, eventNote: addnotes.value, status: 1 , id: params.id
            }
            }
            }else{
                checked.value = false
                checked_email.value = false
                checked_date.value = true;
                return { status: 0 }
            }
        } else {
            checked.value = false;
            checked_email.value = true;
            return { status: 0 }
        }
    }
    }
})

// const updateData = () => {
//     if(eventStartTime.value.includes(checktime())){
//         checked_time.value = false;
//         create.value = false;
//         popup.value = true;
//         return {
//                 bookingName: name.value, bookingEmail: email.value, eventCategory: {
//                     "id": categoryId.value,
//                     "eventCategoryName": category.value,
//                     "eventCategoryDescription": null,
//                     "eventDuration": duration.value
//                 }, eventStartTime: datetime(), eventDuration: duration.value, eventNote: addnotes.value, status: 1 , id: params.id
//             }
//     }else{
//         if(checkSchedule(datetime())){
//             checked_time.value = true;
//             return { status : 0 }
//         }else{
//             checked_time.value = false;
//             create.value = false;
//             popup.value = true;
//             return {
//                 bookingName: name.value, bookingEmail: email.value, eventCategory: {
//                     "id": categoryId.value,
//                     "eventCategoryName": category.value,
//                     "eventCategoryDescription": null,
//                     "eventDuration": duration.value
//                 }, eventStartTime: datetime(), eventDuration: duration.value, eventNote: addnotes.value, status: 1 , id: params.id
//             }
//     }
//         }
// }
const datetime = () => {
    const disdate = new Date(date.value)
    return disdate
}

const checktime = () =>{
    const disdate = new Date(date.value)
    return `${disdate.getFullYear()}-${String(disdate.getMonth()+1).padStart(2, '0')}-${disdate.getDate()} ${String(disdate.getHours()).padStart(2, '0')}:${String(disdate.getMinutes()).padStart(2, '0')}:${String(disdate.getSeconds()).padStart(2, '0')}`
}

const isFuture = () =>{
    const today = new Date(new Date().getTime());
    const disdate = new Date(date.value)
    return disdate > today
}

const duration = computed(() => {
    const currentCategoryId = ref(0);
    for (let i = 0; i < props.categories.length; i++) {
        if (category.value == props.categories[i].eventCategoryName) {
            currentCategoryId.value = props.categories[i].eventDuration;
        }
    }
    return currentCategoryId.value;
})

const categoryId = computed(() => {
    const currentCategoryId = ref(0);
    for (let i = 0; i < props.categories.length; i++) {
        if (category.value == props.categories[i].eventCategoryName) {
            currentCategoryId.value = props.categories[i].id;
        }
    }
    return currentCategoryId.value;
})

const dataEachCategory = computed(() =>{
    const info = ref([])
    info.value = allData.value.filter((item) =>{
        return item.eventCategory.eventCategoryName == category.value})
    return info.value
})

const eventStartTime = computed(() =>{
    const info = ref([])
    info.value = dataEachCategory.value.map((data) =>{
        return data.eventStartTime
    })
    console.log(info.value);
    return info.value
})

const schedule = computed(()=>{
    const info = ref([])
    info.value = eventStartTime.value.map((data , index) =>{
        return [new Date(data) , new Date(new Date(data).getTime() + dataEachCategory.value[index].eventDuration*60*1000)]
    })

    return info.value
})

const checkSchedule = (date)=>{
    const result = ref('')
    const arrayOfBoolean = ref([])
    schedule.value.forEach((item) =>{
        arrayOfBoolean.value.push(item[0] < date && date < item[1])
    })
    arrayOfBoolean.value.forEach((item) =>{
        if(result.value == ''){
            result.value = item
        }else{
            result.value = result.value || item
        }
    })
    return result.value
}

const checkemail = (email) => {
    if(email.split('@').length == 2 && email.split('@')[0] != ""){
        if(email.split('@')[1].split('.')[0] != ""){
        if(email.split('@')[1].split('.').length > 1){
            return true
        }else{
            return false
        }
        }else{
            return false
        }
    }else {
        return false
        }
}
</script>
 
<template>
<!-- <div id="grad1"> -->
    <div v-show="create">
    <div class="back">
        <p class="addtitle" v-if="view"><b>EDIT APPOINTMENT</b></p>
        <p class="addtitle" v-else><b>ADD APPOINTMENT</b></p>
        <!-- edit -->
        <div class="input" v-show="view">
        <p v-show="checked_time" style="color: red;">
                <div class="alert alert-danger" role="alert">
                 This time has already been registered.
                </div></p>
                <!-- past day -->
            <p v-show="checked_date" style="color: red;">
                <div class="alert alert-danger" role="alert">
                Please validate that date-time is in the future.
            </div></p>
        <p class="names">Name &nbsp;<input type="text" size="50" :value="  params.name" disabled style="border-radius: 10px;"></p>
        <p class="emails">Email &nbsp; <input type="text" size="50" :value="  params.email" disabled style="border-radius: 10px;" ></p>
        <p class="category">Category &nbsp; <input type="text" size="50" v-model="category" disabled  style="border-radius: 10px;"></p>
        </div>
        <!-- end edit -->
        <div class="input" v-show="edit">
            <p v-show="checked">
                <div class="alert alert-danger" role="alert">
                 Please complete the information.
                </div>
            </p>
            <p v-show="checked_email" style="color: red;">
                <div class="alert alert-danger" role="alert">
                 Please validation of the email.
                </div>
            </p>
            <!-- dup time -->
            <p v-show="checked_time" style="color: red;">
                <div class="alert alert-danger" role="alert">
                 This time has already been registered.
                </div></p>
                <!-- past day -->
            <p v-show="checked_date" style="color: red;">
                <div class="alert alert-danger" role="alert">
                Please validate that date-time is in the future.
                </div></p>
             <!-- create -->
            <div class="addform">
            <p class="names">Name &nbsp; <input type="text" size="50" v-model="name" placeholder="  Name" style="border-radius: 10px;"></p>
            <p class="emails">Email &nbsp; <input type="text" size="50" v-model="email" placeholder="  Email" style="border-radius: 10px;"></p>
            </div>
        </div>
        <br>
        <!-- create add Category-->
        <div class="select1" v-show="edit">
            <p class="select">Select Category do you need &nbsp;
            <select class="option" v-model="category" style="border-radius: 10px;">
                <option v-for="(category, index) in categories" :key="index">{{ category.eventCategoryName }}</option>
            </select>
            </p>
        </div>
        <br>
        <!-- create + edit -->
        <div class="select2"> 
            <!-- <p class="namecategory">Category Name : {{category}}</p> -->
            <p class="textdt">Date - Time 
            <input id="party" type="datetime-local" name="partydate" v-model="date" style="border-radius: 10px;">
            <span class="duration">Duration : {{duration}} minutes</span>
            </p>
        </div>
        <!-- create + edit -->
        <p class="addnotes">Add Note : </p><textarea id="notes" cols="157" rows="5" maxlength="500"
            v-model="addnotes"></textarea>
        <div class="button" v-show="edit"><button type="button" class="Close btn btn-light btn-lg"
                @click="$emit('createAppointment', alldata)">Create Appointment</button></div>
        <div class="button" v-show="view"><button type="button" class="Close btn btn-light btn-lg"
                @click="$emit('edit', alldata)">Update Appointment</button></div>
        </div>
    </div>  
    <div class="modal-dialog " role="document" v-show="popup">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">ADD APPOINTMENT</h5>
                <!-- <h5 class="modal-title" v-else>EDIT APPOINTMENT</h5> -->
                <router-link :to="{ name: 'EventListAll' }"><button type="button" class="btn btn-default" data-dismiss="modal">X</button></router-link>
            </div>
            <div class="modal-body">
                <p>Your appointment is complete.</p>
                <!-- <p v-else>Edit your appointment is complete.</p> -->
                <p>นัดหมายของคุณเสร็จเรียบร้อย</p>
                <!-- <p v-else>แก้ไขนัดหมายของคุณเสร็จเรียบร้อย</p> -->
            </div>
        </div>
    </div>
    </div>
<!-- </div> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Changa+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mali:wght@500&display=swap');
.alert{
    box-shadow: 5px 5px 5px rgb(197, 141, 180);
    /* box-shadow: 5px 5px 5px rgb(#FADBD8); */
}
.namecategory{
    font-family: 'Mali', cursive;
    text-align: center;
    margin-left: -2em;
    margin-top: -1em;
    margin-bottom: 2em;
}
.names{
    margin-left: -3em;
    margin-top: 1.75em;
}
.category{
    margin-left: -5em;
}
.duration{
    margin-left: 2.5em;
}
.modal-content{
    margin-top: -38em;
    background: linear-gradient(-45deg ,#EBDEF0,#FADBD8);
    box-shadow: 5px 5px 10px grey;
    font-family: 'Mali', cursive;
}
.modal-title{
    font-weight: bolder;
    margin-left: 6.75em;
}
.modal-body{
    text-align: center;
}

.back{
    margin-top: -40em;
    padding-top: 1em;
    margin-left: 15em;
    width: 70em;
    height: 39.55em;    
    padding: 60px;
    /* border: 1px solid #FFD8BE; */
    /* background-color: #C1E7E3; */
    background: linear-gradient(-45deg,#7DC8CA,#CAE9E0,#AAC9CE);
    /* animation: gradient 15s ease infinite; */
    border-radius: 20px;
    box-shadow: 5px 5px 10px grey;
    /* opacity: 90%; */
}
.addnotes {
    margin-left: 3em;
    margin-top: 2em;
    font-family: 'Mali', cursive;
}
#notes{
    margin-left: 10em;
    margin-top: -2em;
    width: 82.5%;
    border-radius: 15px;
}
#party{
    width: 50%;
    margin-left: 2em;
}
.Close{
  /* font-family: 'Ubuntu Mono', monospace; */
  font-family: 'Mali', cursive;
  border-radius: 10px;
  background-color: aquamarine;
  box-shadow: 5px 5px 10px grey;
  margin-top: 1.75em;
}
.textdt{
    margin-left: 0.5em;
    font-family: 'Mali', cursive;
}
.addform{
    /* margin-left: 5em; */
    font-family: 'Mali', cursive;
}
.picture {
    margin-top: -2em;
}
.color{
    border: #FB757E;
}

.btnclose {
    background-color: #FB757E;
    border-radius: 10px;
    font-family: 'Itim', cursive;
    font-size: medium;
    margin-left: 15em;
}

.addtitle {
    text-align: center;
    font-family: 'Mali', cursive;
    /* font-family: 'Changa One', cursive; */
    font-size: 2em;
    margin-top: -1.25em;
}

.emails{
    padding-right: 2.85em;
}

.input {
    text-align: center;
    font-family: 'Mali', cursive;
    margin-top: -1em;
}

.select3 {
    margin-left: 6em;
    font-family: 'Changa One', cursive;
    margin-top: -2.5em;
    justify-content: center;
}

.select2 {
    margin-left: 2.5em;
}
.select{
    font-family: 'Mali', cursive;
    margin-left: 3em;
}

.button {
    display: flex;
    justify-content: center;
    /* padding: 15px 32px; */
    font-size: 16px;
}

.button:hover {
    color: white;
}

</style>
<script setup>
import Details from '../components/Details.vue'
import {useRouter, useRoute} from 'vue-router'
import { ref , onBeforeMount} from 'vue'

const myRouter = useRouter()
const {params} = useRoute()
let eventDetail = ref({})
// GET
const getEvents = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/events/${params.id}`)
    if(res.status === 200) {
    console.log(`response.status: ${res.status}`)
    console.log(res);
    eventDetail.value = await res.json()
    }else 
    console.log("error, cann't get data");
}
onBeforeMount( async () => {
   await getEvents()
})

const editingNote = ref({})

const toEditingNode = async (editNote) => {
  editingNote.value = editNote
  console.log(editingNote.value);
}

// onBeforeMount(async () =>{
//   await getEvents()
// })

const modifyEvent = async (events) => {
  const res = await fetch(`${import.meta.env.BASE_URL}api/events/${params.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ bookingName: events.bookingName , bookingEmail: events.bookingEmail , eventCategory:events.eventCategory,
                           eventStartTime: events.eventStartTime , eventDuration: events.eventDuration , eventNote: events.eventNote })
  })
  if(res.status === 200){
    const modifyEvent = await res.json()
    eventDetail.value = eventDetail.value.map((event) =>
    event.id === modifyEvent.id ? { bookingName: modifyEvent.bookingName , bookingEmail: modifyEvent.bookingEmail , eventCategory:modifyEvent.eventCategory,
                           eventStartTime: modifyEvent.eventStartTime , eventDuration: modifyEvent.eventDuration , eventNote: modifyEvent.eventNote } : event
    ) 
    console.log('sucessfully');
  }else {
    console.log('fail');
    }
    editingNote.value=""
}

</script>
 
<template> 
<Details :eventDetails="eventDetail" @edit="toEditingNode"/> 
</template>
 
<style>

</style>
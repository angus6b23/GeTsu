<template>
    <div :data-theme="theme">
        <Topbar @changeTheme="changeTheme" />
        <Events
            @addEvent="addEvent"
            @clearEvent="clearEvent"
        />
        <PaperArea @updateEvent="updateEvent" @removeEvent="removeEvent" />
    </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { nanoid } from 'nanoid'
import Topbar from './components/Topbar.vue'
import PaperArea from './components/PaperArea.vue'
import Events from './components/Events.vue'
import { guessCountry } from './utils/dateTime'
const now = new Date()
const country = guessCountry() === null ? 'unknown' : guessCountry().id
const events = ref([])
const option = ref({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    title: '',
    font: 'font-ibm',
    country: country,
    showHoliday: true,
    locale: navigator.language.toLowerCase(),
    advanced: {
        showHolidayText: true,
        boldWeekends: true,
        region: 'all',
        useLocalName: true,
        holidayAlign: 'left',
        boldWeekends: true,
        holidayColor: '#EF4444',
    },
})
provide('option', option)
provide('events', events)

const theme = ref('bumblebee')

const changeTheme = () => {
    theme.value = theme.value === 'bumblebee' ? 'forest' : 'bumblebee'
}
const addEvent = (event) => {
    const { day, detail } = event
    events.value.push({
        id: nanoid(5),
        day: day,
        detail: detail,
    })
}
const clearEvent = () => {
    events.value = []
}
const updateEvent = (eventItem) => {
    events.value = events.value.map(event => event.id === eventItem.value.id ? eventItem.value : event)
}
const removeEvent = (eventItem) => {
    events.value = events.value.filter(event => event.id !== eventItem.value.id)
}
</script>

<style>
@import url('https://api.fonts.coollabs.io/css2?family=Anonymous+Pro&family=IBM+Plex+Mono&family=Indie+Flower&family=Noto+Sans&family=Noto+Sans+Mono&family=Space+Mono&family=Ubuntu&family=Ubuntu+Mono&display=swap');

#app {
    padding: 0px !important;
}
</style>

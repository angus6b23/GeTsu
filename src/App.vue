<template>
    <div :data-theme="theme">
        <Topbar :option="option" @changeTheme="changeTheme"/>
        <PaperArea :option="option" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Topbar from './components/Topbar.vue';
import PaperArea from './components/PaperArea.vue'
import { guessCountry } from './utils/dateTime';
const now = new Date();
const country = guessCountry() === null ? 'unknown' : guessCountry().id
const option = ref({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    title: '',
    font: "font-ibm",
    country: country,
    showHoliday: true,
    locale: navigator.language.toLowerCase(),
    advanced:{
        showHolidayText: true,
        boldWeekends: true,
        region: 'all',
        useLocalName: true,
        holidayAlign: 'left',
        boldWeekends: true,
        holidayColor: '#EF4444',
    }
})
const theme =ref('bumblebee');

const changeTheme = () =>{
    theme.value = theme.value === 'bumblebee' ? 'forest' : 'bumblebee';
}
</script>

<style>
@import url('https://api.fonts.coollabs.io/css2?family=Anonymous+Pro&family=IBM+Plex+Mono&family=Indie+Flower&family=Noto+Sans&family=Noto+Sans+Mono&family=Space+Mono&family=Ubuntu&family=Ubuntu+Mono&display=swap');

#app{
    padding: 0px !important;
}
</style>

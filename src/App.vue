<script setup>
import { ref } from 'vue';
import Topbar from './components/Topbar.vue';
import PaperArea from './components/PaperArea.vue'
const now = new Date();
const option = ref({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    title: '',
    font: "font-ibm",
})
const theme =ref('bumblebee');

const handleUpdateOption = (newOption) =>{
    option.value = newOption;
}
const changeTheme = () =>{
    theme.value = theme.value === 'bumblebee' ? 'forest' : 'bumblebee';
}
</script>

<template>
    <div :data-theme="theme">
        <Topbar :option="option" @update:option="handleUpdateOption" @changeTheme="changeTheme"/>
        <PaperArea :option="option" />
    </div>
</template>

<style>
@import url('https://api.fonts.coollabs.io/css2?family=Anonymous+Pro&family=IBM+Plex+Mono&family=Indie+Flower&family=Noto+Sans&family=Noto+Sans+Mono&family=Space+Mono&family=Ubuntu&family=Ubuntu+Mono&display=swap');

#app{
    padding: 0px !important;
}
</style>

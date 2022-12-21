<script setup>
import { ref, watch } from 'vue';
const monthName = ref(['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemer', 'October', 'November', 'December']);
const month = ref('');
const year = ref('');
const days = ref(0);
const today = new Date();
const firstWeekday = ref(0);
const customTitle = ref('');
const selectedFont = ref("'IBM Plex Mono', monospace");
const fonts = [{
    display: 'Anonymous Pro',
    css: "'Anonymous Pro', monospace"
},
{
    display: 'IBM Plex Mono',
    css: "'IBM Plex Mono', monospace"
},
{
    display: 'Indie Flower',
    css: "'Indie Flower', cursive"
},
{
    display: 'Noto Sans',
    css: "'Noto Sans', sans-serif"
},
{
    display: 'Noto Sans Mono',
    css: "'Noto Sans Mono', monospace"
},
{
    display: 'Space Mono',
    css: "'Space Mono', monospace"
},
{
    display: 'Ubuntu',
    css: "'Ubuntu', sans-serif"
},
{
    display: 'Ubuntu Mono',
    css: "'Ubuntu Mono', monospace"
}
]
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
month.value = today.getMonth() + 1;
year.value = today.getYear() + 1900;
function getDays(){
    if(month.value == 2 && year.value % 4 == 0){days.value = 29}
    else if(month.value == 2){days.value = 28}
    else if(month.value <=7 && month.value % 2 == 1 || month.value >=8 && month.value % 2 == 0){days.value = 31}
    else{days.value = 30}

    let firstDay = new Date(`${year.value}-${month.value}-01`);
    firstWeekday.value = firstDay.getDay();
}
function getWeekday(day){
    let weekday = (firstWeekday.value + day - 1) % 7;
    return weekdays[weekday];
};

getDays();
console.log(firstWeekday.value);
watch(month, getDays);
watch(year, getDays);


</script>

<template>
    <header>
        <div class="controller-wrapper">
            <form class="pure-form-stacked">
                <div class="pure-g">
                    <div class="pure-u-1-5 x-center">
                        <label for="year-select" class="text-align-center">Year:</label>
                        <select name="year-select" v-model="year" class="x-center">
                            <option v-for="i in (201)" :value="1999+i">{{1999+i}}</option>
                        </select>
                    </div>
                    <div class="pure-u-1-5 x-center">
                        <label for="year-select" class="text-align-center">Month:</label>
                        <select name="month-select" v-model="month" class="x-center">
                            <option v-for="i in (12)" :value="i">{{i}}</option>
                        </select>
                    </div>
                    <div class="pure-u-1-5 x-center">
                        <label for="title" class="x-center" style="margin: 0.25em 0">Title(optional):</label>
                        <input type="text" name="title" v-model="customTitle" />
                    </div>
                    <div class="pure-u-1-5 x-center">
                        <label for="font-select" class="text-align-center">Font:</label>
                        <select name="font-select" v-model="selectedFont" class="x-center">
                            <option v-for="font in fonts" :value="font.css">{{font.display}}</option>
                        </select>
                    </div>
                    <div class="pure-u-1-5">
                        <a class="pure-button pure-button-primary x-center" style="display:block; height: 100%; line-height: 50px" @click="window.print()">Print</a>
                    </div>
                </div>
            </form>
        </div>
    </header>
    <body>
        <div class="paper-wrapper">
            <div class="print-wrapper" :style="{'--font': selectedFont}">
                <h1>{{ monthName[month] }} {{year}}</h1>
                <h2 class="custom-title">{{ customTitle }}</h2>
                <table>
                    <tbody>
                        <tr v-for="day in days">
                            <td class="text-col" :class="
                            [getWeekday(day) == 'Sat' || getWeekday(day) == 'Sun' ? 'weekend' : ''],
                            [getWeekday(day) == 'Sun' ? 'sunday' : '']
                            ">{{day}}</td>
                            <td class="text-col" :class="
                            [getWeekday(day) == 'Sat' || getWeekday(day) == 'Sun' ? 'weekend' : ''],
                            [getWeekday(day) == 'Sun' ? 'sunday' : '']
                            ">{{getWeekday(day)}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</template>

<style scoped>
header{
    padding: 0px;
    margin: 0px;
    position: sticky;
    top: 0px;
}
.controller-wrapper{
    background-color: #000000;
    color: #ffffff;
    padding: 0.5rem;
}
input{
    width: 80%;
}
.x-center{
    margin: auto;
}
.text-align-center{
    text-align: center;
}
.custom-title{
    margin-bottom: 5px;
}
.paper-wrapper{
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 297mm;
    width: 210mm;
    border: 1px solid black;
}
.print-wrapper{
    font-family: var(--font);
    padding: 12.7mm;
}
table{
    table-layout: fixed;
    border-collapse : collapse;
    border: 2px solid black;
    width: 100%;
}
table td{
    border: 1px solid black;
    text-align: center;
    height: 28px;
}
.text-col{
    width: 7.5%;
}
.weekend{
    font-weight: bold;
}
.sunday{
    color: #FF0000;
}
@media print{
    header{
        display: none;
    }
    .paper-wrapper{
        border: 0px;
        margin: 0px;
    }
    .print-wrapper{
        padding: 0px;
    }
}
</style>
<style>
@import url('https://api.fonts.coollabs.io/css2?family=Anonymous+Pro&family=IBM+Plex+Mono&family=Indie+Flower&family=Noto+Sans&family=Noto+Sans+Mono&family=Space+Mono&family=Ubuntu&family=Ubuntu+Mono&display=swap');
#app{
    padding: 0px !important;
}
</style>

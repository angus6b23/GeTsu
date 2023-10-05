<template>
    <div class="sticky m-0 bg-base-300 min-h-[15vh] h-fit flex justify-center items-center not-for-print">
        <form class="h-full w-full">
            <div class="h-full w-full grid grid-cols-4 p-4">
                <div class="col-span-3 grid grid-cols-2 lg:grid-cols-8">
                    <div class="flex items-center justify-center flex-wrap col-span-1">
                        <div>
                            <label class="label mr-2" for="year-select">
                                <span class="label-text text-lg">Year</span>
                            </label>
                            <select name="year-select" class="select select-bordered text-lg" v-model="innerOption.year">
                                <option v-for="i in (201)" :value="1999+i" >{{ 1999+i }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-center col-span-1">
                        <div>
                            <label class="label mr-2" for="year-select">
                                <span class="labe-text text-lg">Month</span>
                            </label>
                            <select name="month-select" class="select select-bordered text-lg" v-model="innerOption.month">
                                <option v-for="i in (12)" :value="i">{{i}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex item-center justify-center col-span-2 p-8 form-control">
                        <label class="label" for="show-holiday">
                            <span class="label-text text-lg">Show Holidays</span>
                            <input name="show-holiday" v-model="innerOption.showHoliday" type="checkbox" class="toggle toggle-primary" />
                        </label>
                        <select name="country-select" class="select select-bordered text-lg" v-model="innerOption.country" :disabled="!innerOption.showHoliday">
                            <option disabled selected value='unknown'>Please Select country</option>
                            <option v-for="country of countryList" :value="country.countryCode">{{ country.name }}</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-center flex-wrap lg:col-span-2">
                        <div>
                            <label for="title" class="label text-lg mr-2">Title</label>
                            <input type="text" v-model="innerOption.title" class="input input-bordered text-lg" placeholder="Optional Title"  name="title"/>
                        </div>
                    </div>
                    <div class="flex items-center justify-center flex-wrap lg:col-span-2">
                        <div>
                            <label for="font-select" class="label text-lg mr-2">Font:</label>
                            <select name="font-select" class="select select-bordered text-lg" v-model="innerOption.font">
                                <option v-for="font of fonts" :value="font.className">{{ font.display }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="cols-span-1 grid grid-cols-3 grid-rows-2 p-4">
                    <div class="col-span-1 row-span-1 flex justify-center items-center">
                        <label class="swap swap-rotate">
                            <!-- this hidden checkbox controls the state -->
                            <input type="checkbox" @change="$emit('changeTheme')" />
                            <!-- sun icon -->
                            <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                            <!-- moon icon -->
                            <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                        </label> 
                    </div>
                    <div class="col-span-2 row-span-2">
                        <button class="btn btn-primary text-2xl w-full h-full" @click.prevent="window.print()">Print</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { fonts } from '../utils/styles'
import { getAvailableCountries } from '../utils/holiday'
const props = defineProps(['option']);
const emit = defineEmits(['update:option', 'changeTheme']);
const innerOption = ref(props.option);
const countryList = ref([]);

onMounted(async () => {
    const avaliableCountries = await getAvailableCountries();
    countryList.value = avaliableCountries;
});

watch(() => innerOption, (newOption) => {
    emit('update:option', newOption);
});
</script>

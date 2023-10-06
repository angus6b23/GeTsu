<template>
    <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>  
    <h3 class="font-bold text-xl mb-8">Options</h3>
    <div class="collapse collapse-plus border border-base-300 bg-base-100">
        <input type="checkbox" checked /> 
        <div class="collapse-title text-xl bg-primary">
            Basics
        </div>
        <div class="collapse-content"> 
            <div class="form-control w-full grid grid-cols-2 gap-2 mt-4">
                <label class="label">
                    <span class="label-text text-lg">Year</span>
                </label>
                <input type="number" class="w-full input input-bordered" min="1900" max="3000" v-model="modalOption.year" />
                <label class="label">
                    <span class="label-text text-lg">Month</span>
                </label>
                <select class="w-full select select-bordered text-lg" v-model="modalOption.month">
                    <option v-for="i in (12)" :value="i">{{i}}</option>
                </select>
                <label class="label">
                    <span class="label-text text-lg">Title</span>
                </label>
                <input type="text" class="w-full input input-bordered" placeholder="Optional title" v-model="modalOption.title" />
                <label class="label">
                    <span class="label-text text-lg">Font</span>
                </label>
                <select class="w-full select select-bordered text-lg" v-model="modalOption.font">
                    <option v-for="font of fonts" :value="font.className">{{ font.display }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="collapse collapse-plus border border-base-300 bg-base-100 mt-4">
        <input type="checkbox" checked /> 
        <div class="collapse-title text-xl bg-primary">
            Holidays and weekends
        </div>
        <div class="collapse-content"> 
            <div class="form-control w-full grid grid-cols-2 gap-2 mt-4">
                <label class="label">
                    <span class="label-text text-lg">Show holidays</span>
                </label>
                <div class="flex items-center justify-center">
                    <input type="checkbox" class="toggle toggle-primary" v-model="modalOption.showHoliday" />
                </div>
                <label class="label">
                    <span class="label-text text-lg">
                        Country for holidays
                    </span>
                </label>
                <select name="country-select" class="select select-bordered text-lg" v-model="modalOption.country" :disabled="!modalOption.showHoliday">
                    <option disabled selected value='unknown'>Please Select country</option>
                    <option v-for="country of countryList" :value="country.countryCode">{{ country.name }}</option>
                </select>
                <label class="label">
                    <span class="label-text text-lg">
                        Region / County
                    </span>
                </label>
                <select name="country-select" class="select select-bordered text-lg" v-model="modalOption.advanced.region" :disabled="!modalOption.showHoliday">
                    <option value='all'>All regions</option>
                    <option v-for="region of regionList" :value="region">{{ region }}</option>
                </select>
                <label class="label">
                    <span class="label-text text-lg">Show name of holiday in planning section</span>
                </label>
                <div class="flex items-center justify-center">
                    <input type="checkbox" class="toggle toggle-primary" :disabled="!modalOption.showHoliday" v-model="modalOption.advanced.showHolidayText" />
                </div>
                <label class="label">
                    <span class="label-text text-lg">Show local name of holiday</span>
                </label>
                <div class="flex items-center justify-center">
                    <input type="checkbox" class="toggle toggle-primary" :disabled="!modalOption.advanced.showHolidayText || !modalOption.showHoliday" v-model="modalOption.advanced.useLocalName" />
                </div>
                <label class="label">
                    <span class="label-text text-lg">Holiday text position</span>
                </label>
                <div class="join">
                    <input class="join-item btn" type="radio" name="holidayAlign" v-model="modalOption.advanced.holidayAlign" value="left" :disabled="!modalOption.advanced.showHolidayText || !modalOption.showHoliday" aria-label="Left" />
                    <input class="join-item btn" type="radio" name="holidayAlign" v-model="modalOption.advanced.holidayAlign" value="center" :disabled="!modalOption.advanced.showHolidayText || !modalOption.showHoliday" aria-label="Center" />
                    <input class="join-item btn" type="radio" name="holidayAlign" v-model="modalOption.advanced.holidayAlign" value="right" :disabled="!modalOption.advanced.showHolidayText || !modalOption.showHoliday" aria-label="Right" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { fonts } from '../utils/styles';
import { getAvailableCountries, getRegions } from '../utils/holiday';

const props = defineProps(['option']);
const modalOption = ref(props.option);
const countryList = ref([]);
const regionList = ref([]);

onMounted(async () => {
    countryList.value = await getAvailableCountries();
    regionList.value = await getRegions(modalOption.value.country);
});
watch(props.option, async () =>{
    regionList.value = await getRegions(modalOption.value.country);
});
</script>

<template>
    <section class="flex justify-center mt-10 paper-section">
        <div class="lg:w-[210mm] lg:h-[297mm] border-2 mt10 paper-wrapper" :class="props.option.font">
            <div class="w-full h-full px-20 py-4">
                <h1 class="text-3xl my-2">{{ getLocaleMonth() }} {{ props.option.year }}</h1>
                <h2 class="text-2xl mb-2">{{ props.option.title }}</h2>
                <table class="w-full border-collapse border">
                    <tbody class=" p-0">
                        <tr v-for="day in daysOfMonth" class="h-8 grid grid-cols-12 gap-0  w-full p-0">
                            <td class="col-span-1  border text-center text-lg p-0"
                                :class="{'font-bold': isWeekend(props.option.year, props.option.month, day) || isHoliday(day), 'text-red-500': isSunday(props.option.year, props.option.month, day) || isHoliday(day)}">
                                {{ day }}
                            </td>
                            <td 
                                class="col-span-1  border text-center text-lg p-0" 
                                :class="{'font-bold': isWeekend(props.option.year, props.option.month, day) || isHoliday(day), 'text-red-500': isSunday(props.option.year, props.option.month, day) || isHoliday(day)}">
                                {{ getLocaleWeekday(day) }}
                            </td>
                            <td class="col-span-10  border p-0">
                                <span v-if="isHoliday(day)" class="text-lg ml-2">{{ getHolidayDetails(day).localName }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { getNumberOfDays, isWeekend, isSunday } from '../utils/dateTime'
import { getHolidays } from '../utils/holiday'
import moment from 'moment';
const props = defineProps(['option']);
const holidays = ref([]);
const fetchHolidays = async () => {
    if (props.option.showHoliday){
        let holidayRes = await getHolidays(props.option.year, props.option.month, props.option.country);
        holidays.value = holidayRes
    } else {
        holidays.value = []
    }
}

const daysOfMonth = computed(() => getNumberOfDays(props.option.year, props.option.month));

const getLocaleWeekday = (day) => moment(`${props.option.year}-${props.option.month}-${day}`).format('ddd');
const getLocaleMonth = () => moment(`${props.option.year}-${props.option.month}-01`).format('MMMM');
const isHoliday = (day) => {
    return holidays.value.some(holiday => holiday.day === day);
};
const getHolidayDetails = (day) =>{
    if (props.option.showHoliday){
        const index = holidays.value.findIndex(holiday => holiday.day === day);
        return holidays.value[index]
    }
}
onMounted(fetchHolidays);
watch(props.option, fetchHolidays)
</script>

<template>
    <section class="flex justify-center mt-10">
        <div class="lg:w-[210mm] lg:h-[297mm] border-2 mt10" :class="props.option.font">
            <div class="print-wrapper w-full h-full px-20 py-10">
                <h1 class="text-3xl my-2">{{ getLocaleMonth() }} {{ props.option.year }}</h1>
                <h2 class="text-2xl mb-2">{{ props.option.title }}</h2>
                <table class="w-full border-collapse border">
                    <tbody class="border-collapse">
                        <tr v-for="day in daysOfMonth" class="h-8 grid grid-cols-12 gap-0 border-collapse w-full">
                            <td class="col-span-1 border-collapse border text-center text-lg">{{ day }}</td>
                            <td 
                                class="col-span-1 border-collapse border text-center text-lg" 
                                :class="{'font-bold': isWeekend(props.option.year, props.option.month, day), 'text-red-500': isSunday(props.option.year, props.option.month, day)}">
                                {{ getLocaleWeekday(day) }}
                            </td>
                            <td class="col-span-10 border-collapse border "></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
<script setup>
import { computed } from 'vue';
import { getNumberOfDays, isWeekend, isSunday } from '../utils/dateTime'
import moment from 'moment';
const props = defineProps(['option']);
const daysOfMonth = computed(() => getNumberOfDays(props.option.year, props.option.month));

const getLocaleWeekday = (day) => moment(`${props.option.year}-${props.option.month}-${day}`).format('ddd');
const getLocaleMonth = () => moment(`${props.option.year}-${props.option.month}-01`).format('MMMM');

</script>

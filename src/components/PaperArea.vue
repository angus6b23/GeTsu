<template>
    <section class="flex justify-center mt-4 lg:mt-10 paper-section">
        <div
            class="lg:w-[210mm] lg:h-[297mm] lg:border-2 lg:mt-10 w-full paper-wrapper"
            :class="option.font"
        >
            <div class="w-full h-full lg:px-20 lg:py-4 px-4 py-2">
                <h1 class="print-no-margin text-3xl my-1">
                    {{ getLocaleMonth() }} {{ option.year }}
                </h1>
                <h2 class="print-no-margin text-2xl mb-2">
                    {{ option.title }}
                </h2>
                <table class="w-full border-collapse border">
                    <tbody class="p-0">
                        <tr
                            v-for="day in daysOfMonth"
                            class="h-8 grid grid-cols-6 lg:grid-cols-12 gap-0 w-full p-0"
                        >
                            <td
                                class="col-span-1 border text-center text-lg p-0"
                                :class="{
                                    'font-bold':
                                        option.advanced.boldWeekends &&
                                        (isWeekend(
                                            option.year,
                                            option.month,
                                            day
                                        ) ||
                                            isHoliday(day)),
                                }"
                                :style="holidayTextStyle(day)"
                            >
                                {{ day }}
                            </td>
                            <td
                                class="col-span-1 border text-center text-lg p-0"
                                :class="{
                                    'font-bold':
                                        option.advanced.boldWeekends &&
                                        (isWeekend(
                                            option.year,
                                            option.month,
                                            day
                                        ) ||
                                            isHoliday(day)),
                                }"
                                :style="holidayTextStyle(day)"
                            >
                                {{ getLocaleWeekday(day) }}
                            </td>
                            <td class="col-span-4 lg:col-span-10 border p-0">
                                <span
                                    v-if="
                                        isHoliday(day) &&
                                        option.advanced.showHolidayText
                                    "
                                    class="text-lg px-2"
                                    :class="{
                                        'text-right':
                                            option.advanced.holidayAlign ===
                                            'right',
                                        'text-center':
                                            option.advanced.holidayAlign ===
                                            'center',
                                        'text-left':
                                            option.advanced.holidayAlign ===
                                            'left',
                                    }"
                                >
                                    {{
                                        option.advanced.useLocalName
                                            ? getHolidayDetails(day).localName
                                            : getHolidayDetails(day).name
                                    }}
                                </span>
                                <span
                                    v-for="eventItem of eventOfDay(day)"
                                    :key="eventItem.id"
                                    @click="showEditModal(eventItem.id)"
                                    class="text-lg px-2 hover:bg-primary hover:border-2 hover:border-neutral cursor-pointer"
                                    :style="{ color: eventItem.eventColor }"
                                >
                                    {{ eventItem.detail }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <dialog ref="editModal" class="modal">
            <div class="modal-box">
                <EditModal
                    :id="editId"
                    :modal="editModal"
                    @updateEvent="updateEvent"
                    @removeEvent="removeEvent"
                />
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from 'vue'
import { getNumberOfDays, isWeekend, isSunday } from '../utils/dateTime'
import { getHolidays } from '../utils/holiday'
import moment from 'moment/min/moment-with-locales'
import EditModal from './EditModal.vue'

const option = inject('option')
const events = inject('events')
const emits = defineEmits(['updateEvent', 'removeEvent'])
const holidays = ref([])
const editId = ref('')
const editModal = ref(null)
const fetchHolidays = async () => {
    if (option.value.showHoliday) {
        let holidayRes = await getHolidays(
            option.value.year,
            option.value.month,
            option.value.country
        )
        holidays.value = holidayRes === undefined ? [] : holidayRes
    } else {
        holidays.value = []
    }
}
const daysOfMonth = computed(() =>
    getNumberOfDays(option.value.year, option.value.month)
)
const holidayTextStyle = (day) => {
    if (
        isHoliday(day) ||
        isSunday(option.value.year, option.value.month, day)
    ) {
        return {
            color: option.value.advanced.holidayColor,
        }
    }
}

const getLocaleWeekday = (day) => {
    moment.locale(option.value.locale)
    return moment(
        `${option.value.year}-${option.value.month}-${day}`,
        'YYYY-MM-DD'
    ).format('ddd')
}
const getLocaleMonth = () => {
    moment.locale(option.value.locale)
    return moment(
        `${option.value.year}-${option.value.month}-01`,
        'YYYY-MM-DD'
    ).format('MMMM')
}
const isHoliday = (day) => {
    if (option.value.advanced.region === 'all') {
        return holidays.value.some((holiday) => holiday.day === day)
    } else {
        return holidays.value.some((holiday) => {
            return (
                holiday.day === day &&
                (holiday.counties == null ||
                    holiday.counties.includes(option.value.advanced.region))
            )
        })
    }
}
const getHolidayDetails = (day) => {
    if (option.value.showHoliday) {
        const index = holidays.value.findIndex((holiday) => holiday.day === day)
        return holidays.value[index]
    }
}
const eventOfDay = (day) => {
    return events.value.filter((item) => item.day === day)
}
const showEditModal = (id) => {
    editId.value = id
    editModal.value.showModal()
}
const updateEvent = (eventItem) => {
    emits('updateEvent', eventItem)
}
const removeEvent = (eventItem) => {
    emits('removeEvent', eventItem)
}
onMounted(fetchHolidays)
watch(fetchHolidays)
</script>

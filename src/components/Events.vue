<script setup>
import { ref, computed } from 'vue'
import { getNumberOfDays } from '../utils/dateTime'
const props = defineProps(['option', 'events'])
const emit = defineEmits(['addEvent', 'clearEvent'])
const eventModal = ref(null)
const maxDays = computed(() =>
    getNumberOfDays(props.option.year, props.option.month)
)
const eventItem = ref({
    day: 1,
    detail: '',
})
const addEvent = () => {
    emit('addEvent', eventItem.value)
}
const clearEvent = () => {
    emit('clearEvent')
}
</script>

<template>
    <section class="w-full flex p-2 justify-between not-for-print">
        <div class="flex justify-start" @click="eventModal.showModal()">
            <button class="btn btn-primary">Add Event</button>
        </div>
        <div v-if="events.length > 0" class="flex justify-end">
            <button class="btn" @click="clearEvent">Clear Events</button>
        </div>
    </section>
    <dialog ref="eventModal" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Add Event</h3>
        <form method="dialog">
            <div class="py-4">
                <label for="day" class="label">
                    <span class="label-text">
                        Please select day of event</span>
                </label>
                <input class="input input-bordered" v-model="eventItem.day" type="number" min="1" :max="maxDays" name="day" />
                <label for="description" class="label mt-2">
                    <span class="label-text">
                        Please input name of event</span>
                </label>
                <input type="text" class="input input-bordered" v-model="eventItem.detail" name="description" required />
            </div>
            <div class="w-full flex justify-between modal-action">
                <button class="btn btn-primary" @click="addEvent">Add Event</button>
                <button class="btn">Close</button>
            </div>
        </form>
    </div>
    </dialog>
</template>

<style scoped></style>
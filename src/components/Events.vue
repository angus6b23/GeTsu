<script setup>
import { ref, computed, inject, watch } from 'vue'
import { getNumberOfDays } from '../utils/dateTime'
import ColorModal from './ColorModal.vue'

const option = inject('option')
const events = inject('events')
const emit = defineEmits(['addEvent', 'clearEvent'])
const colorModal = ref(null)
const colorModalProps = ref({
    type: 'event',
    color: option.value.advanced.defaultEventColor,
})
const eventModal = ref(null)
const maxDays = computed(() =>
    getNumberOfDays(option.value.year, option.value.month)
)
const eventItem = ref({
    day: 1,
    detail: '',
    eventColor: option.value.advanced.defaultEventColor,
})
const eventBgStyle = computed(() => {
    return {
        'background-color': eventItem.value.eventColor,
    }
})
const addEvent = () => {
    emit('addEvent', eventItem.value)
    eventItem.value = {
        day: 1,
        detail: '',
        eventColor: option.value.advanced.defaultEventColor,
    }
}
const clearEvent = () => {
    emit('clearEvent')
}
const handleChangeColor = (color, type) => {
    eventItem.value.eventColor = color
}
const showColorModal = () => {
    colorModalProps.value.color = eventItem.value.eventColor
    colorModal.value.show()
}
watch(
    () => option.value.advanced.defaultEventColor,
    (color) => {
        eventItem.value.eventColor = color
    }
)
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
            <form method="dialog" @submit="addEvent">
                <div class="py-4">
                    <label for="day" class="label">
                        <span class="label-text">
                            Please select day of event</span
                        >
                    </label>
                    <input
                        class="input input-bordered"
                        v-model="eventItem.day"
                        type="number"
                        min="1"
                        :max="maxDays"
                        name="day"
                    />
                    <label for="description" class="label mt-2">
                        <span class="label-text">
                            Please input name of event</span
                        >
                    </label>
                    <input
                        type="text"
                        class="input input-bordered"
                        v-model="eventItem.detail"
                        name="description"
                        required
                    />
                    <label class="label">Event Color</label>
                    <div class="flex items-center justify-start gap-4">
                        <div
                            class="h-8 w-8 rounded mr-10"
                            :style="eventBgStyle"
                        ></div>
                        <button class="btn" @click.prevent="showColorModal">
                            Change
                        </button>
                    </div>
                    <div class="w-full flex flex-wrap justify-between modal-action">
                        <p class="w-full mb-2">You can change the details by clicking on the event afterwards.</p>
                        <button class="btn btn-primary" type="submit">
                            Add Event
                        </button>
                        <button class="btn" @click.prevent="eventModal.close()">
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <dialog ref="colorModal" class="modal">
            <ColorModal
                :color="colorModalProps"
                @updateColor="handleChangeColor"
            />
        </dialog>
    </dialog>
</template>

<style scoped></style>

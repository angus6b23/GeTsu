<script setup>
import { inject, ref, watch, computed } from 'vue'

import { getNumberOfDays } from '../utils/dateTime'

const events = ref(inject('events'))
const option = ref(inject('option'))
const maxDays = computed(() =>
    getNumberOfDays(option.value.year, option.value.month)
)
const props = defineProps(['id', 'modal'])
const emit = defineEmits(['removeEvent', 'updateEvent'])
const eventItem = ref({
    id: null,
    day: 1,
    detail: '',
})

const updateEvent = () => {
    emit('updateEvent', eventItem)
}

const removeEvent = () => {
    props.modal.close();
    emit('removeEvent', eventItem)
}

watch(
    () => props.id,
    (id) => {
        const targetEvent = events.value.find((event) => event.id === id)
        eventItem.value = {...targetEvent}
    }
)
</script>

<template>
    <h3 class="font-bold text-lg">Edit Event</h3>
    <form method="dialog" @submit="updateEvent">
        <div class="py-4">
            <label for="day" class="label">
                <span class="label-text"> Day of event</span>
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
                <span class="label-text"> Name of event</span>
            </label>
            <input
                type="text"
                class="input input-bordered"
                v-model="eventItem.detail"
                name="description"
                required
            />
        </div>
        <div class="w-full flex justify-between modal-action">
            <button class="btn btn-primary" type="submit">Update Event</button>
            <button class="btn btn-warning" @click.prevent="removeEvent">
                Delete Event
            </button>
            <button class="btn" @click.prevent="props.modal.close()">
                Close
            </button>
        </div>
    </form>
</template>

<style scoped>
/* code... */
</style>

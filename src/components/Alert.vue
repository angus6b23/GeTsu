<script setup lang="ts">
import { computed, inject } from 'vue'

const regionList = inject('regionList')
const option = inject('option')
console.log(option.value.showHoliday)
const showAlert = computed(() => {
    return option.value.showHoliday && regionList.value.length > 0
})
</script>

<template>
    <div class="w-full px-6 py-2 not-for-print">
        <div class="alert shadow-md" v-if="showAlert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-info shrink-0 w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <div>
                <div class="text-md">
                    There are more than one region available in your country.
                    You can select them in options.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* code... */
</style>

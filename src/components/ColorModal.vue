<script setup lang="ts">
import { computed, ref } from 'vue'
import { ColorPicker } from 'vue-accessible-color-picker'

const props = defineProps(['color'])
const emits = defineEmits(['updateColor'])
const bgColor = ref(props.color.color)
const bgStyle = computed(() => {
    return bgColor === ''
        ? { 'background-color': props.color.color }
        : { 'background-color': bgColor.value }
})
const updateColor = (newColor: any) => {
    bgColor.value = newColor.cssColor
    emits('updateColor', newColor.cssColor, props.color.type)
}
</script>

<template>
    <div class="modal-box">
        <ColorPicker
            :color="props.color.color"
            default-format="hex"
            alpha-channel="hide"
            @color-change="updateColor"
        />
        <form method="dialog" class="flex gap-4 items-center">
            <!-- if there is a button in form, it will close the modal -->
            <div class="h-8 w-8 rounded" :style="bgStyle"></div>
            <button class="btn">Close</button>
        </form>
    </div>
</template>

<style scoped>
/* code... */
</style>

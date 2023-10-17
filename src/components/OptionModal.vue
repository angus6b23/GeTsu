<template>
    <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
        </button>
    </form>
    <h3 class="font-bold text-xl mb-8">Options</h3>
    <div class="collapse collapse-plus border border-base-300 bg-base-100">
        <input type="checkbox" checked />
        <div class="collapse-title text-xl bg-primary">Basics</div>
        <div class="collapse-content">
            <div class="form-control w-full grid grid-cols-2 gap-2 mt-4">
                <label class="label">
                    <span class="label-text text-lg">Year</span>
                </label>
                <input
                    type="number"
                    class="w-full input input-bordered"
                    min="1900"
                    max="3000"
                    v-model="modalOption.year"
                />
                <label class="label">
                    <span class="label-text text-lg">Month</span>
                </label>
                <select
                    class="w-full select select-bordered text-lg"
                    v-model="modalOption.month"
                >
                    <option v-for="i in 12" :value="i">{{ i }}</option>
                </select>
                <label class="label">
                    <span class="label-text text-lg">Locale</span>
                </label>
                <select
                    class="w-full select select-bordered text-lg"
                    v-model="modalOption.locale"
                >
                    <option v-for="code of moment.locales()" :value="code">
                        {{ getNativeName(code) }}
                    </option>
                </select>
                <label class="label">
                    <span class="label-text text-lg">Title</span>
                </label>
                <input
                    type="text"
                    class="w-full input input-bordered"
                    placeholder="Optional title"
                    v-model="modalOption.title"
                />
                <label class="label">
                    <span class="label-text text-lg">Font</span>
                </label>
                <select
                    class="w-full select select-bordered text-lg"
                    v-model="modalOption.font"
                >
                    <option v-for="font of fonts" :value="font.className">
                        {{ font.display }}
                    </option>
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
                    <input
                        type="checkbox"
                        class="toggle toggle-primary"
                        v-model="modalOption.showHoliday"
                    />
                </div>
                <label class="label">
                    <span class="label-text text-lg">
                        Country for holidays
                    </span>
                </label>
                <select
                    name="country-select"
                    class="select select-bordered text-lg"
                    v-model="modalOption.country"
                    :disabled="!modalOption.showHoliday"
                >
                    <option disabled selected value="unknown">
                        Please Select country
                    </option>
                    <option
                        v-for="country of countryList"
                        :value="country.countryCode"
                    >
                        {{ country.name }}
                    </option>
                </select>
                <label class="label">
                    <span class="label-text text-lg"> Region / County </span>
                </label>
                <select
                    name="country-select"
                    class="select select-bordered text-lg"
                    v-model="modalOption.advanced.region"
                    :disabled="!modalOption.showHoliday"
                >
                    <option value="all">All regions</option>
                    <option v-for="region of regionList" :value="region">
                        {{ region }}
                    </option>
                </select>
                <label class="label">
                    <span class="label-text text-lg">Show name of holiday</span>
                </label>
                <div class="flex items-center justify-center">
                    <input
                        type="checkbox"
                        class="toggle toggle-primary"
                        :disabled="!modalOption.showHoliday"
                        v-model="modalOption.advanced.showHolidayText"
                    />
                </div>
                <label class="label">
                    <span class="label-text text-lg"
                        >Show local name of holiday</span
                    >
                </label>
                <div class="flex items-center justify-center">
                    <input
                        type="checkbox"
                        class="toggle toggle-primary"
                        :disabled="holidayAdvancedDisabled"
                        v-model="modalOption.advanced.useLocalName"
                    />
                </div>
                <label class="label">
                    <span class="label-text text-lg"
                        >Holiday text position</span
                    >
                </label>
                <div class="flex justify-center">
                    <div class="join">
                        <input
                            class="join-item btn"
                            type="radio"
                            name="holidayAlign"
                            v-model="modalOption.advanced.holidayAlign"
                            value="left"
                            :disabled="holidayAdvancedDisabled"
                            aria-label="Left"
                        />
                        <input
                            class="join-item btn"
                            type="radio"
                            name="holidayAlign"
                            v-model="modalOption.advanced.holidayAlign"
                            value="center"
                            :disabled="holidayAdvancedDisabled"
                            aria-label="Center"
                        />
                        <input
                            class="join-item btn"
                            type="radio"
                            name="holidayAlign"
                            v-model="modalOption.advanced.holidayAlign"
                            value="right"
                            :disabled="holidayAdvancedDisabled"
                            aria-label="Right"
                        />
                    </div>
                </div>
                <label class="label">
                    <span class="label-text text-lg">Bold Weekends</span>
                </label>
                <div class="flex items-center justify-center">
                    <input
                        type="checkbox"
                        class="toggle toggle-primary"
                        v-model="modalOption.advanced.boldWeekends"
                    />
                </div>
                <label class="label">
                    <span class="label-text text-lg"
                        >Holiday and Sunday Color</span
                    >
                </label>
                <div class="flex items-center justify-center">
                    <div
                        class="h-8 w-8 rounded mr-10"
                        :style="holidayBgStyle"
                    ></div>
                    <button class="btn" @click.prevent="colorModal.showModal()">
                        Change
                    </button>
                </div>
            </div>
        </div>
    </div>
    <dialog ref="colorModal" class="modal">
        <div class="modal-box">
            <ColorPicker
                :color="modalOption.advanced.holidayColor"
                default-format="hex"
                alpha-channel="hide"
                @color-change="updateColor"
            />
            <form method="dialog" class="flex gap-4 items-center">
                <!-- if there is a button in form, it will close the modal -->
                <div class="h-8 w-8 rounded" :style="holidayBgStyle"></div>
                <button class="btn">Close</button>
            </form>
        </div>
    </dialog>
</template>
<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { fonts } from '../utils/styles'
import { getAvailableCountries, getRegions } from '../utils/holiday'
import { ColorPicker } from 'vue-accessible-color-picker'
import moment from 'moment/min/moment-with-locales'
import ISO6391 from 'iso-639-1'
const props = defineProps(['option'])
const modalOption = ref(props.option)
const countryList = ref([])
const regionList = ref([])
const colorModal = ref(null)

const holidayAdvancedDisabled = computed(
    () =>
        !modalOption.value.advanced.showHolidayText ||
        !modalOption.value.showHoliday
)
const holidayBgStyle = computed(() => {
    return {
        'background-color': modalOption.value.advanced.holidayColor,
    }
})

const updateColor = ({ colors }) => {
    let hex = colors.hex.replace(/ff$/, '')
    modalOption.value.advanced.holidayColor = hex
}

const getNativeName = (code) => {
    if (code.length > 5) {
        return code
    }
    if (code.includes('-')) {
        let language = ISO6391.getNativeName(code.substring(0, 2))
        let newLanguage = new Intl.DisplayNames([code], { type: 'region' })
        let regionName = newLanguage.of(code.substring(3, 5).toUpperCase())
        return `${language} (${regionName})`
    } else {
        return ISO6391.getNativeName(code) === ''
            ? code
            : ISO6391.getNativeName(code)
    }
}
onMounted(async () => {
    countryList.value = await getAvailableCountries()
    regionList.value = await getRegions(modalOption.value.country)
})

watch(props.option, async () => {
    regionList.value = await getRegions(modalOption.value.country)
})
</script>

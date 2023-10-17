<template>
    <div
        class="sticky m-0 bg-base-300 min-h-[15vh] h-fit flex justify-center items-center not-for-print"
    >
        <form class="h-full w-full">
            <div class="h-full w-full md:grid md:grid-cols-4 p-4">
                <div
                    class="col-span-3 hidden md:grid md:grid-cols-2 xl:grid-cols-8"
                >
                    <div
                        class="flex items-center justify-center flex-wrap col-span-1"
                    >
                        <div>
                            <label class="label mr-2" for="year-select">
                                <span class="label-text text-lg">Year</span>
                            </label>
                            <select
                                name="year-select"
                                class="select select-bordered text-lg"
                                v-model="innerOption.year"
                            >
                                <option v-for="i in 201" :value="1999 + i">
                                    {{ 1999 + i }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-center col-span-1">
                        <div>
                            <label class="label mr-2" for="year-select">
                                <span class="labe-text text-lg">Month</span>
                            </label>
                            <select
                                name="month-select"
                                class="select select-bordered text-lg"
                                v-model="innerOption.month"
                            >
                                <option v-for="i in 12" :value="i">
                                    {{ i }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div
                        class="flex item-center justify-center col-span-2 px-8 xl:p-8 form-control"
                    >
                        <label class="label" for="show-holiday">
                            <span class="label-text text-lg"
                                >Show Holidays</span
                            >
                            <input
                                name="show-holiday"
                                v-model="innerOption.showHoliday"
                                type="checkbox"
                                class="toggle toggle-primary"
                            />
                        </label>
                        <select
                            name="country-select"
                            class="select select-bordered text-lg"
                            v-model="innerOption.country"
                            :disabled="!innerOption.showHoliday"
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
                    </div>
                    <div
                        class="flex items-center justify-center flex-wrap md:col-span-1 xl:col-span-2"
                    >
                        <div>
                            <label for="title" class="label text-lg mr-2"
                                >Title</label
                            >
                            <input
                                type="text"
                                v-model="innerOption.title"
                                class="input input-bordered text-lg"
                                placeholder="Optional Title"
                                name="title"
                            />
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center flex-wrap md:col-span-1 xl:col-span-2"
                    >
                        <div>
                            <label for="font-select" class="label text-lg mr-2"
                                >Font:</label
                            >
                            <select
                                name="font-select"
                                class="select select-bordered text-lg"
                                v-model="innerOption.font"
                            >
                                <option
                                    v-for="font of fonts"
                                    :value="font.className"
                                >
                                    {{ font.display }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 grid grid-cols-3 grid-rows-2 p-4 gap-2">
                    <div
                        class="col-span-1 row-span-1 flex justify-center items-center"
                    >
                        <label class="swap swap-rotate">
                            <input
                                type="checkbox"
                                @change="$emit('changeTheme')"
                            />
                            <sunSVG
                                class="fill-current stroke-current w-8 h-8"
                            />
                            <moonSVG
                                class="fill-current stroke-current w-8 h-8"
                            />
                        </label>
                    </div>
                    <div class="col-span-2 row-span-2">
                        <button
                            class="btn btn-primary text-2xl w-full h-full"
                            @click.prevent="window.print()"
                        >
                            Print
                        </button>
                    </div>
                    <div
                        class="col-span-1 row-span-1 flex justify-center items-center"
                    >
                        <a
                            class="cursor-pointer hover:rotate-180 duration-200"
                            @click.prevent="modal.showModal()"
                        >
                            <cogSVG
                                class="w-8 h-8 stroke-current fill-current"
                            />
                        </a>
                        <dialog ref="modal" class="modal">
                            <div
                                class="modal-box w-full lg:w-4/5 xl:w-3/5 max-w-5xl"
                            >
                                <OptionModal :option="innerOption" />
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { fonts } from '../utils/styles'
import { getAvailableCountries } from '../utils/holiday'
import cogSVG from '@/assets/cog.svg'
import sunSVG from '@/assets/sun.svg'
import moonSVG from '@/assets/moon.svg'
import OptionModal from '@/components/OptionModal.vue'

const props = defineProps(['option'])
const emit = defineEmits(['update:option', 'changeTheme'])
const innerOption = ref(props.option)
const modal = ref('null')
const countryList = ref([])

onMounted(async () => {
    const avaliableCountries = await getAvailableCountries()
    countryList.value = avaliableCountries
})
</script>

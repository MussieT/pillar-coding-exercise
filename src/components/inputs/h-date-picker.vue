<script setup>
import LitepieDatepicker from "litepie-datepicker";
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  labelClass: {
    type: String,
    default: () => "",
    required: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const dateValue = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    dateValue.value = newVal || false;
  }
);

watch(
  () => dateValue.value,
  (newVal) => {
    emit("update:modelValue", newVal);
  }
);
</script>
<template>
  <div :class="labelClass">
    {{ props.label }}
  </div>
  <div class="h-date-picker">
    <litepie-datepicker
      as-single
      v-model="dateValue"
      :formatter="{
        date: 'YYYY-MM-DD',
        month: 'MMM',
      }"
    ></litepie-datepicker>
  </div>
</template>
<style>
.h-date-picker input.text-sm {
  font-size: 1rem;
}
</style>

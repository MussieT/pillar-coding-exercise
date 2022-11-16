<script setup>
import {  watch, ref } from "vue";
import { useField } from "vee-validate";
import Visible from "@/directives/visible";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  items: Array,
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
  class: {
    type: String,
  },
});

const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});


const set = (event) => {
      emit("update:modelValue", event.target.value);
};
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  }
);
</script>
<template>
  <div :class="props.class" class="flex">
    <div
      class="relative flex items-start"
      :class="item.class"
      v-for="item in props.items"
      :key="item.value"
    >
      <div class="flex items-center h-5 ">
        <input
          v-model="inputValue"
          @input="set"
          :id="item.value"
          :aria-describedby="item.label"
          :name="props.name"
          type="radio"
          :value="item.value"
          :class="{
            'focus:ring-primary h-4 w-4 text-primary border-primary-3 rounded-full text-sm cursor-pointer':
              !errorMessage,
            'focus:ring-red-500  h-4 w-4 text-primary focus:border-red-500 rounded-full text-sm  cursor-pointer':
              errorMessage,
          }"
        />
      </div>
      <div class="ml-3 text-sm mr-2">
        <label :for="item.value" class="font-sm text-hahugray">
          {{ item.label }}
        </label>
        <p v-if="item.description" class="text-hahugray text-sm">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
  <p    :visible="errorMessage" class="mt-2 text-sm text-red-600" id="email-error">
    {{ errorMessage }}  &nbsp;
  </p>
</template>

<script setup>
import { useField } from "vee-validate";
import Visible from "@/directives/visible";
import { watch } from "vue";
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  name: {
    type: String,
    default: undefined,
    required: true,
  },
  id: {
    type: String,
    default: undefined,
    required: false,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  placeholder: {
    type: String,
    default: undefined,
    required: false,
  },
  label: {
    type: String,
    default: undefined,
    required: false,
  },
  labelClass: {
    type: String,
    default: () => "",
    required: false,
  },
  hideDetail: {
    type: Boolean,
    default: false,
    required: false,
  },
  trailingIcon: {
    type: Function,
    default: undefined,
    required: false,
  },
  leadingIcon: {
    type: Function,
    default: undefined,
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

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
  <div>
    <label :for="id" :class="props.labelClass" class="block">{{
      props.label
    }}</label>
    <div class=" relative rounded-md shadow-sm">
      <div
        v-if="props.leadingIcon"
        class="
          absolute
          inset-y-0
          left-0
          pl-3
          flex
          items-center
          pointer-events-none
        "
      >
        <component
          class="h-5 w-5 text-gray-400"
          :is="props.leadingIcon"
        ></component>
      </div>
      <input
        v-model="inputValue"
        @input="set($event)"
        @change="set($event)"
        :type="props.type"
        :name="props.name"
        step="any"
        :id="id"
        :class="{
          'focus:ring-primary  focus:border-primary hover:border-primary-2 border-gray-300 border-1':
            !errorMessage,
          'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500':
            errorMessage,
          'pl-10': props.leadingIcon,
          'pr-10': props.trailingIcon,
        }"
        class="
          block
          w-full
          text-hahugray
          placeholder-primary
          focus:outline-none
          text-base
          rounded-md
        "
        :placeholder="props.placeholder"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <!-- icon -->
      <div
        v-if="props.trailingIcon"
        class="
          absolute
          inset-y-0
          right-0
          pr-3
          flex
          items-center
          pointer-events-none
        "
      >
        <component
          class="h-5 w-5 text-gray-400"
          :is="props.trailingIcon"
        ></component>
      </div>
    </div>
    <p
      v-if="!props.hideDetail"
      :visible="errorMessage"
      class="mt-2 text-sm text-red-600"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>

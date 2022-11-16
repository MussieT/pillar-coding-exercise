<script setup>
import { ref, watch } from "vue";
import { useField } from "vee-validate";
import vClickOutside from "@/directives/click-outside.js";
import Visible from "@/directives/visible";
import { XIcon } from "@heroicons/vue/outline";

const props = defineProps({
  id: String,
  trailingIcon: Function,
  query: Object,
  items: {
      type:Array,
      default:()=>([])
  },
  placeholder: String,
  label: String,
  clearable: Boolean,
  returnObject: Boolean,
  modelValue: {
    type: [String, Number, Object],
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
    required: false,
  },
  labelClass: {
    type: String,
    default: "",
    required: false,
  },
  rules: {
    type: String,
    default: "",
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

let items = ref(props.items || []);
const show = ref(false);
const placeholder = ref("");
const input = ref(null);
const {
  errorMessage,
  value: inputValue,
  meta,
} = useField(props.name, props.rules, {
  initialValue: props.modelValue,
});

const outside = () => {
  show.value = false;
};

const set = (item) => {
  inputValue.value = item["name"];
  show.value = false;
  if (props.returnObject) {
    emit("update:modelValue", item);
  } else {
    emit("update:modelValue", item.id);
  }
};
const clear = () => {
  placeholder.value = undefined;
  inputValue.value = "";
  show.value = false;
  input.value.focus();
  emit("update:modelValue", undefined);
};

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
    placeholder.value = items.value.reduce((acc, itm) => {
      if (itm.value == newVal) {
        acc = itm.name;
      }
    }, undefined);
  }
);
</script>
<template>
  <div class="relative" v-click-outside="outside">
    <label :for="id" :class="labelClass" class="block">{{ label }}</label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        ref="input"
        v-model="placeholder"
        @click="show = true"
        @focus="show = true"
        autocomplete="off"
        :type="type"
        :placeholder="inputValue"
        :name="props.name"
        :id="id"
        :class="{
          'focus:ring-primary  focus:border-primary hover:border-primary-2 border-primary-3':
            !errorMessage,
          'focus:ring-red-500 focus:border-red-500 hover:border-red-500 border-red-500':
            errorMessage,
        }"
        class="
          block
          w-full
          pr-10
          text-hahugray
          placeholder-hahugray
          focus:outline-none
          text-base
          rounded-md
          h-list
        "
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <!-- icon -->
      <div
        v-if="trailingIcon"
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
        <component class="h-5 w-5 text-gray-400" :is="trailingIcon"></component>
      </div>
      <div
        v-if="clearable"
        @click="clear"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <x-icon class="h-5 w-5 text-gray-800 cursor-pointer"></x-icon>
      </div>
    </div>
    <ul
      v-show="show"
      class="
        absolute
        z-10
        w-full
        bg-white
        border
        shadow
        max-h-56
        rounded-md
        text-base
        overflow-auto
      "
    >
      <li
        v-for="item in items"
        :key="item.id"
        @click="set(item)"
        class="
          border-b
          select-none
          relative
          py-3
          px-3
          hover:bg-ilo-blue
          text-ilo-black
          cursor-pointer
        "
      >
        <div class="flex items-center justify-between">
          <span class="text-ilo-black font-semibold block truncate">{{
            item.name
          }}</span>
          <!-- <CheckIcon
            v-if="multiple && selected[item[value]]"
            class="w-5 h-5 text-ilo-black"
          />
          <CheckIcon
            v-else-if="selected === item[value]"
            class="w-5 h-5 text-ilo-black"
          /> -->
        </div>
      </li>
    </ul>
    <p
      :visible="errorMessage"
      class="mt-2 text-sm text-red-600"
      id="email-error"
    >
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>

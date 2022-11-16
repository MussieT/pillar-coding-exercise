<script setup>
const props = defineProps({
  icon: String,
  line1: String,
  line2: String,
  line3: String,
});
</script>
<template>
  <div class="w-full md:w-1/4 h-60 max-w-full mx-2 my-20 bg-secondary-3 rounded-xl shadow">
    <div class="flex justify-center">
      <div
        class="
          w-28
          rounded-xl
          h-28
          -mt-14
          bg-primary
          items-center
          flex
          justify-center
        "
      >
        <img :src="props.icon" alt="" />
      </div>
    </div>
    <div class="items-center flex justify-center h-44">
      <div class="text-center text-sm lg:text-base text-secondary-2">
        <div>{{ props.line1 }}</div>
        <div>{{ props.line2 }}</div>
        <div>{{ props.line3 }}</div>
      </div>
    </div>
  </div>
</template>

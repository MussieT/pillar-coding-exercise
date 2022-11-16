<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    }
})
</script>
<template>      
    <div class="w-full max-w-xl">
        <div
            class="shadow-lg bg-white font-semibold flex justify-center rounded-xl lg:pt-2 lg:px-12 lg:pb-2"
        >
         <p class="py-3 font-body">{{ props.title }}</p>
        </div>
    </div>
</template>
<route lang="yaml">
meta:
  layout: empty
</route>

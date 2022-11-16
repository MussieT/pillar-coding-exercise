<script setup>
import { UserCircleIcon } from '@heroicons/vue/solid';
const props = defineProps({
    type:String
})
</script>
<template>
    <span v-if="type == 'operator'" class="text-purple-600">
        <UserCircleIcon class="stroke-current h-5 w-5"></UserCircleIcon>
    </span>
    <span v-if="type == 'worker'" class="text-blue-600">
        <UserCircleIcon class="stroke-current h-5 w-5"></UserCircleIcon>
    </span>
    <span v-if="type == 'expat'" class="text-gray-600">
        <UserCircleIcon class="stroke-current h-5 w-5"></UserCircleIcon>
    </span>
</template>
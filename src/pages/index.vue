<script setup>
import { ref } from 'vue'
import user_img from './../../public/images/user.jpg'
import { BadgeCheckIcon } from '@heroicons/vue/solid';

// This resmebles the incoming data from the database
const titles = ref([
  {
    title: 'Ninja Gaming'
  },
  {
    title: 'Ninja Vods'
  },
  {
    title: 'Ninja Shorts'
  },
  {
    title: 'GFUEL'
  },
  {
    title: 'Instagram'
  },
  {
    title: 'Twitter'
  },
  {
    title: 'Twitch'
  },
  {
    title: 'Merch'
  },
  {
    title: 'Text me'
  }
])
</script>
<template>
  <div class="mt-5">
    <div
      class="h-full w-full grid grid-cols-12 mt-10  "
    >
      <div class="col-span-12 flex-row justify-center">
        <div class="flex justify-center">
          <img :src="user_img" class="rounded-full h-24 w-24 justify-center" />
        </div>

        <div class="flex mt-3 ml-5 font-body justify-center">
          <p class="">Ninja</p>
          <BadgeCheckIcon class="h-5 w-8 text-blue-600 mt-1" />
        </div>

        <div class="flex mt-3 ml-5 font-body justify-center">
          <p class="font-thin">I love video games</p>
        </div>
      </div>

      <div class="col-span-6 col-start-5" v-for="title in titles" :key="title.title">
        <card class="col-span-6 col-start-5 my-5" :title="title.title" />
      </div>


    </div>
  </div>
</template>
<route lang="yaml">
meta:
  layout: empty
</route>

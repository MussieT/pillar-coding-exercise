<template>
  <template v-if="lastPage > 1">
    <div class="text-center mt-8">
      <nav class="relative inline-flex">
        <a
          class="
            relative
            h-6
            w-6
            mr-3
            rounded
            bg-ilo-blue
            shadow
            hover:bg-ilo-blue-dark
            text-primary text-sm
            cursor-pointer
            font-medium
          "
          @click="prev"
        >
          <ChevronLeftIcon class="h-6 w-6 text-primary" />
        </a>
        <template v-if="lastPage <= 10">
          <a
            :class="[
              'z-10 relative mr-3 h-6 w-6 cursor-pointer rounded shadow border font-semibold hover:bg-ilo-gray text-sm',
              i === currentPage
                ? 'bg-ilo-blue text-primary border-none hover:bg-ilo-blue-dark'
                : undefined,
            ]"
            v-for="i in lastPage"
            :key="i"
            @click="select(i)"
          >
            {{ i }}
          </a>
        </template>
        <template v-else>
          <a
            :class="[
              'z-10 relative mr-3 h-6 w-6 rounded shadow border font-semibold cursor-pointer text-ilo-black hover:bg-ilo-gray text-sm',
              i === currentPage
                ? 'bg-ilo-blue text-primary border-none hover:bg-ilo-blue-dark'
                : undefined,
            ]"
            v-for="i in range"
            :key="i"
            @click="select(i)"
          >
            {{ i }}
          </a>
        </template>
        <a
          class="
            relative
            text-center
            shadow
            h-6
            w-6
            mr-3
            rounded
            font-medium
            cursor-pointer
            bg-ilo-blue
            hover:bg-ilo-blue-dark
            text-primary text-sm
          "
          @click="next"
        >
          <ChevronRightIcon class="h-6 w-6 text-primary" />
        </a>
      </nav>
    </div>
  </template>
</template>

<script>
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/solid";
export default {
  components: {
    ChevronRightIcon,
    ChevronLeftIcon,
  },
  props: {
    next: {
      type: Function,
      required: true,
    },
    prev: {
      type: Function,
      required: true,
    },
    currentPage: {
      type: Number,
      require: true,
    },
    lastPage: {
      type: Number,
      require: true,
    },
  },
  methods: {
    select(page) {
      this.$emit("update:currentPage", page);
    },
  },
  computed: {
    to() {
      return this.currentPage + 9;
    },
    range() {
      return Array(this.to - this.currentPage)
        .fill()
        .map((_, idx) => this.currentPage + idx);
    },
  },
};
</script>
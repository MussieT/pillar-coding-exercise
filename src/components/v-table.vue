<script>
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/vue/solid";
import PersonTypeIndicator from "./person-type-indicator.vue";
import _get from "lodash.get";
import _set from "lodash.set";

export default {
  name: "v-table",
  components: {
    ArrowUpIcon,
    ArrowDownIcon,
  },
  props: {
    headers: {
      type: Array,
    },
    items: {
      type: Array,
    },
    sort: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["click:row"],
  data() {
    return {
      _sort: {},
    };
  },
  created() {
    this.sort.forEach((item) => {
      this._sort = { ...this._sort, ...item };
    });
  },
  methods: {
    _get,
    _set,
    sort_by(header) {
      if (header.sortable === false) return;

      let direction = this._sort[header.value];

      if (direction && direction === "asc") {
        this._sort[header.value] = "desc";
      } else if (direction && direction === "desc") {
        delete this._sort[header.value];
      } else {
        this._sort[header.value] = "asc";
      }

      let sort = [];

      Object.keys(this._sort).forEach((key) => {
        let obj = {};
        _set(obj, key, this._sort[key]);
        sort.push(obj);
      });

      this.$emit("update:sort", sort);
    },
  },
};
</script>

<template>
  <div class="h-1">
    <v-progress v-if="loading" />
  </div>
  <!-- component -->
  <table class="border-collapse w-full">
    <thead>
      <tr>
        <th
          class="
            text-sm
            px-2
            font-semibold
            text-ilo-black
            py-4
            hidden
            lg:table-cell
          "
          v-for="header in headers"
          :key="header.value"
        >
          <span class="cursor-pointer" @click="sort_by(header)">
            {{ header.text }}
            <ArrowUpIcon
              v-if="_sort[header.value] === 'asc' && sortable !== false"
              class="h-3 w-3 inline-block text-ilo-blue"
            />
            <ArrowDownIcon
              v-if="_sort[header.value] === 'desc' && sortable !== false"
              class="h-3 w-3 inline-block text-ilo-blue"
            />
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="[
          'border-b border-ilo-gray rounded last:border-0 hover:bg-ilo-gray cursor-pointer',
          index % 2 === 0
            ? 'bg-ilo-blue-transparent'
            : 'bg-ilo-black-transparent',
        ]"
        v-for="(item, index) in items"
        :key="item.id"
        @click="
          () => {
            $emit('click:row', item);
          }
        "
        class="
          lg:hover:bg-gray-100
          flex
          lg:table-row
          flex-row
          lg:flex-row
          flex-wrap
          lg:flex-no-wrap
          mb-10
          lg:shadow-none
          shadow
          lg:mb-0
        "
      >
        <td
          v-for="header in headers"
          :key="header.value"
          class="
            w-full
            lg:w-auto
            block
            lg:table-cell
            relative
            lg:static
            text-center text-ilo-black
            font-semibold
            border-b
            rounded
            py-4
            px-2
            text-sm
          "
        >
          <span
            class="
              lg:hidden
              text-left
              w-1/3
              align-middle
              inline-block
              text-sm
              font-normal
              text-ilo-black
            "
            >{{ header.text }}
          </span>
          <slot :item="item" :name="header.value">
            <span
              class="
                inline-block
                w-2/3
                align-middle
                overflow-ellipsis overflow-hidden
                whitespace-nowrap
                flex
                flex-wrap
              "
               v-if="header.value=='full_name'" 
            >
              <PersonTypeIndicator :type="item.type" />

              {{ _get(item, header.value) }}
            </span>
             <span
              class="
                inline-block
                w-2/3
                align-middle
                overflow-ellipsis overflow-hidden
                whitespace-nowrap
              "
               v-else
            >
              {{ _get(item, header.value) }}
            </span>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

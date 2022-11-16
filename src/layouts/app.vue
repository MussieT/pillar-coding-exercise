<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "petite-vue-i18n";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  CalendarIcon,
  UsersIcon,
  MenuIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/vue/outline";
import useUser from "@/use/user";

const { unset, currentEntity } = useUser();
const router = useRouter();
const sidebarOpen = ref(false);
const { t } = useI18n();

const navigation = [
  { name: "App page", to: { name: "app-index" }, icon: UsersIcon },
];
const logout = () => {
  unset();
  router.push({ name: "index" });
};
</script>
<template>
  <div class="h-screen flex overflow-hidden bg-secondary-3">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="
              relative
              flex-1 flex flex-col
              max-w-xs
              w-full
              bg-white
              focus:outline-none
            "
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="
                    ml-1
                    flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-white
                  "
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <img
                  v-if="currentEntity.metadata.logo"
                  class="h-10 w-auto"
                  :src="currentEntity.metadata.logo"
                  alt="company-logo"
                />
                <div v-else class="flex items-center">
                  <div
                    class="
                      flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-full
                      bg-primary-lite
                      strple
                      text-primary
                      mx-2
                    "
                  >
                    <OfficeBuildingIcon class="h-8 w-8 stroke-current" />
                  </div>
                  <div class="mx-2 text-sm font-bold break-words">
                    {{ currentEntity.metadata.name }}
                  </div>
                </div>
              </div>
              <nav aria-label="Sidebar" class="mt-5">
                <div class="px-2 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.to"
                    v-slot="{ isActive }"
                  >
                    <div
                      :class="[
                        isActive
                          ? 'bg-gray-50 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      ]"
                    >
                      <component
                        :is="item.icon"
                        :class="[
                          isActive
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </div>
                  </router-link>
                </div>
              </nav>
            </div>
            <div class="flex justify-center pb-20">
              <h-button
                class="flex items-center justify-center"
                @click="logout"
              >
                <LogoutIcon class="h-7 w-7"></LogoutIcon>
                <div class="ml-3 flex">
                  {{ $t("logout") }}
                </div>
              </h-button>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div
          class="
            flex-1 flex flex-col
            min-h-0
            border-r border-gray-200
            bg-secondary-4
          "
        >
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <img
                v-if="currentEntity.metadata.logo"
                class="h-10 w-auto"
                :src="currentEntity.metadata.logo"
                alt="company-logo"
              />
              <div v-else class="flex items-center">
                <div
                  class="
                    flex
                    items-center
                    justify-center
                    h-12
                    w-12
                    rounded-full
                    bg-primary-lite
                    strple
                    text-primary
                    mx-2
                  "
                >
                  <OfficeBuildingIcon class="h-8 w-8 stroke-current" />
                </div>
                <div class="mx-2 text-sm font-bold break-words">
                  {{ currentEntity.metadata.name }}
                </div>
              </div>
            </div>
            <nav class="mt-5 flex-1" aria-label="Sidebar">
              <div class="px-2 space-y-1">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  v-slot="{ isActive }"
                >
                  <div
                    :class="[
                      isActive
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        isActive
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </div>
                </router-link>
              </div>
            </nav>
          </div>
          <div class="flex justify-center pb-20">
            <h-button class="flex items-center justify-center" @click="logout">
              <LogoutIcon class="h-7 w-7"></LogoutIcon>
              <div class="ml-3 flex">
                {{ $t("logout") }}
              </div>
            </h-button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
      <div class="lg:hidden">
        <div
          class="
            flex
            items-center
            justify-between
            bg-gray-50
            border-b border-gray-200
            px-4
            py-1.5
          "
        >
          <div>
            <img
              v-if="currentEntity.metadata.logo"
              class="h-10 w-auto"
              :src="currentEntity.metadata.logo"
              alt="company-logo"
            />
            <div v-else class="flex items-center">
              <div
                class="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-full
                  bg-primary-lite
                  strple
                  text-primary
                  mx-2
                "
              >
                <OfficeBuildingIcon class="h-8 w-8 stroke-current" />
              </div>
              <div class="mx-2 text-sm font-bold break-words">
                {{ currentEntity.metadata.name }}
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              class="
                -mr-3
                h-12
                w-12
                inline-flex
                items-center
                justify-center
                rounded-md
                text-gray-500
                hover:text-gray-900
              "
              @click="sidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main
          class="
            flex-1
            relative
            z-0
            overflow-y-auto
            focus:outline-none
            xl:order-last
          "
        >
          <div class="absolute inset-0">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

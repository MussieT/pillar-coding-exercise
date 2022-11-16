<script setup>
import { ref, computed } from "vue";
import hDragAndDrop from "./h-drag-and-drop.vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  accept: {
    type: String,
    default: undefined,
  },
  limit: { type: Number, default: 1 },
  text: { type: String },
  fileTypes: { type: String },
  thumbnail: { type: Boolean, default: false },
});

const input = ref(null);

const rawFiles = ref([]);

const dataUrls = ref([]);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const open = () => {
  input.value.click();
};

const change = () => {
};

const drop = (event) => {
  rawFiles.value = [];
  select({ target: { files: event.dataTransfer.files } });
};

const files = computed(() => {
  const fs = [];
  for (let i = 0; i < rawFiles.value.length; i++) {
    fs.push({
      name: rawFiles.value[i].name,
      size: formatBytes(rawFiles.value[i].size),
      dataUrl: dataUrls.value[i],
    });
  }
  return fs;
});

const readFile = (file) => {
  return new Promise(function (resolve, reject) {
    const fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
};

const select = async (event) => {

  const rf = event.target.files || [];
  for (let j = 0; j < rf.length; j++) {
    if (j <= props.limit - 1) {
      rawFiles.value.push(rf[j]);
    } else {
      break;
    }
  }

  const readers = [];
  for (let i = 0; i < rawFiles.value.length; i++) {
    readers.push(readFile(rawFiles.value[i]));
  }

  dataUrls.value = await Promise.all(readers);

  emit("update:modelValue", dataUrls.value);
};
</script>
<template>
  <input
    ref="input"
    type="file"
    class="hidden"
    :accept="props.accept"
    @change="select"
    :multiple="limit > 1"
  />
  <h-drag-and-drop>
    <template #default="{ drag, hover }">
      <div
        class="
          flex
          border-dashed border-2 border-light-blue-500
          rounded-lg
          h-60
          text-center
        "
        :class="{ 'shadow-xl': hover }"
        @drop.prevent="drop"
      >
        <div class="m-auto" v-if="!drag && files.length == 0">
          <span class="cursor-pointer text-primary font-bold" @click="open"
            >{{ props.text || $t("upload_a_file") }}
          </span>
          <div>
          {{ $t('or') }}
          </div>
         <div>
          {{ $t("drag_and_drop") }}
         </div>
         <div class="text-md font-thin">
          {{props.fileTypes}}
         </div>
        </div>
        <div
          v-else-if="drag"
          class="m-auto font-bold text-primary"
        >
          {{ $t("release_now") }}
        </div>
        <div class="m-auto" v-else-if="thumbnail && files.length > 0">
          <img :src="files[0].dataUrl" class="h-56 object-contain" alt="" />
        </div>
        <div v-else class="m-auto">
          <div
            class="
              shadow-lg
              py-2
              px-4
              rounded-lg
              text-sm
              font-bold
              text-hahugray
            "
            v-for="(file, index) in files"
            :key="index"
          >
            {{ file.name }} <span class="text-xs">({{file.size}})</span>
          </div>
        </div>
      </div>
    </template>
  </h-drag-and-drop>
</template>

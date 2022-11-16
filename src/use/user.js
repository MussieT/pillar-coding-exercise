import {  computed } from "vue";
import { useStorage } from "@vueuse/core";

const state = useStorage("session", {});

export default function ({} = {}) {
  // state.value = JSON.parse(localStorage.getItem("session") || "null") || {};
  return {
    isLoggedIn: computed(() => !!state.value.access_token),
    isEntitySet: computed(
      () =>
        !!(
          state.value.current_entity && state.value.current_entity.access_token
        )
    ),
    isCompany: computed(
      () => (state.value.metadata && state.value.metadata.is_company) || false
    ),
    entities: computed(
      () => (state.value.metadata && state.value.metadata.entities) || []
    ),
    currentEntity: computed(() => state.value.current_entity),
    token: () => state.value.access_token,
    entityToken: () =>
      state.value.current_entity && state.value.current_entity.access_token,
    id: state.value.sub,
    unset: () => {
      state.value = {};
      localStorage.removeItem("session");
    },
    setEntity: (data) => {
      state.value.current_entity = data;
    },
    set: (data) => {
      state.value = data;
    },
  };
}

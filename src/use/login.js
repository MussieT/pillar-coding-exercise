import useErrorParser from "@/use/errorParser";
import { ref, watch } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import useNotify from "@/use/notify";
import token_gql from "@/queries/auth/token.gql";
import useStore from "@/use/user";
const { notify } = useNotify();

const { parse } = useErrorParser();

const store = ref({
  user: undefined,
});
export default function (item) {
  const enabled = ref(false);
  const { set } = useStore();
  const {
    result,
    refetch,
    onError,
    onResult: onRes,
    loading,
  } = useQuery(token_gql, item, () => ({
    enabled,
    fetchPolicy: "network-only",
    context: { headers: { hopt: "noauth" } },
  }));

  const cleanResult = useResult(result, {}, (data) => {
    const token = data.token.access_token;
    let claims = token.split(".")[1];
    claims = JSON.parse(window.atob(claims));
    claims.access_token = token;
    localStorage.setItem("session", JSON.stringify(claims));
    set(claims);
    return claims;
  });

  onRes(() => {
    enabled.value = false;
  });

  const login = (data) => {
    enabled.value = true;
    refetch(data);
  };

  const onResult = (cb) => {
    watch(
      () => cleanResult.value,
      (newVal) => {
        cb(newVal);
      }
    );
  };

  // const onError = (cb) => {
  //   onError((err) => {
  //     enabled.value = false;
  //     console.log("aaaaaaaa",err)
  //     notify(parse(err));
  //   });
  // };
  return {
    login,
    loading,
    result: cleanResult,
    onResult,
    onError,
  };
}

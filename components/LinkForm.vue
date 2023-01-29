<script lang="ts" setup>
import { nanoid } from "nanoid";
import { Database } from "types/supabase";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const form = reactive({
  long_url: "",
  key: "",
});

const emit = defineEmits(["created"]);

const handleLinkForm = async () => {
  try {
    const { data, error } = await client.from("links").insert({
      long_url: form.long_url,
      key: form.key,
      user_id: user.value?.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    createShortKey();
    form.long_url = "";
    alert("Link created successfully");

    emit("created", 1);
  } catch (error) {
    console.log(error);
  }
};

const createShortKey = (len: number = 6): void => {
  form.key = nanoid(len);
};

onMounted(() => {
  createShortKey();
});
</script>

<template>
  <div class="card">
    <form @submit.prevent="handleLinkForm">
      <div class="flex gap-5 items-end">
        <div class="w-5/12">
          <label for="url" class="text-white">Long URL</label>
          <input v-model="form.long_url" type="text" id="url" />
        </div>
        <div class="w-5/12">
          <label for="shortKey">Short Key</label>
          <input v-model="form.key" type="text" id="shortKey" />
        </div>
        <div class="w-2/12">
          <button class="btn-primary py-3 rounded-lg w-full">Short</button>
        </div>
      </div>
    </form>
  </div>
</template>

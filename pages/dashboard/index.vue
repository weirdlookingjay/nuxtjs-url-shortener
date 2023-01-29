<script lang="ts" setup>
import { Database } from "types/supabase";
definePageMeta({
  middleware: "auth",
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const { data, refresh } = useAsyncData("links", async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("user_id", user.value?.id);
  return data;
});
</script>

<template>
  <main class="pt-28">
    <section class="container">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
    </section>
    <section class="container mt-10">
      <LinkForm @created="refresh" />
    </section>
    <section class="container mt-10">
      <LinkItem
        v-for="link in data"
        :key="link.id"
        :link="{
          shortKey: link.key,
          longUrl: link.long_url || '',
          id: link.id,
        }"
        class="mb-5" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { Database } from "~~/types/supabase";

const params = useRoute().params;
const client = useSupabaseClient<Database>();

// Get the params id
if (!params.id) {
  throw createError({
    statusCode: 404,
    message: "Not found",
  });
}

// Fetch the dat from the database
const { data } = useAsyncData("link", async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("key", params.id)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      message: "Not found",
    });
  }

  return data;
});

// Redirect to the long url
if (data.value?.long_url) {
  useExternalRedirect(data.value?.long_url);
}
</script>

<template>
  <div class="pt-[200px]">
    <!-- {{ params }}
    {{ data }} -->
  </div>
</template>

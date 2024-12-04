<template>
  <Tabs :value="route.path">
    <TabList>
      <Tab
        v-for="tab in ROUTES"
        :key="tab.path"
        :value="tab.path"
        class="flex-1 p-0"
        style="--p-tabs-tab-padding: 0"
      >
        <RouterLink
          v-slot="{ href, navigate }"
          :to="tab.path"
          custom
        >
          <a
            :href="href"
            @click="navigate"
            class="flex items-center h-full w-full justify-center p-[10px]"
          >
            <span>{{ tab.name }}</span>
          </a>
        </RouterLink>
      </Tab>
    </TabList>
  </Tabs>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';

const route = useRoute();

const ROUTES = [
  {
    name: 'Доктора',
    path: '/doctors',
  },
  {
    name: 'Медсестры',
    path: '/nurses',
  },
];
</script>

<style scoped>
:deep(.p-tablist-active-bar) {
  display: none;
}
</style>

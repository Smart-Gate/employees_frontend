<template>
  <v-app>
   <HeaderComponent />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from './components/Shared/HeaderComponent.vue';

export default {
    name: "App",
    data: () => ({
    //
    }),
    components: { HeaderComponent }
};
</script>

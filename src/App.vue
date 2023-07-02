<template>

  <div>
  
    <div id="unauthentiated" class="unauthentiated" v-if="appStore.userState.isLoggedIn == false">
        <login-component></login-component>
    </div>

    <div id="authentiated" class="authentiated" v-if="appStore.userState.isLoggedIn == true">
      <v-card>
      <v-layout>

        <v-navigation-drawer ref="NavigationDrawer">
          <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
            <v-list-item title="Navigation drawer">1</v-list-item>
            <v-list-item title="Navigation drawer">1</v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-app-bar>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-app-bar>

        <v-main style="min-height: 300px;">
          <router-view />
        </v-main>
      </v-layout>
    </v-card>
    </div>

  </div>
</template>

<script>

// import DmApi from '../services/DmAapi' 
import { useAppStore } from './store/app';
import LoginComponent from './components/LoginComponent.vue';

export default {
    setup() {
        const appStore = useAppStore();
        return { appStore };
    },
    data() {
        return {};
    },
    methods: {},
    created() {
        console.log(this.appStore.userState);
    },
    components: { LoginComponent }
}
</script>

<style scoped>
.unauthentiated {
  text-align: center;
  max-width:900px;
  min-height:500px;
  margin: auto;
}
</style>
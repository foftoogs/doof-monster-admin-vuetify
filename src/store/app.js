// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    userState : {
      isLoggedIn : false,
      accessToken : null,
      meta: null,
      attributes : null
    }
  }),
  actions: {
    login(data) {
      //console.log('**logIN use store');
      this.userState.isLoggedIn = true
      this.userState.accessToken = data.meta.token
      this.userState.meta = data.meta
      this.userState.attributes = data.attributes

    },
    logout() {
      //console.log('**logOUT use store');
      this.userState.isLoggedIn = false
      this.userState.accessToken = null
      this.userState.meta = null
      this.userState.attributes = null
    },
  }  
})

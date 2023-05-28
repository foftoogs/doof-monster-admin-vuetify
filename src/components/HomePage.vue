<template>
  <div>
      <v-container>
        <v-row>
        <v-col cols="12">
          <v-text-field
            id="test"
            v-model="testVal"
            ></v-text-field>
        </v-col>
        </v-row>
      </v-container>
  </div>

</template>

<script>
export default {
  setup() {
    // const userStore = useUserStore();
    // return { userStore };
  },
  data() {
    return {
      testVal: 0
    }
  },
  methods: {

    test(){
      console.log('test');
    }
    
  },
  mounted(){

  }
}
</script>

<style scoped>
</style>
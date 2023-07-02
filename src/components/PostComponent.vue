<template>
  <div>
    <div class="posts">
    </div>
  </div>
</template>

<script>

// import DmApi from '../services/DmAapi' 
import { useAppStore } from '../stores/app';

export default {
  setup() {
    const appStore = useAppStore();
    return { appStore };
  },
  data() {
    return {
      loginCount: 0,
      loginForm: {
        valid: true,
        submitButtonDisable: false,
        alerts: {
          error: false,
          success: false
        },
        alertMessages:{
          error: null,
          success: null
        },
        fields: {
          f1: null,
          f2: null
        },
        validators: {
          usernameRules: [
            v => !!v || 'Username is required'
          ],
          passwordRules: [
            v => !!v || 'Password is required'
          ]
        }
      }
    }
  },
  methods: {

    exefunction(){
    
      let api = new api({token : this.userStore.access_token });

      this.loginForm.alerts.error = false;
      this.loginForm.alertMessages.error = '';

      let loginCreds = {
        'username' : this.loginForm.fields.username,
        'password' : this.loginForm.fields.password,
        'app_id' : import.meta.env.VITE_LOYALTY_ONE_API_APP_KEY
      };

      this.loginForm.submitButtonDisable = true;

      loyApi.login({query : loginCreds}).then((response) => {

        if (response.data.data.User.foreign_type != 'member'){
          this.loginForm.alerts.error = true;
          this.loginForm.alertMessages.error = 'User is not authorised for this application';
        }else{
          this.userStore.login(response.data.data.access_token, response.data.data.User.id);
          this.$router.push('/');
        }

        this.loginForm.submitButtonDisable = false;

      }).catch((error) => {

        if (error.response) {

          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          this.loginForm.alerts.error = true;
          this.loginForm.alertMessages.error = error.response.data.message;

        } else if (error.request) {

          this.loginForm.alerts.error = true;
          this.loginForm.alertMessages.error = 'Request Timeout';

        } else {
          
          this.loginForm.alerts.error = true;
          this.loginForm.alertMessages.error = error.response.data.message;
        }

        this.userStore.logout();
        this.loginForm.submitButtonDisable = false;
        this.loginForm.fields.username = null;
        this.loginForm.fields.password = null;
        this.$refs.loginForm_username.focus();
        //console.log(error.config);

      });

    },
    loginValidate(){

      this.$refs.form.validate().then((result) => {

        if (result.valid) {

          this.exefunction();

        }

      });

    }
  },
  mounted(){

    if (this.$route.query.username && this.$route.query.password){
      console.log(this.$route.query.username+'/'+this.$route.query.password);
      this.loginForm.fields.username = this.$route.query.username;
      this.loginForm.fields.password = this.$route.query.password;
      this.login();
    }

  }
}
</script>

<style scoped>
.main {
  text-align: center;
  max-width:900px;
  margin: auto;
}
</style>
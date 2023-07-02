<template>
    <div>
      <div class="login">
  
        <h1 class="login-header">Login to Doof.Monster Admin</h1>
        
        <div class="login-main">
  
          <v-form v-model="loginForm.valid" ref="loginForm">
            
            <div class="login-form-alerts">
              <v-alert v-if="loginForm.alerts.error == true" type="error">{{loginForm.alertMessages.error}}</v-alert>
            </div>
  
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  id="login-form-email"
                  v-model="loginForm.fields.email"
                  :rules="loginForm.validators.emailRules"
                  ref="loginForm_email"
                  label="Email"
                  required
                  @keyup.enter="login"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                  id="login-form-password"
                  type="password"
                  v-model="loginForm.fields.password"
                  :rules="loginForm.validators.passwordRules"
                  ref="loginForm_password"
                  label="Password"
                  required
                  @keyup.enter="login"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
  
            <v-btn class="login-button" id="login-button" v-on:click="login()" @keyup.enter="login" :disabled="this.loginForm.submitButtonDisable">Login</v-btn>
            
          </v-form>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  
  import dmApi from '../services/dmApi'; 
  import { useAppStore } from '../store/app';
  
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
            email: null,
            password: null
          },
          validators: {
            emailRules: [
              v => !!v || 'email is required'
            ],
            passwordRules: [
              v => !!v || 'Password is required'
            ]
          }
        },
        css: {

        },
      }
    },
    methods: {
  
      async login(){
      
        console.log('login baby yeah!')
        let dmApiClient = new dmApi({token : this.appStore.userState.accessToken })
  
        this.loginForm.alerts.error = false
        this.loginForm.alertMessages.error = ''
  
        let loginCreds = {
          'email' : this.loginForm.fields.email,
          'password' : this.loginForm.fields.password,
        }
  
        this.loginForm.submitButtonDisable = true
  
        dmApiClient.post('/login', loginCreds).then((result) => {
          
          console.log(result)

          if (result.success === false) {
            this.loginForm.alerts.error = true
            this.loginForm.alertMessages.error = result.data.message
            this.loginForm.fields.email = null;
            this.loginForm.fields.password = null;
            this.$refs.loginForm_email.focus();            
          }else{
            this.appStore.login(result.data)
          }
          
        })

        this.loginForm.submitButtonDisable = false;

        
        /*.then(
          
        ).catch((error) => {
  
          if (error.response) {
  
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

  
          } else if (error.request) {
  
            this.loginForm.alerts.error = true;
            this.loginForm.alertMessages.error = 'Request Timeout';
  
          } else {
            

          }
  
          this.userStore.logout();

          //console.log(error.config);*/
  
        // });
  
      },
      loginValidate(){
  
        this.$refs.loginForm.validate().then((result) => {
  
          if (result.valid) {
  
            this.login();
  
          }
  
        });
  
      }
    },
    mounted(){
  
      // if (this.$route.query.email && this.$route.query.password){
      //   console.log(this.$route.query.email+'/'+this.$route.query.password);
      //   this.loginForm.fields.email = this.$route.query.email;
      //   this.loginForm.fields.password = this.$route.query.password;
      //   this.login();
      // }
  
    }
  }
  </script>
  
  <style scoped>
  .login {
    text-align: center;
    max-width:900px;
    margin: auto;
  }
  .login-header {
    text-align: center;
  }
  .login-main {
    text-align: center;
  }
  .login-form-alerts {
    text-align: center;
  }
  .login-button {
    width: 20em;
  }
  </style>
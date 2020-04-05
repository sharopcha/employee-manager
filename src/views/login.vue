<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green lighten-1 white-text center">
          <h3 class>Login</h3>
          <form>
            <div class="input-field">
              <i class="fas fa-at prefix"></i>
              <input type="text" id="email" v-model="email" />
              <label class="white-text" for="email">Email</label>
            </div>
            <div class="input-field">
              <i class="fas fa-fingerprint prefix"></i>
              <input type="text" id="password" v-model="password" />
              <label class="white-text" for="email">Password</label>
            </div>
            <button @click.prevent="login" class="btn btn-large teal darken-4 white-text">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.user.email}`);
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
    }
  }
};
</script>

<style>
</style>
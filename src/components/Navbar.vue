<template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
        <ul class="right">
          <li v-if="isLoggedIn">
            <span class="email">{{ currentUser }}</span>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Sign Up</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button @click="logout" class="btn red">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUser = user.email;
      }
    });
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/login');
        });
      this.isLoggedIn = false;
    },
  },
};
</script>

<style scoped>
.email {
  margin-right: 20px;
}
</style>

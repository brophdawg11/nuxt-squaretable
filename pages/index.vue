<template>
  <div class="container">
    <h1 class="title">
      squaretable
    </h1>
    <br><br>
    <nuxt-link to="/category/dresses">Dresses</nuxt-link>
  </div>
</template>

<script>
export default {
  async mounted() {
    const token = await this.$a15Svc.tokenClient.getGuestToken();
    console.log('Fetched token:', token);
  }
}
</script>

<style>
.container {
  margin: 20vh auto 0;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>

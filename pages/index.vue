<template>
  <div class="container">
    <h1 class="title">
      squaretable
    </h1>
    <br><br>
    <nuxt-link to="/category/dresses">Dresses</nuxt-link>
    <nuxt-link to="/category/jackets-coats">Jackets</nuxt-link>
    <nuxt-link to="/category/tops">Tops</nuxt-link>
  </div>
</template>

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

<template>
  <vue-page-transition name="zoom">
    <router-view/>
  </vue-page-transition>
</template>

<style>
  .overlay-top[data-v-4c22b934],
  .overlay-bottom[data-v-4c22b934],
  .overlay-left[data-v-4c22b934],
  .overlay-right[data-v-4c22b934] {
        background: #121212 !important;
  }
</style>
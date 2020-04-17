<template>
    <div>
        <vue-page-transition name="overlay-up-down">
            <router-view/>
        </vue-page-transition>
    </div>
</template>

<style>
    .overlay-top[data-v-4c22b934],
    .overlay-bottom[data-v-4c22b934],
    .overlay-left[data-v-4c22b934],
    .overlay-right[data-v-4c22b934] {
        background: #61B2AA !important;
    }
</style>
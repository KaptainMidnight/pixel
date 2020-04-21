<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>

        <router-link class="link-router" to="/login">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Вход</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="link-router" to="/signup">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Регистрация</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="link-router" to="/donate">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-cards-heart</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Помочь</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </router-link>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>PIXELNETWORK</v-toolbar-title>
    </v-app-bar>

    <v-content center>
      <v-card class="mx-auto mt-10" max-width="500" outlined="">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">v0.0.1</div>
            <v-list-item-title class="headline mb-1">
              Список изменений
            </v-list-item-title>

            <v-list-item-subtitle class="ml-7">
              Добавлен новый дизайн
            </v-list-item-subtitle>

            <v-list-item-subtitle class="ml-7">
              Добавлена валидация
            </v-list-item-subtitle>

            <v-list-item-subtitle class="ml-7">
              Изменен механизм регистрации
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
  import Footer from '@/components/Footer'

  export default {
    components: { Footer },
    data() {
      return {
        drawer: false
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>


<style>
  .link-router {
    text-decoration: none;
  }
</style>
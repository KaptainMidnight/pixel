<template>
    <v-app app>
        <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        >
      <v-list dense>

        <router-link class="link-router" to="/profile">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-arrow-left</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Назад</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="link-router" to="/messages">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-message</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Сообщения</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link class="link-router" to="/music">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-library-music</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Музыка</v-list-item-title>
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
      <template v-slot:append>
        <div class="d-flex justify-space-between">
            <div>
                <v-btn fab small class="ma-1" depressed left>
                    <v-icon>
                        mdi-settings
                    </v-icon>
                </v-btn>
            </div>

            <div>
                <v-btn @click="logout" fab small class="ma-1" depressed right>
                    <v-icon>
                        mdi-logout
                    </v-icon>
                </v-btn>
            </div>

            <div>
                <v-btn fab small class="ma-1" depressed right>
                    <v-icon>
                        mdi-theme-light-dark
                    </v-icon>
                </v-btn>
            </div>
        </div>
      </template>  
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <v-toolbar-title>PIXELNETWORK</v-toolbar-title>
    </v-app-bar>
    <v-content center>
        <v-card class="mx-auto mt-10" max-width="500" outlined v-for="friend of friends" :key="friend.id">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ friend.name }} {{ friend.surname }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn>
            Добавить в друзья
            <v-icon right dark="">
              mdi-account-multiple-plus
            </v-icon>
          </v-btn>
          <v-btn>
            Посмотреть профиль
            <v-icon dark right>
              mdi-account-arrow-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios'
    import { baseURL } from '../config'

    export default {
        data() {
            return {
                data: [],
                drawer: true,
            }
        },
        mounted() {
            this.$store.dispatch('getAllFriends')
        },
        computed: {
          friends() {
            return this.$store.getters.getFriends
          }
        },
        methods: {
          logout() {
            localStorage.clear()

            this.$router.push('/login')
          }
        }
    }
</script>

<style>
  .link-router {
    text-decoration: none;
  }
</style>

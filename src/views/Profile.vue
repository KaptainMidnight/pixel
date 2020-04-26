<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>

        <v-list-item>
            <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/78.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>
                    {{ getFullName }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>

        <router-link class="link-router" to="/me">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Профиль</v-list-item-title>
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

        <router-link class="link-router" to="/friends">
          <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Друзья</v-list-item-title>
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
       <v-card width="400" class="mx-auto mt-10">
           <v-form class="px-5 py-5">
                <h3>Создание поста</h3>
                <v-text-field v-model="title" label="Заголовок"></v-text-field>

                <v-text-field v-model="content" label="Текст поста"></v-text-field>

                <v-btn color="tile" block class="teal white--text" @click.prevent="createPost">
                    Создать
                </v-btn>
           </v-form>
       </v-card>

      <v-progress-circular v-if="loading" class="mx-auto mt-10 d-block" indeterminate color="primary"></v-progress-circular>

       <v-card v-else v-for="i of posts" :key="i.id" max-width="400" class="mx-auto mt-10">
         <v-list-item two-line>
            <v-list-item-content>

              <v-list-item-title class="headline mb-1">
                {{ i.title }}
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ i.content }}
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
  import { baseURL } from '../config'
  import axios from 'axios'

  export default {
    components: { Footer },
    computed: {
      getFullName() {
        return this.$store.getters.getFullName
      },
      posts() {
        return this.$store.getters.getPosts
      }
    },
    methods: {
      logout() {
        localStorage.clear()

        this.$router.push('/login')
      },
      createPost() {
        this.$store.dispatch('createPost', { title: this.title, content: this.content })
        this.title = ''
        this.content = ''
      }
    },
    data() {
      return {
        title: '',
        content: '',
        drawer: true,
        loading: true
      }
    },
    mounted() {
      this.$vuetify.theme.dark = true

      this.$store.dispatch('getFullName')
      this.$store.dispatch('getPostsServer')
      this.loading = false
    }
  }

  // export default {
  //   components: { Footer },
  //   async mounted () {
  //       this.$vuetify.theme.dark = false

  //       await axios.get(baseURL + '/api/post/all', {
  //           headers: {
  //               Authorization: `Bearer ${localStorage.getItem('token')}`
  //           }
  //       }).then(response => {
  //           if (response.data) {
  //               this.posts = response.data.reverse()
  //               this.loading = false
  //               return
  //           }
  //       }).catch(e => {
  //           console.error(e)
  //       })

  //       await axios.get(baseURL + '/api/auth/me', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       }).then(response => {
  //         console.log(response.data)

  //         if (response.data.name) {
  //           this.name = response.data.name
  //           this.surname = response.data.surname
  //         }
  //       }).catch(e => {
  //         console.log(e)
  //       })
  //   },
  //   methods: {
  //     createPost() {
  //       let data = new FormData()
  //       data.set('title', this.title)
  //       data.set('content', this.content)
  //       axios.post(baseURL + '/api/post/create', data, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       }).then(response => {
  //           console.log(response.data)
  //           if (response.data.message) {
  //               this.title = ''
  //               this.content = ''

  //               axios.get(baseURL + '/api/post/all', {
  //                 headers: {
  //                   Authorization: `Bearer ${localStorage.getItem('token')}`
  //                 }
  //               }).then(response => {
  //                 this.posts = response.data.reverse()
  //                 console.log(this.posts)
  //               }).catch(e => {
  //                 console.error(e)
  //               })
  //           }
            
  //       }).catch(() => {
  //         console.error('Ошибка при создании поста')
  //       })
  //     },
  //     logout() {
  //       localStorage.clear()
  //       this.$router.push('/login')
  //       return
  //     }
  //   }
  // }
</script>


<style scoped>
  .link-router {
    text-decoration: none;
  }
</style>
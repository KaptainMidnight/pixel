<template>
  <v-app id="inspire">
    <v-content dark>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-form @keyup.enter="login" lazy-validation>
                <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Авторизация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Почта"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    :error-messages="emailErrors"
                  />

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click.prevent="login">Войти</v-btn>
              </v-card-actions>
            </v-card>
            <div class="d-flex justify-space-around mt-3">
              <v-btn to='/signup' text>
                Нет аккаунта?
              </v-btn>

              <v-btn to="/reset" text>
                Забыли пароль?
              </v-btn>
            </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators'
    import { validationMixin } from 'vuelidate'
    import { baseURL } from '../config'
    import axios from 'axios'
    import Footer from '@/components/Footer'

    export default {
        components: { Footer },
        mixins: [validationMixin],
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                axios.post(baseURL + '/api/auth/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token)

                        this.$router.push('/profile')
                    }
                }).catch(() => {
                    console.log('Ошибка')
                })
            }
        },
        validations: {
            email: { email, required },
            password: { required }
        },
        computed: {
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) {
                    return errors
                }
                !this.$v.email.email && errors.push('Поле с почтой введенно неверно')
                !this.$v.email.required && errors.push('Поле с почтой не должно быть пустым')
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) {
                    return errors
                }

                !this.$v.password.required && errors.push('Поле с паролем не может быть пустым')
                return errors
            }
        }
    }
</script>
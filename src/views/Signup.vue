<template>
  <v-app id="inspire">
    <v-alert v-if="showAlert" v-on="on" dense border="left" type="error" text dismissible max-width="400" transition="slide-x-transition">
        Пароли не сопадают
    </v-alert>
    <v-content>
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
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Авторизация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation @keyup.enter="signup">
                  <v-text-field
                    label="Имя"
                    prepend-icon="mdi-cloud-question"
                    name="name"
                    v-model="name"
                    :error-messages="nameErrors"
                  />

                  <v-text-field
                    label="Фамилия"
                    prepend-icon="mdi-cloud-question"
                    name="surname"
                    v-model="surname"
                    :error-messages="surnameErrors"
                  />

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
                    v-model="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :error-messages="passwordErrors"
                  />

                  <v-text-field 
                    id="password_repeat"
                    label="Повтор пароля"
                    name="password_repeat"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="passwordConfirmation"
                    :error-messages="confirmPasswordErrors"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" block @click.prevent="signup">Зарегистрироваться</v-btn>
              </v-card-actions>
            </v-card>
            <v-btn text to="/login" class="d-flex justify-space-around mt-3">
              Уже есть аккаунт?
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <br>
    <Footer />
  </v-app>
</template>

<script>
    import { email, required, minLength } from 'vuelidate/lib/validators'
    import { validationMixin } from 'vuelidate'
    import Footer from '@/components/Footer'
    import { baseURL } from '../config'
    import axios from 'axios'

    export default {
        components: { Footer },
        mixins: [validationMixin],
        data() {
            return {
                name: '',
                surname: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                showAlert: false,
            }
        },
        methods: {
            signup() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                if (this.passwordConfirmation != this.password) {
                    this.showAlert = true
                }

                axios.post(baseURL + '/api/auth/signup', {
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                }).then(response => {
                    console.log(response.data)

                    if (response.data.message) {
                        this.$router.push('/login')
                    }
                }).catch(() => {
                    console.log('ERROR')
                })
            }
        },
        validations: {
            name: { required },
            surname: { required },
            email: { email, required },
            password: { required, minLength: minLength(6) },
            passwordConfirmation: { required, minLength: minLength(6) }
        },
        computed: {
            nameErrors() {
                const errors = []

                if (!this.$v.name.$dirty) {
                    return errors
                }

                !this.$v.name.required && errors.push('Поле с именем не может быть пустым')

                return errors
            },
            surnameErrors() {
                const errors = []

                if (!this.$v.name.$dirty) {
                    return errors
                }

                !this.$v.surname.required && errors.push('Поле с фамилией не может быть пустым')

                return errors
            },
            emailErrors() {
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

                !this.$v.password.requried && errors.push('Поле с паролем не может быть пустым')
                !this.$v.password.minLength && errors.push('Пароль не может быть меньше 6 символов')

                return errors
            },
            confirmPasswordErrors() {
                const errors = []

                if (!this.$v.passwordConfirmation.$dirty) {
                    return errors
                }
                
                !this.$v.passwordConfirmation.requried && errors.push('Поле с повторным паролем не может быть пустым')
                !this.$v.passwordConfirmation.minLength && errors.push('Пароль не может быть меньше 6 символов')

                return errors
            }
        }
    }
</script>

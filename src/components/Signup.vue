<template>
    <div>
        <Header/>

        <form @keyup.enter="register" class="form">
            <div class="login-block">
                <i class="icon icon-lock"></i>
                <div>
                    <p>
                        Зарегистрироваться
                    </p>
                    <hr>
                </div>
            </div>
            <at-input :class="{'at-input--error': ($v.firstName.$dirty && !$v.firstName.required) || ($v.firstName.$dirty && !$v.firstName.minLength)}" v-model.trim="firstName" placeholder="Имя" class="input" icon="help-circle"/>
            <at-input :class="{'at-input--error': ($v.lastName.$dirty && !$v.lastName.required) || ($v.lastName.$dirty && !$v.lastName.minLength)}" v-model.trim="lastName" placeholder="Фамилия" class="input" icon="help-circle"/>
            <at-input :class="{'at-input--error': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" v-model.trim="email" placeholder="Почта" class="input" icon="mail"/>
            <at-input :class="{'at-input--error': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" v-model="password" type="password" placeholder="Пароль" class="input" icon="lock"/>
            <at-input :class="{'at-input--error': ($v.passwordConfirmation.$dirty && !$v.passwordConfirmation.required) || ($v.passwordConfirmation.$dirty && !$v.passwordConfirmation.minLength)}" v-model="passwordConfirmation" type="password" placeholder="Повтор пароля" class="input" icon="lock"/>

            <at-checkbox v-model="readLicence">Я прочитал
                <router-link to="license">соглашение</router-link>
            </at-checkbox>
            <br>
            <at-button class="signup-btn" type="primary" @click.prevent="register">Зарегистрироваться</at-button>
            <br>
            <router-link to="/login">
                <at-button type="text" class="already-have">Уже есть аккаунт?</at-button>
            </router-link>
        </form>
    </div>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    import Header from '@/components/Header'
    import axios from 'axios'

    export default {
        components: {Header},
        data() {
            return {
                firstName: '',
                lastName: '',
                password: '',
                passwordConfirmation: '',
                email: '',
                readLicence: false
            }
        },
        validations: {
            email: { email, required },
            password: { minLength: minLength(6), required },
            firstName: { required, minLength: minLength(2) },
            lastName: { required, minLength: minLength(3) },
            passwordConfirmation: { required, minLength: minLength(6) }
        },
        methods: {
            register() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                if (!this.readLicence) {
                    this.$message.error({
                        message: 'Лицензионное соглашение не принято',
                        duration: 1000,
                    })
                    return
                }

                if (this.passwordConfirmation != this.password) {
                    this.$message.error({
                        message: 'Пароли не совпадают',
                        duration: 1000,
                    })
                    return
                }

                axios.post('https://api-pixelnetwork.truemachine.ru/api/auth/signup', {
                    name: this.firstName,
                    surname: this.lastName,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation
                }).then(() => {
                    this.$message.success({
                        message: 'Успешная регистрация',
                        duration: 1000
                    })

                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1000)
                }).catch(() => {
                    this.$message.error({
                        message: 'Произошла неизвестная ошибка. Попробуйте позже',
                        duration: 1000,
                    })
                })
            },
            checkEmail() {
                return (this.email === "") ? false : (this.reg.test(this.email))
            }
        }
    }
</script>

<style scoped>
    .login-block {
        border-radius: 50%;
        background: #E83F61;
        width: 40px;
        height: 40px;
        margin: 70px auto;
        color: #fff;
        text-align: center;
        padding-top: 8px;
    }

    .login-block div p {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        transform: translateX(-190%);
        padding-top: 10px;
    }

    .icon {
        font-size: 1.5rem;
        width: 1em;
        height: 1em;
    }

    .form {
        width: 300px;
        height: 150px;
        margin: 0 auto;
    }

    .input {
        margin-top: 10px;
    }

    .signup-btn {
        width: 100%;
        margin-top: 10px;
    }

    .already-have {
        float: right;
        padding: 0;
        margin-top: 10px;
    }
</style>
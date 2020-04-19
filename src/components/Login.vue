<template>
    <div>
        <Header/>

        <form class="form" @keyup.enter="attempt">
            <div class="login-block">
                <i class="icon icon-log-in"></i>
                <br>
                <h2>Вход</h2>
                <hr>
            </div>

            <at-input :class="{'at-input--error': ($v.inputLogin.$dirty && !$v.inputLogin.required) || ($v.inputLogin.$dirty && !$v.inputLogin.email)}" v-model.trim="inputLogin" icon="user" placeholder="Имя пользователя" required class="input"></at-input>
            <at-input :class="{'at-input--error': ($v.inputPassword.$dirty && !$v.inputPassword.required)}" v-model="inputPassword" icon="lock" placeholder="Пароль" type="password" required class="input"></at-input>

            <at-checkbox v-model="rememberMe" label="Запомнить меня">Запомнить меня</at-checkbox>
            <br>
            <at-button type="primary" class="signin-btn" @click.prevent="attempt">Войти</at-button>
            <br>
            <div class="footer-bar">
                <router-link to="/forgot">
                    <at-button type="text" class="forgot-password">Забыли пароль?</at-button>
                </router-link>

                <router-link to="/signup">
                    <at-button type="text" class="no-account">Зарегистрируйтесь</at-button>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import { email, required } from 'vuelidate/lib/validators'
    import axios from 'axios'

    export default {
        components: {Header},
        data() {
            return {
                inputLogin: '',
                inputPassword: '',
                rememberMe: false,
            }
        },
        methods: {
            attempt() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                axios.post('http://127.0.0.1:8000/api/auth/login', {
                    email: this.inputLogin,
                    password: this.inputPassword
                }).then(response => {
                    console.log(response.data)
                    localStorage.setItem('token', response.data.access_token)

                    this.$message.success({
                        message: 'Успешный вход',
                        duration: 1000,
                    })

                    setTimeout(() => {
                        this.$router.push('/profile')
                    }, 1000)
                }).catch(() => {
                    this.$message.error({
                        message: 'Неверный логин или пароль',
                        duration: 1000
                    })
                })
            }
        },
        validations: {
            inputLogin: { required, email },
            inputPassword: { required }
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

    .login-block h2 {
        margin-top: 10px;
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

    .signin-btn {
        width: 100%;
        margin-top: 10px;
    }

    .footer-bar {
        display: flex;

        justify-content: space-between;
    }

    .forgot-password {
        display: inline;
        padding: 0;
        margin: 10px 0 0 0;
    }

    .no-account {
        padding: 0;
        margin: 10px 0 0 0;
        display: inline;
    }

</style>
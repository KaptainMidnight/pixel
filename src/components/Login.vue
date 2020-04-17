<template>
    <div>
        <Header/>
        <div class="login-block">
            <i class="icon icon-log-in"></i>
            <br>
            <h2>Вход</h2>
            <hr>
        </div>

        <form class="form" @keyup.enter="attempt">
            <at-input v-model="inputLogin" icon="user" placeholder="Имя пользователя" required class="input"></at-input>
            <at-input v-model="inputPassword" icon="lock" placeholder="Пароль" type="password" required class="input"></at-input>

            <at-checkbox v-model="rememberMe" label="Запомнить меня">Запомнить меня</at-checkbox>
            <br>
            <at-button type="primary" class="signin-btn" @click.prevent="attempt">Войти</at-button>
            <br>
            <div class="footer-bar">
                <router-link to="/forgot">
                    <at-button type="text" class="forgot-password">Забыли пароль?</at-button>
                </router-link>

                <router-link to="/signup">
                    <at-button type="text" class="no-account">Зарегестрируйтесь</at-button>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import axios from 'axios'

    export default {
        components: {Header},
        data() {
            return {
                inputLogin: '',
                inputPassword: '',
                rememberMe: false,
                loginSuccess: true,
                passwordSuccess: true
            }
        },
        methods: {
            attempt() {
                if (this.inputLogin && this.inputPassword) {
                    let data = new FormData()

                    data.set('email', this.inputLogin)
                    data.set('password', this.inputPassword)

                    axios.post('http://localhost:8000/api/auth/login', data)
                        .then(response => {
                            localStorage.setItem('token', response.data.access_token)
                            localStorage.setItem('expires_at', response.data.expires_at)
                            this.$message.success({
                                message: 'Успешная авторизация',
                                duration: 1000,
                            })
                            setTimeout(() => {
                                this.$router.push('/profile')
                            }, 1000)
                        }).catch(e => {
                            console.log(e)
                            this.$message.error({
                                message: 'Неверный логин или пароль',
                                duration: 1000,
                            })
                        })
                }
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

        left: 50%;
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
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
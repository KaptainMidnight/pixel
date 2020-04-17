<template>
    <div>
        <Header/>

        <div class="login-block">
            <i class="icon icon-lock"></i>
            <div>
                <p>
                    Зарегистрироваться
                </p>
                <hr>
            </div>
        </div>

        <form @keyup.enter="register" class="form">
            <at-input v-model.trim="firstName" placeholder="Имя" class="input" icon="help-circle"/>
            <at-input v-model.trim="lastName" placeholder="Фамилия" class="input" icon="help-circle"/>
            <at-input v-model.trim="email" placeholder="Почта" class="input" icon="mail"/>
            <at-input v-model="password" type="password" placeholder="Пароль" class="input" icon="lock"/>
            <at-input v-model="passwordConfirmation" type="password" placeholder="Повтор пароля" class="input" icon="lock"/>

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
                readLicence: false,
                reg: /^.+@.+\..+$/gm
            }
        },
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)},
        },
        methods: {
            register() {
                if (this.passwordConfirmation !== this.password) {
                    this.$message.error({
                        message: 'Пароли не совпадают',
                        duration: 1000
                    })
                    return
                }

                if (!this.readLicence) {
                    this.$message.error({
                        message: 'Лицензионное соглашение не принято',
                        duration: 1000
                    })
                    return
                }

                if (!this.checkEmail(this.email)) {
                    this.$message.error({
                        message: 'Неверно введена почта',
                        duration: 1000
                    })
                    return
                }

                if (this.firstName && this.lastName) {
                    axios.post('http://127.0.0.1:5000/api/register', {
                        name: this.firstName,
                        surname: this.lastName,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.passwordConfirmation
                    }).then(() => {
                        this.$message.success({
                            message: 'Успешная регистрация',
                            duration: 1000,
                            type: 'success'
                        })

                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 1000)
                    }).catch(error => {
                        console.log(error)
                    })
                }
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

        
        left: 50%;
        top: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
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
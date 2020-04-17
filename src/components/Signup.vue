<template>
    <div>
        <Header/>

        <div class="login-block">
            <i class="icon icon-lock"></i>
            <div>
                <p>
                    Зарегистрироваться
                </p>
            </div>
        </div>

        <form @keyup.enter="register" class="form">
            <at-input v-model.trim ="firstName" placeholder="Имя" class="input" icon="help-circle"/>
            <at-input v-model.trim="lastName" placeholder="Фамилия" class="input" icon="help-circle"/>
            <at-input v-model.trim="email" placeholder="Почта" class="input" icon="mail"/>
            <at-input v-model="password" type="password" placeholder="Пароль" class="input" icon="lock"/>
            <at-input v-model="passwordConfirmation" type="password" placeholder="Повтор пароля" class="input" icon="lock"/>

            <at-checkbox v-model="readLicence">Я прочитал <a href="#">соглашение</a></at-checkbox>
            <br>
            <at-button class="signup-btn" type="primary" @click.prevent="register">Зарегистрироваться</at-button>
            <br>
            <at-button type="text" class="already-have">Уже есть аккаунт?</at-button>
        </form>
    </div>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    export default {
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
          password: { required, minLength: minLength(6) },
        },
        methods: {
            register() {
                if (this.passwordConfirmation !== this.password) {
                    this.$message.error('Пароли не совпадают')
                } else if ( this.firstName && this.lastName && this.email ) {
                    this.$message.success('Успешная регистрация')
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
        margin: 60px auto;
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

        margin: 10px auto;
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
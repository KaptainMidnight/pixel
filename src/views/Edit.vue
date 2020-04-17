<template>
    <div>

        <div class="header">
        <router-link class="brand-logo" to="/">pixelnetwork</router-link>

        <ul class="header__items">
            <li>
                <router-link to="/donate">
                    <at-button type="text" icon="icon-heart">Помочь</at-button>
                </router-link>
            </li>

            <li>
                <router-link to="/login">
                    <at-button type="text" icon="icon-log-out" @click="logout">Выйти</at-button>
                </router-link>
            </li>

        </ul>
    </div>

        <div class="main">
            <form @keyup.enter="onSubmit">
                <h1>Редактирование данных профиля</h1>
                <label for="name">Имя: </label>
                <at-input id="name" class="input" />
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                name: '',
                surname: '',
                sex: 1, // 1 - man, 0 - woman
                show: false
            }
        },
        mounted() {
            axios.get('http://127.0.0.1:5000/api/get/1')
                .then(response => {
                    if (response.data.message) {
                        this.$message.error({
                            message: 'Ошибка при запросе на сервер',
                            duraion: 1000,
                        })
                    }

                    this.name = response.data.name
                    this.surname = response.data.surname
                    this.show = true
                })
        },
        methods: {
            onSubmit() {

            }
        }
    }
</script>

<style scoped>
    .main {
        margin: 30px auto;
        border: 1px solid #eee;
        border-radius: 10px;

        width: 900px;
        height: 100%;
    }

    .main h1 {
        padding: 5px;
        text-align: center;
    }

    .input {
        padding: 5px;
    }

    label {
        font-size: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    /* Header */
    .header {
        display: flex;
        justify-content: space-between;
        height: 48px;
        width: 100%;

        background: #4db6ac;
    }

    .header__items {
        display: flex;
    }

    .header__items li {
        list-style: none;
        margin-right: 1rem;
    }

    .brand-logo {
        text-transform: uppercase;
        color: #fff;
        font-weight: bold;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        padding: 1rem 16px;
        text-decoration: none;
        align-items: center;
    }

    .at-btn {
        padding-top: 14px;
        color: #fff;
    }

    .at-btn:hover {
        color: #fff !important;
    }

    @media screen and (max-width: 700px) {
        .header__items {
            display: none;
        }

        .brand-logo {
            display: block;
            width: 100%;
            text-align: center;
            align-items: center;
        }
    }
</style>
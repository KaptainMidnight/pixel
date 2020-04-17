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

        <at-card style="margin: 50px; width: 250px; height: 300px" :body-style="{ padding: 0 }">
            <h4 slot="title">{{this.name}} {{this.surname}}</h4>
            <div>
                <img src="https://sun9-30.userapi.com/c854120/v854120601/1fd3af/U8hVyc4zpJk.jpg" style="width: 100%;">
            </div>
        </at-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                name: '',
                surname: '',
            }
        },
        methods: {
            logout() {
                localStorage.clear()
                this.$message.info({
                    message: 'Успешный выход',
                    duration: 1000,
                })
            }
        },
        async mounted() {
            await axios.get('https://api-pixelnetwork.truemachine.ru/api/auth/me', {
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(response => {
                this.name = response.data.name
                this.surname = response.data.surname
            })
        }
    }
</script>

<style scoped>
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
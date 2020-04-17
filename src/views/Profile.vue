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

        <div class="inner">
            <div class="profile">
                <img src="https://via.placeholder.com/200x250" alt="User profile">
                <label for="upload-photo">Добавить фото</label>
                <input type="file" id="upload-photo" />
            </div>

            <div class="post">
                <at-textarea class="textarea" v-model="postText" placeholder="Что у Вас нового?" />
                <div class="buttons">
                    <at-button icon="icon-camera" type="text" class="tab-icon">Фото</at-button>
                    <at-button icon="icon-video" type="text" class="tab-icon">Видео</at-button>
                    <at-button icon="icon-film" type="text" class="tab-icon">Фильм</at-button>
                </div>
            </div>
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
                postText: '',
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

    .inner {
        margin: 0 auto;
        width: 1200px;
        position: relative;
    }

    .profile {
        width: 200px;
        height: 250px;

        border-radius: 10px;
        margin-top: 70px;
        margin-left: 50px;
        margin-bottom: 10px;
        display: inline-block;
        position: relative;
    }

    .profile img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }

    .profile input[type=file] {
        border-radius: 10px;
        background: #eee;
        position: absolute;
        opacity: 0;
        z-index: -99999;
    }

    .profile label {
        cursor: pointer;
        position: absolute;
        left: 0;
        bottom: 0;
        margin: 30px 55px;
        display: block;
        text-align: center;
        background: #eee;
        border-radius: 30px;
        padding: 5px;
        font-size: 10px;
    }

    .post {
        margin-left: 40px;
        background: #eee;
        border-radius: 10px;
        display: inline-block;
        margin-left: 50px;
        width: 580px;
        top: 0;

        align-items: center;
        margin-top: 70px;
        position: absolute;
    }

    .tab-icon {
        margin: 0 10px;
        text-align: center;
        align-items: center;
        color: #000;
    }

    .at-btn {
        color: #000;
    }

    .at-btn:hover {
        color: #000 !important;
    }

    .buttons {
        margin-bottom: 10px;
        margin-top: 10px;
    }
</style>
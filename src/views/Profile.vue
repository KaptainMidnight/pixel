<template>
    <div>
        <div class="header">
            <router-link class="brand-logo" to="/">pixelnetwork</router-link>

            <ul class="header__items">
                <li>
                    <router-link to="/donate">
                        <at-button class="top-btn" type="text" icon="icon-heart">Помочь</at-button>
                    </router-link>
                </li>

                <li>
                    <router-link to="/login">
                        <at-button class="top-btn" type="text" icon="icon-log-out" @click="logout">Выйти</at-button>
                    </router-link>
                </li>
            </ul>
        </div>

        <Loader v-if="loadingName && loadingPosts" />

        <div class="inner" v-else>
            <div class="profile">
                <img src="https://via.placeholder.com/200x250" alt="User profile">
                <label for="upload-photo">Добавить фото</label>
                <input type="file" id="upload-photo" />
                <h3>{{this.name}} {{this.surname}}</h3>
            </div>

            <div class="post">
                <at-input :class="{'at-input--error': maxLength}" placeholder="Заголовок поста" v-model="title" />
                <at-textarea class="textarea" v-model="content" placeholder="Что у Вас нового?" />
                <div class="buttons">
                    <at-button icon="icon-camera" type="text" class="tab-icon">Фото</at-button>
                    <at-button icon="icon-video" type="text" class="tab-icon">Видео</at-button>
                    <at-button icon="icon-film" type="text" class="tab-icon">Фильм</at-button>
                    <at-button :disabled="maxLength" type="success" icon="icon-navigation" class="tab-icon" @click="createPost">Создать</at-button>
                </div>
            </div>

            <div>
                <h2>Список твоих постов</h2>

                <Post v-for="(post, index) of posts" :key="index"
                    :title="post.title"
                    :content="post.content"
                />
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
    import axios from 'axios'
    import Post from '@/views/Post'
    import Loader from '@/components/Loader'
    import Footer from '@/components/Footer'

    export default {
        components: { Post, Loader, Footer },
        data() {
            return {
                name: '',
                surname: '',
                content: '',
                title: '',
                posts: [],
                loadingPosts: true,
                loadingName: true
            }
        },
        methods: {
            logout() {
                localStorage.clear()
                this.$message.info({
                    message: 'Успешный выход',
                    duration: 1000,
                })
            },
            createPost() {

                let data = new FormData()

                data.set('title', this.title)
                data.set('content', this.content)

                axios.post('http://127.0.0.1:8000/api/post/create', data, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }).then(response => {
                    if (response.data.message) {
                        this.$message.success({
                            message: 'Пост успешно создан',
                            duration: 1000
                        })

                        this.title = ''
                        this.content = ''

                        axios.get('http://127.0.0.1:8000/api/post/list', {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        }).then(response => {
                            this.posts = response.data.reverse()
                            this.loadingPosts = false
                        }).catch((e) => {
                            console.error(e)
                            this.$message.error({
                                message: 'Произошла непредвиденная ошибка',
                                duration: 1000
                            })
                        })
                    }
                }).catch((e) => {
                    console.log(e)
                    this.$message.error({
                        message: 'Произошла непредвиденная ошибка',
                        duration: 1000,
                    })
                })
            }
        },
        async beforeCreate() {

            if (!localStorage.getItem('token')) {
                this.$router.push('/login')
                return
            }
            // https://api-pixelnetwork.truemachine.ru/api/auth/me
            await axios.get('http://127.0.0.1:8000/api/auth/me', {
                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(response => {
                this.name = response.data.name
                this.surname = response.data.surname
                this.loadingName = false
            })

            await axios.get('http://127.0.0.1:8000/api/post/list', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then(response => {
                this.posts = response.data.reverse()
                this.loadingPosts = false
            }).catch((e) => {
                console.error(e)
                this.$message.error({
                    message: 'Произошла непредвиденная ошибка',
                    duration: 1000
                })
            })
        },
        computed: {
            maxLength() {
                return this.title.length > 70
            }
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
        position: fixed;
        z-index: 1;
    }

    .header__items {
        display: flex;
        color: #fff !important;
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
        color: #fff !important;
    }

    .at-btn:hover {
        color: #fff !important;
    }

    @media screen and (max-width: 700px) {
        .header__items {
            display: none;
        }

        .header {
            position: relative;
        }

        .brand-logo {
            display: block;
            width: 100%;
            text-align: center;
            align-items: center;
        }

        .profile {
            display: block !important;
            margin: 10px 10px;
            justify-content: center;
            align-items: center;
        }

        .post {
            display: block !important;
            margin: 10px auto;
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
        text-align: center;
    }

    .profile h3 {
        overflow: scroll;
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
        background: transparent;
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
        display: inline-flex;
        margin: 0 10px;
        text-align: center;
        align-items: center;
        color: #000;
    }

    .at-btn {
        color: #000 !important;
    }

    .at-btn:hover {
        color: #000 !important;
    }

    .buttons {
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .textarea {
        margin-top: 10px;
    }

    h2 {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
    }
</style>
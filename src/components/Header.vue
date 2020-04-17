<template>
    <div class="header">
        <router-link class="brand-logo" to="/">pixelnetwork</router-link>

        <ul class="header__items">
            <li>
                <router-link to="/login">
                    <at-button type="text" icon="icon-log-in">Войти</at-button>
                </router-link>
            </li>

            <li>
                <router-link to="/signup">
                    <at-button type="text" icon="icon-lock">Зарегистрироваться</at-button>
                </router-link>
            </li>

            <li>
                <router-link to="/donate">
                    <at-button type="text" icon="icon-heart">Помочь</at-button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

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

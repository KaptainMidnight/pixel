<template>
    <div>
        <Header/>
        <form @keyup.enter="onSubmit" @submit.prevent="">
            <at-input placeholder='Введи свою почту' v-model="email" icon="mail" />
            <at-button type="primary" @click="onSubmit" class="send">Отправить письмо</at-button>
        </form>
    </div>
</template>

<script>
import Header from '@/components/Header'
export default {
    components: { Header },
    data() {
        return {
            email: ''
        }
    },
    methods: {
        onSubmit() {
            this.$notify.success({
                title: `Письмо успешно отправлено на почту ${this.email}`,
                duration: 2500,
            })

            setTimeout(() => {
                this.$router.push('/login')
            }, 2500)
        }
    }
}
</script>

<style scoped>
    form {
        width: 300px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .send {
        margin: 10px 0;
        width: 100%;
    }
</style>
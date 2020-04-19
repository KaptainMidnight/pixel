<template>
    <div>
        <at-card style="width: 580px; border-radius: 10px; margin-bottom: 30px;">
            <h4 slot="title">{{title}}</h4>
            <div class="content">
                {{content}}
            </div>
        </at-card>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content {
        width: 580px;
        word-break: break-all;
        padding: 0 10px
    }
</style>
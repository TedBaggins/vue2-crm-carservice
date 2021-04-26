<template>
    <div>
        <Header/>
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-9">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header';

    export default {
        name: 'client',
        components: {
            Header,
        },
        data() {
            return {
                clientId: null,
            }
        },
        computed: {

        },
        methods: {

        },
        mounted() {
            this.clientId = this.$route.params.clientid;
            console.log(this.clientId);
        },
        created() {

        }
    }
</script>
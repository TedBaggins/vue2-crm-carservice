<template>
    <div>
        <Header/>
        <div class="container-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <LeftMenu/>
                    </div>
                    <div class="col-md-9">
                        Заказы
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import LeftMenu from '@/components/ManagerLeftMenu';

    export default {
        name: 'orders',
        components: {
            Header,
            LeftMenu,
        },
        data() {
            return {
                content: ''
            }
        },
        computed: {

        },
        methods: {

        },
        mounted() {

        },
        created() {
            switch (this.$store.state.auth.user.role) {
                case "admin":
                    this.$router.push({name: 'Admin'});
                    break;
                case "master":
                    this.$router.push({name: 'Master'});
                    break;
                default:
            }
        }
    }
</script>
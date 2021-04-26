<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    Главная
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Home',
    components: {

    },
    mounted() {
        switch (this.$store.state.auth.user.role) {
            case "admin":
                this.$router.push({name: 'Admin'});
                break;
            case "manager":
                this.$router.push({name: 'Manager'});
                break;
            case "master":
                this.$router.push({name: 'Master'});
                break;
            default:
                this.$router.push({name: 'Login'});
        }
    }
}
</script>

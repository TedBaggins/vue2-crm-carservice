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

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import UserService from '@/services/user.service';
    import Header from '@/components/Header';
    import LeftMenu from '@/components/AdminLeftMenu';

    export default {
        name: 'Admin',
        data() {
            return {
                loading: false,
                errorAdd: false,
                errorDelete: false,
            }
        },
        components: {
            Header,
            LeftMenu
        },
        mounted() {
            // UserService.getAdminBoard().then(
            //     response => {
            //         this.content = response.data;
            //     },
            //     error => {
            //         this.content = (error.response && error.response.data) ||
            //             error.message ||
            //             error.toString();
            //     }
            // )
        }
    }
</script>
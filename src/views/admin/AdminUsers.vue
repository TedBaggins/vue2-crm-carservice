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
                        <Loader v-if="isLoading"/>
                        <div v-else>
                            <div class="content-box box-transparent">
                                Users
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import LeftMenu from '@/components/AdminLeftMenu';
    import Loader from '@/components/Loader';
    import {mapState} from "vuex";

    export default {
        name: 'users',
        components: {
            Header,
            LeftMenu,
            Loader,
        },
        computed: {
            ...mapState({
                isLoading: state => state.service.isLoading,
            }),
        },
        methods: {

        },
        mounted() {

        }
    }
</script>
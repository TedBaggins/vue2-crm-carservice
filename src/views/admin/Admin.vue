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
                        <div v-if="admins" class="table-box box-transparent">
                            <table class="table table-dark table-striped table-hover table-admins">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">ФИО</th>
                                        <th scope="col">Дата рождения</th>
                                        <th scope="col">Телефон</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="admin in admins" :key="admin.id">
                                        <th scope="row">{{admin.id}}</th>
                                        <td>{{admin.fio}}</td>
                                        <td>{{admin.birthday}}</td>
                                        <td>{{admin.phone}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
    import {actionTypes as adminActionTypes} from "@/store/modules/admin";
    import {mapState} from 'vuex';

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
        computed: {
            ...mapState({
                isLoading: state => state.admin.isLoading,
                error: state => state.admin.error,
                admins: state => state.admin.data
            })
        },
        mounted() {
            this.$store.dispatch(adminActionTypes.getAdmins);
        }
    }
</script>
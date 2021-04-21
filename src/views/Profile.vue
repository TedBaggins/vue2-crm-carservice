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
                            <div v-if="profile" class="content-box box-transparent">
                                <div class="profile-title-box">
                                    Профиль пользователя
                                </div>
                                <hr>
                                <div class="profile-data-box">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row profile-data-row">
                                                <div class="col-md-3">Id:</div>
                                                <div class="col-md-9 profile-data-value">{{profile.id}}</div>
                                            </div>
                                            <div class="row profile-data-row">
                                                <div class="col-md-3">ФИО:</div>
                                                <div class="col-md-9 profile-data-value">{{profile.fio}}</div>
                                            </div>
                                            <div class="row profile-data-row">
                                                <div class="col-md-3">Дата рождения:</div>
                                                <div class="col-md-9 profile-data-value">{{birthday}}</div>
                                            </div>
                                            <div class="row profile-data-row">
                                                <div class="col-md-3">Телефон:</div>
                                                <div class="col-md-9 profile-data-value">{{profile.phone}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    import moment from 'moment/moment';

    export default {
        name: 'profile',
        components: {
            Header,
            LeftMenu,
            Loader,
        },
        computed: {
            ...mapState({
                isLoading: state => state.service.isLoading,
                profile: state => state.auth.user.profile,
            }),
            birthday: function() {
                let birthday = new Date(Number(this.profile.birthday));
                return moment(birthday).locale("ru").format('LL');
            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<style>
    .profile-title-box {
        margin-bottom: 20px;
        padding-top: 5px;
    }
    .profile-data-row {
        margin-bottom: 10px;
    }
    .profile-data-value {
        color: #9dd1d2;
    }
</style>
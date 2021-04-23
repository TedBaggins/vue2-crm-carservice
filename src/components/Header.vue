<template>
    <div class="container-fluid header-box">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <img class="header-logo" :src="require('@/assets/logo-carservice.png')"/>
                </div>
                <div class="col-md-3">
                </div>
                <div class="col-md-4 header-profile-name-box">
                    <p v-if="profileName" class="header-profile-name">
                        {{profileName}}
                    </p>
                </div>
                <div class="col-md-2">
                    <button class="btn-base-sm btn-shadow float-right" @click="handleLogout">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Выйти</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { actionTypes } from "@/store/modules/auth";
    import {mapState} from "vuex";

    export default {
        data() {
            return {

            };
        },
        computed: {
            ...mapState({
                profileName: state => {
                    if (state.auth.user) {
                        return state.auth.user.profile.fio;
                    }
                    return '';
                }
            }),
        },
        methods: {
            handleLogout() {
                this.$store
                    .dispatch(actionTypes.logout)
                    .then(() => {
                        this.$router.push({name: 'Login'});
                    });
            }
        }
    }
</script>

<style>
    .header-box {
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }
    .header-logo {
        display: block;
        max-width: 140px;
    }
    .header-box button i {
        padding-right: 5px;
    }
    .header-profile-name-box {
        display: flex;
        justify-content: flex-end;
    }
    .header-profile-name {
        margin: 0;
        display: flex;
        align-items: center;
    }
</style>
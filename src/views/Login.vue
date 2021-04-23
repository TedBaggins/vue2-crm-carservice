<template>
    <div class="container-fluid auth-page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-auth-box box-transparent">
                        <form @submit.prevent="handleLogin">
                            <img class="form-auth-logo" :src="require('@/assets/logo-carservice.png')"/>
                            <div class="form-group row">
                                <label for="form-auth-login" class="col-sm-2 col-form-label">Логин</label>
                                <div class="col-sm-10">
                                    <validation-provider rules="required" v-slot="{ errors }">
                                        <input type="text"
                                               v-model="login"
                                               id="form-auth-login"
                                               class="form-control"
                                               name="login"
                                        >
                                        <span class="input-error">{{ errors[0] }}</span>
                                    </validation-provider>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="form-auth-password" class="col-sm-2 col-form-label">Пароль</label>
                                <div class="col-sm-10">
                                    <validation-provider rules="required" v-slot="{ errors }">
                                        <input type="password"
                                               v-model="password"
                                               id="form-auth-password"
                                               class="form-control"
                                               name="password"
                                        >
                                        <span class="input-error">{{ errors[0] }}</span>
                                    </validation-provider>
                                </div>
                            </div>

                            <div class="form-group">
                                <button class="btn-base btn-orange btn-block form-auth-submit-btn" :disabled="loading">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Войти</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { ValidationProvider, extend } from 'vee-validate';
    import { required } from 'vee-validate/dist/rules';
    import { actionTypes } from "@/store/modules/auth";

    extend('required', {
        ...required,
        message: 'Обязательное поле'
    });

    export default {
        name: 'Login',
        components: {
            ValidationProvider
        },
        data() {
            return {
                loading: false,
                message: '',
                login: '',
                password: ''
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push({name: 'Home'});
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                if (this.login && this.password) {
                    const formData = {
                        login: this.login,
                        password: this.password
                    }
                    this.$store
                        .dispatch(actionTypes.login, formData)
                        .then(() => {
                            this.$router.push({name: 'Home'});
                        });
                }
                this.loading = false;
            }
        }
    }
</script>

<style>
    .auth-page {
        height: 100%;
    }
    .form-auth-box {
        margin: 150px auto 20px;
        max-width: 400px;
        /*font-family: Gordita,Helvetica Neue,Helvetica,Arial,sans-serif;*/
    }
    .form-auth-box input {
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px rgba(255, 255, 255,1);
    }
    .form-auth-logo {
        display: block;
        margin: 10px auto 25px;
        max-height: 90px;
        max-width: 210px;
    }
    .form-auth-submit-btn .spinner-border {
        margin-bottom: 5px;
        margin-right: 5px;
    }
    .form-auth-submit-btn {
        max-width: 150px;
        margin: 30px auto 10px;
    }
</style>
<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-auth-box">
                        <form @submit.prevent="handleLogin">
                            <p class="form-auth-title">Авторизация</p>
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
                                <button class="btn btn-success btn-block form-auth-submit-btn" :disabled="loading">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Login</span>
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
                    //console.log(formData);
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
    .form-auth-box {
        margin: 100px auto 20px;
        padding: 25px;
        max-width: 400px;
        border: 1px solid #dedede;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }
    .form-auth-title {
        text-align: center;
        font-size: 22px;
        margin-bottom: 20px;
        font-weight: 600;
    }
    .input-error {
        color: #ec2c2c;
    }
    .form-auth-submit-btn .spinner-border {
        margin-bottom: 5px;
        margin-right: 5px;
    }
    .form-auth-submit-btn {
        max-width: 150px;
        margin: 20px auto 10px;
    }
</style>
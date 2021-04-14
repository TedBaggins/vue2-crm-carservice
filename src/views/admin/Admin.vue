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
                        <div class="loading-box" v-if="loading">Loading...</div>
                        <div v-else>
                            <div v-if="admins" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Администраторы</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-admin">Добавить</button>
                                </div>
                                <div class="table-box">
                                    <table class="table table-dark table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">ФИО</th>
                                            <th scope="col">Телефон</th>
                                            <th scope="col">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(admin, index) in admins" :key="admin.id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{admin.fio}}</td>
                                            <td>{{admin.phone}}</td>
                                            <td>
                                                <button class="btn-base-sm btn-blue" @click="handleEdit(admin.id)">
                                                    <i class="bi bi-pen"></i>
                                                </button>
                                                <button class="btn-base-sm btn-red" @click="handleRemove(admin.id)">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-add-admin" tabindex="-1" role="dialog" aria-labelledby="modal-add-admin-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-add-admin-label">Добавление администратора</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-add-admin-form-box">
                            <form @submit.prevent="handleAddAdmin" id="form-add-admin">
                                <div class="form-group row">
                                    <label for="form-add-admin-fio" class="col-sm-4 col-form-label">ФИО</label>
                                    <div class="col-sm-8">
                                        <validation-provider rules="required" v-slot="{ errors }">
                                            <input type="text"
                                                   v-model="addAdminFio"
                                                   id="form-add-admin-fio"
                                                   class="form-control"
                                                   name="fio"
                                            >
                                            <span class="input-error">{{ errors[0] }}</span>
                                        </validation-provider>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form-add-admin-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                    <div class="col-sm-8 datepicker-box">
                                        <DatePicker id="form-add-admin-birthday" class="form-add-admin-datepicker" @setDate='setDate'/>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form-add-admin-phone" class="col-sm-4 col-form-label">Телефон</label>
                                    <div class="col-sm-8">
                                        <validation-provider rules="digits:3" v-slot="{ errors }">
                                            <input type="text"
                                                   v-model="addAdminPhone"
                                                   id="form-add-admin-phone"
                                                   class="form-control"
                                                   name="phone"
                                            >
                                            <span class="input-error">{{ errors[0] }}</span>
                                        </validation-provider>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" form="form-add-admin" class="btn-base-sm btn-orange">Отправить</button>
                        <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
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
    import DatePicker from "@/components/DatePicker";
    import {ValidationProvider, extend} from "vee-validate";
    import {required} from "vee-validate/dist/rules";

    extend('required', {
        ...required,
        message: 'Обязательное поле'
    });
    // extend('decimal', {
    //     ...decimal,
    //     message: 'Допускаются только цифры'
    // });

    export default {
        name: 'Admin',
        data() {
            return {
                loading: false,
                errorAdd: false,
                errorDelete: false,
                addAdminFio: '',
                addAdminBirthday: '',
                addAdminPhone: ''
            }
        },
        components: {
            Header,
            LeftMenu,
            DatePicker,
            ValidationProvider
        },
        computed: {
            ...mapState({
                isLoading: state => state.admin.isLoading,
                error: state => state.admin.error,
                admins: state => state.admin.data
            })
        },
        methods: {
            handleRemove(id) {
                // console.log(id);
                this.$store.dispatch(adminActionTypes.deleteAdmin, {
                    id: id
                })
                .then(() => {
                    this.$store.dispatch(adminActionTypes.getAdmins);
                })
            },
            handleEdit(id) {
                console.log(id);
            },
            handleAddAdmin() {
                let formData = {
                    fio: this.addAdminFio,
                    birthday: this.addAdminBirthday,
                    phone: this.addAdminPhone
                }
                console.log(formData);
            },
            setDate (data) {
                this.addAdminBirthday = data;
            },
        },
        mounted() {
            this.$store.dispatch(adminActionTypes.getAdmins);
        }
    }
</script>
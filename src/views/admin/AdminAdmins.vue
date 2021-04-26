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
                            <div v-if="admins" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Администраторы</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-admin">Добавить</button>
                                </div>

                                <div v-if="errorDelete" class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Ошибка!</strong> Нельзя удалить администратора, связанного с учетной записью
                                    <button type="button" @click="closeWarningDelete" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
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
                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-admin" @click="handleRemove(admin.id)">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="pagesCount" class="table-paginator-box">
                                    <paginate
                                        v-model="initialPage"
                                        :page-count="pagesCount"
                                        :click-handler="handlePage"
                                        :prev-text="'Пред.'"
                                        :next-text="'След.'"
                                        :container-class="'paginator-ul'"
                                        :page-class="'page-item'">
                                    </paginate>
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
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddAdmin">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-add-admin-label">Добавление администратора</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-add-admin-form-box">
                            <form @submit.prevent="handleSubmit(handleAddAdmin)" id="form-add-admin">
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
                                        <DatePicker v-bind:initialDate="initialDate" :key="addAdminDatePickerKey" id="form-add-admin-birthday" class="form-add-admin-datepicker" @setTimestamp='setTimestamp'/>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="form-add-admin-phone" class="col-sm-4 col-form-label">Телефон</label>
                                    <div class="col-sm-8">
                                        <validation-provider rules="numbers" v-slot="{ errors }">
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
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-admin" tabindex="-1" role="dialog" aria-labelledby="modal-edit-admin-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditAdmin">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-admin-label">Редактирование администратора</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-admin-form-box">
                                <form @submit.prevent="handleSubmit(handleEditAdmin)" id="form-edit-admin">
                                    <div class="form-group row">
                                        <label for="form-edit-admin-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editAdminFio"
                                                       id="form-edit-admin-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-admin-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="editAdminDatePickerKey" id="form-edit-admin-birthday" class="form-edit-admin-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-admin-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editAdminPhone"
                                                       id="form-edit-admin-phone"
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
                            <button type="submit" form="form-edit-admin" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-admin" tabindex="-1" role="dialog" aria-labelledby="modal-delete-admin-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-admin-label">Удаление администратора</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-delete-body">
                            Подтвердите удаление
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn-base-sm btn-orange" @click="confirmRemove">Ок</button>
                        <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Отмена</button>
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
    import {actionTypes as adminActionTypes} from "@/store/modules/admin";
    import {mapState, mapGetters} from 'vuex';
    import DatePicker from "@/components/DatePicker";
    import {ValidationProvider, extend} from "vee-validate";
    import {required} from "vee-validate/dist/rules";
    import $ from 'jquery';

    extend('required', {
        ...required,
        message: 'Обязательное поле'
    });
    extend('numbers', {
        validate: value => {
            let rule = /^\d+$/;
            return rule.test(value);
        },
        message: "Поле может содержать только цифры"
    });

    export default {
        name: 'admins',
        components: {
            Header,
            LeftMenu,
            Loader,
            DatePicker,
            ValidationProvider,
        },
        data() {
            return {
                loading: false,
                errorAdd: false,
                errorDelete: false,
                addAdminFio: '',
                addAdminBirthday: '',
                addAdminPhone: '',
                addAdminDatePickerKey: 0,
                editAdminFio: '',
                editAdminBirthday: '',
                editAdminPhone: '',
                editAdminDatePickerKey: 0,
                initialDate: null,
                selectedAdmin: null,
                initialPage: null,
                removingId: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.admin.isLoading,
                error: state => state.admin.error,
                admins: state => state.admin.data,
                limit: state => state.admin.limit,
                pagesCount: state => Math.ceil(state.admin.adminsCount / state.admin.limit)
            }),
            ...mapGetters(["getAdminById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillAdmins() {
                this.$store.dispatch(adminActionTypes.getAdmins, {offset: this.offset});
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(adminActionTypes.deleteAdmin, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillAdmins();
                    $('#modal-delete-admin').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-admin').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            handleEdit(id) {
                this.selectedAdmin = this.getAdminById(id)[0];
                this.editAdminFio = this.selectedAdmin.fio;
                this.editAdminBirthday = this.selectedAdmin.birthday;
                this.editAdminPhone = this.selectedAdmin.phone;
                this.initialDate = this.editAdminBirthday ? Number(this.editAdminBirthday) : null;
                this.editAdminDatePickerKey += 1;
                $('#modal-edit-admin').modal();
            },
            handleAddAdmin() {
                let formData = {
                    fio: this.addAdminFio,
                    birthday: this.addAdminBirthday,
                    phone: this.addAdminPhone
                }
                this.$store.dispatch(adminActionTypes.addAdmin, {
                    formData
                })
                .then(() => {
                    this.addAdminFio = ''; this.addAdminBirthday = ''; this.addAdminPhone = '';
                    this.addAdminDatePickerKey += 1;
                    this.$refs.formAddAdmin.reset();
                    this.fillAdmins();
                    $('#modal-add-admin').modal('hide');
                })
            },
            handleEditAdmin() {
                let id = this.selectedAdmin.id;
                let formData = {
                    fio: this.editAdminFio,
                    birthday: this.editAdminBirthday,
                    phone: this.editAdminPhone
                }
                this.$store.dispatch(adminActionTypes.editAdmin, {
                    id,
                    formData
                })
                .then(() => {
                    this.editAdminFio = ''; this.editAdminBirthday = ''; this.editAdminPhone = '';
                    this.initialDate = null;
                    this.editAdminDatePickerKey += 1;
                    this.$refs.formEditAdmin.reset();
                    this.fillAdmins();
                    $('#modal-edit-admin').modal('hide');
                })
            },
            setTimestamp (data) {
                this.addAdminBirthday = data.timestamp;
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'AdminAdmins', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillAdmins();
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillAdmins();
            this.$store.dispatch(adminActionTypes.getAdminsCount);
        },
        created() {
            switch (this.$store.state.auth.user.role) {
                case "manager":
                    this.$router.push({name: 'Manager'});
                    break;
                case "master":
                    this.$router.push({name: 'Master'});
                    break;
                default:
            }
        }
    }
</script>
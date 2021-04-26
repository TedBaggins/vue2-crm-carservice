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
                            <div v-if="managers" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Менеджеры</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-manager">Добавить</button>
                                </div>

                                <div v-if="errorDelete" class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Ошибка!</strong> Нельзя удалить менеджера, связанного с учетной записью
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
                                        <tr v-for="(manager, index) in managers" :key="manager.id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{manager.fio}}</td>
                                            <td>{{manager.phone}}</td>
                                            <td>
                                                <button class="btn-base-sm btn-blue" @click="handleEdit(manager.id)">
                                                    <i class="bi bi-pen"></i>
                                                </button>
                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-manager" @click="handleRemove(manager.id)">
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

        <div class="modal fade" id="modal-add-manager" tabindex="-1" role="dialog" aria-labelledby="modal-add-manager-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddManager">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-manager-label">Добавление менеджера</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-manager-form-box">
                                <form @submit.prevent="handleSubmit(handleAddManager)" id="form-add-manager">
                                    <div class="form-group row">
                                        <label for="form-add-manager-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addManagerFio"
                                                       id="form-add-manager-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-manager-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="addManagerDatePickerKey" id="form-add-manager-birthday" class="form-add-manager-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-manager-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addManagerPhone"
                                                       id="form-add-manager-phone"
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
                            <button type="submit" form="form-add-manager" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-manager" tabindex="-1" role="dialog" aria-labelledby="modal-edit-manager-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditManager">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-manager-label">Редактирование менеджера</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-manager-form-box">
                                <form @submit.prevent="handleSubmit(handleEditManager)" id="form-edit-manager">
                                    <div class="form-group row">
                                        <label for="form-edit-manager-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editManagerFio"
                                                       id="form-edit-manager-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-manager-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="editManagerDatePickerKey" id="form-edit-manager-birthday" class="form-edit-manager-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-manager-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editManagerPhone"
                                                       id="form-edit-manager-phone"
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
                            <button type="submit" form="form-edit-manager" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-manager" tabindex="-1" role="dialog" aria-labelledby="modal-delete-manager-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-manager-label">Удаление менеджера</h5>
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
    import {actionTypes as managerActionTypes} from "@/store/modules/manager";
    import {extend, ValidationProvider} from "vee-validate";
    import {required} from "vee-validate/dist/rules";
    import {mapGetters, mapState} from "vuex";
    import DatePicker from "@/components/DatePicker";
    import $ from "jquery";

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
        name: 'managers',
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
                addManagerFio: '',
                addManagerBirthday: '',
                addManagerPhone: '',
                addManagerDatePickerKey: 0,
                editManagerFio: '',
                editManagerBirthday: '',
                editManagerPhone: '',
                editManagerDatePickerKey: 0,
                initialDate: null,
                selectedManager: null,
                initialPage: null,
                removingId: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.manager.isLoading,
                error: state => state.manager.error,
                managers: state => state.manager.data,
                limit: state => state.manager.limit,
                pagesCount: state => Math.ceil(state.manager.managersCount / state.manager.limit)
            }),
            ...mapGetters(["getManagerById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillManagers() {
                this.$store.dispatch(managerActionTypes.getManagers, {offset: this.offset});
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(managerActionTypes.deleteManager, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillManagers();
                    $('#modal-delete-manager').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-manager').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            handleEdit(id) {
                this.selectedManager = this.getManagerById(id)[0];
                this.editManagerFio = this.selectedManager.fio;
                this.editManagerBirthday = this.selectedManager.birthday;
                this.editManagerPhone = this.selectedManager.phone;
                this.initialDate = this.editManagerBirthday ? Number(this.editManagerBirthday) : null;
                this.editManagerDatePickerKey += 1;
                $('#modal-edit-manager').modal();
            },
            handleAddManager() {
                let formData = {
                    fio: this.addManagerFio,
                    birthday: this.addManagerBirthday,
                    phone: this.addManagerPhone
                }
                this.$store.dispatch(managerActionTypes.addManager, {
                    formData
                    })
                    .then(() => {
                        this.addManagerFio = ''; this.addManagerBirthday = ''; this.addManagerPhone = '';
                        this.addManagerDatePickerKey += 1;
                        this.$refs.formAddManager.reset();
                        this.fillManagers();
                        $('#modal-add-manager').modal('hide');
                    })
            },
            handleEditManager() {
                let id = this.selectedManager.id;
                let formData = {
                    fio: this.editManagerFio,
                    birthday: this.editManagerBirthday,
                    phone: this.editManagerPhone
                }
                this.$store.dispatch(managerActionTypes.editManager, {
                    id,
                    formData
                })
                    .then(() => {
                        this.editManagerFio = ''; this.editManagerBirthday = ''; this.editManagerPhone = '';
                        this.initialDate = null;
                        this.editManagerDatePickerKey += 1;
                        this.$refs.formEditManager.reset();
                        this.fillManagers();
                        $('#modal-edit-manager').modal('hide');
                    })
            },
            setTimestamp (data) {
                this.addManagerBirthday = data.timestamp;
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'AdminManagers', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillManagers();
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillManagers();
            this.$store.dispatch(managerActionTypes.getManagersCount);
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

<style>

</style>
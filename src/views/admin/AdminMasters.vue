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
                            <div v-if="masters" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Мастера</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-master">Добавить</button>
                                </div>

                                <div v-if="errorDelete" class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Ошибка!</strong> При удалении возникли неполадки...
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
                                        <tr v-for="(master, index) in masters" :key="master.id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{master.fio}}</td>
                                            <td>{{master.phone}}</td>
                                            <td>
                                                <button class="btn-base-sm btn-blue" @click="handleEdit(master.id)">
                                                    <i class="bi bi-pen"></i>
                                                </button>
                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-master" @click="handleRemove(master.id)">
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

        <div class="modal fade" id="modal-add-master" tabindex="-1" role="dialog" aria-labelledby="modal-add-master-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddMaster">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-master-label">Добавление мастера</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-master-form-box">
                                <form @submit.prevent="handleSubmit(handleAddMaster)" id="form-add-master">
                                    <div class="form-group row">
                                        <label for="form-add-master-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addMasterFio"
                                                       id="form-add-master-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-master-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="addMasterDatePickerKey" id="form-add-master-birthday" class="form-add-master-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-master-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addMasterPhone"
                                                       id="form-add-master-phone"
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
                            <button type="submit" form="form-add-master" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-master" tabindex="-1" role="dialog" aria-labelledby="modal-edit-master-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditMaster">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-master-label">Редактирование мастера</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-master-form-box">
                                <form @submit.prevent="handleSubmit(handleEditMaster)" id="form-edit-master">
                                    <div class="form-group row">
                                        <label for="form-edit-master-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editMasterFio"
                                                       id="form-edit-master-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-master-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="editMasterDatePickerKey" id="form-edit-master-birthday" class="form-edit-master-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-master-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editMasterPhone"
                                                       id="form-edit-master-phone"
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
                            <button type="submit" form="form-edit-master" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-master" tabindex="-1" role="dialog" aria-labelledby="modal-delete-master-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-master-label">Удаление мастера</h5>
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
    import {actionTypes as masterActionTypes} from "@/store/modules/master";
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
        name: 'masters',
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
                addMasterFio: '',
                addMasterBirthday: '',
                addMasterPhone: '',
                addMasterDatePickerKey: 0,
                editMasterFio: '',
                editMasterBirthday: '',
                editMasterPhone: '',
                editMasterDatePickerKey: 0,
                initialDate: null,
                selectedMaster: null,
                initialPage: null,
                removingId: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.master.isLoading,
                error: state => state.master.error,
                masters: state => state.master.data,
                limit: state => state.master.limit,
                pagesCount: state => Math.ceil(state.master.mastersCount / state.master.limit)
            }),
            ...mapGetters(["getMasterById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillMasters() {
                this.$store.dispatch(masterActionTypes.getMasters, {offset: this.offset});
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(masterActionTypes.deleteMaster, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillMasters();
                    $('#modal-delete-master').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-master').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            handleEdit(id) {
                this.selectedMaster = this.getMasterById(id)[0];
                this.editMasterFio = this.selectedMaster.fio;
                this.editMasterBirthday = this.selectedMaster.birthday;
                this.editMasterPhone = this.selectedMaster.phone;
                this.initialDate = this.editMasterBirthday ? Number(this.editMasterBirthday) : null;
                this.editMasterDatePickerKey += 1;
                $('#modal-edit-master').modal();
            },
            handleAddMaster() {
                let formData = {
                    fio: this.addMasterFio,
                    birthday: this.addMasterBirthday,
                    phone: this.addMasterPhone
                }
                this.$store.dispatch(masterActionTypes.addMaster, {
                    formData
                })
                    .then(() => {
                        this.addMasterFio = ''; this.addMasterBirthday = ''; this.addMasterPhone = '';
                        this.addMasterDatePickerKey += 1;
                        this.$refs.formAddMaster.reset();
                        this.fillMasters();
                        $('#modal-add-master').modal('hide');
                    })
            },
            handleEditMaster() {
                let id = this.selectedMaster.id;
                let formData = {
                    fio: this.editMasterFio,
                    birthday: this.editMasterBirthday,
                    phone: this.editMasterPhone
                }
                this.$store.dispatch(masterActionTypes.editMaster, {
                    id,
                    formData
                })
                    .then(() => {
                        this.editMasterFio = ''; this.editMasterBirthday = ''; this.editMasterPhone = '';
                        this.initialDate = null;
                        this.editMasterDatePickerKey += 1;
                        this.$refs.formEditMaster.reset();
                        this.fillMasters();
                        $('#modal-edit-master').modal('hide');
                    })
            },
            setTimestamp (data) {
                this.addMasterBirthday = data.timestamp;
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'AdminMasters', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillMasters();
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillMasters();
            this.$store.dispatch(masterActionTypes.getMastersCount);
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
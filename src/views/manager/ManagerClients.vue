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
                            <div v-if="clients" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Клиенты</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-client">Добавить</button>
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
                                        <tr v-for="(client, index) in clients" :key="client.id">
                                            <th scope="row">{{index+1+offset}}</th>
                                            <td><router-link v-if="clients" :to="{name: 'ManagerClient', params: { clientid: client.id }}">{{client.fio}}</router-link></td>
                                            <td>{{client.phone}}</td>
                                            <td>
                                                <button class="btn-base-sm btn-blue" @click="handleEdit(client.id)">
                                                    <i class="bi bi-pen"></i>
                                                </button>
                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-client" @click="handleRemove(client.id)">
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

        <div class="modal fade" id="modal-add-client" tabindex="-1" role="dialog" aria-labelledby="modal-add-client-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddClient">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-client-label">Добавление клиента</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-client-form-box">
                                <form @submit.prevent="handleSubmit(handleAddClient)" id="form-add-client">
                                    <div class="form-group row">
                                        <label for="form-add-client-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addClientFio"
                                                       id="form-add-client-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-client-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="addClientDatePickerKey" id="form-add-client-birthday" class="form-add-client-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-client-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addClientPhone"
                                                       id="form-add-client-phone"
                                                       class="form-control"
                                                       name="phone"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-client-passport" class="col-sm-4 col-form-label">Паспорт</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addClientPassport"
                                                       id="form-add-client-passport"
                                                       class="form-control"
                                                       name="passport"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-client-driverlicense" class="col-sm-4 col-form-label">Номер водит. удостоверения</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addClientDriverLicense"
                                                       id="form-add-client-driverlicense"
                                                       class="form-control"
                                                       name="driver_license"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-add-client" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-client" tabindex="-1" role="dialog" aria-labelledby="modal-edit-client-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditClient">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-client-label">Редактирование клиента</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-client-form-box">
                                <form @submit.prevent="handleSubmit(handleEditClient)" id="form-edit-client">
                                    <div class="form-group row">
                                        <label for="form-edit-client-fio" class="col-sm-4 col-form-label">ФИО</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editClientFio"
                                                       id="form-edit-client-fio"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-client-birthday" class="col-sm-4 col-form-label">Дата рождения</label>
                                        <div class="col-sm-8 datepicker-box">
                                            <DatePicker v-bind:initialDate="initialDate" :key="editClientDatePickerKey" id="form-edit-client-birthday" class="form-edit-client-datepicker" @setTimestamp='setTimestamp'/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-client-phone" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editClientPhone"
                                                       id="form-edit-client-phone"
                                                       class="form-control"
                                                       name="phone"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-client-passport" class="col-sm-4 col-form-label">Телефон</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editClientPassport"
                                                       id="form-edit-client-passport"
                                                       class="form-control"
                                                       name="passport"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-client-driverlicense" class="col-sm-4 col-form-label">Номер водит. удостоверения</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editClientDriverLicense"
                                                       id="form-edit-client-driverlicense"
                                                       class="form-control"
                                                       name="driver_license"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-edit-client" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-client" tabindex="-1" role="dialog" aria-labelledby="modal-delete-client-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-client-label">Удаление клиента</h5>
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
    import LeftMenu from '@/components/ManagerLeftMenu';
    import Loader from '@/components/Loader';
    import {actionTypes as clientActionTypes} from "@/store/modules/client";
    import {mapGetters, mapState} from 'vuex';
    import DatePicker from "@/components/DatePicker";
    import {ValidationProvider, extend} from "vee-validate";
    import {required} from "vee-validate/dist/rules";
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
        name: 'clients',
        components: {
            Header,
            LeftMenu,
            Loader,
            DatePicker,
            ValidationProvider,
        },
        data() {
            return {
                errorAdd: false,
                errorDelete: false,
                addClientFio: '',
                addClientBirthday: '',
                addClientPhone: '',
                addClientPassport: '',
                addClientDriverLicense: '',
                addClientDatePickerKey: 0,
                editClientFio: '',
                editClientBirthday: '',
                editClientPhone: '',
                editClientPassport: '',
                editClientDriverLicense: '',
                editClientDatePickerKey: 0,
                initialDate: null,
                selectedClient: null,
                initialPage: null,
                removingId: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.client.isLoading,
                error: state => state.client.error,
                clients: state => state.client.data,
                limit: state => state.client.limit,
                pagesCount: state => Math.ceil(state.client.clientsCount / state.client.limit)
            }),
            ...mapGetters(["getClientById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillClients() {
                this.$store.dispatch(clientActionTypes.getClients, {offset: this.offset});
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(clientActionTypes.deleteClient, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillClients();
                    $('#modal-delete-client').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-client').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            handleEdit(id) {
                this.selectedClient = this.getClientById(id)[0];
                this.editClientFio = this.selectedClient.fio;
                this.editClientBirthday = this.selectedClient.birthday;
                this.editClientPhone = this.selectedClient.phone;
                this.editClientPassport = this.selectedClient.passport;
                this.editClientDriverLicense = this.selectedClient.driver_license;
                this.initialDate = this.editClientBirthday ? Number(this.editClientBirthday) : null;
                this.editClientDatePickerKey += 1;
                $('#modal-edit-client').modal();
            },
            handleAddClient() {
                let formData = {
                    fio: this.addClientFio,
                    birthday: this.addClientBirthday,
                    phone: this.addClientPhone,
                    passport: this.addClientPassport,
                    driver_license: this.addClientDriverLicense
                }
                this.$store.dispatch(clientActionTypes.addClient, {
                    formData
                })
                .then(() => {
                    this.addClientFio = ''; this.addClientBirthday = ''; this.addClientPhone = '';
                    this.addClientPassport = ''; this.addClientDriverLicense = '';
                    this.addClientDatePickerKey += 1;
                    this.$refs.formAddClient.reset();
                    this.fillClients();
                    $('#modal-add-client').modal('hide');
                })
            },
            handleEditClient() {
                let id = this.selectedClient.id;
                let formData = {
                    fio: this.editClientFio,
                    birthday: this.editClientBirthday,
                    phone: this.editClientPhone,
                    passport: this.editClientPassport,
                    driver_license: this.editClientDriverLicense
                }
                this.$store.dispatch(clientActionTypes.editClient, {
                    id,
                    formData
                })
                .then(() => {
                    this.editClientFio = ''; this.editClientBirthday = ''; this.editClientPhone = '';
                    this.editClientPassport = ''; this.editClientDriverLicense = '';
                    this.initialDate = null;
                    this.editClientDatePickerKey += 1;
                    this.$refs.formEditClient.reset();
                    this.fillClients();
                    $('#modal-edit-client').modal('hide');
                })
            },
            setTimestamp (data) {
                this.addClientBirthday = data.timestamp;
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'ManagerClients', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillClients();
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillClients();
            this.$store.dispatch(clientActionTypes.getClientsCount);
        },
        created() {
            switch (this.$store.state.auth.user.role) {
                case "admin":
                    this.$router.push({name: 'Admin'});
                    break;
                case "master":
                    this.$router.push({name: 'Master'});
                    break;
                default:
            }
        }
    }
</script>
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
                            <div v-if="users" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Учетные записи</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-user">Добавить</button>
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
                                            <th scope="col">Логин</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Роль</th>
                                            <th scope="col">ФИО</th>
                                            <th scope="col">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(user, index) in users" :key="user.id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{user.login}}</td>
                                            <td>{{user.email}}</td>
                                            <td>{{translateRoleName(user.role.name)}}</td>
                                            <td>{{getProfileFio(user)}}</td>
                                            <td class="table-buttons-box">
                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-user" @click="handleRemove(user.id)">
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

        <div class="modal fade" id="modal-add-user" tabindex="-1" role="dialog" aria-labelledby="modal-add-user-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddUser">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-user-label">Добавление учетной записи</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-user-form-box">
                                <form @submit.prevent="handleSubmit(handleAddUser)" id="form-add-user">
                                    <div class="form-group row">
                                        <label for="form-add-user-login" class="col-sm-4 col-form-label">Логин</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addUserLogin"
                                                       id="form-add-user-login"
                                                       class="form-control"
                                                       autocomplete="off"
                                                       name="login_new"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-user-email" class="col-sm-4 col-form-label">Email</label>
                                        <div class="col-sm-8">
                                            <input type="email"
                                                   v-model="addUserEmail"
                                                   id="form-add-user-email"
                                                   class="form-control"
                                                   name="email"
                                            >
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-user-password" class="col-sm-4 col-form-label">Пароль</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addUserPassword"
                                                       id="form-add-user-password"
                                                       class="form-control"
                                                       autocomplete="off"
                                                       name="password_new"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-user-roleid" class="col-sm-4">Роль</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="role_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="roles"
                                                    v-model="addUserRoleName"
                                                    :options="rolesSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-user-roleid"
                                                    label="name"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeRoleSelect"
                                                    @search:blur="onBlurRoleSelect"
                                                >
                                                    <span slot="no-options">Совпадений не найдено</span>
                                                </vSelect>
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div v-if="adminRoleSelected" class="form-group row">
                                        <label for="form-add-user-adminid" class="col-sm-4">Администратор</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="admin_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="admins"
                                                    v-model="addUserAdminFio"
                                                    :options="adminsSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-user-adminid"
                                                    label="fio"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeAdminSelect"
                                                    @search:blur="onBlurAdminSelect"
                                                >
                                                    <span slot="no-options">Совпадений не найдено</span>
                                                </vSelect>
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div v-if="managerRoleSelected" class="form-group row">
                                        <label for="form-add-user-managerid" class="col-sm-4">Менеджер</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="manager_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="managers"
                                                    v-model="addUserManagerFio"
                                                    :options="managersSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-user-managerid"
                                                    label="fio"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeManagerSelect"
                                                    @search:blur="onBlurManagerSelect"
                                                >
                                                    <span slot="no-options">Совпадений не найдено</span>
                                                </vSelect>
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div v-if="masterRoleSelected" class="form-group row">
                                        <label for="form-add-user-masterid" class="col-sm-4">Мастер</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="master_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="masters"
                                                    v-model="addUserMasterFio"
                                                    :options="mastersSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-user-masterid"
                                                    label="fio"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeMasterSelect"
                                                    @search:blur="onBlurMasterSelect"
                                                >
                                                    <span slot="no-options">Совпадений не найдено</span>
                                                </vSelect>
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div v-if="errorAddLogin" class="alert alert-danger alert-dismissible fade show" role="alert">
                                <span class="alert-danger-message ">Учетная запись с таким логином уже существует</span>
                                <button type="button" @click="closeWarning" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div v-if="errorAddEmail" class="alert alert-danger alert-dismissible fade show" role="alert">
                                <span class="alert-danger-message ">Учетная запись с таким email уже существует</span>
                                <button type="button" @click="closeWarning" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" form="form-add-user" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-user" tabindex="-1" role="dialog" aria-labelledby="modal-delete-user-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-user-label">Удаление учетной записи</h5>
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
    import {actionTypes as userActionTypes} from "@/store/modules/user";
    import {actionTypes as roleActionTypes} from '@/store/modules/role';
    import {actionTypes as adminActionTypes} from '@/store/modules/admin';
    import {actionTypes as managerActionTypes} from '@/store/modules/manager';
    import {actionTypes as masterActionTypes} from '@/store/modules/master';
    import {mapGetters, mapState} from "vuex";
    import {ValidationProvider, extend} from "vee-validate";
    import $ from "jquery";
    import {required} from "vee-validate/dist/rules";
    import vSelect from 'vue-select';

    extend('required', {
        ...required,
        message: 'Обязательное поле'
    });

    export default {
        name: 'users',
        model: {
            prop: 'value',
            event: 'input'
        },
        components: {
            Header,
            LeftMenu,
            Loader,
            ValidationProvider,
            vSelect
        },
        data() {
            return {
                initialPage: null,
                removingId: null,
                errorAddLogin: false,
                errorAddEmail: false,
                errorDelete: false,
                addUserLogin: '',
                addUserEmail: '',
                addUserPassword: '',
                addUserRoleId: '',
                addUserRoleName: '',
                addUserAdminId: '',
                addUserAdminFio: '',
                addUserManagerId: '',
                addUserManagerFio: '',
                addUserMasterId: '',
                addUserMasterFio: ''
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.user.isLoading,
                error: state => state.user.error,
                users: state => state.user.data,
                roles: state => state.role.data,
                admins: state => state.admin.data,
                managers: state => state.manager.data,
                masters: state => state.master.data,
                limit: state => state.user.limit,
                pagesCount: state => Math.ceil(state.user.usersCount / state.user.limit)
            }),
            ...mapGetters(["getUserById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            },
            // need for correct vue-select validation
            computedFormAddUser() {
                return this.$refs.formAddUser;
            },
            adminRoleSelected: function() {
                return this.addUserRoleId === 'a2d062b9-14b6-407a-98c4-225fa98d8141';
            },
            managerRoleSelected: function() {
                return this.addUserRoleId === '436635e5-a097-450c-9564-3e5b3532d27f';
            },
            masterRoleSelected: function() {
                return this.addUserRoleId === '9b753566-5e21-4f1c-b879-60b2cd12da26';
            },
            // select options for vue-select
            rolesSelectOptions: function() {
                let rolesArray = [];
                for (let role of this.roles) {
                    let roleObject = {
                        id: role.id,
                        name: this.translateRoleName(role.name)
                    }
                    rolesArray.push(roleObject);
                }
                return rolesArray;
            },
            // select options for vue-select
            adminsSelectOptions: function() {
                let adminsArray = [];
                for (let admin of this.admins) {
                    let adminObject = {
                        id: admin.id,
                        fio: admin.fio
                    }
                    adminsArray.push(adminObject);
                }
                return adminsArray;
            },
            // select options for vue-select
            managersSelectOptions: function() {
                let managersArray = [];
                for (let manager of this.managers) {
                    let managerObject = {
                        id: manager.id,
                        fio: manager.fio
                    }
                    managersArray.push(managerObject);
                }
                return managersArray;
            },
            // select options for vue-select
            mastersSelectOptions: function() {
                let mastersArray = [];
                for (let master of this.masters) {
                    let masterObject = {
                        id: master.id,
                        fio: master.fio
                    }
                    mastersArray.push(masterObject);
                }
                return mastersArray;
            },
        },
        methods: {
            fillUsers() {
                this.$store.dispatch(userActionTypes.getUsers, {offset: this.offset});
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'AdminUsers', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillUsers();
            },
            // translate eng role names to russian
            translateRoleName(role) {
                switch (role) {
                    case "admin":
                        return "Администратор";
                    case "manager":
                        return "Менеджер";
                    case "master":
                        return "Мастер";
                    default:
                        return "";
                }
            },
            // show user full name depending on role
            getProfileFio(user) {
                switch (user.role.name) {
                    case "admin":
                        return user.admin.fio;
                    case "manager":
                        return user.manager.fio;
                    case "master":
                        return user.master.fio;
                }
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(userActionTypes.deleteUser, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillUsers();
                    $('#modal-delete-user').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-user').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            handleAddUser() {
                let formData = {
                    login: this.addUserLogin,
                    email: this.addUserEmail,
                    password: this.addUserPassword,
                    role_id: this.addUserRoleId,
                    admin_id: this.addUserAdminId,
                    manager_id: this.addUserManagerId,
                    master_id: this.addUserMasterId
                }
                // console.log(formData);
                this.$store.dispatch(userActionTypes.addUser, {
                    formData
                })
                .then(() => {
                    // clear fields
                    this.addUserLogin = ''; this.addUserEmail = ''; this.addUserPassword = '';
                    this.addUserRoleName = ''; this.addUserRoleId = '';
                    this.addUserAdminId = ''; this.addUserManagerId = ''; this.addUserMasterId = '';
                    this.addUserAdminFio = ''; this.addUserManagerFio = ''; this.addUserMasterFio = '';
                    // to clear validation errors
                    this.$refs.formAddUser.reset();
                    this.fillUsers();
                    $('#modal-add-user').modal('hide');
                })
                .catch((error) => {
                    if (error.code == "102") {
                        this.errorAddLogin = true;
                    } else if (error.code == "103") {
                        this.errorAddEmail = true;
                    }
                })
            },
            closeWarning() {
                this.errorAddLogin = false;
                this.errorAddEmail = false;
            },
            onChangeRoleSelect:function(value){
                this.addUserRoleId = value.id;
                this.addUserAdminId = ''; this.addUserManagerId = ''; this.addUserMasterId = '';
                this.addUserAdminFio = ''; this.addUserManagerFio = ''; this.addUserMasterFio = '';
            },
            onChangeAdminSelect: function(value) {
                this.addUserAdminId = value.id;
            },
            onChangeManagerSelect: function(value) {
                this.addUserManagerId = value.id;
            },
            onChangeMasterSelect: function(value) {
                this.addUserMasterId = value.id;
            },
            // need for correct vue-select validation
            onBlurRoleSelect() {
                this.computedFormAddUser.refs.role_id.validate();
            },
            // need for correct vue-select validation
            onBlurAdminSelect() {
                this.computedFormAddUser.refs.admin_id.validate();
            },
            // need for correct vue-select validation
            onBlurManagerSelect() {
                this.computedFormAddUser.refs.manager_id.validate();
            },
            // need for correct vue-select validation
            onBlurMasterSelect() {
                this.computedFormAddUser.refs.master_id.validate();
            },
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillUsers();
            this.$store.dispatch(userActionTypes.getUsersCount);
            this.$store.dispatch(roleActionTypes.getAllRoles);
            this.$store.dispatch(adminActionTypes.getAllAdmins);
            this.$store.dispatch(managerActionTypes.getAllManagers);
            this.$store.dispatch(masterActionTypes.getAllMasters);
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

<style lang="scss">
    @import "vue-select/src/scss/vue-select.scss";
</style>
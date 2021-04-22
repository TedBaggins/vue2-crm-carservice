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
                                                <button class="btn-base-sm btn-blue" @click="handleEdit(user.id)">
                                                    <i class="bi bi-pen"></i>
                                                </button>
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
    import {mapGetters, mapState} from "vuex";
    import $ from "jquery";

    export default {
        name: 'users',
        components: {
            Header,
            LeftMenu,
            Loader,
        },
        data() {
            return {
                initialPage: null,
                removingId: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.user.isLoading,
                error: state => state.user.error,
                users: state => state.user.data,
                limit: state => state.user.limit,
                pagesCount: state => Math.ceil(state.user.usersCount / state.user.limit)
            }),
            ...mapGetters(["getUserById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillUsers() {
                this.$store.dispatch(userActionTypes.getUsers, {offset: this.offset});
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
            },
            handleEdit(id) {
                console.log(id);
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'AdminUsers', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillUsers();
            },
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
            getProfileFio(user) {
                switch (user.role.name) {
                    case "admin":
                        return user.admin.fio;
                    case "manager":
                        return user.manager.fio;
                    case "master":
                        return user.master.fio;
                }
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillUsers();
            this.$store.dispatch(userActionTypes.getUsersCount);
        }
    }
</script>
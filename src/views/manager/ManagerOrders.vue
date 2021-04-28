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
                            <div v-if="orders" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Заказы</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-order">Добавить</button>
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
                                            <th scope="col">Номер заказа</th>
                                            <th scope="col">Клиент</th>
                                            <th scope="col">Статус</th>
                                            <th scope="col">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(order) in orders" :key="order.id">
                                            <td><router-link v-if="orders" :to="{name: 'ManagerOrder', params: { orderid: order.id }}">{{order.number}}</router-link></td>
                                            <td>{{order.client.fio}}</td>
                                            <td :class="getCssClassForStatus(order.orderstatus.name)">{{translateStatusName(order.orderstatus.name)}}</td>
                                            <td class="table-buttons-box">
                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-order" @click="handleRemove(order.id)">
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

        <div class="modal fade" id="modal-add-order" tabindex="-1" role="dialog" aria-labelledby="modal-add-order-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddOrder">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-order-label">Создание заказа</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-order-form-box">
                                <form @submit.prevent="handleSubmit(handleAddOrder)" id="form-add-order">
                                    <div class="form-group row">
                                        <label for="form-add-order-clientid" class="col-sm-4">Клиент</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="client_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="clients"
                                                    v-model="addOrderClientFio"
                                                    :options="clientsSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-order-clientid"
                                                    label="fio"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeClientSelect"
                                                    @search:blur="onBlurClientSelect"
                                                >
                                                    <span slot="no-options">Совпадений не найдено</span>
                                                </vSelect>
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div v-if="clientSelected" class="form-group row">
                                        <label for="form-add-order-carid" class="col-sm-4">Автомобиль</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="car_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="cars"
                                                    v-model="addOrderCarMark"
                                                    :options="carsSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-order-carid"
                                                    label="mark"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeCarSelect"
                                                    @search:blur="onBlurCarSelect"
                                                >
                                                    <span slot="no-options">Совпадений не найдено</span>
                                                </vSelect>
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" form="form-add-order" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-order" tabindex="-1" role="dialog" aria-labelledby="modal-delete-order-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-order-label">Удаление заказа</h5>
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
    import {mapGetters, mapState} from "vuex";
    import {actionTypes as orderActionTypes} from "@/store/modules/order";
    import {actionTypes as clientActionTypes} from "@/store/modules/client";
    import {actionTypes as carActionTypes} from "@/store/modules/car";
    import {ValidationProvider, extend} from "vee-validate";
    import $ from "jquery";
    import vSelect from 'vue-select';
    import {required} from "vee-validate/dist/rules";
    import {translateStatusName, getCssClassForStatus} from "@/helpers/common";

    extend('required', {
        ...required,
        message: 'Обязательное поле'
    });

    export default {
        name: 'orders',
        components: {
            Header,
            LeftMenu,
            Loader,
            ValidationProvider,
            vSelect
        },
        data() {
            return {
                errorDelete: false,
                addOrderClientId: '',
                addOrderClientFio: '',
                addOrderCarId: '',
                addOrderCarMark: '',
                selectedOrder: null,
                initialPage: null,
                removingId: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.order.isLoading,
                error: state => state.order.error,
                orders: state => state.order.data,
                clients: state => state.client.data,
                cars: state => state.car.data,
                profile: state => state.auth.user.profile,
                limit: state => state.order.limit,
                pagesCount: state => Math.ceil(state.order.ordersCount / state.order.limit)
            }),
            ...mapGetters(["getOrderById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            },
            // need for correct vue-select validation
            computedFormAddOrder() {
                return this.$refs.formAddOrder;
            },
            clientSelected: function() {
                return this.addOrderClientId !== '';
            },
            // select options for vue-select
            clientsSelectOptions: function() {
                let clientsArray = [];
                for (let client of this.clients) {
                    let clientObject = {
                        id: client.id,
                        fio: client.fio
                    }
                    clientsArray.push(clientObject);
                }
                return clientsArray;
            },
            // select options for vue-select
            carsSelectOptions: function() {
                let carsArray = [];
                for (let car of this.cars) {
                    let carObject = {
                        id: car.id,
                        mark: `${car.mark} ${car.number}`
                    }
                    carsArray.push(carObject);
                }
                return carsArray;
            },
        },
        methods: {
            fillOrders() {
                this.$store.dispatch(orderActionTypes.getOrders, {offset: this.offset});
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'ManagerOrders', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillOrders();
            },
            translateStatusName: translateStatusName,
            getCssClassForStatus: getCssClassForStatus,
            handleAddOrder() {
                let formData = {
                    client_id: this.addOrderClientId,
                    car_id: this.addOrderCarId,
                    manager_id: this.profile.id
                }
                this.$store.dispatch(orderActionTypes.addOrder, {
                    formData
                })
                .then(() => {
                    // clear fields
                    this.addOrderClientId = ''; this.addOrderClientFio = '';
                    this.addOrderCarId = ''; this.addOrderCarMark = '';
                    // to clear validation errors
                    this.$refs.formAddOrder.reset();
                    this.fillOrders();
                    $('#modal-add-order').modal('hide');
                })
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(orderActionTypes.deleteOrder, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillOrders();
                    $('#modal-delete-order').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-order').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            onChangeClientSelect:function(value){
                this.addOrderClientId = value.id;
                this.addOrderCarId = ''; this.addOrderCarMark = '';
                this.$store.dispatch(carActionTypes.getClientCars, {clientId: this.addOrderClientId});
            },
            onChangeCarSelect: function(value) {
                this.addOrderCarId = value.id;
            },
            // need for correct vue-select validation
            onBlurClientSelect() {
                this.computedFormAddOrder.refs.client_id.validate();
            },
            // need for correct vue-select validation
            onBlurCarSelect() {
                this.computedFormAddOrder.refs.car_id.validate();
            },
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillOrders();
            this.$store.dispatch(orderActionTypes.getOrdersCount);
            this.$store.dispatch(clientActionTypes.getAllClients);
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

<style lang="scss">
    @import "vue-select/src/scss/vue-select.scss";
</style>
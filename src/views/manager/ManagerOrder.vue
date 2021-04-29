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
                            <div v-if="order" class="content-box box-transparent">
                                <div class="order-actions-box">
                                    <div class="order-actions-title-box">
                                        Действия
                                    </div>
                                    <div class="order-actions-buttons-box">
                                        <button @click="submitOrder" :disabled="!canOrderBeSubmitted" class="btn-base-sm btn-blue">Подтвердить</button>
                                        <button @click="closeOrder" :disabled="!canOrderBeClosed" class="btn-base-sm btn-blue">Завершить</button>
                                        <button @click="cancelOrder" :disabled="!canOrderBeCanceled" class="btn-base-sm btn-orange">Отменить</button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="order" class="content-box box-transparent">
                                <div class="order-info-title-box">
                                    Информация о заказе
                                </div>
                                <hr>
                                <div class="order-info-data-box">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row order-info-data-row">
                                                <div class="col-md-3">Id:</div>
                                                <div class="col-md-9 order-info-data-value">{{order.id}}</div>
                                            </div>
                                            <div class="row order-info-data-row">
                                                <div class="col-md-3">Номер заказа:</div>
                                                <div class="col-md-9 order-info-data-value">{{order.number}}</div>
                                            </div>
                                            <div class="row order-info-data-row">
                                                <div class="col-md-3">Дата создания:</div>
                                                <div class="col-md-9 order-info-data-value">{{createdDate}}</div>
                                            </div>
                                            <div v-if="closedDate" class="row order-info-data-row">
                                                <div class="col-md-3">Дата закрытия:</div>
                                                <div class="col-md-9 order-info-data-value">{{closedDate}}</div>
                                            </div>
                                            <div v-if="order.client" class="row order-info-data-row">
                                                <div class="col-md-3">Клиент:</div>
                                                <div class="col-md-9 order-info-data-value"><router-link v-if="order.client" :to="{name: 'ManagerClient', params: { clientid: order.client.id }}">{{order.client.fio}} <i class="bi bi-file-earmark-arrow-up"></i></router-link></div>
                                            </div>
                                            <div v-if="order.car" class="row order-info-data-row">
                                                <div class="col-md-3">Автомобиль:</div>
                                                <div class="col-md-9 order-info-data-value">{{`${order.car.mark} ${order.car.model}, ${order.car.number}`}}</div>
                                            </div>
                                            <div v-if="order.manager" class="row order-info-data-row">
                                                <div class="col-md-3">Менеджер оформления:</div>
                                                <div class="col-md-9 order-info-data-value">{{order.manager.fio}}</div>
                                            </div>
                                            <div v-if="order.master" class="row order-info-data-row">
                                                <div class="col-md-3">Мастер:</div>
                                                <div class="col-md-9 order-info-data-value">{{order.master.fio}}</div>
                                            </div>
                                            <div v-if="order.orderstatus" class="row order-info-data-row">
                                                <div class="col-md-3">Статус:</div>
                                                <div class="col-md-9 order-info-data-value" :class="getCssClassForStatus(order.orderstatus.name)">{{translateStatusName(order.orderstatus.name)}}</div>
                                            </div>
                                            <hr>
                                            <div class="row order-info-data-row">
                                                <div class="col-md-3">Сумма заказа:</div>
                                                <div class="col-md-9 order-info-data-value">{{order.sum}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="order" class="content-box box-transparent">
                                <div class="order-services-box">
                                    <div class="order-services-title-box">
                                        <span>Услуги по заказу</span>
                                        <button :disabled="isOrderClosedOrCanceled" class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-order-service">Добавить</button>
                                    </div>
                                    <hr>

                                    <div v-if="errorDeleteOrderService" class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Ошибка!</strong> При удалении возникли неполадки...
                                        <button type="button" @click="closeWarningDelete" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div v-if="order.services" class="order-services-info-box">
                                        <div v-for="service in order.services" :key="service.id" class="order-service-info-data-box">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row order-service-info-data-row">
                                                        <div class="col-md-3">Наименование:</div>
                                                        <div class="col-md-6 order-service-info-data-value">{{service.name}}</div>
                                                        <div class="col-md-3">
                                                            <div class="order-service-info-buttons-box">
                                                                <button :disabled="isOrderClosedOrCanceled" class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-order-service" @click="handleRemoveOrderService(service.ordersservices.id)">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row order-service-info-data-row">
                                                        <div class="col-md-3">Цена:</div>
                                                        <div class="col-md-9 order-service-info-data-value">{{service.price}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!order.services.length">
                                        Данных не найдено
                                    </div>
                                </div>
                            </div>

                            <div v-if="order" class="content-box box-transparent">
                                <div v-if="order.orderreports" class="order-reports-box">
                                    <div class="order-reports-title-box">
                                        <span>Отчеты мастера</span>
                                    </div>
                                    <hr>

                                    <div v-if="order.orderreports" class="order-reports-info-box">
                                        <div v-for="report in order.orderreports" :key="report.id" class="order-report-info-data-box">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row order-report-info-data-row">
                                                        <div class="col-md-3">Содержание:</div>
                                                        <div class="col-md-9 order-report-info-data-value">{{report.description}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-add-order-service" tabindex="-1" role="dialog" aria-labelledby="modal-add-order-service-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddOrderService">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-order-service-label">Добавление услуги в заказ</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-order-service-form-box">
                                <form @submit.prevent="handleSubmit(handleAddOrderService)" id="form-add-order-service">
                                    <div class="form-group row">
                                        <label for="form-add-order-service-serviceid" class="col-sm-3">Услуга</label>
                                        <div class="col-sm-9">
                                            <validation-provider name="service_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="services"
                                                    v-model="addOrderServiceName"
                                                    :options="servicesSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-order-service-serviceid"
                                                    label="name"
                                                    placeholder="Выберите"
                                                    class="vue-select"
                                                    @input="onChangeServiceSelect"
                                                    @search:blur="onBlurServiceSelect"
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
                            <button type="submit" form="form-add-order-service" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-order-service" tabindex="-1" role="dialog" aria-labelledby="modal-delete-order-service-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-order-service-label">Удаление услуги из заказа</h5>
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
                        <button type="submit" class="btn-base-sm btn-orange" @click="confirmRemoveOrderService">Ок</button>
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
    import {actionTypes as serviceActionTypes} from "@/store/modules/service";
    import {actionTypes as orderServiceActionTypes} from "@/store/modules/orderservice";
    import {actionTypes as statusActionTypes} from "@/store/modules/status";
    import {translateStatusName, getCssClassForStatus} from "@/helpers/common";
    import {ValidationProvider, extend} from "vee-validate";
    import vSelect from 'vue-select';
    import moment from "moment";
    import {required} from "vee-validate/dist/rules";
    import $ from "jquery";

    extend('required', {
        ...required,
        message: 'Обязательное поле'
    });

    export default {
        name: 'order',
        components: {
            Header,
            LeftMenu,
            Loader,
            ValidationProvider,
            vSelect
        },
        data() {
            return {
                errorDeleteOrderService: false,
                orderId: null,
                addOrderServiceId: '',
                addOrderServiceName: '',
                removingOrderServiceId: null,
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.order.isLoading,
                error: state => state.order.error,
                order: state => state.order.selectedOrder,
                services: state => state.service.data,
                statuses: state => state.status.data,
            }),
            ...mapGetters(["getStatusByName"]),
            createdDate: function() {
                let created = new Date(Number(this.order.created_at));
                return moment(created).locale("ru").format('LLL');
            },
            closedDate: function() {
                if(this.order.closed_at) {
                    let closed = new Date(Number(this.order.closed_at));
                    return moment(closed).locale("ru").format('LLL');
                }
                return null;
            },
            // need for correct vue-select validation
            computedFormAddOrderService() {
                return this.$refs.formAddOrderService;
            },
            serviceSelected: function() {
                return this.addOrderServiceId !== '';
            },
            // select options for vue-select
            servicesSelectOptions: function() {
                let servicesArray = [];
                for (let service of this.services) {
                    let serviceObject = {
                        id: service.id,
                        name: service.name
                    }
                    servicesArray.push(serviceObject);
                }
                return servicesArray;
            },
            canOrderBeSubmitted: function(){
                return this.order.orderstatus.name === "created";
            },
            canOrderBeClosed: function(){
                return this.order.orderstatus.name === "completed";
            },
            canOrderBeCanceled: function() {
                return this.order.orderstatus.name !== "closed";
            },
            isOrderClosedOrCanceled: function() {
                return this.order.orderstatus.name === "closed" || this.order.orderstatus.name === "canceled";
            },
        },
        methods: {
            fillOrder() {
                this.$store.dispatch(orderActionTypes.getOrderById, {orderId: this.orderId});
            },
            translateStatusName: translateStatusName,
            getCssClassForStatus: getCssClassForStatus,
            submitOrder: function() {
                let id = this.orderId;
                let status = this.getStatusByName('submitted for execution')[0];
                let formData = {
                    status_id: status.id
                }
                this.$store.dispatch(orderActionTypes.changeOrderStatus, {
                    id,
                    formData
                })
                .then(() => {
                    this.fillOrder();
                })
            },
            closeOrder: function() {
                let id = this.orderId;
                let status = this.getStatusByName('closed')[0];
                let formData = {
                    status_id: status.id
                }
                this.$store.dispatch(orderActionTypes.changeOrderStatus, {
                    id,
                    formData
                })
                .then(() => {
                    this.fillOrder();
                })
            },
            cancelOrder: function() {
                let id = this.orderId;
                let status = this.getStatusByName('canceled')[0];
                let formData = {
                    status_id: status.id
                }
                this.$store.dispatch(orderActionTypes.changeOrderStatus, {
                    id,
                    formData
                })
                .then(() => {
                    this.fillOrder();
                })
            },
            closeWarningDelete: function () {
                this.errorDeleteOrderService = false;
            },
            handleAddOrderService() {
                let formData = {
                    order_id: this.orderId,
                    service_id: this.addOrderServiceId,
                }
                this.$store.dispatch(orderServiceActionTypes.addOrderService, {
                    formData
                })
                .then(() => {
                    // clear fields
                    this.addOrderServiceId = ''; this.addOrderServiceName = '';
                    // to clear validation errors
                    this.$refs.formAddOrderService.reset();
                    this.fillOrder();
                    $('#modal-add-order-service').modal('hide');
                })
            },
            handleRemoveOrderService(id) {
                this.removingOrderServiceId = id;
            },
            confirmRemoveOrderService() {
                this.$store.dispatch(orderServiceActionTypes.deleteOrderService, {
                    id: this.removingOrderServiceId
                })
                .then(() => {
                    this.fillOrder();
                    $('#modal-delete-order-service').modal('hide');
                })
                .catch(() => {
                    this.errorDeleteOrderService = true;
                    $('#modal-delete-order-service').modal('hide');
                })
            },
            onChangeServiceSelect:function(value){
                this.addOrderServiceId = value.id;
            },
            // need for correct vue-select validation
            onBlurServiceSelect() {
                this.computedFormAddOrderService.refs.service_id.validate();
            },
        },
        mounted() {
            this.orderId = this.$route.params.orderid;
            this.fillOrder();
            this.$store.dispatch(serviceActionTypes.getAllServices);
            this.$store.dispatch(statusActionTypes.getAllStatuses);
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

<style>
    .order-actions-box {
        display: flex;
        justify-content: space-between;
    }
    .order-actions-buttons-box button:not(:first-child) {
        margin-left: 5px;
    }

    .order-info-title-box,
    .order-services-title-box,
    .order-reports-title-box {
        margin-bottom: 20px;
        padding-top: 5px;
    }
    .order-info-data-row,
    .order-service-info-data-row:not(:first-child),
    .order-report-info-data-row:not(:first-child) {
        margin-bottom: 10px;
    }
    .order-info-data-row a {
        color: #bcecec;
        transition: 0.2s;
    }
    .order-info-data-row a:hover {
        color: #fff;
        text-decoration: none;
    }
    .order-info-data-value,
    .order-service-info-data-value,
    .order-report-info-data-value {
        color: #bcecec;
    }
    .order-service-info-buttons-box {
        float: right;
    }
    .order-service-info-buttons-box button:nth-child(2) {
        margin-left: 3px;
        margin-right: 4px;
    }
    .order-service-info-data-box:not(:last-child),
    .order-report-info-data-box:not(:last-child) {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #5c5e60;
    }
</style>

<style lang="scss">
    @import "vue-select/src/scss/vue-select.scss";
</style>
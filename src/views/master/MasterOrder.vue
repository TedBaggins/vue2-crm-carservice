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
                                        <button @click="takeOrder" :disabled="!canOrderBeTaken" class="btn-base-sm btn-blue">Принять</button>
                                        <button @click="completeOrder" :disabled="!canOrderBeCompleted" class="btn-base-sm btn-blue">Завершить</button>
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
                                    </div>
                                    <hr>

                                    <div v-if="order.services" class="order-services-info-box">
                                        <div v-for="service in order.services" :key="service.id" class="order-service-info-data-box">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row order-service-info-data-row">
                                                        <div class="col-md-3">Наименование:</div>
                                                        <div class="col-md-9 order-service-info-data-value">{{service.name}}</div>
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
                                        <button :disabled="!isOrderTakenOrCompleted" class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-report">Добавить</button>
                                    </div>
                                    <hr>

                                    <div v-if="errorDeleteReport" class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Ошибка!</strong> При удалении возникли неполадки...
                                        <button type="button" @click="closeWarningDelete" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div v-if="order.orderreports" class="order-reports-info-box">
                                        <div v-for="report in order.orderreports" :key="report.id" class="order-report-info-data-box">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row order-report-info-data-row">
                                                        <div class="col-md-3">Содержание:</div>
                                                        <div class="col-md-6 order-report-info-data-value">{{report.description}}</div>
                                                        <div class="col-md-3">
                                                            <div class="order-report-info-buttons-box">
                                                                <button :disabled="isOrderClosedOrCanceled" class="btn-base-sm btn-blue" @click="handleEdit(report.id)">
                                                                    <i class="bi bi-pen"></i>
                                                                </button>
                                                                <button :disabled="isOrderClosedOrCanceled" class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-report" @click="handleRemoveReport(report.id)">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
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
            </div>
        </div>

        <div class="modal fade" id="modal-add-report" tabindex="-1" role="dialog" aria-labelledby="modal-add-report-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddReport">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-report-label">Добавление отчета</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-report-form-box">
                                <form @submit.prevent="handleSubmit(handleAddReport)" id="form-add-report">

                                    <div class="form-group row">
                                        <label for="form-add-report-description" class="col-sm-4 col-form-label">Содержание</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addReportDescription"
                                                       id="form-add-report-description"
                                                       class="form-control"
                                                       name="description"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-add-report" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-report" tabindex="-1" role="dialog" aria-labelledby="modal-edit-report-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditReport">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-report-label">Редактирование отчета</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-report-form-box">
                                <form @submit.prevent="handleSubmit(handleEditReport)" id="form-edit-report">

                                    <div class="form-group row">
                                        <label for="form-edit-report-description" class="col-sm-4 col-form-label">Содержание</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editReportDescription"
                                                       id="form-edit-report-description"
                                                       class="form-control"
                                                       name="description"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-edit-report" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-report" tabindex="-1" role="dialog" aria-labelledby="modal-delete-report-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-report-label">Удаление отчета</h5>
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
                        <button type="submit" class="btn-base-sm btn-orange" @click="confirmRemoveReport">Ок</button>
                        <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import LeftMenu from '@/components/MasterLeftMenu';
    import Loader from '@/components/Loader';
    import {mapGetters, mapState} from "vuex";
    import {actionTypes as orderActionTypes} from "@/store/modules/order";
    import {actionTypes as statusActionTypes} from "@/store/modules/status";
    import {actionTypes as reportActionTypes} from "@/store/modules/report";
    import {translateStatusName, getCssClassForStatus} from "@/helpers/common";
    import {ValidationProvider, extend} from "vee-validate";
    import {required} from "vee-validate/dist/rules";
    import $ from "jquery";
    import moment from "moment";

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
        },
        data() {
            return {
                errorDeleteReport: false,
                orderId: null,
                addReportDescription: '',
                editReportDescription: '',
                removingReportId: null,
                selectedReport: null
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.order.isLoading,
                error: state => state.order.error,
                order: state => state.order.selectedOrder,
                statuses: state => state.status.data,
                reports: state => state.report.data,
                profile: state => state.auth.user.profile,
            }),
            ...mapGetters(["getOrderReportById", "getStatusByName"]),
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
            canOrderBeTaken: function(){
                return this.order.orderstatus.name === "submitted for execution";
            },
            canOrderBeCompleted: function(){
                return this.order.orderstatus.name === "on execution";
            },
            isOrderClosedOrCanceled: function() {
                return this.order.orderstatus.name === "closed" || this.order.orderstatus.name === "canceled";
            },
            isOrderTakenOrCompleted: function () {
                return this.order.orderstatus.name === "on execution" || this.order.orderstatus.name === "completed";
            }
        },
        methods: {
            fillOrder() {
                this.$store.dispatch(orderActionTypes.getOrderById, {orderId: this.orderId});
            },
            translateStatusName: translateStatusName,
            getCssClassForStatus: getCssClassForStatus,
            takeOrder: function() {
                let id = this.orderId;
                let status = this.getStatusByName('on execution')[0];
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
            completeOrder: function() {
                let id = this.orderId;
                let status = this.getStatusByName('completed')[0];
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
                this.errorDeleteReport = false;
            },
            handleAddReport() {
                let formData = {
                    description: this.addReportDescription,
                    order_id: this.orderId,
                    master_id: this.profile.id
                }
                this.$store.dispatch(reportActionTypes.addReport, {
                    formData
                })
                .then(() => {
                    // clear fields
                    this.addReportDescription = '';
                    // to clear validation errors
                    this.$refs.formAddReport.reset();
                    this.fillOrder();
                    $('#modal-add-report').modal('hide');
                })
            },
            handleEdit(id) {
                this.selectedReport = this.getOrderReportById(id)[0];
                this.editReportDescription = this.selectedReport.description;
                $('#modal-edit-report').modal();
            },
            handleEditReport() {
                let id = this.selectedReport.id;
                let formData = {
                    description: this.editReportDescription,
                    master_id: this.profile.id,
                }
                this.$store.dispatch(reportActionTypes.editReport, {
                    id,
                    formData
                })
                .then(() => {
                    this.editReportDescription = '';
                    this.$refs.formEditReport.reset();
                    this.fillOrder();
                    $('#modal-edit-report').modal('hide');
                })
            },
            handleRemoveReport(id) {
                this.removingReportId = id;
            },
            confirmRemoveReport() {
                this.$store.dispatch(reportActionTypes.deleteReport, {
                    id: this.removingReportId
                })
                .then(() => {
                    this.fillOrder();
                    $('#modal-delete-report').modal('hide');
                })
                .catch(() => {
                    this.errorDeleteReport = true;
                    $('#modal-delete-report').modal('hide');
                })
            },
        },
        mounted() {
            this.orderId = this.$route.params.orderid;
            this.fillOrder();
            this.$store.dispatch(statusActionTypes.getAllStatuses);
        },
        created() {
            switch (this.$store.state.auth.user.role) {
                case "admin":
                    this.$router.push({name: 'Admin'});
                    break;
                case "manager":
                    this.$router.push({name: 'Manager'});
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
    .order-reports-title-box{
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
    .order-service-info-data-box:not(:last-child),
    .order-report-info-data-box:not(:last-child) {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #5c5e60;
    }
    .order-report-info-buttons-box {
        float: right;
    }
    .order-report-info-buttons-box button:nth-child(2) {
        margin-left: 3px;
        margin-right: 4px;
    }
</style>
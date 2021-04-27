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
</template>

<script>
    import Header from '@/components/Header';
    import LeftMenu from '@/components/ManagerLeftMenu';
    import Loader from '@/components/Loader';
    import {mapState} from "vuex";
    import {actionTypes as orderActionTypes} from "@/store/modules/order";
    import {translateStatusName, getCssClassForStatus} from "@/helpers/common";
    import moment from "moment";

    export default {
        name: 'order',
        components: {
            Header,
            LeftMenu,
            Loader,
        },
        data() {
            return {
                errorDelete: false,
                orderId: null,
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.order.isLoading,
                error: state => state.order.error,
                order: state => state.order.selectedOrder,
            }),
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
            }
        },
        methods: {
            fillOrder() {
                this.$store.dispatch(orderActionTypes.getOrderById, {orderId: this.orderId});
            },
            translateStatusName: translateStatusName,
            getCssClassForStatus: getCssClassForStatus,
        },
        mounted() {
            this.orderId = this.$route.params.orderid;
            this.fillOrder();
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
    .order-info-title-box,
    .order-services-title-box {
        margin-bottom: 20px;
        padding-top: 5px;
    }
    .order-info-data-row,
    .order-service-info-data-row:not(:first-child) {
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
    .order-service-info-data-value {
        color: #bcecec;
    }
    .order-service-info-buttons-box {
        float: right;
    }
    .order-service-info-buttons-box button:nth-child(2) {
        margin-left: 3px;
        margin-right: 4px;
    }
    .order-service-info-data-box:not(:last-child) {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #5c5e60;
    }
</style>
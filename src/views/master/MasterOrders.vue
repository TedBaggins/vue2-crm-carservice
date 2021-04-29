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
                                <div class="orders-filter-box">
                                    <div class="orders-filter-title-box">
                                        Фильтр поиска
                                    </div>
                                    <div class="orders-filter-radio-box">
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" v-model="ordersStatusFilter" @change="changeOrdersStatusFilter" value="submitted" id="radio-orders-filter-submitted" name="radio-orders-filter" class="custom-control-input">
                                            <label class="custom-control-label" for="radio-orders-filter-submitted">Все</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" v-model="ordersStatusFilter" @change="changeOrdersStatusFilter" value="new" id="radio-orders-filter-new" name="radio-orders-filter" class="custom-control-input">
                                            <label class="custom-control-label" for="radio-orders-filter-new">Новые</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" v-model="ordersStatusFilter" @change="changeOrdersStatusFilter" value="ongoing" id="radio-orders-filter-ongoing" name="radio-orders-filter" class="custom-control-input">
                                            <label class="custom-control-label" for="radio-orders-filter-ongoing">На выполнении</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="orders" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Заказы</span>
                                </div>

                                <div class="table-box">
                                    <table class="table table-dark table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">Номер заказа</th>
                                            <th scope="col">Клиент</th>
                                            <th scope="col">Статус</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(order) in orders" :key="order.id">
                                            <td><router-link v-if="orders" :to="{name: 'MasterOrder', params: { orderid: order.id }}">{{order.number}}</router-link></td>
                                            <td>{{order.client.fio}}</td>
                                            <td :class="getCssClassForStatus(order.orderstatus.name)">{{translateStatusName(order.orderstatus.name)}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div v-if="pagesCount" class="table-paginator-box">
                                    <paginate
                                            v-model="initialPage"
                                            ref="paginate"
                                            :page-count="pagesCount"
                                            :click-handler="handlePage"
                                            :prev-text="'Пред.'"
                                            :next-text="'След.'"
                                            :container-class="'paginator-ul'"
                                            :key="initialPage"
                                            :page-class="'page-item'">
                                    </paginate>
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
    import LeftMenu from '@/components/MasterLeftMenu';
    import Loader from '@/components/Loader';
    import {mapState} from "vuex";
    import {actionTypes as orderActionTypes} from "@/store/modules/order";
    import {translateStatusName, getCssClassForStatus} from "@/helpers/common";

    export default {
        name: 'orders',
        components: {
            Header,
            LeftMenu,
            Loader,
        },
        data() {
            return {
                initialPage: null,
                ordersStatusFilter: "submitted",
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.order.isLoading,
                error: state => state.order.error,
                orders: state => state.order.data,
                limit: state => state.order.limit,
                pagesCount: state => Math.ceil(state.order.ordersCount / state.order.limit)
            }),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            },
        },
        methods: {
            fillOrders() {
                this.$store.dispatch(orderActionTypes.getSubmittedOrders, {offset: this.offset, status: this.ordersStatusFilter});
            },
            handlePage(pageNum) {
                if (this.ordersStatusFilter === "submitted") {
                    this.$router.push({ name: 'MasterOrders', query: { page: pageNum }});
                } else {
                    this.$router.push({ name: 'MasterOrders', query: { page: pageNum, status: this.ordersStatusFilter }});
                }
                this.initialPage = pageNum;
                this.fillOrders();
            },
            translateStatusName: translateStatusName,
            getCssClassForStatus: getCssClassForStatus,
            changeOrdersStatusFilter() {
                this.initialPage = 1;
                if (this.ordersStatusFilter !== "submitted") {
                    this.$router.push({ name: 'MasterOrders', query: { page: "1", status: this.ordersStatusFilter }});
                } else {
                    this.$router.push({ name: 'MasterOrders', query: { page: "1"}});
                }
                this.fillOrders();
                this.$store.dispatch(orderActionTypes.getSubmittedOrdersCount, {status: this.ordersStatusFilter});
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            if(this.$route.query.status) {
                this.ordersStatusFilter = this.$route.query.status;
            }
            this.fillOrders();
            this.$store.dispatch(orderActionTypes.getSubmittedOrdersCount, {status: this.ordersStatusFilter});
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
    .orders-filter-box {
        display: flex;
        justify-content: space-between;
    }
    .orders-filter-radio-box {
        margin-left: 30px;
    }
    .orders-filter-radio-box .custom-control-input:checked~.custom-control-label::before {
        color: #fff;
        border-color: rgba(236, 143, 106, 1);
        background-color: rgba(236, 143, 106, 1);
    }
    .orders-filter-radio-box .custom-control-input:focus~.custom-control-label::before {
        box-shadow: 0 0 0 0.2rem rgba(236, 143, 106, 0.25);
    }
</style>
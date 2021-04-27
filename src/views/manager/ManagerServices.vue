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
                            <div v-if="services" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Услуги</span>
                                </div>

                                <div class="table-box">
                                    <table class="table table-dark table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Цена</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(service, index) in services" :key="service.id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{service.name}}</td>
                                            <td>{{service.price}}</td>
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
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import LeftMenu from '@/components/ManagerLeftMenu';
    import Loader from '@/components/Loader';
    import {actionTypes as serviceActionTypes} from "@/store/modules/service";
    import {mapState} from "vuex";

    export default {
        name: 'services',
        components: {
            Header,
            LeftMenu,
            Loader
        },
        data() {
            return {
                initialPage: null,
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.service.isLoading,
                error: state => state.service.error,
                services: state => state.service.data,
                limit: state => state.service.limit,
                pagesCount: state => Math.ceil(state.service.servicesCount / state.service.limit)
            }),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillServices() {
                this.$store.dispatch(serviceActionTypes.getServices, {offset: this.offset});
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'ManagerServices', query: { page: pageNum }});
                this.initialPage = pageNum;
                this.fillServices();
            }
        },
        mounted() {
            if(this.$route.query.page) {
                this.initialPage = Number(this.$route.query.page);
            } else {
                this.initialPage = 1;
            }
            this.fillServices();
            this.$store.dispatch(serviceActionTypes.getServicesCount);
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
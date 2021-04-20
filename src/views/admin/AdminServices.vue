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
                        <Loader v-if="loading"/>
                        <div v-else>
                            <div v-if="services" class="content-box box-transparent">
                                <div class="table-panel-box">
                                    <span>Услуги</span>
                                    <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-service">Добавить</button>
                                </div>
                                <div class="table-box">
                                    <table class="table table-dark table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Цена</th>
                                            <th scope="col">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(service, index) in services" :key="service.id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{service.name}}</td>
                                            <td>{{service.price}}</td>
                                            <td>
                                                <button class="btn-base-sm btn-blue" @click="handleEdit(service.id)">
                                                    <i class="bi bi-pen"></i>
                                                </button>
                                                <button class="btn-base-sm btn-red" @click="handleRemove(service.id)">
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

        <div class="modal fade" id="modal-add-service" tabindex="-1" role="dialog" aria-labelledby="modal-add-service-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddService">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-service-label">Добавление услуги</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-service-form-box">
                                <form @submit.prevent="handleSubmit(handleAddService)" id="form-add-service">
                                    <div class="form-group row">
                                        <label for="form-add-service-name" class="col-sm-4 col-form-label">Название</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addServiceName"
                                                       id="form-add-service-name"
                                                       class="form-control"
                                                       name="name"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-service-price" class="col-sm-4 col-form-label">Цена</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addServicePrice"
                                                       id="form-add-service-price"
                                                       class="form-control"
                                                       name="price"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-add-service" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-service" tabindex="-1" role="dialog" aria-labelledby="modal-edit-service-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditService">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-service-label">Редактирование услуги</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-service-form-box">
                                <form @submit.prevent="handleSubmit(handleEditService)" id="form-edit-service">
                                    <div class="form-group row">
                                        <label for="form-edit-service-name" class="col-sm-4 col-form-label">Название</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editServiceName"
                                                       id="form-edit-service-name"
                                                       class="form-control"
                                                       name="fio"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-service-price" class="col-sm-4 col-form-label">Цена</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editServicePrice"
                                                       id="form-edit-service-price"
                                                       class="form-control"
                                                       name="price"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-edit-service" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import LeftMenu from '@/components/AdminLeftMenu';
    import Loader from '@/components/Loader';
    import {actionTypes as serviceActionTypes} from "@/store/modules/service";
    import {extend, ValidationProvider} from "vee-validate";
    import {required} from "vee-validate/dist/rules";
    import {mapGetters, mapState} from "vuex";
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
        name: 'services',
        components: {
            Header,
            LeftMenu,
            Loader,
            ValidationProvider,
        },
        data() {
            return {
                loading: false,
                errorAdd: false,
                errorDelete: false,
                addServiceName: '',
                addServicePrice: '',
                editServiceName: '',
                editServicePrice: '',
                selectedService: null,
                initialPage: null
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
            ...mapGetters(["getServiceById"]),
            offset: function() {
                return (this.initialPage - 1) * this.limit;
            }
        },
        methods: {
            fillServices() {
                this.$store.dispatch(serviceActionTypes.getServices, {offset: this.offset});
            },
            handleRemove(id) {
                this.$store.dispatch(serviceActionTypes.deleteService, {
                    id: id
                })
                    .then(() => {
                        this.fillServices();
                    })
            },
            handleEdit(id) {
                this.selectedService = this.getServiceById(id)[0];
                this.editServiceName = this.selectedService.name;
                this.editServicePrice = this.selectedService.price;
                $('#modal-edit-service').modal();
            },
            handleAddService() {
                let formData = {
                    name: this.addServiceName,
                    price: this.addServicePrice,
                }
                this.$store.dispatch(serviceActionTypes.addService, {
                    formData
                })
                    .then(() => {
                        this.addServiceName = ''; this.addServicePrice = '';
                        this.$refs.formAddService.reset();
                        this.fillServices();
                        $('#modal-add-service').modal('hide');
                    })
            },
            handleEditService() {
                let id = this.selectedService.id;
                let formData = {
                    name: this.editServiceName,
                    price: this.editServicePrice,
                }
                this.$store.dispatch(serviceActionTypes.editService, {
                    id,
                    formData
                })
                    .then(() => {
                        this.editServiceName = ''; this.editServicePrice = '';
                        this.$refs.formEditService.reset();
                        this.fillServices();
                        $('#modal-edit-service').modal('hide');
                    })
            },
            handlePage(pageNum) {
                this.$router.push({ name: 'AdminServices', query: { page: pageNum }});
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
        }
    }
</script>

<style>

</style>
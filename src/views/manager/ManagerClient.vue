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
                            <div v-if="client" class="content-box box-transparent">
                                <div class="client-info-title-box">
                                    Информация о клиенте
                                </div>
                                <hr>
                                <div class="client-info-data-box">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row client-info-data-row">
                                                <div class="col-md-3">Id:</div>
                                                <div class="col-md-9 client-info-data-value">{{client.id}}</div>
                                            </div>
                                            <div class="row client-info-data-row">
                                                <div class="col-md-3">ФИО:</div>
                                                <div class="col-md-9 client-info-data-value">{{client.fio}}</div>
                                            </div>
                                            <div class="row client-info-data-row">
                                                <div class="col-md-3">Дата рождения:</div>
                                                <div class="col-md-9 client-info-data-value">{{formatDateFromTimestamp(client.birthday, "date")}}</div>
                                            </div>
                                            <div class="row client-info-data-row">
                                                <div class="col-md-3">Телефон:</div>
                                                <div class="col-md-9 client-info-data-value">{{client.phone}}</div>
                                            </div>
                                            <div class="row client-info-data-row">
                                                <div class="col-md-3">Паспорт:</div>
                                                <div class="col-md-9 client-info-data-value">{{client.passport}}</div>
                                            </div>
                                            <div class="row client-info-data-row">
                                                <div class="col-md-3">Номер водит. удостоверения:</div>
                                                <div class="col-md-9 client-info-data-value">{{client.driver_license}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="client" class="content-box box-transparent">
                                <div class="client-cars-box">
                                    <div class="client-cars-title-box">
                                        <span>Сведения об автомобилях</span>
                                        <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-car">Добавить</button>
                                    </div>
                                    <hr>

                                    <div v-if="errorDelete" class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Ошибка!</strong> При удалении возникли неполадки...
                                        <button type="button" @click="closeWarningDelete" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div v-if="client.cars" class="client-cars-info-box">
                                        <div v-for="car in client.cars" :key="car.id" class="client-car-info-data-box">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row client-car-info-data-row">
                                                        <div class="col-md-3">Марка:</div>
                                                        <div class="col-md-6 client-car-info-data-value">{{car.mark}}</div>
                                                        <div class="col-md-3">
                                                            <div class="client-car-info-buttons-box">
                                                                <button class="btn-base-sm btn-blue" @click="handleEdit(car.id)">
                                                                    <i class="bi bi-pen"></i>
                                                                </button>
                                                                <button class="btn-base-sm btn-red" data-toggle="modal" data-target="#modal-delete-car" @click="handleRemove(car.id)">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row client-car-info-data-row">
                                                        <div class="col-md-3">Модель:</div>
                                                        <div class="col-md-9 client-car-info-data-value">{{car.model}}</div>
                                                    </div>
                                                    <div class="row client-car-info-data-row">
                                                        <div class="col-md-3">Гос. номер:</div>
                                                        <div class="col-md-9 client-car-info-data-value">{{car.number}}</div>
                                                    </div>
                                                    <div class="row client-car-info-data-row">
                                                        <div class="col-md-3">Год выпуска:</div>
                                                        <div class="col-md-9 client-car-info-data-value">{{car.year}}</div>
                                                    </div>
                                                    <div class="row client-car-info-data-row">
                                                        <div class="col-md-3">Номер ПТС:</div>
                                                        <div class="col-md-9 client-car-info-data-value">{{car.passport}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!client.cars.length">
                                        Данных не найдено
                                    </div>
                                </div>
                            </div>

                            <div v-if="client" class="content-box box-transparent">
                                <div class="client-orders-box">
                                    <div class="client-orders-title-box">
                                        <span>Сведения о заказах</span>
                                        <button class="btn-base-sm btn-blue float-right" data-toggle="modal" data-target="#modal-add-client-order">Добавить</button>
                                    </div>
                                    <hr>

                                    <div v-if="client.orders" class="client-orders-info-box">
                                        <div v-for="order in client.orders" :key="order.id" class="client-order-info-data-box">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row client-order-info-data-row">
                                                        <div class="col-md-3">Id:</div>
                                                        <div class="col-md-6 client-order-info-data-value">{{order.id}}</div>
                                                        <div class="col-md-3">
                                                            <div class="client-order-info-buttons-box">
                                                                <router-link class="btn-base-sm btn-blue" v-if="order" :to="{name: 'ManagerOrder', params: { orderid: order.id }}">Перейти</router-link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row client-order-info-data-row">
                                                        <div class="col-md-3">Номер заказа:</div>
                                                        <div class="col-md-9 client-order-info-data-value">{{order.number}}</div>
                                                    </div>
                                                    <div class="row client-order-info-data-row">
                                                        <div class="col-md-3">Дата создания:</div>
                                                        <div class="col-md-9 client-order-info-data-value">{{formatDateFromTimestamp(order.created_at, "datetime")}}</div>
                                                    </div>
                                                    <div v-if="order.closed_at" class="row client-order-info-data-row">
                                                        <div class="col-md-3">Дата закрытия:</div>
                                                        <div class="col-md-9 client-order-info-data-value">{{formatDateFromTimestamp(order.closed_at, "datetime")}}</div>
                                                    </div>
                                                    <div class="row client-order-info-data-row">
                                                        <div class="col-md-3">Сумма заказа:</div>
                                                        <div class="col-md-9 client-order-info-data-value">{{order.sum}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!client.orders.length">
                                        Данных не найдено
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-add-car" tabindex="-1" role="dialog" aria-labelledby="modal-add-car-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddCar">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-car-label">Добавление автомобиля</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-car-form-box">
                                <form @submit.prevent="handleSubmit(handleAddCar)" id="form-add-car">

                                    <div class="form-group row">
                                        <label for="form-add-car-mark" class="col-sm-4 col-form-label">Марка</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addCarMark"
                                                       id="form-add-car-mark"
                                                       class="form-control"
                                                       name="mark"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-car-model" class="col-sm-4 col-form-label">Модель</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addCarModel"
                                                       id="form-add-car-model"
                                                       class="form-control"
                                                       name="model"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-car-number" class="col-sm-4 col-form-label">Гос. номер</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addCarNumber"
                                                       id="form-add-car-number"
                                                       class="form-control"
                                                       name="number"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-car-year" class="col-sm-4 col-form-label">Год выпуска</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required|numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addCarYear"
                                                       id="form-add-car-year"
                                                       class="form-control"
                                                       name="year"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-add-car-passport" class="col-sm-4 col-form-label">Номер ПТС</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="addCarPassport"
                                                       id="form-add-car-passport"
                                                       class="form-control"
                                                       name="passport"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-add-car" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-add-client-order" tabindex="-1" role="dialog" aria-labelledby="modal-add-client-order-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formAddClientOrder">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-add-client-order-label">Создание заказа</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-add-client-order-form-box">
                                <form @submit.prevent="handleSubmit(handleAddClientOrder)" id="form-add-client-order">

                                    <div v-if="client" class="form-group row">
                                        <label for="form-add-client-order-carid" class="col-sm-4">Автомобиль</label>
                                        <div class="col-sm-8">
                                            <validation-provider name="car_id" rules="required" v-slot="{ errors }">
                                                <vSelect
                                                    v-if="client.cars"
                                                    v-model="addClientOrderCarMark"
                                                    :options="carsSelectOptions"
                                                    :clearable="false"
                                                    id="form-add-client-order-carid"
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
                            <button type="submit" form="form-add-client-order" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-edit-car" tabindex="-1" role="dialog" aria-labelledby="modal-edit-car-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="formEditCar">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-edit-car-label">Редактирование автомобиля</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-edit-car-form-box">
                                <form @submit.prevent="handleSubmit(handleEditCar)" id="form-edit-car">

                                    <div class="form-group row">
                                        <label for="form-edit-car-mark" class="col-sm-4 col-form-label">Марка</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editCarMark"
                                                       id="form-edit-car-mark"
                                                       class="form-control"
                                                       name="mark"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-car-model" class="col-sm-4 col-form-label">Модель</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editCarModel"
                                                       id="form-edit-car-model"
                                                       class="form-control"
                                                       name="model"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-car-number" class="col-sm-4 col-form-label">Гос. номер</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editCarNumber"
                                                       id="form-edit-car-number"
                                                       class="form-control"
                                                       name="number"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-car-year" class="col-sm-4 col-form-label">Год выпуска</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required|numbers" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editCarYear"
                                                       id="form-edit-car-year"
                                                       class="form-control"
                                                       name="year"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="form-edit-car-passport" class="col-sm-4 col-form-label">Номер ПТС</label>
                                        <div class="col-sm-8">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input type="text"
                                                       v-model="editCarPassport"
                                                       id="form-edit-car-passport"
                                                       class="form-control"
                                                       name="passport"
                                                >
                                                <span class="input-error">{{ errors[0] }}</span>
                                            </validation-provider>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" form="form-edit-car" class="btn-base-sm btn-orange">Отправить</button>
                            <button type="button" class="btn-base-sm btn-gray" data-dismiss="modal">Закрыть</button>
                        </div>
                    </ValidationObserver>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-delete-car" tabindex="-1" role="dialog" aria-labelledby="modal-delete-car-label" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-delete-car-label">Удаление автомобиля</h5>
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
    import {mapGetters, mapState} from "vuex";
    import Loader from '@/components/Loader';
    import {actionTypes as clientActionTypes} from "@/store/modules/client";
    import {actionTypes as carActionTypes} from "@/store/modules/car";
    import {actionTypes as orderActionTypes} from "@/store/modules/order";
    import {ValidationProvider, extend} from "vee-validate";
    import {required} from "vee-validate/dist/rules";
    import vSelect from 'vue-select';
    import {translateStatusName, getCssClassForStatus, formatDateFromTimestamp} from "@/helpers/common";
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
        name: 'client',
        components: {
            Header,
            LeftMenu,
            Loader,
            ValidationProvider,
            vSelect
        },
        data() {
            return {
                errorAdd: false,
                errorDelete: false,
                clientId: null,
                removingId: null,
                addCarMark: '',
                addCarModel: '',
                addCarNumber: '',
                addCarYear: '',
                addCarPassport: '',
                addClientOrderCarId: '',
                addClientOrderCarMark: '',
                editCarMark: '',
                editCarModel: '',
                editCarNumber: '',
                editCarYear: '',
                editCarPassport: '',
                selectedCar: null,
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.client.isLoading,
                error: state => state.client.error,
                client: state => state.client.selectedClient,
                profile: state => state.auth.user.profile,
            }),
            ...mapGetters(["getClientCarById"]),
            // need for correct vue-select validation
            computedFormAddClientOrder() {
                return this.$refs.formAddClientOrder;
            },
            // select options for vue-select
            carsSelectOptions: function() {
                let carsArray = [];
                if(this.client.cars) {
                    for (let car of this.client.cars) {
                        let carObject = {
                            id: car.id,
                            mark: `${car.mark} ${car.number}`
                        }
                        carsArray.push(carObject);
                    }
                }
                return carsArray;
            },
        },
        methods: {
            fillClient() {
                this.$store.dispatch(clientActionTypes.getClientById, {clientId: this.clientId});
            },
            translateStatusName: translateStatusName,
            getCssClassForStatus: getCssClassForStatus,
            formatDateFromTimestamp: formatDateFromTimestamp,
            handleAddClientOrder() {
                let formData = {
                    client_id: this.clientId,
                    car_id: this.addClientOrderCarId,
                    manager_id: this.profile.id
                }
                this.$store.dispatch(orderActionTypes.addOrder, {
                    formData
                })
                .then(() => {
                    // clear fields
                    this.addOrderCarId = ''; this.addOrderCarMark = '';
                    // to clear validation errors
                    this.$refs.formAddClientOrder.reset();
                    this.fillClient();
                    $('#modal-add-client-order').modal('hide');
                })
            },
            closeWarningDelete: function () {
                this.errorDelete = false;
            },
            handleRemove(id) {
                this.removingId = id;
            },
            confirmRemove() {
                this.$store.dispatch(carActionTypes.deleteCar, {
                    id: this.removingId
                })
                .then(() => {
                    this.fillClient();
                    $('#modal-delete-car').modal('hide');
                })
                .catch(() => {
                    this.errorDelete = true;
                    $('#modal-delete-car').modal('hide');
                })
            },
            handleEdit(id) {
                this.selectedCar = this.getClientCarById(id)[0];
                this.editCarMark = this.selectedCar.mark;
                this.editCarModel = this.selectedCar.model;
                this.editCarNumber = this.selectedCar.number;
                this.editCarYear = this.selectedCar.year;
                this.editCarPassport = this.selectedCar.passport;
                $('#modal-edit-car').modal();
            },
            handleEditCar() {
                let id = this.selectedCar.id;
                let formData = {
                    mark: this.editCarMark,
                    model: this.editCarModel,
                    number: this.editCarNumber,
                    year: this.editCarYear,
                    passport: this.editCarPassport,
                    client_id: this.clientId
                }
                this.$store.dispatch(carActionTypes.editCar, {
                    id,
                    formData
                })
                .then(() => {
                    this.editCarMark = ''; this.editCarModel = ''; this.editCarNumber = '';
                    this.editCarYear = ''; this.editCarPassport = '';
                    this.$refs.formEditCar.reset();
                    this.fillClient();
                    $('#modal-edit-car').modal('hide');
                })
            },
            handleAddCar() {
                let formData = {
                    mark: this.addCarMark,
                    model: this.addCarModel,
                    number: this.addCarNumber,
                    year: this.addCarYear,
                    passport: this.addCarPassport,
                    client_id: this.clientId
                }
                this.$store.dispatch(carActionTypes.addCar, {
                    formData
                })
                .then(() => {
                    this.addCarMark = ''; this.addCarModel = ''; this.addCarNumber = '';
                    this.addCarYear = ''; this.addCarPassport = '';
                    this.$refs.formAddCar.reset();
                    this.fillClient();
                    $('#modal-add-car').modal('hide');
                })
            },
            onChangeCarSelect: function(value) {
                this.addClientOrderCarId = value.id;
            },
            // need for correct vue-select validation
            onBlurCarSelect() {
                this.computedFormAddClientOrder.refs.car_id.validate();
            },
        },
        mounted() {
            this.clientId = this.$route.params.clientid;
            this.fillClient();
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
    .client-info-title-box,
    .client-cars-title-box,
    .client-orders-title-box {
        margin-bottom: 20px;
        padding-top: 5px;
    }
    .client-info-data-row,
    .client-car-info-data-row:not(:first-child),
    .client-order-info-data-row:not(:first-child) {
        margin-bottom: 10px;
    }
    .client-info-data-value,
    .client-car-info-data-value,
    .client-order-info-data-value {
        color: #bcecec;
    }
    .client-car-info-buttons-box,
    .client-order-info-buttons-box {
        float: right;
    }
    .client-car-info-buttons-box button:nth-child(2) {
        margin-left: 3px;
        margin-right: 4px;
    }
    .client-order-info-buttons-box a {
        margin-right: 5px;
        color: #fff;
    }
    .client-order-info-buttons-box a:hover {
        color: #fff;
        text-decoration: none;
    }
    .client-car-info-data-box:not(:last-child),
    .client-order-info-data-box:not(:last-child){
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #5c5e60;
    }
</style>

<style lang="scss">
    @import "vue-select/src/scss/vue-select.scss";
</style>
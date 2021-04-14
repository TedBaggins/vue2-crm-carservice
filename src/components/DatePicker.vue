<template>
    <div>
        <date-picker v-model="year" v-on:change="setYear" type="year" placeholder="Год"></date-picker>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    export default {
        components: { DatePicker },
        data() {
            return {
                year: '',
            };
        },
        methods: {
            setYear () {
                this.$emit('setYear', {
                    year: new Date(this.year).getFullYear(),
                })
            }
        }
    };
</script>
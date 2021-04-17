<template>
    <div>
        <date-picker v-model="timestamp" v-on:change="setTimestamp" value-type="timestamp" type="date" placeholder="Дата"></date-picker>
    </div>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        props: ['initialDate'],
        components: { DatePicker },
        data() {
            return {
                timestamp: this.initialDate
            };
        },
        methods: {
            setTimestamp () {
                this.$emit('setTimestamp', {
                    timestamp: this.timestamp,
                })
            }
        }
    };
</script>
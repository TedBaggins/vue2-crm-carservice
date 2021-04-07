<template>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    {{content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserService from '@/services/user.service';

    export default {
        name: 'Manager',
        data() {
            return {
                content: ''
            }
        },
        mounted() {
            UserService.getManagerBoard().then(
                response => {
                    this.content = response.data;
                },
                error => {
                    this.content = (error.response && error.response.data) ||
                        error.message ||
                        error.toString();
                }
            )
        }
    }
</script>
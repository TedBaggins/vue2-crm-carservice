<template>
    <div class="leftmenu-box box-transparent">
        <ul>
            <li><router-link :to="{name: 'Profile'}"><i class="bi bi-person-circle"></i>Профиль</router-link></li>
            <li><router-link :to="{name: 'ManagerClients'}"><i class="bi bi-people-fill"></i>Клиенты</router-link></li>
            <li><router-link :to="{name: 'ManagerOrders'}"><i class="bi bi-menu-down"></i>Заказы</router-link></li>
        </ul>
    </div>
</template>

<script>

</script>

<style>

</style>
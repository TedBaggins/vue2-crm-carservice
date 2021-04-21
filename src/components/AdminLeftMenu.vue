<template>
    <div class="leftmenu-box box-transparent">
        <ul>
            <li><router-link :to="{name: 'Profile'}"><i class="bi bi-person-circle"></i>Профиль</router-link></li>
            <li><router-link :to="{name: 'AdminUsers'}"><i class="bi bi-person-lines-fill"></i>Учетные записи</router-link></li>
            <li><router-link :to="{name: 'AdminAdmins'}"><i class="bi bi-people-fill"></i>Администраторы</router-link></li>
            <li><router-link :to="{name: 'AdminManagers'}"><i class="bi bi-people-fill"></i>Менеджеры</router-link></li>
            <li><router-link :to="{name: 'AdminMasters'}"><i class="bi bi-people-fill"></i>Мастера</router-link></li>
            <li><router-link :to="{name: 'AdminServices'}"><i class="bi bi-collection-fill"></i>Услуги</router-link></li>
        </ul>
    </div>
</template>

<script>

</script>

<style>

</style>
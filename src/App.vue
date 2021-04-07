<template>
    <div id="app">
<!--        <div id="nav">-->
<!--            <router-link to="/">Главная</router-link> |-->
<!--            <router-link to="/about">About</router-link>-->
<!--        </div>-->
        <router-view/>
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Vollkorn:wght@400;500;600;700&display=swap');

    html, body {
        height: 100%;
        background-color: #f6f5f7 !important;
        font-family: 'Vollkorn', serif !important;
        font-size: 16px !important;
    }
    h1,h2,h3,h4,h5,p,span,div {
        font-family: 'Vollkorn', serif !important;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

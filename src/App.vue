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
    @import url("~@/assets/fonts/gordita/stylesheet.css");

    html, body {
        height: 100%;
        background: linear-gradient(to right, rgb(35, 37, 38), rgb(65, 67, 69));
        background-size: 100% auto;
        /*font-family: 'Vollkorn', serif !important;*/
        font-family: Gordita,Helvetica Neue,Helvetica,Arial,sans-serif !important;
        font-size: 16px !important;
        color: #d4d4d4 !important;
    }
    #app {
        height: 100%;
    }
    h1,h2,h3,h4,h5,p,span,div {
        /*font-family: 'Vollkorn', serif !important;*/
        font-family: Gordita,Helvetica Neue,Helvetica,Arial,sans-serif !important;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .box-transparent {
        padding: 25px;
        border: 1px solid rgba(222, 222, 222, 0.13);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }
    #app .form-control {
        background-color: rgba(255, 255, 255, 0.75);
    }
    .input-error {
        color: #ff6e6e;
    }
    .btn-base {
        padding: 10px 16px;
        border-width: 1px;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 0px 10px 20px -6px rgb(0 0 0 / 12%);
        overflow: hidden;
        transition: all 0.3s ease;
        font-weight: 500;
        width: 150px;
    }
    .btn-prime {
        background: rgba(236, 143, 106, 0.7);
        border-color: rgba(236, 143, 106, 0.7);
        color: #fff;
    }
    .btn-prime:hover {
        border-color: rgba(230, 109, 61, 0.7);
        background: rgba(230, 109, 61, 0.7);
    }
    .btn-second {
        color: #fff;
        border-color: rgba(139, 186, 187, 0.7);
        background: rgba(139, 186, 187, 0.7);
    }
    .btn-second:hover {
        border-color: rgba(107, 167, 168, 0.8);
        background: rgba(107, 167, 168, 0.8);
    }
</style>

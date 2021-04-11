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
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css");

    html, body {
        height: 100%;
        background: linear-gradient(to right, rgb(35, 37, 38), rgb(65, 67, 69));
        background-size: 100% auto;
        font-family: 'Vollkorn', serif !important;
        /*font-family: Gordita,Helvetica Neue,Helvetica,Arial,sans-serif !important;*/
        font-size: 16px !important;
        color: #d4d4d4 !important;
    }
    #app {
        height: 100%;
    }
    h1,h2,h3,h4,h5,p,span,a,div {
        font-family: 'Vollkorn', serif !important;
        /*font-family: Gordita,Helvetica Neue,Helvetica,Arial,sans-serif !important;*/
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

    /* BUTTONS */
    .btn-base {
        padding: 10px 16px;
        border-width: 1px;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 0px 10px 20px -6px rgba(0, 0, 0, 0.13);
        overflow: hidden;
        transition: all 0.3s ease;
        font-weight: 500;
        width: 150px;
    }
    .btn-base-sm {
        padding: 5px 15px;
        border-width: 1px;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 0px 10px 20px -6px rgba(0, 0, 0, 0.13);
        overflow: hidden;
        transition: all 0.3s ease;
        font-weight: 500;
        width: 110px;
    }
    .btn-round {
        padding: 5px 10px;
        border-radius: 50%;
        border: none;
        font-size: 16px;
        box-shadow: 0px 10px 20px -6px rgba(0, 0, 0, 0.13);
        background: #656669;
        color: #fff;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    .btn-round:hover {
        background: #7f8084;
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
    .btn-shadow {
        color: #d4d4d4;
        background-color: #393b3d;
        border-color: rgba(57, 59, 61, 0.13);
    }
    .btn-shadow:hover {
        background-color: #2c2d2f;
        border-color: rgba(44, 45, 47, 0.13);
    }

    /* LEFT MENU */
    .leftmenu-box {
        margin-top: 50px;
        max-width: 210px;
    }
    .leftmenu-box ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .leftmenu-box ul li {
        padding: 5px 0;
    }
    .leftmenu-box ul li a {
        display:block;
        text-decoration: none;
        color: #d4d4d4;
    }
    .leftmenu-box ul li a:hover {
        text-decoration: none;
        color: #e8e8e8;
    }
    .leftmenu-box ul li i {
        padding-right: 8px;
    }
</style>

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
    hr {
        border-top: 1px solid rgba(255,255,255,0.1) !important;
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
    .input-error {
        color: #ff6e6e;
    }
    .datepicker-box {
        margin: auto;
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
    .btn-orange {
        background: rgba(236, 143, 106, 0.7);
        border-color: rgba(236, 143, 106, 0.7);
        color: #fff;
    }
    .btn-orange:hover {
        border-color: rgba(230, 109, 61, 0.7);
        background: rgba(230, 109, 61, 0.7);
    }
    .btn-blue {
        color: #fff;
        border-color: rgba(139, 186, 187, 0.7);
        background: rgba(139, 186, 187, 0.7);
    }
    .btn-blue:hover {
        border-color: rgba(107, 167, 168, 0.8);
        background: rgba(107, 167, 168, 0.8);
    }
    .btn-red {
        color: #fff;
        border-color: rgba(230, 61, 61, 0.7);
        background: rgba(230, 61, 61, 0.7);
    }
    .btn-red:hover {
        border-color: rgba(210, 57, 57, 0.7);
        background: rgba(210, 57, 57, 0.7);
    }
    .btn-gray {
        color: #fff;
        border-color: rgba(146, 146, 146, 0.7);
        background: rgba(146, 146, 146, 0.7);
    }
    .btn-gray:hover {
        border-color: rgba(125, 125, 125, 0.7);
        background: rgba(125, 125, 125, 0.7);
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

    /* TABLES */
    .content-box {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .table-dark {
        background-color: #393b3d !important;
    }
    .table-panel-box {
        margin-bottom: 30px;
        padding-top: 5px;
    }
    .table-box {
        text-align: center;
    }
    .table-box button:first-child {
        margin-right: 5px;
    }
    .table-buttons-box {
        min-width: 140px;
    }

    .loading-box {
        margin-top: 50px;
    }

    /* MODAL */
    .modal-content {
        margin-top: 20%;
        border-radius: 10px !important;
    }
    .modal-header {
        background: #404040;
        border-bottom: 1px solid #3e3e3e !important;
        position: relative;
        text-align: center;
        align-items: center !important;
        height: 70px;
    }
    .modal-header button.close {
        color: white;
    }
    .modal-header button.close:hover {
        color: #cdcdcd;
    }
    .modal-title {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        line-height: 1;
    }
    .modal-body {
        background: #545454;
        padding-top: 25px !important;
    }
    .modal-delete-body {
        text-align: center;
        font-size: 18px;
    }
    .modal-footer {
        border-top: 1px solid #3e3e3e !important;
        background: #404040;
    }

    /* PAGINATION */
    .table-paginator-box {
        display: flex;
        justify-content: center;
    }
    .paginator-ul {
        margin: 10px;
        padding-left: 0;
        display: flex;
        align-items: center;
        list-style: none;
        background: #393b3d;
        border-radius: 4px;
    }
    .paginator-ul li {
        /*padding: 10px 15px;*/
        color: #d4d4d4;
    }
    .paginator-ul li:hover {
        background: #2c2d2f;
    }
    .paginator-ul li.disabled {
        color: #999999;
    }
    .paginator-ul li.disabled:hover {
        background: #393b3d;
    }
    .paginator-ul li.active {
        background: #749799;
    }
    .paginator-ul li.active a {
        color: #fff;
    }
    .paginator-ul li a {
        display: inline-block;
        padding: 10px 15px;
        color: #d4d4d4;
        text-decoration: none;
    }

    /* ERROR MESSAGES */
    .alert-danger {
        color: #ffffff !important;
        background-color: #b54040 !important;
        border-color: #b54040 !important;
        position: relative;
        min-height: 50px;
    }
    .alert-danger .alert-danger-message {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 100%;
        text-align: center;
    }
    button.close:hover {
        color: #fff !important;
    }
</style>

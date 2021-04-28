import * as moment from 'moment'

function translateStatusName(name) {
    switch (name) {
        case "created":
            return "Создан";
        case "submitted for execution":
            return "Передан на выполнение";
        case "on execution":
            return "На выполнении";
        case "completed":
            return "Готов";
        case "closed":
            return "Закрыт";
        case "canceled":
            return "Отменен";
        default:
            return "";
    }
}

function getCssClassForStatus(name) {
    switch (name) {
        case "created":
            return "text-blue";
        case "submitted for execution":
            return "text-blue";
        case "on execution":
            return "text-blue";
        case "completed":
            return "text-green";
        case "closed":
            return "text-green";
        case "canceled":
            return "text-red";
        default:
            return "";
    }
}

function formatDateFromTimestamp(timestamp, mode) {
    let rawDate = new Date(Number(timestamp));
    if (mode === "date") {
        return moment(rawDate).locale("ru").format('LL');
    } else if (mode === "datetime") {
        return moment(rawDate).locale("ru").format('LLL');
    }
}

export {
    translateStatusName,
    getCssClassForStatus,
    formatDateFromTimestamp
}
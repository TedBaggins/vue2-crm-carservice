
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

module.exports = {
    translateStatusName,
    getCssClassForStatus,
}
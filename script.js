const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const month = document.querySelector(".month");
const todayBtn = document.querySelector(".today-btn");

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

//Obtem a data atual
const date = new Date();

//Obtem o mês atual
let currentMonth = date.getMonth();

//Obtem o ano atual
let currentYear = date.getFullYear();

//Função para renderizar os dias
function renderCalendar() {
    //Obtem  o mês anterior, o mês atual e os dias do proximo mês
    date.setDate(1);
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1

    //Atualiza o ano e mês atual no header
    month.innerHTML = `${months[currentMonth]} ${currentYear}`;

    //Atualiza os dias no HTML
    let days = "";

    //Dias anteriores (do mês anterior) no HTML
    for (let x = firstDay.getDay(); x > 0; x--) {
        days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
    }

    //Dias do mês atual
    for (let i = 1; i <= lastDayDate; i++) {
        if (i == new Date().getDate() &&
            currentMonth == new Date().getMonth() &&
            currentYear == new Date().getFullYear()) {
            //Se for a data de hoje
            days += `<div class="day today">${i}</div>`;
        } else {
            //Se não for a data de hoje
            days += `<div class="day">${i}</div>`
        }
    }

    //Proximos dias (do próximo mês) no HTML
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next">${j}</div>`;
    }

    //Executar essa função toda vez que renderizar o calendario
    hideTodayBtn();
    daysContainer.innerHTML = days;
}
renderCalendar();

nextBtn.addEventListener("click", () => {
    //Passa para o proximo mês (avança um mês)
    currentMonth++;
    if (currentMonth > 11) {
        //Se o mês for maior que 11 (dezembro), avança para o próximo ano
        currentMonth = 0;
        currentYear++;
    }
    //Atualiza o calendario
    renderCalendar();
});


prevBtn.addEventListener("click", () => {
    //Passa para o mês anterior (recua um mês)
    currentMonth--;
    if (currentMonth < 0) {
        //Se o mês for menor que 0 (janeiro), recua para o ano anterioro
        currentMonth = 11;
        currentYear--;
    }
    //Atualiza o calendario
    renderCalendar();
});

//Vai para o dia de hoje
todayBtn.addEventListener("click", () => {
    //Passa para o dia de hoje
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    //Atualiza o calendario
    renderCalendar();
});

//Oculta o botão hoje, caso já estejamos no mês e ano atual
function hideTodayBtn() {
    if (currentMonth == new Date().getMonth() && currentYear == new Date().getFullYear()) {
        todayBtn.style.display = "none";
    } else {
        todayBtn.style.display = "flex";
    }
}



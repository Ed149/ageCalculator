'use strict'
let buttonCalculate = document.getElementById('card__calculate_button');
let actualYear = new Date().getFullYear();
let days = document.getElementById('days')
let months = document.getElementById('months')
let years = document.getElementById('years')

const calculate = () => {
    clearErrors();
    try {
        let day = document.getElementById("day");
        let dayValue = day.value;
        let month = document.getElementById("month");
        let monthValue = month.value;
        let year = document.getElementById("year");
        let yearValue = year.value;
        validateEmptyField(dayValue, days);
        validateEmptyField(monthValue, months);
        validateEmptyField(yearValue, years);
        let date = getBornDate(dayValue, monthValue, yearValue);
        let getDays = getDaysInMonth(yearValue, monthValue);
        validateDate(dayValue, monthValue, getDays,yearValue);
        let calculatedAge = calculateAge(date,new Date())
        displayAge(calculatedAge)

    } catch (error) {
        console.error("Error en ", error);
    }

}

const calculateAge = (date,actualDate) =>{
    let age = actualDate.getFullYear() - date.getFullYear();
    let ageMonth = date.getMonth()+1;
    let actualMonth = actualDate.getMonth()+1;
    let ageDay = date.getDate();
    let actualDay = actualDate.getDate();
    let ageMonths = actualMonth - ageMonth;
    let ageDays = actualDay-ageDay;
    if(ageDays < 0){
        ageMonths--;
        ageDays = 30 + ageDays;
    }
    if(ageMonths<0){
        ageMonths = 12 + ageMonths;
    }
    if(ageMonth > actualMonth){
        age--;
    }else if(actualMonth == ageMonth){
        if(ageDay > actualDay){
            age--;
        }
    }
    let objAge = {
        "Age":age,
        "Months":ageMonths,
        "Days":ageDays
    }
    return objAge;
}

const displayAge = (age) =>{
    try{
        let dYears = document.getElementById("card__age_years");
        let dMonths = document.getElementById("card__age_months");
        let dDays = document.getElementById("card__age_days");
        dYears.innerHTML = age.Age;
        dMonths.innerHTML = age.Months;
        dDays.innerHTML = age.Days;

    }catch(error){
        throw "Error"
    }


}
const getBornDate = (day, month, year) => new Date(`"${month}/${day}/${year}"`)

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const validateEmptyField = (value, field) => {
    if (value == "") {
        showErrors(field,"This field is required");
    }
}

const validateDate = (day, month, getDays, year) => {
    if(day == "" || month == "" || year==""){
        throw "Fields Required"
    }
    if (day > getDays && month > 12) {
        showErrors(days,"Must be a valid date.")
        showErrors(months,"Must be a valid date.")
        throw "Ingresa un numero valido"
    }else if(day > getDays){
        showErrors(days,"Must be a valid date.");
        throw "Ingresa un numero valido"
    }else if(month>12){
        showErrors(months,"Must be a valid date.");
        throw "Ingresa un numero valido"
    }else if(year > actualYear){
        showErrors(years,"Must be before the actual year");
        throw "Ingresa un numero valido";
    }
};

const showErrors = (field,text) =>{
    field.classList.add("error");
    field.childNodes[5].innerText = text;
}

const clearErrors = () => {
    days.classList.remove("error");
    months.classList.remove("error");
    years.classList.remove("error");
}

buttonCalculate.addEventListener('click', calculate)
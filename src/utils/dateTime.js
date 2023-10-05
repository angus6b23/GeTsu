import moment from "moment";

const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemer', 'October', 'November', 'December'];

const getNumberOfDays = (year, month) => {
    if (month == 2 && year % 4 == 0) return 29
    else if(month == 2) return 28
    else if(month <=7 && month % 2 == 1 || month >=8 && month % 2 == 0) return 31
    else return 30

}

const isWeekend = (year, month, day) => {
    let date = new Date(`${year}-${month}-${day}`);
    return date.getDay() === 0 || date.getDay() === 6
}

const isSunday = (year, month, day) =>{
    let date = new Date(`${year}-${month}-${day}`);
    return date.getDay() === 0
}

export { months, getNumberOfDays, isWeekend, isSunday }

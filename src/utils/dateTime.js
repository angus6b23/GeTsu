import moment from "moment";
import * as ct from 'countries-and-timezones'

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

const guessCountry = () => {
    return ct.getCountryForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
}
export { getNumberOfDays, isWeekend, isSunday, guessCountry }

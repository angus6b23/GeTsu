const getAvailableCountries = async () => { 
    const res = await fetch ('https://date.nager.at/api/v3/AvailableCountries');
    const data = await res.json();
    return data
}

const getHolidays = async (year, month, countryId) => {
    const res = await fetch (`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryId}`)
    const data = await res.json();
    const holidays = data.filter(holiday => holiday.date.includes(`${year}-${month.toString().padStart(2,0)}`)).map(holiday => { return {...holiday, day: parseInt(holiday.date.replace(/\d+\-\d+\-/,  ''))}});
    return holidays
}

export { getAvailableCountries, getHolidays }

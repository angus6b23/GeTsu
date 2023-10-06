let memory = {}

const getAvailableCountries = async () => { 
    if (memory.availableCountries) return memory.availableCountries
    const res = await fetch ('https://date.nager.at/api/v3/AvailableCountries');
    let data = await res.json();
    data = data.sort((a,b) => a.name.localeCompare(b.name));
    memory.availableCountries = data;
    return data
}

const getHolidays = async (year, month, countryId, raw = false) => {
    if (year < 1900 || year > 3000 || countryId == 'unknown') return undefined
    if (memory[`holiday-${year}-${month}-${countryId}`]) return memory[`holiday-${year}-${month}-${countryId}`];
    const res = await fetch (`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryId}`)
    const data = await res.json();
    const holidays = data.filter(holiday => holiday.date.includes(`${year}-${month.toString().padStart(2,0)}`)).map(holiday => { return {...holiday, day: parseInt(holiday.date.replace(/\d+\-\d+\-/,  ''))}});
    memory[`holiday-${year}-${month}-${countryId}`] = holidays;
    return raw ? data : holidays;
}

const getRegions = async (countryId) =>{
    if (memory[`region-${countryId}`]) {
        return memory[`region-${countryId}`]
    }
    else {
        let data = await getHolidays(2023, 1, countryId, true);
        let regions = data.reduce((acc, curr) =>{
            if (curr.counties){
                curr.counties.forEach(county => !acc.includes(county) ? acc.push(county) : null);
            }
            return acc
        }, [])
        memory[`region-${countryId}`] = regions
        return regions;
    }
}


export { getAvailableCountries, getHolidays, getRegions }

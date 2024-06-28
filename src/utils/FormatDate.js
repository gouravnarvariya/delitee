import moment from 'moment';

export const FormatDateYMD = (date) => {
    if (date) {
        // Create a Moment object with the provided date
        const formattedDate = moment(date).format("DD-MM-YYYY");
        return formattedDate;
    } else {
        return null
    }
}

export const FormatOnlyTime = (timestamp) => {
    return moment(timestamp).format("HH:mm");
}

export const TimeTo12HourFormat = (time) => {
    return moment(time, 'HH:mm').format('h:mm A');
}

export const GetDayOfDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date))
}

export const DateForDMY = (inputDate) => {
    const date = moment(inputDate);
    return date.format("DD-MM-YYYY");
}


export const CombineDateTime = (dateStr, timeStr) => {
    // Parse the date part
    const date = moment(dateStr);

    // Extract hours and minutes from time string
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Set the time on the date object
    date.hours(hours).minutes(minutes);

    // Format the combined date and time
    return date.format('DD-MM-YYYY h:mm A');
}

export const FormatTimeStamp = (dateTimeStr) => {
    const dateTime = moment(dateTimeStr);
    return dateTime.format('DD-MM-YYYY h:mm A');
}
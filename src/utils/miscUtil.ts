export const formatEpoch = (epoch: number, isTime?: boolean): string => {
    /* IT said date will be in UTC, so removed the workaround below. If necessary simply
              change all the methods to UTC... methods. */
    /* The date value is in local time, so do not let JS do time conversion.
       By using the UTC... functions, we can get the date as is without conversion. */
    const date = new Date(epoch);
    let text = `${formatDateTimePart(date.getMonth() + 1)}/${formatDateTimePart(
        date.getDate()
    )}/${date.getFullYear()}`;
    if (isTime) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        // Check whether AM or PM
        const ampm = hours >= 12 ? "PM" : "AM";
        // Find current hour in AM-PM Format
        hours = hours % 12;
        // To display "0" as "12"
        hours = hours ? hours : 12;
        text += ` ${formatDateTimePart(hours)}:${formatDateTimePart(minutes)} ${ampm}`;
    }
    return text;
}

const formatDateTimePart = (part: number) => {
    return ("0" + part).slice(-2);
};

// export const formatEpoch = (epoch: number, isTime?: boolean): string => {
//     const date = new Date(epoch);
//     let text = `${date.getMonth() + 1
//         }/${date.getDate()}/${date.getFullYear()}`;
//     if (isTime) {
//         let hours = date.getHours();
//         const minutes = date.getMinutes();
//         // Check whether AM or PM
//         const ampm = hours >= 12 ? "PM" : "AM";
//         // Find current hour in AM-PM Format
//         hours = hours % 12;
//         // To display "0" as "12"
//         hours = hours ? hours : 12;
//         text += ` ${hours}:${formatTimePart(minutes)}${ampm}`;
//     }
//     return text;
// }

// const formatTimePart = (part: number) => {
//     return ("0" + part).slice(-2);
// };
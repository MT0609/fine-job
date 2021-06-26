export const timeDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  if (months <= 0) {
    let days = Math.round(
      (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return { number: 0, timeType: "today" };
    if (days < 2) return { number: days, timeType: "day" };
    return { number: days, timeType: "days" };
  }

  if (months >= 12)
    return {
      number: Math.abs(
        new Date(d2.getTime() - d1.getTime()).getUTCFullYear() - 1970
      ),
      timeType: "years",
    };

  if (months === 1) return { number: 1, timeType: "month" };
  return { number: months, timeType: "months" };
};

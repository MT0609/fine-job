export const timeDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  if (months <= 0) {
    let days = Math.round(
      (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return `today`;
    if (days < 2) return `${days} day ago`;
    return `${days} days ago`;
  }

  if (months >= 12)
    return `${Math.abs(
      new Date(d2.getTime() - d1.getTime()).getUTCFullYear() - 1970
    )} years ago`;

  return `${months} months ago`;
};

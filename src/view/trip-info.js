import dayjs from 'dayjs';

export const createTripInfo = (trips) => {

  let minDate = trips[0].startDate;
  let maxDate = minDate;
  let total = 0;

  for (const element of trips) {
    if (element.startDate.getTime() > maxDate.getTime()) {maxDate = element.startDate;}
    if (element.startDate.getTime() < minDate.getTime()) {minDate = element.startDate;}
  }

  for (const element of trips) {
    total += element.price;
  }

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
      <p class="trip-info__dates">${dayjs(minDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(maxDate).format('D')}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  </section>`;
};

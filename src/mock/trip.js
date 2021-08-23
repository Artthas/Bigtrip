import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomIntegerEveryFive } from '../utils/common.js';

const generateType = () => {
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];
  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

const generateOffer = () => {
  const isChecked = () => {
    if (getRandomInteger(0, 1)) {
      return 'checked';
    } else {
      return '';
    }
  };

  const offers = [
    {'Add luggage': '50', isChecked: isChecked()},
    {'Switch to comfort': '80', isChecked: isChecked()},
    {'Add meal': '15', isChecked: isChecked()},
    {'Choose seats': '5', isChecked: isChecked()},
    {'Travel by train': '40', isChecked: isChecked()},
  ];

  return offers;
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Cras aliquet varius magna, non porta ligula feugiat eget. ',
    'Fusce tristique felis at fermentum pharetra. ',
    'Aliquam id orci ut lectus varius viverra. ',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
    'Sed sed nisi sed augue convallis suscipit in sed felis. ',
    'Aliquam erat volutpat. ',
    'Nunc fermentum tortor ac porta dapibus. ',
    'In rutrum ac purus sit amet tempus. ',
  ];

  let description = '';
  const newDescriptions = descriptions.slice();

  for (let i = 0; i < 5; i++) {
    const index = getRandomInteger(0, newDescriptions.length - 1);
    description += newDescriptions[index];
    newDescriptions.splice(index, 1);
  }

  return description;
};

const generatePhoto = () => {
  const photos = [];

  for (let i = 0; i < getRandomInteger(3, 8); i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 20)}`);
  }

  const uniqePhotos = new Set(photos);

  return uniqePhotos;
};

const generateDate = (daysGap, hoursGap, minutesGap) => dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute').toDate();

const generateDuration = (startDate, endDate) => {

  const differenceInDays = parseInt((endDate - startDate) / 86400000, 10);
  let differenceInHours = parseInt((endDate - startDate) / 3600000, 10);
  const differenceInMinutes = parseInt((endDate - startDate) / 60000, 10) - differenceInHours * 60;
  let difference = '';

  if (differenceInDays > 0) {
    differenceInHours = differenceInHours - differenceInDays * 24;
  }

  if (differenceInDays === 0) {
    difference = `0${differenceInHours}H ${differenceInMinutes}M`;
  } else if (differenceInHours === 0) {
    difference = `0${differenceInDays}D 0${differenceInHours}H ${differenceInMinutes}M`;
  } else if (differenceInMinutes < 10) {
    difference = `0${differenceInDays}D 0${differenceInHours}H 0${differenceInMinutes}M`;
  } else {
    difference = `0${differenceInDays}D 0${differenceInHours}H ${differenceInMinutes}M`;
  }

  return difference;
};

export const generateTrip = () => {
  const hoursGapStart = getRandomInteger(3, 6);
  const hoursGapEnd = getRandomInteger(7, 12);
  const minutesGapStart = getRandomIntegerEveryFive(1, 60) ;
  const minutesGapEnd = getRandomIntegerEveryFive(1, 60) ;
  const daysGapStart = getRandomInteger(-7, 7);
  const daysGapEnd = daysGapStart + getRandomInteger(0, 2);

  return {
    id: nanoid(),
    type: generateType(),
    destination: generateDestination(),
    startDate: generateDate(daysGapStart, hoursGapStart, minutesGapStart),
    endDate: generateDate(daysGapEnd, hoursGapEnd, minutesGapEnd),
    get duration() {
      return generateDuration(this.startDate, this.endDate);
    },
    offers: generateOffer(),
    _firstPrice: getRandomIntegerEveryFive(5, 200),
    get price() {
      let price = this._firstPrice;
      for (const element of this.offers) {
        if (element.isChecked === 'checked') {
          price += Number(Object.values(element)[0]);
        }
      }
      return price;
    },
    description: generateDescription(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    photos: generatePhoto(),
  };
};

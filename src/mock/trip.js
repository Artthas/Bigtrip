import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeng', 'Restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);
  
  return types[randomIndex];
}

const generateDestination = () => {
  const destinations = ['Amsterdam', 'Geneva', 'Chamonix'];
  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
}

const generateOffer = (type) => {
  const offers = {
    'Taxi': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Bus': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Train': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Ship': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Drive': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Flight': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Check-in': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Sightseeng': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
    'Restaurant': [{'Add luggage': '50'}, {'Switch to comfort': '80'}, {'Add meal': '15'}, {'Choose seats': '5'}, {'Travel by train': '40'}],
  }

  let newOffers = [];

  console.log(type);
  console.log(offers[type]);
  
  for (let element of offers[type]) {
    if (getRandomInteger(0, 1)) {
      newOffers.push(element);
    } else {
      continue;
    }
  }

  console.log(newOffers);

  return newOffers;
}

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
    let index = getRandomInteger(0, newDescriptions.length - 1);
    description += newDescriptions[index];
    newDescriptions.splice(index, 1);
  }

  return description;
}

const generatePhoto = () => {
  const photos = [];

  for (let i = 0; i < getRandomInteger(1, 6); i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 20)}`);
  }

  new Set(photos);

  return photos;
}

const generateTime = (daysGap) => {
  return dayjs().add(daysGap, 'day').toDate();
};

export const generateTrip = () => {
  const daysGapStartTime = getRandomInteger(0, 7);
  const daysGapEndTime = getRandomInteger(7, 14);

  return {
    type: generateType(),
    destination: generateDestination(),
    startTime: generateTime(daysGapStartTime),
    endTime: generateTime(daysGapEndTime),
    get duration() {
      return daysGapEndTime - daysGapStartTime;
    },
    price: getRandomInteger(15, 150),
    get offers() {
      return generateOffer(this.type);
    },
    description: generateDescription(),
    isFavorite: true,
    photos: generatePhoto(),
  }
};

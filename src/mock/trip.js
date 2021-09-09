import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common.js';

const generateType = () => {
  const types = {
    'Taxi': '',
    'Bus': '',
    'Train': '',
    'Ship': '',
    'Drive': '',
    'Flight': '',
    'Check-in': '',
    'Sightseeing': '',
    'Restaurant': '',
  };

  const randomIndex = getRandomInteger(0, Object.keys(types).length - 1);

  types[Object.keys(types)[randomIndex]] = 'checked';

  return types;
};

const generateDestination = () => {
  const destinations = ['Amsterdam', 'Geneva', 'Chamonix', 'Helsinki', 'Oslo', 'Kopenhagen', 'Den Haag', 'Rotterdam', 'Saint Petersburg', 'Moscow', 'Sochi', 'Tokio', 'Kioto', 'Nagasaki', 'Hiroshima', 'Berlin', 'Munich', 'Frankfurt', 'Vien', 'Rome', 'Naples', 'Venice', 'Milan', 'Monaco', 'Paris', 'Barcelona', 'Valencia', 'Madrid'];
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

  const offers = {
    'Taxi': [{'Upgrade to a business class': '190', isChecked: isChecked()}, {'Choose the radio station': '30', isChecked: isChecked()}, {'Choose temperature': '170', isChecked: isChecked()}, {'Drive quickly, I\'m in a hurry': '100', isChecked: isChecked()}, {'Drive slowly': '110', isChecked: isChecked()}],
    'Bus': [{'Infotainment system': '50', isChecked: isChecked()}, {'Order meal': '100', isChecked: isChecked()}, {'Choose seats': '190', isChecked: isChecked()}],
    'Train': [{'Book a taxi at the arrival point': '110', isChecked: isChecked()}, {'Order a breakfast': '80', isChecked: isChecked()}, {'Wake up at a certain time': '140', isChecked: isChecked()}],
    'Flight': [{'Choose meal': '120', isChecked: isChecked()}, {'Choose seats': '90', isChecked: isChecked()}, {'Upgrade to comfort class': '120', isChecked: isChecked()}, {'Upgrade to business class': '120', isChecked: isChecked()}, {'Add luggage': '170', isChecked: isChecked()}, {'Business lounge': '160', isChecked: isChecked()}],
    'Check-in': [{'Choose the time of check-in': '70', isChecked: isChecked()}, {'Choose the time of check-out': '190', isChecked: isChecked()}, {'Add breakfast': '110', isChecked: isChecked()}, {'Laundry': '140', isChecked: isChecked()}, {'Order a meal from the restaurant': '30', isChecked: isChecked()}],
    'Sightseeing': null,
    'Ship': [{'Choose meal': '130', isChecked: isChecked()}, {'Choose seats': '160', isChecked: isChecked()}, {'Upgrade to comfort class': '170', isChecked: isChecked()}, {'Upgrade to business class': '150', isChecked: isChecked()}, {'Add luggage': '100', isChecked: isChecked()}, {'Business lounge': '40', isChecked: isChecked()}],
    'Drive': [{'Choose comfort class': '110', isChecked: isChecked()}, {'Choose business class': '180', isChecked: isChecked()}],
    'Restaurant': [{'Choose live music': '150', isChecked: isChecked()}, {'Choose VIP area': '70', isChecked: isChecked()}],
  };

  return offers;
};

const generateDescription = () => {
  const descriptions = {
    'Amsterdam': 'Amsterdam, is a beautiful city, a true asian pearl, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'Geneva': 'Geneva, with a beautiful old town.',
    'Chamonix': 'Chamonix, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'Helsinki': 'Helsinki, is a beautiful city, with a beautiful old town, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'Oslo': 'Oslo, is a beautiful city, in a middle of Europe, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction.',
    'Kopenhagen': 'Kopenhagen, a true asian pearl, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    'Den Haag': 'Den Haag, a true asian pearl, for those who value comfort and coziness.',
    'Rotterdam': 'Rotterdam, a true asian pearl, middle-eastern paradise, a perfect place to stay with a family.',
    'Saint Petersburg': 'Saint Petersburg, in a middle of Europe, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.',
    'Moscow': 'Moscow, a true asian pearl, middle-eastern paradise.',
    'Sochi': 'Sochi, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'Tokio': 'Tokio, with a beautiful old town, middle-eastern paradise.',
    'Kioto': 'Kioto, is a beautiful city, with crowded streets, with an embankment of a mighty river as a centre of attraction.',
    'Nagasaki': 'Nagasaki, is a beautiful city, in a middle of Europe, for those who value comfort and coziness.',
    'Hiroshima': 'Hiroshima, for those who value comfort and coziness, a perfect place to stay with a family.',
    'Berlin': 'Berlin, is a beautiful city.',
    'Munich': 'Munich, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.',
    'Frankfurt': 'Frankfurt, a true asian pearl, with crowded streets, with a beautiful old town, a perfect place to stay with a family.',
    'Vien': 'Vien, with crowded streets, with a beautiful old town, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    'Rome': 'Rome, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    'Naples': 'Naples, a true asian pearl, in a middle of Europe, with an embankment of a mighty river as a centre of attraction.',
    'Venice': 'Venice, with crowded streets, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    'Milan': 'Milan, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.',
    'Monaco': 'Monaco, with a beautiful old town, famous for its crowded street markets with the best street food in Asia.',
    'Paris': 'Paris, with crowded streets, in a middle of Europe, with a beautiful old town.',
    'Barcelona': 'Barcelona, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'Valencia': 'Valencia, is a beautiful city, a true asian pearl, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.',
    'Madrid': 'Madrid, middle-eastern paradise, for those who value comfort and coziness.',
  };
  return descriptions;
};

const generatePhoto = () => {
  const photos = {
    'Amsterdam': [{'Amsterdam city centre': 'http://picsum.photos/300/200?r=0.47562367158941554'}, {'Amsterdam street market': 'http://picsum.photos/300/200?r=0.45796944178928234'}, {'Amsterdam central station': 'http://picsum.photos/300/200?r=0.009175818727754637'}, {'Amsterdam park': 'http://picsum.photos/300/200?r=0.3425074151050318'}, {'Amsterdam city centre': 'http://picsum.photos/300/200?r=0.4643195654902572'}, {'Amsterdam street market': 'http://picsum.photos/300/200?r=0.14996535405101508'}, {'Amsterdam park': 'http://picsum.photos/300/200?r=0.469185408474907'}, {'Amsterdam city centre': 'http://picsum.photos/300/200?r=0.6732046547539619'}],
    'Geneva': [{'Geneva zoo': 'http://picsum.photos/300/200?r=0.016608600208646296'}, {'Geneva street market': 'http://picsum.photos/300/200?r=0.5610019924835323'}, {'Geneva parliament building': 'http://picsum.photos/300/200?r=0.27111597018091405'}, {'Geneva embankment': 'http://picsum.photos/300/200?r=0.18735026569560187'}, {'Geneva biggest supermarket': 'http://picsum.photos/300/200?r=0.38990166933194303'}, {'Geneva biggest supermarket': 'http://picsum.photos/300/200?r=0.18236379103343547'}],
    'Chamonix': [{'Chamonix embankment': 'http://picsum.photos/300/200?r=0.45476391526901105'}, {'Chamonix city centre': 'http://picsum.photos/300/200?r=0.566758784955685'}, {'Chamonix city centre': 'http://picsum.photos/300/200?r=0.3594335201582288'}, {'Chamonix kindergarten': 'http://picsum.photos/300/200?r=0.015965298341432232'}, {'Chamonix parliament building': 'http://picsum.photos/300/200?r=0.232413129206684'}],
    'Helsinki': [{'Helsinki parliament building': 'http://picsum.photos/300/200?r=0.9300600706573932'}, {'Helsinki street market': 'http://picsum.photos/300/200?r=0.03495283756189438'}, {'Helsinki central station': 'http://picsum.photos/300/200?r=0.04530071702967242'}, {'Helsinki central station': 'http://picsum.photos/300/200?r=0.795215492060511'}, {'Helsinki embankment': 'http://picsum.photos/300/200?r=0.9008893850315811'}],
    'Oslo': [{'Oslo central station': 'http://picsum.photos/300/200?r=0.8837486331948345'}, {'Oslo city centre': 'http://picsum.photos/300/200?r=0.34428219240581415'}, {'Oslo street market': 'http://picsum.photos/300/200?r=0.9434655547853141'}, {'Oslo central station': 'http://picsum.photos/300/200?r=0.6548760494327122'}, {'Oslo embankment': 'http://picsum.photos/300/200?r=0.6654320302914012'}, {'Oslo parliament building': 'http://picsum.photos/300/200?r=0.8881672304114943'}, {'Oslo street market': 'http://picsum.photos/300/200?r=0.9749010149060713'}, {'Oslo zoo': 'http://picsum.photos/300/200?r=0.03452679944983106'}],
    'Kopenhagen': [{'Kopenhagen park': 'http://picsum.photos/300/200?r=0.5457052728751646'}, {'Kopenhagen street market': 'http://picsum.photos/300/200?r=0.07149730750342931'}, {'Kopenhagen parliament building': 'http://picsum.photos/300/200?r=0.985349404396237'}, {'Kopenhagen zoo': 'http://picsum.photos/300/200?r=0.39281748754404067'}, {'Kopenhagen park': 'http://picsum.photos/300/200?r=0.3894418629536598'}, {'Kopenhagen city centre': 'http://picsum.photos/300/200?r=0.8992727122383115'}, {'Kopenhagen zoo': 'http://picsum.photos/300/200?r=0.18374049717483598'}, {'Kopenhagen kindergarten': 'http://picsum.photos/300/200?r=0.740763945426022'}, {'Kopenhagen biggest supermarket': 'http://picsum.photos/300/200?r=0.24402255808869722'}],
    'Den Haag': [{'Den Haag city centre': 'http://picsum.photos/300/200?r=0.28962151750027676'}, {'Den Haag biggest supermarket': 'http://picsum.photos/300/200?r=0.2481022527821375'}],
    'Rotterdam': [{'Rotterdam kindergarten': 'http://picsum.photos/300/200?r=0.12963271918986297'}, {'Rotterdam kindergarten': 'http://picsum.photos/300/200?r=0.30559572476169805'}, {'Rotterdam central station': 'http://picsum.photos/300/200?r=0.9235916896548875'}, {'Rotterdam biggest supermarket': 'http://picsum.photos/300/200?r=0.7134585067868473'}, {'Rotterdam park': 'http://picsum.photos/300/200?r=0.9455833778904308'}],
    'Saint Petersburg': [{'Saint Petersburg embankment': 'http://picsum.photos/300/200?r=0.7763033410773386'}, {'Saint Petersburg parliament building': 'http://picsum.photos/300/200?r=0.4279663393686226'}, {'Saint Petersburg city centre': 'http://picsum.photos/300/200?r=0.5035253199128416'}, {'Saint Petersburg street market': 'http://picsum.photos/300/200?r=0.13734249350260286'}, {'Saint Petersburg kindergarten': 'http://picsum.photos/300/200?r=0.895882923888863'}],
    'Moscow': [{'Moscow central station': 'http://picsum.photos/300/200?r=0.8687522217243053'}, {'Moscow biggest supermarket': 'http://picsum.photos/300/200?r=0.2987981401770865'}, {'Moscow embankment': 'http://picsum.photos/300/200?r=0.6596195641289535'}, {'Moscow zoo': 'http://picsum.photos/300/200?r=0.6740469855425761'}, {'Moscow park': 'http://picsum.photos/300/200?r=0.6911727917783943'}, {'Moscow biggest supermarket': 'http://picsum.photos/300/200?r=0.8943845114658535'}, {'Moscow park': 'http://picsum.photos/300/200?r=0.6808426824384126'}],
    'Sochi': [{'Sochi kindergarten': 'http://picsum.photos/300/200?r=0.12520876544288417'}, {'Sochi zoo': 'http://picsum.photos/300/200?r=0.21939095360909455'}, {'Sochi city centre': 'http://picsum.photos/300/200?r=0.8464406295070563'}, {'Sochi city centre': 'http://picsum.photos/300/200?r=0.5673310336290165'}],
    'Tokio': [{'Tokio kindergarten': 'http://picsum.photos/300/200?r=0.5993197713092049'}, {'Tokio zoo': 'http://picsum.photos/300/200?r=0.6113710925410762'}, {'Tokio embankment': 'http://picsum.photos/300/200?r=0.3241783012426729'}, {'Tokio biggest supermarket': 'http://picsum.photos/300/200?r=0.6855917843929746'}, {'Tokio biggest supermarket': 'http://picsum.photos/300/200?r=0.021231085910505154'}, {'Tokio kindergarten': 'http://picsum.photos/300/200?r=0.6597351106188911'}],
    'Kioto': [{'Kioto street market': 'http://picsum.photos/300/200?r=0.1568798597505523'}, {'Kioto city centre': 'http://picsum.photos/300/200?r=0.4245018696259355'}, {'Kioto city centre': 'http://picsum.photos/300/200?r=0.15956407022805097'}, {'Kioto zoo': 'http://picsum.photos/300/200?r=0.021941530605843917'}, {'Kioto zoo': 'http://picsum.photos/300/200?r=0.9547295889545451'}, {'Kioto zoo': 'http://picsum.photos/300/200?r=0.8701038477084728'}, {'Kioto embankment': 'http://picsum.photos/300/200?r=0.41386360150217083'}],
    'Nagasaki': [{'Nagasaki central station': 'http://picsum.photos/300/200?r=0.4179074264063216'}, {'Nagasaki city centre': 'http://picsum.photos/300/200?r=0.8040757579306836'}, {'Nagasaki central station': 'http://picsum.photos/300/200?r=0.7554375516777316'}, {'Nagasaki zoo': 'http://picsum.photos/300/200?r=0.8627891858260301'}, {'Nagasaki embankment': 'http://picsum.photos/300/200?r=0.35122793472998226'}, {'Nagasaki biggest supermarket': 'http://picsum.photos/300/200?r=0.6767655329783802'}, {'Nagasaki zoo': 'http://picsum.photos/300/200?r=0.3689586984682329'}],
    'Hiroshima': [{'Hiroshima parliament building': 'http://picsum.photos/300/200?r=0.39437255603268606'}, {'Hiroshima street market': 'http://picsum.photos/300/200?r=0.8862492829884243'}, {'Hiroshima zoo': 'http://picsum.photos/300/200?r=0.9384914120367531'}, {'Hiroshima biggest supermarket': 'http://picsum.photos/300/200?r=0.8132366006439296'}, {'Hiroshima kindergarten': 'http://picsum.photos/300/200?r=0.36820675880837417'}],
    'Berlin': [{'Berlin central station': 'http://picsum.photos/300/200?r=0.053914426152660955'}, {'Berlin parliament building': 'http://picsum.photos/300/200?r=0.8067215644126844'}, {'Berlin park': 'http://picsum.photos/300/200?r=0.9903116868970463'}, {'Berlin street market': 'http://picsum.photos/300/200?r=0.9676400937586105'}, {'Berlin parliament building': 'http://picsum.photos/300/200?r=0.2708775549981015'}],
    'Munich': [{'Munich parliament building': 'http://picsum.photos/300/200?r=0.7399151759739422'}, {'Munich parliament building': 'http://picsum.photos/300/200?r=0.9809672784464474'}, {'Munich kindergarten': 'http://picsum.photos/300/200?r=0.2241367027254062'}, {'Munich street market': 'http://picsum.photos/300/200?r=0.6518342758833815'}],
    'Frankfurt': [{'Frankfurt central station': 'http://picsum.photos/300/200?r=0.5997803513254303'}, {'Frankfurt park': 'http://picsum.photos/300/200?r=0.04920015129374611'}, {'Frankfurt kindergarten': 'http://picsum.photos/300/200?r=0.235959793642194'}, {'Frankfurt city centre': 'http://picsum.photos/300/200?r=0.022416665563709026'}, {'Frankfurt biggest supermarket': 'http://picsum.photos/300/200?r=0.16194044289184406'}],
    'Vien': [{'Vien park': 'http://picsum.photos/300/200?r=0.5992044299695509'}, {'Vien biggest supermarket': 'http://picsum.photos/300/200?r=0.34960539038527383'}, {'Vien city centre': 'http://picsum.photos/300/200?r=0.9593789216584814'}, {'Vien street market': 'http://picsum.photos/300/200?r=0.4271735365969387'}, {'Vien street market': 'http://picsum.photos/300/200?r=0.7017792391850688'}],
    'Rome': [{'Rome kindergarten': 'http://picsum.photos/300/200?r=0.7474329810341251'}, {'Rome parliament building': 'http://picsum.photos/300/200?r=0.23738555998464594'}, {'Rome kindergarten': 'http://picsum.photos/300/200?r=0.28752196844896183'}, {'Rome city centre': 'http://picsum.photos/300/200?r=0.660496437674837'}, {'Rome biggest supermarket': 'http://picsum.photos/300/200?r=0.19342509903293004'}, {'Rome park': 'http://picsum.photos/300/200?r=0.6413184272856436'}, {'Rome park': 'http://picsum.photos/300/200?r=0.37393098998103125'}],
    'Naples': [{'Naples biggest supermarket': 'http://picsum.photos/300/200?r=0.7659970158260954'}, {'Naples parliament building': 'http://picsum.photos/300/200?r=0.4088270274560222'}, {'Naples central station': 'http://picsum.photos/300/200?r=0.6033473218600653'}, {'Naples parliament building': 'http://picsum.photos/300/200?r=0.2560886094647772'}, {'Naples street market': 'http://picsum.photos/300/200?r=0.7220763698765966'}, {'Naples city centre': 'http://picsum.photos/300/200?r=0.4035946143951301'}],
    'Venice': [{'Venice city centre': 'http://picsum.photos/300/200?r=0.2853274165617381'}, {'Venice biggest supermarket': 'http://picsum.photos/300/200?r=0.8046439964065331'}, {'Venice embankment': 'http://picsum.photos/300/200?r=0.6408645520974348'}, {'Venice city centre': 'http://picsum.photos/300/200?r=0.5357167192334931'}, {'Venice central station': 'http://picsum.photos/300/200?r=0.4109082451246846'}, {'Venice biggest supermarket': 'http://picsum.photos/300/200?r=0.5199280229302259'}],
    'Milan': [{'Milan zoo': 'http://picsum.photos/300/200?r=0.9693437887824545'}, {'Milan biggest supermarket': 'http://picsum.photos/300/200?r=0.4836989315821576'}, {'Milan central station': 'http://picsum.photos/300/200?r=0.11759759125779357'}, {'Milan street market': 'http://picsum.photos/300/200?r=0.18577819842657206'}, {'Milan central station': 'http://picsum.photos/300/200?r=0.9182911081609781'}, {'Milan kindergarten': 'http://picsum.photos/300/200?r=0.14342454204096278'}],
    'Monaco': [{'Monaco kindergarten': 'http://picsum.photos/300/200?r=0.34670889044856357'}, {'Monaco street market': 'http://picsum.photos/300/200?r=0.6022328469183784'}, {'Monaco park': 'http://picsum.photos/300/200?r=0.7108440824975608'}, {'Monaco kindergarten': 'http://picsum.photos/300/200?r=0.029303521720762005'}, {'Monaco central station': 'http://picsum.photos/300/200?r=0.8470336900972602'}, {'Monaco embankment': 'http://picsum.photos/300/200?r=0.3775265689923353'}, {'Monaco city centre': 'http://picsum.photos/300/200?r=0.4340416533647362'}, {'Monaco street market': 'http://picsum.photos/300/200?r=0.15134723189936694'}],
    'Paris': [{'Paris central station': 'http://picsum.photos/300/200?r=0.21826201095908448'}, {'Paris zoo': 'http://picsum.photos/300/200?r=0.4726223860429499'}, {'Paris kindergarten': 'http://picsum.photos/300/200?r=0.6362946219342007'}, {'Paris kindergarten': 'http://picsum.photos/300/200?r=0.27789828249488857'}, {'Paris street market': 'http://picsum.photos/300/200?r=0.47527959161246414'}, {'Paris street market': 'http://picsum.photos/300/200?r=0.2551056272373238'}],
    'Barcelona': [{'Barcelona kindergarten': 'http://picsum.photos/300/200?r=0.6747362176715934'}, {'Barcelona city centre': 'http://picsum.photos/300/200?r=0.020453712316566453'}, {'Barcelona embankment': 'http://picsum.photos/300/200?r=0.7580902656246251'}],
    'Valencia': [{'Valencia parliament building': 'http://picsum.photos/300/200?r=0.27512806820320757'}, {'Valencia city centre': 'http://picsum.photos/300/200?r=0.37950273918812316'}, {'Valencia kindergarten': 'http://picsum.photos/300/200?r=0.264504953750349'}, {'Valencia embankment': 'http://picsum.photos/300/200?r=0.5823351563750878'}, {'Valencia biggest supermarket': 'http://picsum.photos/300/200?r=0.41547020670552093'}, {'Valencia parliament building': 'http://picsum.photos/300/200?r=0.28164663667035184'}],
    'Madrid': [{'Madrid biggest supermarket': 'http://picsum.photos/300/200?r=0.2989558307423925'}, {'Madrid kindergarten': 'http://picsum.photos/300/200?r=0.38349506704621694'}, {'Madrid city centre': 'http://picsum.photos/300/200?r=0.128580024607571'}, {'Madrid park': 'http://picsum.photos/300/200?r=0.796289646036177'}, {'Madrid street market': 'http://picsum.photos/300/200?r=0.08798486986510357'}, {'Madrid central station': 'http://picsum.photos/300/200?r=0.7958516162662075'}, {'Madrid parliament building': 'http://picsum.photos/300/200?r=0.14915718802652744'}, {'Madrid biggest supermarket': 'http://picsum.photos/300/200?r=0.19249532377823542'}],
  };
  return photos;
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
  const minutesGapStart = getRandomInteger(1, 60) ;
  const minutesGapEnd = getRandomInteger(1, 60) ;
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
    _offers: generateOffer(),
    get offers() {
      return this._offers[Object.keys(this.type).find((key) => this.type[key] === 'checked')];
    },
    _firstPrice: getRandomInteger(40, 200),
    get price() {
      if (this.offers !== null) {
        let price = this._firstPrice;
        for (const element of this.offers) {
          if (element.isChecked === 'checked') {
            price += Number(Object.values(element)[0]);
          }
        }
        return price;
      } else  {
        return this._firstPrice;
      }
    },
    _description: generateDescription(),
    get description() {
      return this._description[this.destination];
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
    _photos: generatePhoto(),
    get photos() {
      return this._photos[this.destination];
    },
  };
};
// Commentary

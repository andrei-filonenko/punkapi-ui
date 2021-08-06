import { IBeer } from '../app/schema'

export const beer: IBeer = {
  id: 227,
  name: 'Brewdog Vs Beavertown',
  tagline: 'Coffee And Cigarettes.',
  first_brewed: '06/2016',
  description:
    'Loaded with roasty coffee notes and balanced with complex tobacco character. With smoky flavours from the malt, our Beavertown Collab is barrel-aged, but we don’t know for how long until its ready!',
  image_url: 'https://images.punkapi.com/v2/227.png',
  abv: 9.2,
  ibu: 50,
  target_fg: 1085,
  target_og: 1016,
  ebc: 78.8,
  srm: 40,
  ph: 4.2,
  attenuation_level: 81,
  volume: {
    value: 20,
    unit: 'litres',
  },
  boil_volume: {
    value: 25,
    unit: 'litres',
  },
  method: {
    mash_temp: [
      {
        temp: {
          value: 65,
          unit: 'celsius',
        },
        duration: 75,
      },
    ],
    fermentation: {
      temp: {
        value: 21,
        unit: 'celsius',
      },
    },
    twist: null,
  },
  ingredients: {
    malt: [
      {
        name: 'Pale Ale',
        amount: {
          value: 2.2,
          unit: 'kilograms',
        },
      },
      {
        name: 'Caramalt',
        amount: {
          value: 0.3,
          unit: 'kilograms',
        },
      },
      {
        name: 'Dark Crystal',
        amount: {
          value: 0.3,
          unit: 'kilograms',
        },
      },
      {
        name: 'Smoked Weyermann',
        amount: {
          value: 1.8,
          unit: 'kilograms',
        },
      },
      {
        name: 'Flaked Oats',
        amount: {
          value: 0.6,
          unit: 'kilograms',
        },
      },
      {
        name: 'Brown',
        amount: {
          value: 0.6,
          unit: 'kilograms',
        },
      },
      {
        name: 'Black Malt',
        amount: {
          value: 0.1,
          unit: 'kilograms',
        },
      },
      {
        name: 'Chocolate',
        amount: {
          value: 0.5,
          unit: 'kilograms',
        },
      },
      {
        name: 'Munich',
        amount: {
          value: 0.6,
          unit: 'kilograms',
        },
      },
      {
        name: 'Dark Muscavado (Wort Kettle)',
        amount: {
          value: 1,
          unit: 'kilograms',
        },
      },
    ],
    hops: [
      {
        name: 'Magnum',
        amount: {
          value: 20,
          unit: 'grams',
        },
        add: 'start',
        attribute: 'bitter',
      },
      {
        name: 'Chinook',
        amount: {
          value: 20,
          unit: 'grams',
        },
        add: 'start',
        attribute: 'bitter',
      },
    ],
    yeast: 'Wyeast 1272 - American Ale II™',
  },
  food_pairing: [
    'Ancho pulled beef chilli',
    'Aged cheddar, chickpea & roasted vegetable tagine',
  ],
  brewers_tips: 'Add your Dark Muscavado for the last ten minutes of the boil.',
  contributed_by: 'Sam Mason <samjbmason>',
}

export const beer2: IBeer = {
  id: 83,
  name: 'Comet',
  tagline: 'Single Hop India Pale Ale',
  first_brewed: '02/2014',
  description:
    'A potently bitter hop variety originally grown in the US around 40 years ago, Comet has been newly resurrected - this German version has bold resinous grapefruit flavours, which add a huge fresh hop aroma to this IPA.',
  image_url: 'https://images.punkapi.com/v2/83.png',
  abv: 7.2,
  ibu: 70,
  target_fg: 1012,
  target_og: 1067,
  ebc: 30,
  srm: 15,
  ph: 4.4,
  attenuation_level: 82.1,
  volume: {
    value: 20,
    unit: 'litres',
  },
  boil_volume: {
    value: 25,
    unit: 'litres',
  },
  method: {
    mash_temp: [
      {
        temp: {
          value: 65,
          unit: 'celsius',
        },
        duration: null,
      },
    ],
    fermentation: {
      temp: {
        value: 19,
        unit: 'celsius',
      },
    },
    twist: null,
  },
  ingredients: {
    malt: [
      {
        name: 'Extra Pale',
        amount: {
          value: 5.65,
          unit: 'kilograms',
        },
      },
      {
        name: 'Caramalt',
        amount: {
          value: 0.31,
          unit: 'kilograms',
        },
      },
      {
        name: 'Dark Crystal',
        amount: {
          value: 0.06,
          unit: 'kilograms',
        },
      },
    ],
    hops: [
      {
        name: 'Comet',
        amount: {
          value: 15,
          unit: 'grams',
        },
        add: 'start',
        attribute: 'bitter',
      },
      {
        name: 'Comet',
        amount: {
          value: 25,
          unit: 'grams',
        },
        add: 'middle',
        attribute: 'flavour',
      },
      {
        name: 'Comet',
        amount: {
          value: 37.5,
          unit: 'grams',
        },
        add: 'end',
        attribute: 'flavour',
      },
      {
        name: 'Comet',
        amount: {
          value: 250,
          unit: 'grams',
        },
        add: 'dry hop',
        attribute: 'aroma',
      },
    ],
    yeast: 'Wyeast 1056 - American Ale™',
  },
  food_pairing: [
    'Margherita pizza with chili flakes',
    'Spicy Thai peanut satay',
    'Panna cotta with a grapefruit tuile',
  ],
  brewers_tips:
    'Experiment with other high alpha hops during dry-hop to discover their aroma and flavour characteristics.',
  contributed_by: 'Ali Skinner <AliSkinner>',
}

export const nonAlcoholic = [
  {
    id: 31,
    name: 'Nanny State',
    tagline: 'Alcohol Free Hoppy Ale.',
    first_brewed: '08/2009',
    description:
      'Brewing a full flavoured craft beer at 0.5% is no easy task. Packed with loads of Centennial, Amarillo, Columbus, Cascade and Simcoe hops, dry hopped to the brink and back and sitting at 55 IBUs, Nanny State is a force to be reckoned with. With a backbone of 8 different specialty malts, Nanny State will tantalise your taste buds and leave you yearning for more.',
    image_url: 'https://images.punkapi.com/v2/31.png',
    abv: 0.5,
    ibu: 55,
    target_fg: 1005,
    target_og: 1007,
    ebc: 30,
    srm: 15,
    ph: 4.4,
    attenuation_level: 28.6,
    volume: {
      value: 20,
      unit: 'litres',
    },
    boil_volume: {
      value: 25,
      unit: 'litres',
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: 65,
            unit: 'celsius',
          },
          duration: 30,
        },
      ],
      fermentation: {
        temp: {
          value: 19,
          unit: 'celsius',
        },
      },
      twist: null,
    },
    ingredients: {
      malt: [
        {
          name: 'Munich',
          amount: {
            value: 0.13,
            unit: 'kilograms',
          },
        },
        {
          name: 'Caramalt',
          amount: {
            value: 0.19,
            unit: 'kilograms',
          },
        },
        {
          name: 'Crystal 150',
          amount: {
            value: 0.06,
            unit: 'kilograms',
          },
        },
        {
          name: 'Amber',
          amount: {
            value: 0.03,
            unit: 'kilograms',
          },
        },
        {
          name: 'Dark Crystal',
          amount: {
            value: 0.13,
            unit: 'kilograms',
          },
        },
        {
          name: 'Chocolate',
          amount: {
            value: 0.06,
            unit: 'kilograms',
          },
        },
        {
          name: 'Wheat',
          amount: {
            value: 0.06,
            unit: 'kilograms',
          },
        },
        {
          name: 'Rye',
          amount: {
            value: 0.13,
            unit: 'kilograms',
          },
        },
      ],
      hops: [
        {
          name: 'Amarillo',
          amount: {
            value: 6.3,
            unit: 'grams',
          },
          add: 'start',
          attribute: 'bitter',
        },
        {
          name: 'Simcoe',
          amount: {
            value: 5,
            unit: 'grams',
          },
          add: 'start',
          attribute: 'bitter',
        },
        {
          name: 'Centennial',
          amount: {
            value: 6.3,
            unit: 'grams',
          },
          add: 'start',
          attribute: 'bitter',
        },
        {
          name: 'Amarillo',
          amount: {
            value: 6.3,
            unit: 'grams',
          },
          add: 'middle',
          attribute: 'flavour',
        },
        {
          name: 'Simcoe',
          amount: {
            value: 2.5,
            unit: 'grams',
          },
          add: 'middle',
          attribute: 'flavour',
        },
        {
          name: 'Centennial',
          amount: {
            value: 6.3,
            unit: 'grams',
          },
          add: 'middle',
          attribute: 'flavour',
        },
        {
          name: 'Amarillo',
          amount: {
            value: 5,
            unit: 'grams',
          },
          add: 'end',
          attribute: 'flavour',
        },
        {
          name: 'Simcoe',
          amount: {
            value: 5,
            unit: 'grams',
          },
          add: 'end',
          attribute: 'flavour',
        },
        {
          name: 'Cascade',
          amount: {
            value: 12.5,
            unit: 'grams',
          },
          add: 'end',
          attribute: 'flavour',
        },
        {
          name: 'Ahtanum',
          amount: {
            value: 12.5,
            unit: 'grams',
          },
          add: 'end',
          attribute: 'flavour',
        },
        {
          name: 'Centennial',
          amount: {
            value: 50,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Cascade',
          amount: {
            value: 50,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Ahtanum',
          amount: {
            value: 25,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Simcoe',
          amount: {
            value: 25,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
        {
          name: 'Columbus',
          amount: {
            value: 37.5,
            unit: 'grams',
          },
          add: 'dry hop',
          attribute: 'aroma',
        },
      ],
      yeast: 'Wyeast 1056 - American Ale™',
    },
    food_pairing: ['Earthy mushroom pasta'],
    brewers_tips:
      "Get hops in every stage of the brewing process - mash, run off boil and flame off. There's not too much malt body, so the more hops the better.",
    contributed_by: 'Sam Mason <samjbmason>',
  },
  {
    id: 299,
    name: 'Raspberry Popsicle Parade',
    tagline: 'Raspberry Berliner Weisse.',
    first_brewed: '2018',
    description:
      'A draft-only kettle-soured raspberry ale, brewed to just 0.5% ABV, using our knowledge from brewing both Blitz and Nanny State. Aromas of fresh raspberry juice, soft red berries, and a blast of lemon zest, with a juicy palate encompassing zingy acidity and the smooth velvety note of oats, rounding out this low-ABV juicebox.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 0.5,
    ibu: 8,
    target_fg: 1005,
    target_og: 1009,
    ebc: 8,
    srm: 4,
    ph: 3.5,
    attenuation_level: 44,
    volume: {
      value: 20,
      unit: 'litres',
    },
    boil_volume: {
      value: 25,
      unit: 'litres',
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: 60,
            unit: 'celsius',
          },
          duration: 80,
        },
      ],
      fermentation: {
        temp: {
          value: 21,
          unit: 'celsius',
        },
      },
      twist: null,
    },
    ingredients: {
      malt: [
        {
          name: 'Maris Otter',
          amount: {
            value: 0.227,
            unit: 'kilograms',
          },
        },
        {
          name: 'Torrified Wheat',
          amount: {
            value: 0.227,
            unit: 'kilograms',
          },
        },
        {
          name: 'Carapils',
          amount: {
            value: 0.113,
            unit: 'kilograms',
          },
        },
        {
          name: 'Flaked Oats',
          amount: {
            value: 0.113,
            unit: 'kilograms',
          },
        },
      ],
      hops: [
        {
          name: 'Magnum',
          amount: {
            value: 2,
            unit: 'grams',
          },
          add: '45',
          attribute: 'Bittering',
        },
        {
          name: 'Raspberry Juice',
          amount: {
            value: 800,
            unit: 'grams',
          },
          add: 'Kettle',
          attribute: 'Flavour',
        },
      ],
      yeast: 'Wyeast 1056 - American Ale™',
    },
    food_pairing: [
      "Walnut and goat's cheese salad with pomegranate dressing",
      'Cranachan pudding',
      'Panna cotta',
    ],
    brewers_tips:
      'If you don’t need it to be low ABV, try tripling the amount of malt to get more body. Experiment with different sources for lactic acid bacteria, like unpasteurised yogurt or sour dough.',
    contributed_by: 'John Jenkman <johnjenkman>',
  },
]

export const loadBeerActionDone = (b: IBeer = beer) => ({
  type: 'beers/fetchRandomBeer/fulfilled',
  payload: b,
  meta: {
    requestId: 'random',
    requestStatus: 'fulfilled',
  },
})

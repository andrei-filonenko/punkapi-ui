import { Record, Number, String, Literal, Union, Array, Static } from 'runtypes'

const UnitValue = Record({
  value: Number.nullable(),
  unit: String,
})

export const Volume = UnitValue.extend({
  unit: Union(Literal('ml'), Literal('litres')),
})

export const Temperature = UnitValue.extend({
  unit: Literal('celsius'),
})

export const Total = UnitValue.extend({
  unit: Literal('total'),
})

export const Weight = UnitValue.extend({
  unit: Union(Literal('grams'), Literal('kilograms'), Literal('kilogram')),
})

export const BoilSpec = Record({
  temp: Temperature,
  duration: Number.nullable(),
})

export const Hop = Record({
  name: String.nullable(),
  amount: Union(Weight, Volume, Total),
  add: String.nullable(),
  attribute: String,
})

export const Malt = Record({
  name: String.nullable(),
  amount: Weight,
})
export type IMalt = Static<typeof Malt>

export const Ingredients = Record({
  malt: Array(Malt),
  hops: Array(Hop),
  yeast: String.nullable(),
})

export const Fermentation = Record({
  temp: Temperature,
})

export const Method = Record({
  mash_temp: Array(BoilSpec),
  fermentation: Fermentation,
  twist: String.nullable(),
})

export const Beer = Record({
  abv: Number.nullable(),
  attenuation_level: Number.nullable(),
  boil_volume: Volume.nullable(),
  brewers_tips: String.nullable(),
  contributed_by: String.nullable(),
  description: String,
  ebc: Number.nullable(),
  first_brewed: String.nullable(),
  food_pairing: Array(String),
  ibu: Number.nullable(),
  id: Number,
  image_url: String.nullable(),
  ingredients: Ingredients,
  method: Method,
  name: String,
  ph: Number.nullable(),
  srm: Number.nullable(),
  tagline: String.nullable(),
  target_fg: Number.nullable(),
  target_og: Number.nullable(),
  volume: Volume,
})
export type IBeer = Static<typeof Beer>

export const BeerList = Array(Beer)

export const BeerName = String.withBrand('BeerName').withConstraint(
  (str) =>
    !!str.match('^[A-Za-z0-9 -]+$') ||
    'Search text must contain only hyphens, letters, numbers and spaces'
)

export const FormattedDate = BeerName.withBrand('FormattedDate').withConstraint(
  (str) => {
    // FIXME: a proper parser should be implemented, or better use a standard calendar pop up
    return !!Date.parse(str) || 'Can not parse date, use ISO date format'
  }
)

export const BeerQueryParams = Record({
  abv_gt: Number.optional(), // Returns all beers with ABV greater than the supplied number
  abv_lt: Number.optional(), // Returns all beers with ABV less than the supplied number
  ibu_gt: Number.optional(), // Returns all beers with IBU greater than the supplied number
  ibu_lt: Number.optional(), // Returns all beers with IBU less than the supplied number
  ebc_gt: Number.optional(), // Returns all beers with EBC greater than the supplied number
  ebc_lt: Number.optional(), // Returns all beers with EBC less than the supplied number
  beer_name: String.optional(), // Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
  yeast: String.optional(), // Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  brewed_before: String.optional(), // Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
  brewed_after: String.optional(), // Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
  hops: String.optional(), // Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  malt: String.optional(), // Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  food: String.optional(), // Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  ids: String.optional(), // (id|id|...)
  per_page: Number.optional(), // Returns number of beers per page, max=80
  page: Number.optional(), // Returns a page number
})

export type IBeerQueryParams = Static<typeof BeerQueryParams>

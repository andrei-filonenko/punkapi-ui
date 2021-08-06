import { rest } from 'msw';
import { beer } from "../test-utils/fixtures";

export const handlers = [
    rest.get('https://api.punkapi.com/v2/beers/random', (
        req, res, ctx
    ) => res(ctx.status(200), ctx.json(beer)))
]
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//Learn about Next.js API endpoints: https://nextjs.org/learn/basics/api-routes/creating-api-routes#:~:text=Creating%20a%20simple%20API%20endpoint
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

//Serverless Functions (also known as Lambdas).
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

import { Duffel } from '@duffel/api'

//init connection with Duffel
const duffel = new Duffel({
  token: 'duffel_test_ytq7QDzJXlXbsgBVntiQt1QkVH7geRomsKJsYTPuv-V',
})

//get request from NYC -> ATL and ATL -> NYC
const test = duffel.offerRequests.create({
  slices : [{
      origin: "NYC",
      destination: "ATL",
      departure_date: "2021-06-21"
    },{
      origin: "ATL",
      destination: "NYC",
      departure_date: "2021-07-21"
    }
  ],

  passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
  cabin_class: "business",
  return_offers: false
})


//grabbing OFFER_REQUEST_ID from promise and storing in list
var id = await(await (test)).data.id;
duffel.offers.list({
  offer_request_id: id,
  sort: 'total_amount'
})

//IDK WHAT IS GOING ON BUT APPARENTLY USE LIST GENERATOR TO console.log EVERYTHING
const allOffers = duffel.offers.listWithGenerator({ offer_request_id: id})
    
async function wtf(){
  for await (const offer of allOffers) {
    console.log("Offer " + offer.data.id + " costs " + offer.data.total_amount + " " + offer.data.total_currency) 
  }
}
wtf();

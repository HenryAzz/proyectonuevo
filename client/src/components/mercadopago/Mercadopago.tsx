/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import axios from 'axios'

declare const window: any;


export default function MPButton() {

  useEffect(() => {
    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      const response = await axios.get<{ global: string }>(`http://localhost:3001/mercadopago`);

      const data = response.data

      // data.global is the ID that MP returns from the API, it comes from our backend route
      if(data.global) {
        const script = document.createElement('script') // Here we create the empty script tag
        script.type = 'text/javascript' // The type of the script
        script.src = 'https://sdk.mercadopago.com/js/v2' // The link where the script is hosted
        script.setAttribute('data-preference-id', data.global) // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script) // Here we append it to the body of our page

        const mp = new window.MercadoPago("TEST-62756b50-37d0-44b1-96c3-7df66ca36d66", {
          locale: 'es-AR'
        })

        // The ".checkout" is the function that creates the connection between the button and the platform
        mp.checkout({
          preference: {
            id: data.global
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          }
        });
      }
    }

    // Here we just execute the function
    fetchCheckout()
    //eslint-disable-next-line
  }, [])

  return <div className="cho-container"></div>
}

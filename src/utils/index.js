import { GOOGLE_KEY } from "./Config";

export function secondsToHMS(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  return { hours: h, minutes: m, seconds: s };
}

export function getPlaceName(latitude, longitude) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}&language=ar`
  )
    .then(res => res.json())
    .then(json => {
      if (json.status !== "OK") {
        throw new Error(`Geocode error: ${json.status}`);
      }

      // return [
      //   json.results[1].address_components[0].short_name,
      //   ' ',
      //   json.results[1].address_components[1].short_name,
      // ];

      const formattedAddress = json.results[0].formatted_address;

      if (formattedAddress) {
        return [formattedAddress, "", ""];
      }
      return [
        json.results[1].address_components[0].short_name,
        " ",
        json.results[1].address_components[1].short_name
      ];
    })
    .catch(error => {
      console.log("errror", JSON.parse(JSON.stringify(error)));
    });
}

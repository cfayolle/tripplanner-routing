const fetchAttractions = () =>
  fetch("/api")
    .then(result => result.json())
    .catch(err => console.error(err));

const fetchItinerary = (id) =>
  fetch("/api/itineraries/" + id)
    .then(result => result.json())
    .catch(err => console.error(err));
    
const postItinerary = (id, itin) => {
  return fetch("/api/itineraries/" + id, {
    body: JSON.stringify(itin),
    headers: {
      Accept: "application/json",
      "Content-Type": 'application/json'
    },
    method: 'POST'
  })
  .then(result => result.json())
  .catch(err => console.error(err));
}

module.exports = {
  fetchAttractions,
  fetchItinerary,
  postItinerary
};

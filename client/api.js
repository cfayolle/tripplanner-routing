const fetchAttractions = () =>
  fetch("/api")
    .then(result => result.json())
    .catch(err => console.error(err));

const fetchItinerary = (id) =>
  fetch("/api/itineraries/" + id)
    .then(result => result.json())
    .catch(err => console.error(err));

module.exports = {
  fetchAttractions,
  fetchItinerary
};

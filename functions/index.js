const functions = require("firebase-functions");
const fetch = require("node-fetch");
const cors = require("cors")({origin: true}); // Import and configure CORS

exports.fetchGoogleReviews = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const placeId = "ChIJtSTlEffxLIERJPt9TEtn4V8";
    const apiKey = "AIzaSyB828eWioClkkZyTa8MeFPo0w3KPxj3WjY";
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).send("Failed to fetch reviews");
    }
  });
});



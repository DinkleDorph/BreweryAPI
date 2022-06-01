const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/ping", (req, res, next) =>
{
   return res.status(200).json(
   {
      "success": true
   });
});

router.get("/:input", (req, res, next) =>
{
   // basic route validation
   if (req.params.input !== "" && req.params.input != null)
   {
      // pull data
      Axios.get(`https://api.openbrewerydb.org/breweries?by_state=${req.params.input}`)
      .then((response) =>
      {
         return res.status(200).json(response.data);
      })
      .catch((error) => 
      {
         return res.status(400).json(error);
      });
   }
   else 
   {
      return res.status(400).json(
      {
         "error": "Bad Request. Make sure you provided a search term."
      });
   }
});

module.exports = router;

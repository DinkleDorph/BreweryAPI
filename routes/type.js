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
   // basic route validation >> useless
   if (req.params.input !== "" && req.params.input != null)
   {
      // pull data
      Axios.get(`https://api.openbrewerydb.org/breweries?by_type=${req.params.input}`)
      .then((response) =>
      {
         return res.status(200).json(response.data);
      })
      .catch((error) => 
      {
         return res.status(400).json(
         {
            "error": "Bad Request. Make sure you provided a valid search term."
         });
      });
   }
   else 
   {
      return res.status(500).json(
      {
         "error": "Interal error."
      });
   }
});

router.get("/", (req, res, next) => 
{
   return res.status(200).send("You've reached the type route B)");
});

module.exports = router;

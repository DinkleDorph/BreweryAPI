const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/ping", (req, res, next) =>
{
   let myJsonResponse = 
   {
      "success": true
   };
   return res.status(200).json(myJsonResponse);
});

router.get("/state", (req, res, next) =>
{
   (async () => 
   {
      // const parameters = Object.keys(req.query);
      // const values = req.query[parameters];

      if (Object.keys(req.query)[0] === "tags" && req.query[Object.keys(req.query)[0]] !== "" && req.query[Object.keys(req.query)[0]] != null)
      {
         let tags = req.query[Object.keys(req.query)[0]].split(",");
         let allResponses = [];
         let allPosts = [];
         let finalPosts = [];

         // pull data for each tag
         for (let i = 0; i < tags.length; i++)
         {
            await Axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tags[i]}`)
            .then((response) =>
            {
               allResponses.push(response.data.posts);
            });
         }

         // combine & flatten posts from responses
         allResponses.forEach(responseArray => 
         {
            responseArray.forEach(post => 
            {
               allPosts.push(post);
            });
         });

         // remove duplicates
         finalPosts = [... new Set(allPosts)];

         // sort
         if (Object.keys(req.query)[1] === "sortBy" && req.query[Object.keys(req.query)[1]] !== "" && req.query[Object.keys(req.query)[1]] != null)
         {
            if (req.query[Object.keys(req.query)[1]] == "id")
            {
               
            }
            else if (req.query[Object.keys(req.query)[1]] == "reads")
            {
               if (Object.keys(req.query)[2] === "direction" && req.query[Object.keys(req.query)[2]] === "asc" || !Object.keys(req.query)[2])
               {
                  finalPosts.sort((a, b) => parseFloat(a.reads) - parseFloat(b.reads));
               }
               else if (Object.keys(req.query)[2] === "direction" && req.query[Object.keys(req.query)[2]] === "desc")
               {
                  finalPosts.sort((a, b) => parseFloat(b.reads) - parseFloat(a.reads));
               }
               else 
               {
                  let myJsonResponse = 
                  {
                     "error": "sortBy parameter is invalid"
                  };
                  return res.status(400).json(myJsonResponse);
               }
            }
            else if (req.query[Object.keys(req.query)[1]] == "likes")
            {
               if (Object.keys(req.query)[2] === "direction" && req.query[Object.keys(req.query)[2]] === "asc" || !Object.keys(req.query)[2])
               {
                  finalPosts.sort((a, b) => parseFloat(a.likes) - parseFloat(b.likes));
               }
               else if (Object.keys(req.query)[2] === "direction" && req.query[Object.keys(req.query)[2]] === "desc")
               {
                  finalPosts.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
               }
               else 
               {
                  let myJsonResponse = 
                  {
                     "error": "sortBy parameter is invalid"
                  };
                  return res.status(400).json(myJsonResponse);
               }
            }
            else if (req.query[Object.keys(req.query)[1]] == "popularity")
            {
               if (Object.keys(req.query)[2] === "direction" && req.query[Object.keys(req.query)[2]] === "asc" || !Object.keys(req.query)[2])
               {
                  finalPosts.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
               }
               else if (Object.keys(req.query)[2] === "direction" && req.query[Object.keys(req.query)[2]] === "desc")
               {
                  finalPosts.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
               }
               else 
               {
                  let myJsonResponse = 
                  {
                     "error": "sortBy parameter is invalid"
                  };
                  return res.status(400).json(myJsonResponse);
               }
            }
            else 
            {
               let myJsonResponse = 
               {
                  "error": "sortBy parameter is invalid"
               };
               return res.status(400).json(myJsonResponse);
            }
         }

         // console.log(allPosts.length);
         // console.log(finalPosts.length);

         return res.status(200).json(finalPosts);
      }
      else 
      {
         let myJsonResponse = 
         {
            "error": "Tags parameter is required."
         };
         return res.status(400).json(myJsonResponse);
      }
   })();
});

module.exports = router;

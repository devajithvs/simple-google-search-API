var express = require("express");
const google = require('googlethis');

async function search(query) {
  const options = {
    page: 0, 
    safe: false, // hide explicit results?
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en' 
    }
  }
  
  const response = await google.search(query, options);
  return response
}

var app = express();app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/google_search", (req, res, next) => {
    const query = req.query.search
    if (query !== null)
        search(query).then(x => { 
            console.log(x); 
            res.json(x);
        });
});
const products = require("../../db/products/all-products.json");
// const qs = require("querystring");

const categorySearcher = (request, response) => {
  let productsArrayForSearchResult = [];
  let searchResult;

  let query = require("url").parse(request.url);
  let querySplit = query.search.toString().split("=");
  categoryValue = querySplit[1];

  const productsFiltered = products.filter(
    item => item.categories[0] === categoryValue
  );

  if (productsFiltered.length === 0) {
    searchResult = {
      status: "no products",
      products: []
    };
  } else {
    productsFiltered.map(item => {
      const itemObj = {
        id: item.id,
        sku: item.sku,
        name: item.name,
        description: item.description
      };
      productsArrayForSearchResult.push(itemObj);
      searchResult = {
        status: "success",
        products: productsArrayForSearchResult
      };
    });
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(searchResult));
  response.end();
};

module.exports = categorySearcher;

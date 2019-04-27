const request = require("request");

module.exports.getImages = async (req, res) => {
  const { imageName } = req.query;
  const url = `https://s3.eu-central-1.amazonaws.com/wunder-b/${imageName}`
  const { response, body } = await new Promise( (resolve, reject) => request(url, 
    (error, rResponse, rBody) => {
    if (error) return reject(error);

    return resolve({ response: rResponse, body: rBody });
  }));

  res.header({
    ...response.headers,
    'Access-Control-Allow-Origin': "*"
  });
  res.status(200).send(body);
}


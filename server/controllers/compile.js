const request = require("request");
const config = require("config");

module.exports.getCompilerList = async (req, res) => {
  request(
    {
      url: config.sphereEngine.compilers.getCompilerListUrl,
      method: "GET"
    },
    (error, response, body) => {
      if (error) {
        console.log("Connection problem");
      }
      // process response
      if (response) {
        if (response.statusCode === 200) {
          res.send(body);
          console.log(JSON.parse(body)); // list of compilers in JSON
        } else if (response.statusCode === 401) {
          console.log("Invalid access token");
        }
      }
    }
  );
}

module.exports.getOutput = async (req, res) => {
  const { submissionId } = req.body;
  const stream = "output";
  request(
    {
      url: config.sphereEngine.compilers.getOutputUrl({
        submissionId,
        stream
      }),
      method: "GET"
    },
    (error, response, body) => {
      if (error) {
        console.log("Connection problem");
      }
      /* eslint-disable */
      if (response) {
        if (response.statusCode === 200) {
          res.send(body);
          console.log(response.body); // raw data from selected stream
        } else if (response.statusCode === 401) {
          console.log("Invalid access token");
        } else if (response.statusCode === 403) {
          console.log("Access denied");
        } else if (response.statusCode === 404) {
          var body = JSON.parse(response.body);
          console.log(
            `Non existing resource, error code: ${
              body.error_code
            }, details available in the message: ${body.message}`
          );
        } else if (response.statusCode === 400) {
          var body = JSON.parse(response.body);
          console.log(
            `Error code: ${
              body.error_code
            }, details available in the message: ${body.message}`
          );
        }
      }
      /* eslint-enable */
    }
  );
}

module.exports.checkStatus = async (req, res) => {
  const { submissionId } = req.body;
  request(
    {
      url: config.sphereEngine.compilers.checkStatusUrl({ submissionId }),
      method: "GET"
    },
    (error, response, body) => {
      if (error) {
        console.log("Connection problem");
      }

      // process response
      if (response) {
        if (response.statusCode === 200) {
          res.send(body);
          console.log(JSON.parse(response.body)); // submission data in JSON
        } else {
          if (response.statusCode === 401) {
            console.log("Invalid access token");
          }
          if (response.statusCode === 403) {
            console.log("Access denied");
          }
          if (response.statusCode === 404) {
            console.log("Submision not found");
          }
        }
      }
    }
  );
}

module.exports.addCompile = async (req, res) => {
  const submissionData = {
    compilerId: req.body.compilerId,
    source: req.body.source,
    input: req.body.input || null
  };

  request(
    {
      url: config.sphereEngine.compilers.compileUrl,
      method: "POST",
      form: submissionData
    },
    (error, response, body) => {
      if (error) {
        res.send(422).send("Connection problem");
      }
      // process response
      if (response) {
        if (response.statusCode === 201) {
          res.send(body);
          console.log(body); // submission data in JSON
        } else if (response.statusCode === 401) {
          res.status(422).send("Invalid access token");
        } else if (response.statusCode === 402) {
          res.status(422).send("Unable to create submission");
        } else if (response.statusCode === 400) {
          res
            .status(422)
            .send(
              `Error code: ${
                body.error_code
              }, details available in the message: ${body.message}`
            );
        }
      }
    }
  );
}

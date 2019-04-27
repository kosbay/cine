const request = require("request");
const config = require("config");

module.exports.checkStatus = async (req, res) => {
  const { submissionId } = req.body;
  // send request
  request(
    {
      url: config.sphereEngine.problems.checkStatusUrl({ submissionId }),
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

module.exports.compileProblem = async (req, res) => {
  const submissionData = {
    compilerId: req.body.compilerId,
    source: req.body.source,
    problemId: req.body.problemId,
    input: req.body.input || null
  };

  // send request
  request(
    {
      url: config.sphereEngine.problems.problemsUrl,
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


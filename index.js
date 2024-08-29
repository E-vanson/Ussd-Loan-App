const express = require("express");
const UssdMenu = require("ussd-menu-builder");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const app = express();
let menu = new UssdMenu();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let phoneNum;
let loanAmount;
let loanPeriod;
let loanInterest;
let recievedUrl;

app.get("/api/test", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  phoneNum = phoneNumber.startsWith("+")
    ? phoneNumber.substring(1)
    : phoneNumber;
  res.send("Testing the requests");
});

//colls endpoint check

// const getUrlAndFoward = async (phoneNumber) => {
//   let toSendUrl;
//   try {
//     const response = axios.get(
//       `https://a331-41-139-168-163.ngrok-free.app/swap/check/${phoneNumber}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("Response: ", response);
//     // toSendUrl = response.data.listen_url
//   } catch (error) {
//     console.log("Error colls endpoint", error);
//   }
// };
const getUrlAndForward = async (phoneNumber) => {
  let toSendUrl;
  try {
    // const response = await axios.get(
    //   `https://a331-41-139-168-163.ngrok-free.app/swap/check/${phoneNumber}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
      // );
      const response = await fetch(
        `https://a331-41-139-168-163.ngrok-free.app/swap/check/${phoneNumber}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "*",
          },
        }
      );

      if (!response.ok) {
          throw new Error(`Error, ${response.status}`)
      }

      const data = response.json()
      console.log(data, " ....data")
    console.log("Response: ", response.data); // Log the actual response data
      //toSendUrl = response.data.listen_url; // Uncomment this if you want to use the listen_url
      

  } catch (error) {
    console.log(error); // Use error.message to capture the error message
  }
};

menu.startState({
  run: () => {
    menu.con(
      "Welcome To Shylock" +
        "\n1. Request Loan" +
        "\n2. Loan Packages" +
        "\n3. Loan Status" +
        "\n4. Terms and Condition" +
        "\n5. Contact Support"
    );
  },
  next: {
    1: "Request Loan",
    2: "Loan Packages",
    3: "Loan Status",
    4: "Terms and Condition",
    5: "Contact Support",
  },
});

menu.state("Request Loan", {
  run: () => {
    menu.con(
      "Choose Loan Amount:" +
        "\n1. 5,000" +
        "\n2. 10,000" +
        "\n3. 20,000 " +
        "\n4. 30,000"
    );
  },
  next: {
    1: "5,000",
    2: "10,000",
    3: "20,000",
    4: "30,000",
  },
  defaultNext: "invalidOption",
});

menu.state("Loan Packages", {
  run: () => {
    menu.con(
      "Available Packages: \n 5,000 package \n 10,000 package \n 20,000 package \n 30,000 package \n" +
        "\n1. Request Loan"
    );
  },
  next: {
    1: "Request Loan",
  },
  defaultNext: "invalidOption",
});

menu.state("5,000", {
  run: () => {
    loanAmount = menu.val;
    menu.con(
      "Choose repayment period" +
        "\n1. 7 days" +
        "\n2. 14days" +
        "\n3. 30 days "
    );
  },
  next: {
    1: "7 days",
    2: "14 days",
    3: "30 days",
  },
  defaultNext: "invalidOption",
});

menu.state("10,000", {
  run: () => {
    loanAmount = menu.val;
    menu.con(
      "Choose repayment period" +
        "\n1. 7 days" +
        "\n2. 14days" +
        "\n3. 30 days "
    );
  },
  next: {
    1: "7 days",
    2: "14 days",
    3: "30 days",
  },
  defaultNext: "invalidOption",
});

menu.state("20,000", {
  run: () => {
    loanAmount = menu.val;
    menu.con(
      "Choose repayment period" +
        "\n1. 7 days" +
        "\n2. 14days" +
        "\n3. 30 days "
    );
  },
  next: {
    1: "7 days",
    2: "14 days",
    3: "30 days",
  },
  defaultNext: "invalidOption",
});

menu.state("30,000", {
  run: () => {
    loanAmount = menu.val;
    menu.con(
      "Choose repayment period" +
        "\n1. 7 days" +
        "\n2. 14days" +
        "\n3. 30 days "
    );
  },
  next: {
    1: "7 days",
    2: "14 days",
    3: "30 days",
  },
  defaultNext: "invalidOption",
});

// menu.state(loanAmount, {
//   run: () => {
//     menu.con(
//       "Choose repayment period" +
//         "\n1. 7 days" +
//         "\n2. 14days" +
//         "\n3. 30 days "
//     );
//   },
//   next: {
//     1: "7 days",
//     2: "14 days",
//     3: "30 days",
//   },
//   defaultNext: "invalidOption",
// });

menu.state("7 days", {
  run: () => {
    loanPeriod = menu.val;
    menu.con(
      `Loan amount of ${
        loanAmount == 1
          ? "5,000"
          : loanAmount == 2
          ? "10,000"
          : loanAmount == 3
          ? "20,000"
          : "30,000"
      } to be repayed in ${
        loanPeriod == 1 ? "7 Days" : loanPeriod == 2 ? "14 Days" : "30 Days"
      } with an interest rate of 7%` +
        "\n1. Accept" +
        "\n2. Cancel"
    );
  },
  next: {
    1: "Accept",
    2: "Cancel",
  },
  defaultNext: "invalidOption",
});

menu.state("14 days", {
  run: () => {
    loanPeriod = menu.val;
    menu.con(
      `Loan amount of ${
        loanAmount == 1
          ? "5,000"
          : loanAmount == 2
          ? "10,000"
          : loanAmount == 3
          ? "20,000"
          : "30,000"
      } to be repayed in ${
        loanPeriod == 1 ? "7 Days" : loanPeriod == 2 ? "14 Days" : "30 Days"
      } with an interest rate of 14%` +
        "\n1. Accept" +
        "\n2. Cancel"
    );
  },
  next: {
    1: "Accept",
    2: "Cancel",
  },
  defaultNext: "invalidOption",
});

menu.state("30 days", {
  run: () => {
    loanPeriod = menu.val;
    menu.con(
      `Loan amount of ${
        loanAmount == 1
          ? "5,000"
          : loanAmount == 2
          ? "10,000"
          : loanAmount == 3
          ? "20,000"
          : "30,000"
      } to be repayed in ${
        loanPeriod == 1 ? "7 Days" : loanPeriod == 2 ? "14 Days" : "30 Days"
      } with an interest rate of 30%` +
        "\n1. Accept" +
        "\n2. Cancel"
    );
  },
  next: {
    1: "Accept",
    2: "Cancel",
  },
  defaultNext: "invalidOption",
});

menu.state("Accept", {
  run: () => {
    menu.con(
      "Do you agree to the Term And Condition of the Loan application and payment ?" +
        "\n1. Yes" +
        "\n2. No"
    );
  },
  next: {
    1: "Yes",
    2: "No",
  },
  defaultNext: "invalidOption",
});

menu.state("Cancel", {
  run: () => {
    menu.end("You cancelled the request");
  },
});

menu.state("Yes", {
  run: () => {
    menu.end(
      "Your loan application has been received and is being processed. Kindly wait for a message"
    );
    console.log(phoneNum + "the phone number");
    getUrlAndForward(phoneNum);
  },
});

menu.state("No", {
  run: () => {
    menu.end("To request a loan kindly agree to the terms and conditions :)");
  },
});

menu.state("Loan Status", {
  run: () => {
    loanAmount = menu.val;
    menu.con(
      "Select an Option" + "\n1. Check Loan Balance" + "\n2. Repay Loan"
    );
  },
  next: {
    1: "Check Loan Balance",
    2: "Repay Loan",
  },
  defaultNext: "invalidOption",
});

menu.state("Check Loan Balance", {
  run: () => {
    menu.end("Your request is being processed kindly wait for a sms message");
  },
});

menu.state("Repay Loan", {
  run: () => {
    menu.con("Enter Amount to repay:");
  },
  next: {
    "*\\d+": "repay.amount",
  },
  defaultNext: "invalidOption",
});

menu.state("repay.amount", {
  run: () => {
    let repayAmount = menu.val;
    console.log(repayAmount + " repayamount");
    menu.end(
      "Your request is being processed. Kindly wait for an STK and enter your mpesa pin"
    );
  },
});

menu.state("Check Loan Balance", {
  run: () => {
    menu.end("Your request is being processed kindly wait for a sms message");
  },
});

app.post("/ussd", function (req, res) {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  phoneNum = phoneNumber; // Ensure phoneNum is set from USSD request
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`USSD server listening on port ${port}`);
});

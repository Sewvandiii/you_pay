const express = require("express");
const router = express.Router();
const Transaction = require("../models/TransactionModel");
const User = require("../models/UsersModel");

//Create Transaction
router.post("/", async (req, res) => {
  try {
    //Check if the user is registered with the system
    const searchSender = await User.find({ phone: req.body.from });
    if (searchSender.length == 0) {
      res.status(404);
      res.json({ message: "Could not find sender" });
      return;
    }

    const searchReceiver = await User.find({ phone: req.body.to });
    if (searchReceiver.length == 0) {
      res.status(404);
      res.json({ message: "Could not find receiver " });
      return;
    }

    if (searchSender.length != 0 && searchReceiver.length != 0) {
      //Check for the balance availability
      if (searchSender[0].balance > req.body.amount) {
        try {
          const updateSender = await User.updateOne(
            { phone: req.body.from },
            {
              $set: {
                balance: searchSender[0].balance - req.body.amount,
              },
            }
          );
          const updateReceiver = await User.updateOne(
            { phone: req.body.to },
            {
              $set: {
                balance: searchReceiver[0].balance + req.body.amount,
              },
            }
          );
        } catch (err) {
          res.status(500);
          res.json({ message: err });
          return;
        }

        const transaction = new Transaction({
          fullName: req.body.fullName,
          date: req.body.date,
          from: req.body.from,
          to: req.body.to,
          amount: req.body.amount,
        });

        //Log Transaction
        try {
          const savedTransaction = await transaction.save();
          res.status(200);
          res.json({ message: "Success", data: { ...savedTransaction._doc } });
        } catch (err) {
          res.status(404);
          res.json({ message: err });
        }
      } else {
        res.status(404);
        res.json({ message: "Insufficient Funds" });
        return;
      }
    } else {
      res.status(404);
      res.json({ message: "Could not find user " + res.body.from });
      return;
    }
  } catch (err) {
    res.status(500);
    res.json({ message: err });
  }
});

//View Transactions
router.post("/view", async (req, res) => {
  if (req.body.phone == "") {
    res.status(400);
    res.json({ message: "Cannot leave field phone blank " });
    return;
  }

  try {
    //Check if the user exists
    const userData = await User.find({ phone: req.body.phone });
    if (userData.length == 0) {
      res.status(404);
      res.json({ message: "Could not find user" });
      return;
    }

    //Grab Transactions
    const outgoingTransactions = await Transaction.find({
      from: req.body.phone,
    });
    const incomingTransactions = await Transaction.find({ to: req.body.phone });

    const userTransactions = {
      outgoingTransactions,
      incomingTransactions,
    };


    res.status(200);
    res.json(userTransactions);
  } catch (err) {
    res.status(404);
    res.json({ message: err });
    return;
  }
});

module.exports = router;

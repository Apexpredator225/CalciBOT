// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. 
const { ActivityHandler, MessageFactory } = require('botbuilder');
class EchoBot extends ActivityHandler {
  constructor() {
    let n1;
    let n2;
    let oparand
    super();
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      let userText = context.activity.text;
      if (userText.trim().toLowerCase().startsWith("n1:")) {
        let text = userText.substring(3);
        this.n1 = parseInt(text);
        await context.sendActivity("Number1 saved as " + this.n1 + ". Please enter Number2");
      }
      else if (userText.trim().toLowerCase().startsWith("n2:")) {
        let text = userText.substring(3);
        this.n2 = parseInt(text);
        await context.sendActivity("Numbers are " + this.n1 + " and " + this.n2);
        await context.sendActivity("Please enter the operation between numbers");
      }
      
      else if (userText.trim().toLowerCase().startsWith("operation:")) {
        let oparand = userText.substring(10);
        if (oparand == "+") {
          let res = this.n1 + this.n2;
          await context.sendActivity(res.toString());
        }
        else if (oparand == "-") {
          let res = this.n1 - this.n2;
          await context.sendActivity(res.toString());
        }
        // By calling next() you ensure that the next BotHandler is run. 
        await next();
      }
    });
    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity("Hi");
          await context.sendActivity("Please enter number1");
        }
      }
      // By calling next() you ensure that the next BotHandler is running. 
      await next();
    });
    function getresult(n1, n2, res) { //API 

      return "The result of your operation on " + n1 + " and " + n2 + " is " + res;
    }
  }
}
module.exports.EchoBot = EchoBot;

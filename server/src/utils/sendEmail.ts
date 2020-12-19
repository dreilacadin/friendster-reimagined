"use strict"

import nodemailer from "nodemailer"
import { google } from "googleapis"
import { GraphQLError } from "graphql"

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

export async function sendEmail(to: string, html: string, subject: string = "Change password") {
  // Get access token from GOOGLE OAUTH2 Client
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "friendsterv2@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.res?.data.access_token
      }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Friendsterv2 Admin <friendsterv2@gmail.com>", // sender address
      to, // list of receivers
      subject, // Subject
      html // html body
    })
    console.log("Message sent: %s", info.messageId)
  } catch (error) {
    console.log(error)
    throw new GraphQLError("sendEmail Error: Invalid Credentials")
  }
}

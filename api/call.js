import twilio from "twilio"

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const { phoneNumber } = req.body

  try {
    await client.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: `<Response><Say>Hi! This is your AI calling. Hope you're having an amazing day!</Say></Response>`,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}


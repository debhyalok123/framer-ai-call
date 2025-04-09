import twilio from "twilio"

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization"
    )
    res.status(200).end()
    return
  }

  res.setHeader("Access-Control-Allow-Origin", "*")

  const accountSid = process.env.TWILIO_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken)

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
    console.error("Twilio call error:", err)
    res.status(500).json({ success: false, error: err.message })
  }
}

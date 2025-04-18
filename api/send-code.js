export default async function handler(req, res) {
  // ✅ Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*") // For production: replace * with your Framer site URL
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method === "POST") {
    const { phoneNumber } = req.body

    // TODO: send verification code using some SMS service like Twilio
    console.log(`Sending code to ${phoneNumber}`)

    // mock success
    return res.status(200).json({ success: true })
  }

  res.status(405).json({ error: "Method not allowed" })
}

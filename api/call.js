export default async function handler(req, res) {
  // ✅ Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method === "POST") {
    const { phoneNumber } = req.body

    // TODO: trigger the AI call logic (or a mock)
    console.log(`Calling AI to phone number: ${phoneNumber}`)

    return res.status(200).json({ success: true })
  }

  res.status(405).json({ error: "Method not allowed" })
}

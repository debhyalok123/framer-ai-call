export default async function handler(req, res) {
  // ✅ Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method === "POST") {
    const { phoneNumber, code } = req.body

    // TODO: validate the code (this is just a dummy check)
    const verified = code === "123456" // pretend 123456 is always correct

    return res.status(200).json({ verified })
  }

  res.status(405).json({ error: "Method not allowed" })
}

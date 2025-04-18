import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function handler(req, res) {
  const { phoneNumber } = req.body;

  try {
    const verification = await client.verify
      .v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    res.status(200).json({ success: true, status: verification.status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

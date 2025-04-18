import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export default async function handler(req, res) {
  const { phoneNumber, code } = req.body;

  try {
    const verificationCheck = await client.verify
      .v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks
      .create({ to: phoneNumber, code });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Invalid code' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

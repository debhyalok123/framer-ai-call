export default async function handler(req, res) {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace * with your actual Framer domain
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Handle CORS preflight
    }

    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Missing phone number' });
    }

    // Example: Simulate sending OTP
    console.log("Sending OTP to:", phoneNumber);

    return res.status(200).json({ success: true });
}

import fetch from 'node-fetch';

const API_KEY = "nnQzwCwplGxWH1sB.IcnWSEygkK4g5Pg6B-PS1PBSnNiw-Z8tohxnXnPeG5elj0hi";
const PRODUCT_ID = "pdt_0NZtCUzKHdTTzJprcHUAN"; // CORE plan test product ID

async function testLiveCheckout() {
    console.log("[Diagnostics] Pinging Dodo Payments Live API...");
    
    try {
        const req = await fetch('https://api.dodopayments.com/payments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                billing: { country: "US" },
                customer: { email: "founder@solochief.com", name: "System Diagnostics" },
                product_cart: [ { product_id: PRODUCT_ID, quantity: 1 } ],
                payment_link: true,
                metadata: {
                    bookingId: "test_booking_123",
                    plan: "CORE"
                }
            })
        });
        
        const res = await req.json();
        console.log("[Diagnostics] Response from Dodo:", JSON.stringify(res, null, 2));
    } catch (e) {
        console.error("[Diagnostics] Fatal Error:", e);
    }
}

testLiveCheckout();

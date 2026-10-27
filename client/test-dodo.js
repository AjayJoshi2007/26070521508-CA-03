const { DodoPayments } = require("dodopayments");

const client = new DodoPayments({
    bearerToken: "nnQzwCwplGxWH1sB.IcnWSEygkK4g5Pg6B-PS1PBSnNiw-Z8tohxnXnPeG5elj0hi",
    environment: "test_mode", // Explicit test mode
});

async function test() {
    console.log("Starting SDK Live Diagnostics...");
    try {
        const res = await client.payments.create({
            billing: { country: "US" },
            customer: { email: "founder@solochief.com", name: "System Diagnostics" },
            product_cart: [{ product_id: "pdt_0NZtCUzKHdTTzJprcHUAN", quantity: 1 }],
            payment_link: true
        });
        console.log("Success! Checkout link:", res.payment_link || res);
    } catch (e) {
        console.error("SDK Error Message:", e.message);
        if (e.status) console.error("HTTP Status:", e.status);
    }
}
test();

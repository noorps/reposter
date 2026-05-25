import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  const { isValid, event } = await verifyStripeWebhook(body, signature, STRIPE_WEBHOOK_SECRET);
  if (!isValid) return new Response("Invalid signature", { status: 400 });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email =
      session.customer_details?.email ||
      session.custom_fields?.find((f: any) => f.key === "supabaseaccountemail")?.text?.value;

    if (email) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      await supabase
        .from("profiles")
        .update({ plan: "pro", stripe_customer_id: session.customer })
        .eq("email", email.toLowerCase().trim());
    }
  }

  return new Response("ok", { status: 200 });
});

async function verifyStripeWebhook(payload: string, signature: string, secret: string) {
  try {
    const parts = signature.split(",");
    const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
    const sig = parts.find((p) => p.startsWith("v1="))?.slice(3);
    const signed = `${timestamp}.${payload}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed));
    const computed = Array.from(new Uint8Array(mac))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return { isValid: computed === sig, event: JSON.parse(payload) };
  } catch {
    return { isValid: false, event: null };
  }
}
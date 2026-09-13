const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BUILDING_TYPE_LABELS: Record<string, string> = {
  institutions: "Institutions",
  hospitals: "Hospitals",
  industries: "Industries",
  warehouses: "Warehouses",
  commercial: "Commercial Complex",
  "high-rise-residential": "High-rise Residence Buildings",
  other: "Other",
};

type RegistrationData = {
  email: string;
  company_name: string;
  contact_person: string;
  designation: string;
  mobile_number: string;
  building_type: string;
  building_type_other?: string | null;
};

function buildEmailHtml(data: RegistrationData): string {
  const buildingTypeLabel =
    data.building_type === "other" && data.building_type_other
      ? `Other (${data.building_type_other})`
      : BUILDING_TYPE_LABELS[data.building_type] ?? data.building_type;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:#b91c1c;padding:32px 40px;">
                <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">
                  MAHA BINU FIRE FIGHTERS PVT LTD
                </h1>
                <p style="margin:4px 0 0;color:#fecaca;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                  Your trusted fire safety partner
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px;">
                <h2 style="margin:0 0 8px;color:#1a1a1a;font-size:20px;font-weight:700;">
                  Registration Confirmed
                </h2>
                <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
                  Dear ${escapeHtml(data.contact_person)},
                </p>
                <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
                  Thank you for registering for the <strong>Synergy 2026 Expo offer</strong> with
                  MAHA BINU FIRE FIGHTERS. We have received your registration for a free
                  Annual Maintenance Contract (AMC) baseline assessment, and our engineering
                  team will contact you shortly to schedule the initial site visit.
                </p>

                <!-- Registration details -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;margin:0 0 24px;">
                  <tr>
                    <td style="padding:24px 28px;">
                      <p style="margin:0 0 16px;color:#1a1a1a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                        Registration Details
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${detailRow("Company Name", data.company_name)}
                        ${detailRow("Contact Person", data.contact_person)}
                        ${detailRow("Designation", data.designation)}
                        ${detailRow("Mobile Number", data.mobile_number)}
                        ${detailRow("Email", data.email)}
                        ${detailRow("Building Type", buildingTypeLabel)}
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 12px;color:#555;font-size:15px;line-height:1.6;">
                  <strong>What happens next?</strong>
                </p>
                <ul style="margin:0 0 24px;padding-left:20px;color:#555;font-size:15px;line-height:1.8;">
                  <li>Our engineering team will reach out to you within 2–3 business days.</li>
                  <li>We will schedule a convenient time for your baseline fire safety assessment.</li>
                  <li>You will receive a detailed report with recommendations — completely free of charge.</li>
                </ul>

                <p style="margin:0 0 8px;color:#555;font-size:15px;line-height:1.6;">
                  If you have any questions in the meantime, feel free to reach us at
                  <a href="https://www.mahabinufirefighters.com" style="color:#b91c1c;text-decoration:none;">mahabinufirefighters.com</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 40px;">
                <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
                  &copy; 2026 MAHA BINU FIRE FIGHTERS PVT LTD. All rights reserved.<br />
                  This is an automated confirmation email. Please do not reply to this message.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:#6b7280;font-size:14px;width:40%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#1a1a1a;font-size:14px;font-weight:500;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await req.json() as RegistrationData;

    if (!data?.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "Resend API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = buildEmailHtml(data);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MAHA BINU Fire Fighters <noreply@mahabinuamc.com>",
        to: [data.email],
        subject: "Registration Confirmed — MAHA BINU Fire Fighters | Synergy 2026 Expo",
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errorBody }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

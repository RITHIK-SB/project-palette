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
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-pad { padding: 20px 18px 18px !important; }
        .email-header { padding: 0 18px !important; }
        .email-brand { padding-bottom: 18px !important; font-size: 19px !important; }
        .email-tagline { padding-bottom: 20px !important; font-size: 12px !important; letter-spacing: 1px !important; }
        .email-title { margin-bottom: 10px !important; font-size: 20px !important; }
        .email-greeting, .email-intro, .email-question, .email-signoff { font-size: 14px !important; line-height: 1.4 !important; }
        .email-greeting { margin-bottom: 16px !important; }
        .email-intro { margin-bottom: 16px !important; }
        .email-details { border-radius: 6px !important; }
        .email-details-pad { padding: 14px 16px 12px !important; }
        .email-details-title { margin-bottom: 8px !important; font-size: 14px !important; }
        .detail-label, .detail-value { display: table-cell !important; width: auto !important; padding: 2px 0 !important; font-size: 13px !important; line-height: 1.3 !important; }
        .detail-label { width: 46% !important; }
        .email-next { margin: 18px 0 10px !important; font-size: 16px !important; }
        .email-list { margin: 0 0 16px !important; padding-left: 18px !important; font-size: 13px !important; line-height: 1.35 !important; }
        .email-list li { padding-left: 2px !important; }
        .email-question { margin-bottom: 14px !important; }
        .email-signoff { margin: 0 !important; }
        .email-contact { margin-top: 14px !important; font-size: 13px !important; line-height: 1.45 !important; }
        .email-footer { padding: 14px 18px !important; }
        .email-footer-title { font-size: 12px !important; }
        .email-footer-tagline { font-size: 11px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f1f3f6;font-family:Arial,Helvetica,sans-serif;color:#4d4d4d;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f1f3f6;">
      <tr>
        <td align="center">
          <table class="email-shell" width="640" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:640px;background-color:#ffffff;">
            <tr>
              <td class="email-header" style="padding:0 58px;background-color:#c51d1d;color:#ffffff;">
                <div class="email-brand" style="padding:0 0 44px;font-size:30px;line-height:1.15;font-weight:700;letter-spacing:.2px;">
                  MAHA BINU FIRE FIGHTERS PVT LTD
                </div>
                <div class="email-tagline" style="padding-bottom:46px;font-size:20px;line-height:1.2;letter-spacing:2px;color:#ffd7d7;">
                  YOUR TRUSTED FIRE SAFETY PARTNER
                </div>
              </td>
            </tr>

            <tr>
              <td class="email-pad" style="padding:56px 58px 52px;background-color:#ffffff;">
                <h1 class="email-title" style="margin:0 0 20px;font-size:29px;line-height:1.2;font-weight:700;color:#1d1d1d;">Registration Confirmed</h1>
                <p class="email-greeting" style="margin:0 0 36px;font-size:22px;line-height:1.45;color:#555555;">Dear ${escapeHtml(data.contact_person)},</p>
                <p class="email-intro" style="margin:0 0 34px;font-size:21px;line-height:1.65;color:#555555;">
                  Thank you for registering for the <strong>Synergy 2026 Expo offer</strong> with MAHA BINU FIRE FIGHTERS. We have received your registration for a free Annual Maintenance Contract (AMC) baseline assessment, and our engineering team will contact you shortly to schedule the initial site visit.
                </p>

                <table class="email-details" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #dfe2e6;border-radius:9px;background-color:#ffffff;">
                  <tr>
                    <td class="email-details-pad" style="padding:34px 40px 32px;">
                      <div class="email-details-title" style="margin-bottom:26px;font-size:20px;line-height:1.2;font-weight:700;letter-spacing:1px;color:#1d1d1d;">REGISTRATION DETAILS</div>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
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

                <h2 class="email-next" style="margin:38px 0 22px;font-size:22px;line-height:1.3;font-weight:700;color:#555555;">What happens next?</h2>
                <ul class="email-list" style="margin:0 0 36px;padding-left:28px;font-size:21px;line-height:1.65;color:#555555;">
                  <li style="padding-left:4px;">Our engineering team will reach out to you within 2–3 business days.</li>
                  <li style="padding-left:4px;">We will schedule a convenient time for your baseline fire safety assessment.</li>
                  <li style="padding-left:4px;">You will receive a detailed report with recommendations — completely free of charge.</li>
                </ul>

                <p class="email-question" style="margin:0 0 32px;font-size:21px;line-height:1.6;color:#555555;">If you have any questions in the meantime, feel free to reach us at</p>
                <p class="email-signoff" style="margin:0;font-size:21px;line-height:1.6;color:#555555;">Best Regards,<br /><strong>Team MAHA BINU Fire Fighters</strong></p>
                <p class="email-contact" style="margin:36px 0 0;font-size:18px;line-height:1.7;color:#555555;">Contact: Arun<br />Number: +91 4423780609</p>
              </td>
            </tr>

            <tr>
              <td class="email-footer" style="padding:28px 58px;background-color:#c51d1d;color:#ffffff;text-align:center;">
                <div class="email-footer-title" style="font-size:16px;line-height:1.5;font-weight:700;">MAHA BINU FIRE FIGHTERS PVT LTD</div>
                <div class="email-footer-tagline" style="margin-top:5px;font-size:14px;line-height:1.5;color:#ffd7d7;">YOUR TRUSTED FIRE SAFETY PARTNER</div>
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
  const escapedValue = escapeHtml(value);
  const renderedValue =
    label === "Email"
      ? `<a href="mailto:${escapedValue}" style="color:#1155cc;text-decoration:underline;">${escapedValue}</a>`
      : escapedValue;

  return `<tr>
    <td class="detail-label" style="padding:7px 0;color:#687181;font-size:20px;line-height:1.45;width:46%;vertical-align:top;">${escapeHtml(label)}</td>
    <td class="detail-value" style="padding:7px 0;color:#202020;font-size:20px;line-height:1.45;font-weight:600;vertical-align:top;">${renderedValue}</td>
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

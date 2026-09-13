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
        .email-pad { padding-left: 22px !important; padding-right: 22px !important; }
        .detail-label, .detail-value { display: block !important; width: 100% !important; }
        .event-cell { display: block !important; width: 100% !important; border-right: 0 !important; border-bottom: 1px solid #ead3d0 !important; }
        .event-cell:last-child { border-bottom: 0 !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#142a47;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f5f7;padding:20px 10px;">
      <tr>
        <td align="center">
          <table class="email-shell" width="640" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:640px;background-color:#ffffff;">
            <tr>
              <td class="email-pad" style="padding:26px 42px 22px;background-color:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td width="70" valign="middle" style="width:70px;padding-right:14px;">
                      <table width="58" height="70" cellpadding="0" cellspacing="0" role="presentation" style="width:58px;height:70px;">
                        <tr><td align="center" valign="middle" style="background-color:#a9151b;border-radius:30px 30px 26px 26px;color:#ffffff;font-size:30px;font-weight:700;line-height:1;">M</td></tr>
                      </table>
                    </td>
                    <td valign="middle" style="border-left:1px solid #d9aaa5;padding-left:16px;">
                      <div style="font-size:28px;line-height:1.05;font-weight:800;letter-spacing:1px;color:#9e171c;">MAHA BINU</div>
                      <div style="margin-top:5px;font-size:17px;line-height:1.1;font-weight:700;letter-spacing:4px;color:#a9151b;">FIRE FIGHTERS</div>
                      <div style="margin-top:8px;font-size:14px;line-height:1.3;color:#294563;">Your trusted safety partner</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="email-pad" style="padding:30px 42px 28px;background-color:#720508;background-image:linear-gradient(110deg,#560304,#a30c0d 62%,#d43d12);">
                <div style="width:64px;height:5px;background-color:#f2a900;margin-bottom:18px;"></div>
                <div style="font-size:32px;line-height:1.15;font-weight:700;color:#ffffff;">Registration <span style="color:#f5b400;">Confirmed</span></div>
                <div style="margin-top:10px;font-size:19px;line-height:1.4;color:#ffffff;">Thank you for registering for the<br /><strong>Synergy 2026 Expo.</strong></div>
              </td>
            </tr>

            <tr>
              <td class="email-pad" style="padding:30px 42px 34px;background-color:#ffffff;">
                <p style="margin:0 0 20px;font-size:17px;line-height:1.5;font-weight:700;color:#142a47;">Dear ${escapeHtml(data.contact_person)},</p>
                <p style="margin:0 0 10px;font-size:16px;line-height:1.65;color:#294563;">We are pleased to confirm that your registration has been successfully received by <strong style="color:#142a47;">MAHA BINU Fire Fighters</strong> for the <strong style="color:#142a47;">Synergy 2026 Expo.</strong></p>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#294563;">Below are your registration details for your reference:</p>

                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #f0d6d1;border-radius:12px;background-color:#fffdfc;">
                  <tr>
                    <td style="padding:20px 24px 14px;">
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td width="38" valign="middle" style="width:38px;font-size:25px;color:#a9151b;">▤</td>
                          <td valign="middle" style="font-size:20px;font-weight:700;color:#a9151b;">Registration Details</td>
                        </tr>
                      </table>
                      <div style="height:1px;background-color:#ead3d0;margin:15px 0 10px;"></div>
                      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        ${detailRow("Company", data.company_name)}
                        ${detailRow("Contact Person", data.contact_person)}
                        ${detailRow("Designation", data.designation)}
                        ${detailRow("Mobile", data.mobile_number)}
                        ${detailRow("Email", data.email)}
                        ${detailRow("Building Type", buildingTypeLabel)}
                      </table>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:16px;background-color:#fff7f5;border-radius:12px;">
                  <tr>
                    <td class="event-cell" width="50%" valign="top" style="width:50%;padding:20px 22px;border-right:1px solid #ead3d0;">
                      <div style="font-size:12px;line-height:1.3;font-weight:700;letter-spacing:1px;color:#a9151b;text-transform:uppercase;">Event Date</div>
                      <div style="margin-top:8px;font-size:17px;line-height:1.4;font-weight:700;color:#142a47;">October 10, 2026</div>
                    </td>
                    <td class="event-cell" width="50%" valign="top" style="width:50%;padding:20px 22px;">
                      <div style="font-size:12px;line-height:1.3;font-weight:700;letter-spacing:1px;color:#a9151b;text-transform:uppercase;">Venue</div>
                      <div style="margin-top:8px;font-size:17px;line-height:1.4;font-weight:700;color:#142a47;">Synergy 2026 Expo</div>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:16px;background-color:#f5f7fa;border-radius:12px;">
                  <tr>
                    <td style="padding:19px 22px;">
                      <div style="font-size:12px;line-height:1.3;font-weight:700;letter-spacing:1px;color:#a9151b;text-transform:uppercase;">Need Assistance?</div>
                      <div style="margin-top:7px;font-size:14px;line-height:1.5;color:#294563;">For any queries regarding your registration, please contact our team:</div>
                      <div style="margin-top:8px;font-size:16px;line-height:1.5;font-weight:700;color:#142a47;">Arun <span style="color:#c8b8b5;padding:0 12px;">|</span> <a href="tel:+914423780690" style="color:#142a47;text-decoration:none;">+91 4423780690</a></div>
                    </td>
                  </tr>
                </table>

                <p style="margin:22px 0 14px;font-size:16px;line-height:1.6;color:#294563;">Please keep this email for your records. Our team may contact you with additional information regarding the expo.</p>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.6;color:#294563;">We look forward to welcoming you at the <strong style="color:#142a47;">Synergy 2026 Expo!</strong></p>
                <p style="margin:0;font-size:16px;line-height:1.5;color:#294563;">Best Regards,<br /><strong style="font-size:18px;color:#a9151b;">Team MAHA BINU Fire Fighters</strong><br /><span style="font-size:14px;color:#294563;">Your trusted safety partner</span></p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 42px;background-color:#720508;color:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="font-size:14px;line-height:1.45;font-weight:700;">Advanced Fire Safety Solutions<br />for a Safer Tomorrow</td>
                    <td align="right" style="font-size:14px;line-height:1.45;font-weight:700;">MAHA BINU FIRE FIGHTERS<br /><span style="font-weight:400;color:#f7d6d0;">Your trusted safety partner</span></td>
                  </tr>
                </table>
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

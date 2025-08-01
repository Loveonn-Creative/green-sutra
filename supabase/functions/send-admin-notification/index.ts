import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminNotificationRequest {
  type: 'contact_form' | 'demo_request' | 'signup_approval' | 'esg_report';
  data: any;
  recipientEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data, recipientEmail }: AdminNotificationRequest = await req.json();
    const adminEmail = recipientEmail || "loveonnstudio@gmail.com";

    let subject: string;
    let htmlContent: string;

    switch (type) {
      case 'contact_form':
        subject = `New Contact Form Submission - ${data.subject}`;
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;

      case 'demo_request':
        subject = `New Demo Request from ${data.name}`;
        htmlContent = `
          <h2>New Demo Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
          <p><strong>Role:</strong> ${data.role || 'Not specified'}</p>
          <p><strong>Interest:</strong> ${data.interest || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.message?.replace(/\n/g, '<br>') || 'No additional message'}
          </div>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;

      case 'signup_approval':
        subject = `New User Signup Approval Required - ${data.user_role}`;
        htmlContent = `
          <h2>New User Signup Requires Approval</h2>
          <p><strong>User Email:</strong> ${data.user_email}</p>
          <p><strong>Role:</strong> ${data.user_role}</p>
          <p><strong>Company:</strong> ${data.company_name || 'Not specified'}</p>
          <p><strong>Contact Person:</strong> ${data.contact_person || 'Not specified'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not specified'}</p>
          <p><strong>Request Type:</strong> ${data.request_type}</p>
          <p><strong>Requested At:</strong> ${new Date().toLocaleString()}</p>
          <p>Please review and approve this user in the admin dashboard.</p>
        `;
        break;

      case 'esg_report':
        subject = `New ESG Report Generated - ${data.user_email}`;
        htmlContent = `
          <h2>New ESG Report Generated</h2>
          <p><strong>User:</strong> ${data.user_email}</p>
          <p><strong>Report Name:</strong> ${data.report_name}</p>
          <p><strong>Reporting Period:</strong> ${data.reporting_period}</p>
          <p><strong>Overall ESG Score:</strong> ${data.overall_esg_score}/100</p>
          <p><strong>Green CIBIL Score:</strong> ${data.green_cibil_score}/900</p>
          <p><strong>Generated At:</strong> ${new Date().toLocaleString()}</p>
        `;
        break;

      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    const emailResponse = await resend.emails.send({
      from: "Biocog Admin <admin@biocog.ai>",
      to: [adminEmail],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Biocog Platform</h1>
            <p style="margin: 5px 0 0 0;">Admin Notification</p>
          </div>
          <div style="padding: 20px; background: white;">
            ${htmlContent}
          </div>
          <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>This is an automated notification from the Biocog platform.</p>
          </div>
        </div>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-admin-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
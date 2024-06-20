import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = process.env.GA_PROPERTY_ID;
const clientEmail = process.env.GA_CLIENT_EMAIL;
const private_key = process.env.GA_PRIVATE_KEY;
const clientId = process.env.GA_CLIENT_ID;
const projectId = process.env.GA_PROJECT_ID;
const privateKeyId = process.env.GA_PRIVATE_KEY_ID;
const certUrl = process.env.GA_CERT_URL;

const DAYS = 7;

const credentials = {
  type: "service_account",
  project_id: projectId,
  private_key_id: privateKeyId,
  private_key: private_key,
  client_email: clientEmail,
  client_id: clientId,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: certUrl,
  universe_domain: "googleapis.com",
};
const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

const getTotalVisitors = async () => {
  return analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: `${DAYS}daysAgo`,
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "year",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });
};

export async function GET(_req: NextRequest) {
  const [response] = await getTotalVisitors();
  let totalVisitors = 0;
  response.rows?.forEach((row: any) => {
    totalVisitors += parseInt(row.metricValues[0].value);
  });

  return NextResponse.json({
    totalVisitors,
    days: 7,
  });
}

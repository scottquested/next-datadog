// Necessary if using App Router to ensure this file runs on the client
"use client";

import { datadogLogs, LogsInitConfiguration } from "@datadog/browser-logs";
import { datadogRum } from "@datadog/browser-rum";
import { useEffect } from "react";

export const DATADOG_CONFIG: LogsInitConfiguration = {
  clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN!,
  site: "datadoghq.eu",
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  forwardReports: "all",
  sessionSampleRate: 100,
};

const datadogRumInit = () => {
  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DD_APP_ID!,
    clientToken: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN!,
    site: "datadoghq.eu",
    service: "next",
    env: "development",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 0, // not included in the slim bundle
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
    // Add trace IDs to same origin requests
    allowedTracingUrls: [location.origin],
  });
};

export function DatadogRum() {
  useEffect(() => {
    datadogLogs.init(DATADOG_CONFIG);
    datadogRumInit();
  }, []);

  return <></>;
}

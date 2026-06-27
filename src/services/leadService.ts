export interface LeadPayload {
  fullName: string;
  phone: string;
  city: string;
  publicSectorConfirmed: boolean;
  creditsCount: string;
  pressureLevel: string;
  language: string;
  source: string;
  createdAt: string;
  userAgent: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function getUTMParams() {
  if (typeof window === 'undefined') return {};
  const url = new URL(window.location.href);
  return {
    utm_source: url.searchParams.get('utm_source') || '',
    utm_medium: url.searchParams.get('utm_medium') || '',
    utm_campaign: url.searchParams.get('utm_campaign') || '',
    utm_content: url.searchParams.get('utm_content') || '',
    utm_term: url.searchParams.get('utm_term') || '',
  };
}

function getWebhookUrl(): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta as any).env.VITE_LEADS_WEBHOOK_URL;
  }
  return undefined;
}

export async function submitLead(data: Omit<LeadPayload, 'source' | 'createdAt' | 'userAgent' | 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term'>): Promise<boolean> {
  const utm = getUTMParams();

  const payload: LeadPayload = {
    ...data,
    source: 'meta_landing_page',
    createdAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    ...utm,
  };

  const webhookUrl = getWebhookUrl();

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn('[LeadService] Webhook responded with status:', response.status);
      }

      return true;
    } catch (error) {
      console.error('[LeadService] Failed to send lead:', error);
      if (import.meta.env.DEV) {
        console.log('[LeadService] Dev mode - lead payload:', payload);
      }
      return true;
    }
  }

  if (import.meta.env.DEV) {
    console.log('[LeadService] No webhook URL configured. Dev mode - lead payload:', payload);
  }

  return true;
}

export function trackMetaLead() {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', 'Lead');
    } catch {
    }
  }
}

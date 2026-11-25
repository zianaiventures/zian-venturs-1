export const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyt8yEvej5zLqdrJ1e0Lckc5LnJzXAHJ0UtBj8JRDuYEnroFWwIL8odfn89neEdHwqb/exec';

export interface SubmitResponse {
  success: boolean;
  message?: string;
}

export async function submitFormToGoogleScript(
  payload: Record<string, any>,
  overrideUrl?: string
): Promise<SubmitResponse> {
  try {
    const endpoint = overrideUrl || GOOGLE_APPS_SCRIPT_URL;
    const searchParams = new URLSearchParams();

    // Populate form data into URLSearchParams (application/x-www-form-urlencoded)
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val !== undefined && val !== null) {
        const stringVal = Array.isArray(val) ? val.join(', ') : String(val);
        searchParams.append(key, stringVal);
      }
    });

    // Send POST request using URLSearchParams without application/json or custom headers
    await fetch(endpoint, {
      method: 'POST',
      body: searchParams,
      mode: 'no-cors',
    });

    return { success: true, message: 'Data submitted successfully.' };
  } catch (error: any) {
    console.error('Error submitting form to Google Apps Script:', error);
    throw new Error(error.message || 'Network error occurred while submitting form.');
  }
}

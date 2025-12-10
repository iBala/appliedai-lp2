
const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3';

/**
 * Creates a new subscription in ConvertKit
 * @param email - The email address to subscribe
 * @param firstName - Optional first name of the subscriber
 * @returns Promise<boolean> - Whether the subscription was successful
 */
export async function createConvertKitSubscription(email: string, firstName?: string): Promise<boolean> {
    if (!email) return false;

    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId) {
        console.error('ConvertKit configuration missing: API Key or Form ID not found');
        return false;
    }

    try {
        const url = new URL(`${CONVERTKIT_API_URL}/forms/${formId}/subscribe`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: apiKey,
                email,
                first_name: firstName,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('ConvertKit subscription error:', errorData);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error creating ConvertKit subscription:', error);
        return false;
    }
}

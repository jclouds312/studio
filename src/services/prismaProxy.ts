
// This utility function centralizes the logic for making fetch requests to our Prisma API proxy.

// A helper type for Prisma operations
type PrismaOperation = 'findMany' | 'findUnique' | 'findFirst' | 'create' | 'update' | 'delete' | 'upsert' | 'count';

// This function determines the base URL for the API call, which is crucial for server-side rendering.
const getBaseUrl = () => {
    // If running in a server environment (like Vercel), use the provided URL.
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    // Otherwise, fall back to the local development URL.
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
};

export async function fetchFromPrisma(model: string, operation: PrismaOperation, args: any): Promise<any> {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/prisma`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model, operation, args }),
            // Prevent caching of API responses to ensure fresh data, especially for server components.
            cache: 'no-store',
        });

        if (!response.ok) {
            let errorBody;
            try {
                errorBody = await response.json();
            } catch (e) {
                // If the response body is not valid JSON, use the status text.
                errorBody = { details: response.statusText };
            }
            console.error(`API Error (${response.status}) from ${apiUrl}:`, errorBody);
            throw new Error(`Failed to fetch from Prisma proxy: ${errorBody.details || `Status ${response.status}`}`);
        }

        const data = await response.json();
        
        // This is a workaround for SQLite not supporting JSON. We parse the stringified fields back to JSON.
        const parseJsonFields = (item: any) => {
            if (!item) return item;
            const fieldsToParse = ['skills', 'customQuestions', 'customAnswers', 'savedJobIds'];
            for (const field of fieldsToParse) {
                if (typeof item[field] === 'string') {
                    try {
                        item[field] = JSON.parse(item[field]);
                    } catch (e) {
                        // Ignore if it's not valid JSON
                    }
                }
            }
            return item;
        }

        if (Array.isArray(data)) {
            return data.map(parseJsonFields);
        } else {
            return parseJsonFields(data);
        }
        
    } catch (error) {
        console.error(`Network or fetch error in fetchFromPrisma for ${model}.${operation}:`, error);
        // Re-throw the error so it can be caught by the calling service
        throw error;
    }
}

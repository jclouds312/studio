
// This utility function centralizes the logic for making fetch requests to our Prisma API proxy.

// A helper type for Prisma operations
type PrismaOperation = 'findMany' | 'findUnique' | 'findFirst' | 'create' | 'update' | 'delete' | 'upsert' | 'count';

export async function fetchFromPrisma(model: string, operation: PrismaOperation, args: any): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002';
    
    try {
        const response = await fetch(`${baseUrl}/api/prisma`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model, operation, args }),
            // Prevent caching of API responses to ensure fresh data
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error(`API Error (${response.status}):`, errorBody);
            throw new Error(`Failed to fetch from Prisma proxy: ${errorBody.details || response.statusText}`);
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

export const Status = {
    Loading: 'loading',
    Success: 'success',
    Error: 'error'
} as const;

// Define a type for type safety
export type Status = typeof Status[keyof typeof Status];
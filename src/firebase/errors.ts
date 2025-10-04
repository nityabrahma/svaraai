export type SecurityRuleContext = {
    path: string;
    operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
    requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
    context: SecurityRuleContext;

    constructor(context: SecurityRuleContext) {
        const details = JSON.stringify(
            {
                ...context,
                message:
                    'This error was caught by the custom FirebaseErrorListener. Check your Firestore Security Rules to grant access.',
            },
            null,
            2
        );

        super(
            `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${details}`
        );
        this.name = 'FirestorePermissionError';
        this.context = context;

        // This is necessary to make `instanceof` work correctly in some environments.
        Object.setPrototypeOf(this, FirestorePermissionError.prototype);
    }
}

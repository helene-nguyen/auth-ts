
//& Custom extend expect
const extendToBeType = expect.extend({
    // Control received type
    toBeType(received, argument) {
        const initialType = typeof received;
        const type = initialType === 'object' ? (Array.isArray(received) ? 'array' : initialType) : initialType;
        return type === argument
            ? {
                  message: () => `expected ${received} to be type ${argument}`,
                  pass: true
              }
            : { message: () => `expected ${received} to be type ${argument}`, pass: false };
    }
});

function exist(body,properties) {
    for (const property of properties) {
        expect(body).toHaveProperty(property);
    }
}

export {extendToBeType, exist};
export function instantiateClass<T>(cls: new () => T, value: any): T {
    if (typeof value !== 'object' || value === null) {
        throw new Error(`Cannot convert primitive to instance of ${cls.name}`);
    }

    const instance: any = new cls();
    for (const key of Object.keys(value)) {
        const prop = value[key];

        // Optional: check if class has metadata for deeper typing
        // You can extend this later with Reflect metadata support
        instance[key] = prop;
    }
    return instance;
}

export function ConvertPath(path: string): string{
    const newPath = path.replace(/{(\w+)}/g, ":$1");
    return newPath;
}
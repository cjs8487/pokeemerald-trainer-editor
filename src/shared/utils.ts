export const titleCase = (s: string, sep?: string) =>
    s
        .split(sep ?? ' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

export default {};

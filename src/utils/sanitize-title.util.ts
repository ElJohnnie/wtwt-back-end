export const sanitizeTitle = (param: string): string => {
    return param.replace(/[^a-zA-Z\s]/g, '').replace(/\s\s+/g, ' ').trim();
}

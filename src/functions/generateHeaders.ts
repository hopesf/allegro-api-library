export const generateHeaders = (token: string, contentType: string) => {
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.allegro.public.v1+json",
        "Content-Type": contentType,
    };
}
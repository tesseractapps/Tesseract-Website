const BASE_URL = "https://tesseractapps.com";
// const BASE_URL = "http://localhost:5001";

export const apiFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  if (!response.ok) {
    const error = new Error(`API error ${response.status}: ${response.statusText}`);
    throw error;
  }
  return response;
};

export default apiFetch;

interface Options extends RequestInit {
    method: "GET" | "POST" | "PUT" | "DELETE";
}


export class HttpClientAdapter {
    /**
     * Makes a request to the given URL
     * @param {string} url - URL to make the request
     * @param {FetchOptions} options - Options for the request
     * @returns {Promise} Promise object represents the response
     */
    static async fetch(url: string, options?: Options): Promise<any|void> {
        if (!url.startsWith("http")) {
            throw new Error("Invalid URL");
        }

        const response = await window.fetch(url, options);

        if (!response.ok) {
            throw new Error(`Fetch error:${response.statusText}, ${response.text()}`)
        }

        if(response.status != 204){
            const data = await response.json();
            return data;
        }
    }
}

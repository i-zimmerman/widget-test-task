import { useState, useCallback, useRef, useEffect } from 'react';

interface IRequestOptions<BodyT> {
    method?: string,
    body?: null | BodyT,
    headers?: Record<string, string>
}

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const activeHttpRequests = useRef<AbortController[]>([]);

    const sendRequest = useCallback(
        async (url: string, options: IRequestOptions<null> = {}) => {
            setIsLoading(true);
            const httpAbortCtrl: AbortController = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            const { method, body, headers } = options;

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });

                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err: any) {
                if (!(DOMException.ABORT_ERR === err.code)) {
                    // React mounts/unmounts twice in strict mode (dev mode in react 18)
                    setErrorMessage(err.message);
                }
                setIsLoading(false);
                throw err;
            }
        },
        []
    );

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    const clearError = () => {
        setErrorMessage(null);
    };

    return { isLoading, errorMessage, sendRequest, clearError };
};

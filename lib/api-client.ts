import { API_URL } from '@/config';
import { redirect } from 'next/navigation';
import { UrlPath } from '@/types';
import { getSessionToken } from '@/app/actions/session';

type RequestOptions = {
	method?: string;
	headers?: Record<string, string>;
	body?: any;
	cookie?: string;
	params?: Record<string, string | number | boolean | undefined | null>;
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
	authType?: | 'token' | 'unauthorized';
};

function buildUrlWithParams(
	url: string,
	params?: RequestOptions['params'],
): string {
	if (!params) return url;
	const filteredParams = Object.fromEntries(
		Object.entries(params).filter(
			([, value]) => value !== undefined && value !== null,
		),
	);
	if (Object.keys(filteredParams).length === 0) return url;
	const queryString = new URLSearchParams(
		filteredParams as Record<string, string>,
	).toString();
	return `${url}?${queryString}`;
}

async function fetchApi<T>(
	url: UrlPath,
	options: RequestOptions = {},
): Promise<T> {
	const {
		method = 'GET',
		headers = {},
		body,
		cookie,
		params,
		authType,
		cache = 'no-store',
		next,
	} = options;

	const token = await getSessionToken()

	const baseUrl = url.startsWith('http') ? url : `${API_URL}${url}`;

	const fullUrl = buildUrlWithParams(baseUrl, params);

	const config: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Accept-Language': 'mn',
			Accept: 'application/json',
			...headers,
			...(cookie ? { Cookie: cookie } : {}),
		},
		body: body ? JSON.stringify(body) : undefined,
		credentials: 'include',
		cache,
		next,
	}
	
	if (authType === 'token') {
		if (!token) {
			redirect('/auth/login');
		}

		(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
	}

	config.credentials = 'omit';
	config.headers = {
		...config.headers,
		'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '2E7afi532VfQ9fWyDH1R'
	};

	try {
		const response = await fetch(fullUrl, config);
		return await response.json();
	} catch (error) {
		throw error;
	}
}

export const api = {
	get<T>(url: UrlPath, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: 'GET' });
	},
	post<T>(url: UrlPath, body?: any, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: 'POST', body });
	},
	put<T>(url: UrlPath, body?: any, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: 'PUT', body });
	},
	patch<T>(url: UrlPath, body?: any, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: 'PATCH', body });
	},
	delete<T>(url: UrlPath, options?: RequestOptions): Promise<T> {
		return fetchApi<T>(url, { ...options, method: 'DELETE' });
	},
};
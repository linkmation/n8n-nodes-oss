import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function aliyunApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	service: string,
	method: string,
	path: string,
	body?: any,
	query: IDataObject = {},
	headers?: object,
	option: IDataObject = {},
	_region?: string,
): Promise<any> {
	const requestOptions = {
		qs: {
			...query,
			service,
			path,
			query,
		},
		method,
		body,
		url: '',
		headers,
    json: true,
		//region: credentials?.region as string,
	} as IHttpRequestOptions;

	if (Object.keys(option).length !== 0) {
		Object.assign(requestOptions, option);
	}
	return this.helpers.requestWithAuthentication.call(this, 'aliyun', requestOptions);
}
import * as HTTPSrv from "./httpService";
import querystring from "query-string";
import { toBech32Address } from "@zilliqa-js/crypto";

const API_KEY = process.env.REACT_APP_VIEWBLOCK_API_KEY;

const headers = {
	"X-APIKEY": API_KEY
}
const QUERY_PATH = "https://api.viewblock.io/v1/zilliqa/addresses/:address";

const getPath = (url: string, route_params?: any, query_params?: any) => {
	if (route_params) {
		for (var paramKey in route_params)
			url = url.replace(`:${paramKey}`, route_params[paramKey]);
	}
	if (query_params)
		url += "?" + querystring.stringify(query_params);
	return url;
}

export const listTransactions = async ({ network = "testnet", page = 1, type = "all", address }: any): Promise<any> => {
	let path = QUERY_PATH + "/txs";
	const url = getPath(path, { address }, { network, page, type });

	let response = await HTTPSrv.get({ url, headers });
	response = await response.json();
	return response;
}

export const getBalance = async ({ network = "testnet", address }: any): Promise<any> => {
	const url = getPath(QUERY_PATH, { address: toBech32Address(address) }, { network, type: "all" });

	let response = await HTTPSrv.get({ url, headers });
	response = await response.json();
	return response;
}
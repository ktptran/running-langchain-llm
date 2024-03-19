import { get } from "aws-amplify/api";

async function getText(inputText: any) {
	try {
		const restOperation = get({
			apiName: "HttpApi",
			path: "/text",
			options: {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, PUT",
					"Access-Control-Allow-Headers": "Content-Type",
					"Access-Control-Allow-Credentials": "true",
				},
				body: inputText,
			},
		});
		const response = await restOperation.response;
		console.log("PUT call succeeded: ", response);
		return response;
	} catch (err) {
		console.error("PUT call failed: ", err);
	}
}

export { getText };

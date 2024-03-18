import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigatewayv2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export interface ApiStackProps extends cdk.StackProps {
	projectName: string;
	environment: string;
	accountId: string;
	region: string;
}

export class ApiStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: ApiStackProps) {
		super(scope, id, props);

		const { projectName, environment, accountId, region } = props;

		const bucketName = `${environment}-${projectName}-${accountId}-${region}-bucket`;

		// API Gateway
		const httpApi = new apigw.HttpApi(this, "HttpApi", {
			createDefaultStage: true,
			apiName: `${environment}-${projectName}-api`,
			corsPreflight: {
				allowHeaders: [
					"Authorization",
					"Access-Control-Allow-Credentials",
					"Access-Control-Allow-Headers",
					"Access-Control-Allow-Methods",
					"Access-Control-Allow-Origin",
					"Content-Type",
				],
				allowMethods: [
					apigw.CorsHttpMethod.GET,
					apigw.CorsHttpMethod.HEAD,
					apigw.CorsHttpMethod.OPTIONS,
					apigw.CorsHttpMethod.POST,
					apigw.CorsHttpMethod.PUT,
				],
				allowOrigins: ["*"],
			},
		});

		/**
		 * Roles
		 */
		const lambdaRole = new cdk.aws_iam.Role(this, "lambdaRole", {
			assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
			managedPolicies: [
				cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"service-role/AWSLambdaBasicExecutionRole"
				),
			],
		});

		/**
		 * Lambda functions
		 */

		// Get image of selected timeframe
		const lambdaHandler = new lambda.Function(this, "lambdaHandler", {
			code: lambda.Code.fromAsset("../backend"),
			handler: "get_image.handler",
			runtime: lambda.Runtime.PYTHON_3_12,
			environment: {
				BUCKET_NAME: bucketName,
			},
			role: lambdaRole,
		});

		/**
		 * Lambda & API Gateway integrations
		 */

		const getLambaProxy =
			new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
				"getLambdaIntegration",
				lambdaHandler
			);

		httpApi.addRoutes({
			path: "/example",
			methods: [apigw.HttpMethod.GET],
			integration: getLambaProxy,
		});

		// Cloudformation Outputs
		new cdk.CfnOutput(this, "ApiId", {
			exportName: "ApiId",
			value: httpApi.apiId,
			description: "The id of the API Gateway",
		});

		new cdk.CfnOutput(this, "ApiEndpoint", {
			exportName: "ApiEndpoint",
			value: httpApi.apiEndpoint,
			description: "The endpoint URL of the API Gateway",
		});
	}
}

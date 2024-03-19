import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigatewayv2";
import * as ecrdeploy from "cdk-ecr-deployment";
import { Construct } from "constructs";
import path = require("path");

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

		const ecrRepoName = `${projectName}-${environment}-llm-lambda`;
		const imageTag = "latest";

		const repository = new cdk.aws_ecr.Repository(this, "Repository", {
			repositoryName: ecrRepoName,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
		});

		const asset = new cdk.aws_ecr_assets.DockerImageAsset(this, "BuildImage", {
			directory: path.join(__dirname, "../../backend/functions"),
			platform: cdk.aws_ecr_assets.Platform.LINUX_ARM64,
		});

		const deployment = new ecrdeploy.ECRDeployment(this, "DeployDockerImage", {
			src: new ecrdeploy.DockerImageName(asset.imageUri),
			dest: new ecrdeploy.DockerImageName(
				`${accountId}.dkr.ecr.${region}.amazonaws.com/${ecrRepoName}:${imageTag}`
			),
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

		lambdaRole.addManagedPolicy(
			cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
				"AmazonSSMReadOnlyAccess"
			)
		);

		/**
		 * Lambda functions
		 */
		const lambdaHandler = new cdk.aws_lambda.DockerImageFunction(
			this,
			"lambdaHandler",
			{
				code: cdk.aws_lambda.DockerImageCode.fromEcr(repository),
				architecture: cdk.aws_lambda.Architecture.ARM_64,
				timeout: cdk.Duration.seconds(300),
				memorySize: 3008,
				role: lambdaRole,
				environment: {
					OPEN_API_KEY: `/${projectName}/${environment}/OPEN_API_KEY`,
					HUGGINGFACE_KEY: `/${projectName}/${environment}/HUGGINGFACEHUB_API_TOKEN`,
				},
			}
		);
		lambdaHandler.node.addDependency(deployment);

		/**
		 * API Gateway
		 */
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

		const getLambaProxy =
			new cdk.aws_apigatewayv2_integrations.HttpLambdaIntegration(
				"getLambdaIntegration",
				lambdaHandler
			);

		httpApi.addRoutes({
			path: "/text",
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

#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { ApiStack } from "../lib/ApiStack";
import { WebStack } from "../lib/WebStack";

const envVariables = {
	environment: process.env["ENV"] ?? "",
	projectName: process.env["PROJECT_NAME"] ?? "",
	region: process.env["AWS_REGION"] ?? "",
	accountId: process.env["AWS_ACCOUNT_ID"] ?? "",
};

const app = new cdk.App();

new ApiStack(app, "ApiStack", { ...envVariables });

new WebStack(app, "WebStack", { ...envVariables });

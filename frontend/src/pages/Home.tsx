import {
	AppLayout,
	Box,
	Button,
	Container,
	ContentLayout,
	Grid,
	Header,
	SpaceBetween,
} from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import { useState } from "react";
import SideNav from "../components/SideNavigation";

const LOCALE = "en";

function Home() {
	const [navigationOpen, setNavigationOpen] = useState(false);
	return (
		<I18nProvider locale={LOCALE} messages={[messages]}>
			<AppLayout
				navigationOpen={navigationOpen}
				onNavigationChange={() => setNavigationOpen(!navigationOpen)}
				navigation={<SideNav />}
				navigationWidth={250}
				toolsHide={true}
				content={<Content />}
			/>
		</I18nProvider>
	);
}

function Content() {
	return (
		<ContentLayout
			header={
				<Box>
					<Grid
						gridDefinition={[
							{ colspan: { default: 12, s: 11 }, offset: { default: 0, s: 1 } },
							{ colspan: { default: 12, s: 5 }, offset: { default: 0, s: 1 } },
							{ colspan: { default: 12, s: 4 }, offset: { default: 0, s: 1 } },
						]}
					>
						<Box variant="awsui-value-large" fontWeight="bold">
							Amazon CloudFront
						</Box>
						<Header>
							<Box fontSize="display-l">
								Secure delivery content with low latency and high transfer
								speeds
							</Box>
							<Box variant="p">
								Amazon CloudFront is a fast content delivery network (CDN)
								service that securely delivers data, videos, applications, and
								APIs to customers globally with low latency and high transfer
								speeds
							</Box>
						</Header>
						<Container
							header={<Header variant="h2">Get started with CloudFront</Header>}
						>
							<SpaceBetween direction="horizontal" size="s">
								<Box variant="p">
									Enable accelerated, reliable and secure content delivery for
									Amazon S3 buckets, Application Load Balancers, Amazon API
									Gateway APIs, and more in 5 minutes or less.
								</Box>
								<Button>Create a CloudFront Distribution</Button>
							</SpaceBetween>
						</Container>
					</Grid>
				</Box>
			}
		>
			<Grid
				gridDefinition={[
					{ colspan: { default: 12, s: 5 }, offset: { default: 0, s: 1 } },
					{ colspan: { default: 12, s: 5 }, offset: { default: 0, s: 0 } },
				]}
			>
				<Container header={<Header variant="h2">Benefits and Features</Header>}>
					<Box variant="p">
						Enable accelerated, reliable and secure content delivery for Amazon
						S3 buckets, Application Load Balancers, Amazon API Gateway APIs, and
						more in 5 minutes or less.
					</Box>
				</Container>

				<Container header={<Header variant="h2">Use cases</Header>}>
					<Box variant="p">
						Enable accelerated, reliable and secure content delivery for Amazon
						S3 buckets, Application Load Balancers, Amazon API Gateway APIs, and
						more in 5 minutes or less.
					</Box>
				</Container>
			</Grid>
		</ContentLayout>
	);
}

export default Home;

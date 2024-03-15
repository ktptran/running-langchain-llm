import {
	AppLayout,
	Box,
	Button,
	ColumnLayout,
	Container,
	ContentLayout,
	Grid,
	Header,
	SpaceBetween,
	TextContent,
} from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import { useState } from "react";
import SideNav from "../components/SideNavigation";
import {
	benefitsFeatures,
	freeTier,
	gettingStarted,
	hero,
	pricing,
	useCases,
} from "../data/data";

const LOCALE = "en";

function Home() {
	const [navigationOpen, setNavigationOpen] = useState(false);
	return (
		<I18nProvider locale={LOCALE} messages={[messages]}>
			<AppLayout
				navigationOpen={navigationOpen}
				onNavigationChange={() => setNavigationOpen(!navigationOpen)}
				navigation={<SideNav />}
				navigationWidth={300}
				toolsHide={true}
				content={<Content />}
			/>
		</I18nProvider>
	);
}

function HeaderComponent() {
	const {
		header,
		subheader,
		description,
		getStarted,
		valueProp,
		button,
		buttonRef,
	} = hero;
	return (
		<Box>
			<Grid
				gridDefinition={[
					{ colspan: { default: 12, s: 11 }, offset: { default: 0, s: 1 } },
					{ colspan: { default: 12, s: 6 }, offset: { default: 0, s: 1 } },
					{ colspan: { default: 12, s: 4 } },
				]}
			>
				<Box variant="awsui-value-large" fontWeight="bold">
					{header}
				</Box>
				<Header>
					<Box fontSize="display-l">{subheader}</Box>
					<Box variant="p">{description}</Box>
				</Header>
				<Container header={<Header variant="h2">{getStarted}</Header>}>
					<SpaceBetween direction="horizontal" size="s">
						<Box variant="p">{valueProp}</Box>
						<Button href={buttonRef}>{button}</Button>
					</SpaceBetween>
				</Container>
			</Grid>
		</Box>
	);
}

function LeftColumn() {
	return (
		<SpaceBetween size="l">
			<Container header={<Header variant="h2">Benefits &amp; Features</Header>}>
				<ColumnLayout variant="text-grid" columns={2}>
					{benefitsFeatures.map(({ header, description }, index) => (
						<TextContent key={index}>
							<h5>{header}</h5>
							<p>{description}</p>
						</TextContent>
					))}
				</ColumnLayout>
			</Container>
			<Container header={<Header variant="h2">Use cases</Header>}>
				<ColumnLayout variant="text-grid" columns={2}>
					{useCases.map(({ header, description }, index) => (
						<TextContent key={index}>
							<h5>{header}</h5>
							<p>{description}</p>
						</TextContent>
					))}
				</ColumnLayout>
			</Container>
		</SpaceBetween>
	);
}

function RightColumn() {
	return (
		<SpaceBetween size="l">
			<Container header={<Header variant="h3">Free Tier</Header>}>
				<ColumnLayout borders="horizontal" columns={1}>
					{freeTier.map((value, index) => (
						<TextContent key={index}>
							<p>{value}</p>
						</TextContent>
					))}
				</ColumnLayout>
			</Container>
			<Container header={<Header variant="h3">Pricing (US)</Header>}>
				<ColumnLayout borders="horizontal" columns={1}>
					{pricing.map((value, index) => (
						<TextContent key={index}>
							<p>{value}</p>
						</TextContent>
					))}
				</ColumnLayout>
			</Container>
			<Container header={<Header variant="h3">Getting Started</Header>}>
				<ColumnLayout borders="horizontal" columns={1}>
					{gettingStarted.map(({ href, description }, index) => (
						<TextContent key={index}>
							<a href={href} target="_blank" rel="noopener noreferrer">
								{description}
							</a>
						</TextContent>
					))}
				</ColumnLayout>
			</Container>
		</SpaceBetween>
	);
}

function Content() {
	return (
		<ContentLayout header={<HeaderComponent />}>
			<Grid
				gridDefinition={[
					{ colspan: { default: 12, s: 6 }, offset: { default: 0, s: 1 } },
					{ colspan: { default: 12, s: 4 }, offset: { default: 0, s: 0 } },
				]}
			>
				<LeftColumn />
				<RightColumn />
			</Grid>
		</ContentLayout>
	);
}

export default Home;

import {
	AppLayout,
	Box,
	Button,
	ColumnLayout,
	Container,
	ContentLayout,
	FileUpload,
	FormField,
	Header,
	HelpPanel,
	Icon,
	Input,
	SpaceBetween,
	TextContent,
} from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import { useState } from "react";
import { putText } from "../api/apiService";
import Bot from "../assets/bot.jpeg";
import User from "../assets/user.jpeg";
import Breadcrumbs from "../components/Breadcrumbs";
import SideNav from "../components/SideNavigation";
import { conversationChatExample, hero } from "../data/data";

const LOCALE = "en";

function FileUploader() {
	const [value, setValue] = useState<File[]>([]);
	return (
		<Container header={<Header variant="h2">Upload File Below</Header>}>
			<FormField description="These files will be used to train the generated model.">
				<FileUpload
					value={value}
					onChange={({ detail }) => setValue(detail.value)}
					i18nStrings={{
						uploadButtonText: (e) => (e ? "Choose files" : "Choose file"),
						dropzoneText: (e) =>
							e ? "Drop files to upload" : "Drop file to upload",
						removeFileAriaLabel: (e) => `Remove file ${e + 1}`,
						limitShowFewer: "Show fewer files",
						limitShowMore: "Show more files",
						errorIconAriaLabel: "Error",
					}}
					showFileLastModified
					showFileSize
					showFileThumbnail
					tokenLimit={3}
					constraintText="PDF file"
				/>
			</FormField>
		</Container>
	);
}

function SingleChat({ message, source }: { message: any; source: any }) {
	return (
		<Container
			media={{
				content: <img src={source === "GPT" ? Bot : User} alt="placeholder" />,
				position: "side",
				width: "5%",
			}}
		>
			<Box variant="p">{message}</Box>
		</Container>
	);
}

function ConversationInput({ setChatHistory }: { setChatHistory: any }) {
	const [inputText, setInputText] = useState("");

	const onSubmit = async () => {
		const response = await putText(inputText);
		console.log(response);
		// TODO: Process to show on frontend
		setChatHistory((oldHistory: any) => [
			...oldHistory,
			{ message: inputText, source: "user" },
		]);
		setInputText("");
	};

	return (
		<Container
			header={
				<Header
					variant="h2"
					actions={
						<Button onClick={() => setChatHistory([])}>
							<Icon name="refresh" />
						</Button>
					}
				>
					Conversation Chat
				</Header>
			}
		>
			<SpaceBetween size="l" direction="vertical">
				<Input
					onChange={({ detail }) => setInputText(detail.value)}
					value={inputText}
					placeholder="Enter question"
				/>
				<Button onClick={() => onSubmit()}>Enter</Button>
			</SpaceBetween>
		</Container>
	);
}

function Content() {
	const { header } = hero;
	const [chatHistory, setChatHistory] = useState(conversationChatExample);
	return (
		<ContentLayout header={<Header variant="h1">{header}</Header>}>
			<SpaceBetween size="xl">
				<FileUploader />
				<ConversationInput setChatHistory={setChatHistory} />
				<SpaceBetween size="m">
					{chatHistory.map(({ message, source }, index) => (
						<SingleChat message={message} source={source} key={index} />
					))}
				</SpaceBetween>
			</SpaceBetween>
		</ContentLayout>
	);
}

function Tools() {
	return (
		<HelpPanel header={<h2>Overview</h2>}>
			<ColumnLayout borders="horizontal" columns={1}>
				<TextContent>
					<h4>Getting Started</h4>
					<p>Upload the PDF files you would like to train the GPT model on</p>
				</TextContent>
				<TextContent>
					<h4>Interactivity</h4>
					<p>Enter a question into the conversation chat.</p>
					<p>This will generate a response using the information provided.</p>
				</TextContent>
				<TextContent>
					<h4>Resetting</h4>
					<p>
						Reset the conversation using the refresh symbol on the right hand
						side of the conversation chat.
					</p>
				</TextContent>
			</ColumnLayout>
		</HelpPanel>
	);
}

function Service() {
	const [navigationOpen, setNavigationOpen] = useState(false);
	const [toolsOpen, setToolsOpen] = useState(false);
	return (
		<I18nProvider locale={LOCALE} messages={[messages]}>
			<AppLayout
				breadcrumbs={<Breadcrumbs />}
				navigationOpen={navigationOpen}
				onNavigationChange={() => setNavigationOpen(!navigationOpen)}
				navigationWidth={300}
				navigation={<SideNav />}
				content={<Content />}
				toolsOpen={toolsOpen}
				onToolsChange={() => setToolsOpen(!toolsOpen)}
				toolsWidth={300}
				tools={<Tools />}
			/>
		</I18nProvider>
	);
}

export default Service;

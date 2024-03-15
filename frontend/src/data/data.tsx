interface homeContentInterface {
	header: string;
	description: string;
}

interface linkInterface {
	href: string;
	description: string;
}

interface chatInterface {
	source: string;
	message: string;
}

interface heroInterface {
	header: string;
	subheader: string;
	description: string;
	getStarted: string;
	valueProp: string;
	button: string;
	buttonRef: string;
}

const hero: heroInterface = {
	header: "PDF Langchain Model",
	subheader: "Read PDFs to answer questions within seconds.",
	description:
		"The PDF Langchain model is a service that allows user interactability to answer questions from any PDFs",
	getStarted: "Get Started with the model",
	valueProp:
		"Enable information sourcing in a reliable and secure way within seconds.",
	button: "Talk with Chatbot",
	buttonRef: "/chatbot",
};

const benefitsFeatures: homeContentInterface[] = [
	{
		header: "Reduce Time Consumption",
		description:
			"The CloudFront network has 225+ points of presence (PoPs) that are connected by fully redundant, parallel 100 GbE fiber delivering ultra-low latency performance and high availability to your end users. CloudFront automatically maps network conditions and intelligently routes your user’s traffic when serving up cached or dynamic content.",
	},
	{
		header: "Improve Security",
		description:
			"Use CloudFront for perimeter protection, traffic encryption, and access controls. AWS Shield Standard defends traffic transmitted through CloudFront from DDoS attacks at no additional charge. For application protection, you can integrate AWS WAF, managed rules, and managed third-party firewall options into CloudFront workloads.",
	},
	{
		header: "Cut costs",
		description:
			"Integrated with AWS, using CloudFront consolidates requests and removes data transfer out fees from your AWS origins. CloudFront offers customizable pricing options including simple pay-as-you-go pricing with no upfront fees and the CloudFront Security Savings Bundle that helps save up to an additional 30%.",
	},
	{
		header: "Customize delivery",
		description:
			"Serverless compute features enable you to securely run your own code at the AWS CDN edge. Customize your delivery to overcome the unique challenges your business faces, creating your own balance between cost, performance, and security.",
	},
];

const useCases: homeContentInterface[] = [
	{
		header: "Deliver fast, secure websites",
		description:
			"Amazon CloudFront delivers your websites to viewers across the globe securely and with high performance. Granular cache configuration controls, built-in capabilities such as Gzip and Brotli compression, and edge compute capabilities speed up delivery while Transport Layer Security (TLS) 1.3 and field-level encryption helps you improve your application security posture.",
	},
	{
		header: "Accelerate dynamic content delivery and APIs",
		description:
			"CloudFront moves dynamic web content along the AWS global network infrastructure to accelerate delivery. CloudFront supports Websocket connections and proxy methods. CloudFront optimizes your network path with TLS edge termination and connection keep-alive. Secure your API calls with integrated AWS WAF and AWS Shield protection.",
	},
	{
		header: "Stream video live and on-demand",
		description:
			"CloudFront is designed to handle your live and on-demand video workloads. With full AWS and Elemental media services integration, CloudFront provides default mid-tier caching, Origin Shield architecture, and real time monitoring. CloudFront supports multiple streaming formats, including Microsoft Smooth, HLS, HDS, and MPEG-DASH, to any device.",
	},
	{
		header: "Distribute software, game patches, and IoT OTA updates",
		description:
			"CloudFront scales automatically as your globally distributed clients download software updates directly from edge locations. CloudFront’s high data transfer rates speed up the delivery of binaries, game patches, Internet of Things (IoT), and over-the-air (OTA) updates - improving your customers experience cost effectively at scale.",
	},
];

const pricing: string[] = [
	"First 1 TB data transfer free each month",
	"10,000,000 HTTP or HTTPS requests",
	"2,000,000 CloudFront Function invocations",
	"Each month, always free",
];

const freeTier: string[] = [
	"First 1 TB data transfer free each month",
	"10,000,000 HTTP or HTTPS requests",
	"2,000,000 CloudFront Function invocations",
	"Each month, always free",
];

const gettingStarted: linkInterface[] = [
	{
		href: "https://google.com",
		description: "Getting Started",
	},
	{
		href: "https://google.com",
		description: "Create a secure static website for your domain name",
	},
	{
		href: "https://google.com",
		description: "Amazon CloudFront FAQs",
	},
];

const conversationChatExample: chatInterface[] = [
	{
		source: "GPT",
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae tempore facilis mollitia obcaecati? Incidunt cumque odit quo culpa, temporibus adipisci alias omnis consequatur dignissimos voluptate nisi labore. Tempore, totam perferendis!",
	},
	{
		source: "user",
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae tempore facilis mollitia obcaecati? Incidunt cumque odit quo culpa, temporibus adipisci alias omnis consequatur dignissimos voluptate nisi labore. Tempore, totam perferendis!",
	},
	{
		source: "GPT",
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae tempore facilis mollitia obcaecati? Incidunt cumque odit quo culpa, temporibus adipisci alias omnis consequatur dignissimos voluptate nisi labore. Tempore, totam perferendis!",
	},
	{
		source: "user",
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae tempore facilis mollitia obcaecati? Incidunt cumque odit quo culpa, temporibus adipisci alias omnis consequatur dignissimos voluptate nisi labore. Tempore, totam perferendis!",
	},
];

export {
	benefitsFeatures,
	conversationChatExample,
	freeTier,
	gettingStarted,
	hero,
	pricing,
	useCases,
};

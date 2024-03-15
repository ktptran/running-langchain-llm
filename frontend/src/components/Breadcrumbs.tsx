import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";

function Breadcrumbs() {
	return (
		<BreadcrumbGroup
			items={[
				{ text: "Home", href: "/" },
				{ text: "Chat Bot", href: "/chatbot" },
			]}
		/>
	);
}

export default Breadcrumbs;

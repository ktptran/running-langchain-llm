import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";

function Breadcrumbs() {
	return (
		<BreadcrumbGroup
			items={[
				{ text: "Home", href: "#" },
				{ text: "Service", href: "#" },
			]}
		/>
	);
}

export default Breadcrumbs;

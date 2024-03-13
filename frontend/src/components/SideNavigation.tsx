import { SideNavigation } from "@cloudscape-design/components";

function SideNav() {
	return (
		<SideNavigation
			header={{
				href: "#",
				text: "Service name",
			}}
			items={[{ type: "link", text: `Paage #1`, href: `#` }]}
		/>
	);
}

export default SideNav;

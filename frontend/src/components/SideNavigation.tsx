import { SideNavigation } from "@cloudscape-design/components";
import { hero } from "../data/data";

function SideNav() {
	const { header } = hero;
	return (
		<SideNavigation
			header={{
				href: "/",
				text: header,
			}}
			items={[{ type: "link", text: `Chat Bot`, href: "/chatbot" }]}
		/>
	);
}

export default SideNav;

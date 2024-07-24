import TitleBar from "./title-bar/TitleBar";

export default function Layout({ children }) {
	return (
		<>
			<TitleBar hasPreviousButton={false} />
			{children}
		</>
	);
}

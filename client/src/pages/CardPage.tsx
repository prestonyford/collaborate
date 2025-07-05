import Label from "../components/base/Label"
import Page from "./Page"

interface Props {

}

function CardPage(props: Props) {

	return (
		<>
			<Page title={<h1 className="-mb-2">Card Name Here</h1>}>
				<div className="px-6">
					<div className="text-text-muted text-sm flex gap-6">
						<div>
							<i className="fa-solid fa-calendar-week mr-1"></i>
							DATE
						</div>
						<div>
							<i className="fa-solid fa-user mr-1"></i>
							NAME
						</div>
					</div>

					<h3 className="mt-4 inline-flex items-center gap-2">
						Description
						<i className="text-sm fa-solid fa-pen-to-square cursor-pointer"></i>
					</h3>
					<p className="text-text-muted">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue consectetur facilisis. Integer egestas ut risus ut ultricies. Quisque feugiat ullamcorper mi eu semper. Proin vel sapien efficitur, semper lacus ac, tempor tellus. Sed ornare velit vitae nisi tristique euismod. Nulla fringilla laoreet mi, eu semper mi posuere ac. Pellentesque eu rhoncus orci, ac rhoncus sapien. Aliquam pulvinar mauris eu leo aliquam, eu dictum leo molestie. Donec volutpat elementum pulvinar. Donec cursus, lacus at facilisis tincidunt, lorem lectus placerat augue, in pretium lectus elit et purus.
					</p>

					<h3 className="mt-4">Labels</h3>
					<div className="flex gap-2 pt-1">
						<Label title={"label name here"} color={"#eb4034"} removable />
						<Label title={"label name here"} color={"#ffe54f"} removable />
					</div>

					<h3 className="mt-4">Activity</h3>
					<div className="text-text-muted flex gap-2 pt-1">
						Names of participants here
					</div>

					<h3 className="mt-4">Discussion</h3>
					<div className="text-text-muted flex flex-col pt-1">
						Discussion here
					</div>
				</div>
			</Page>
		</>
	)
}

export default CardPage

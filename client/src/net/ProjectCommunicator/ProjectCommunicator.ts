import type ProjectDTO from "../../model/dto/ProjectDTO";

export default interface ProjectCommunicator {
	getOwnedAndSharedProjects(): Promise<ProjectDTO[]>
}

import type LabelDTO from "../../model/dto/LabelDTO";
import type LabelCommunicator from "./LabelCommunicator";

export default class FakeLabelCommunicator implements LabelCommunicator {
	async getProjectLabels(projectID: string): Promise<LabelDTO[]> {
		return [
			{ id: '0', title: 'Frontend', color: '#f44336' },        // red
			{ id: '1', title: 'Backend', color: '#2196f3' },         // blue
			{ id: '2', title: 'In Progress', color: '#ffeb3b' },     // yellow
			{ id: '3', title: 'Design Review', color: '#4caf50' },   // green
			{ id: '4', title: 'UX', color: '#9c27b0' },              // purple
			{ id: '5', title: '🔥 Hotfix', color: '#ff5722' },       // deep orange
			{ id: '6', title: 'QA Needed', color: '#795548' },       // brown
			{ id: '7', title: 'v1.2.0-beta', color: '#607d8b' },     // blue grey
			{ id: '8', title: 'A', color: '#000000' },               // black
			{ id: '9', title: 'Z', color: '#ffffff' },               // white
			{ id: '10', title: 'This Label Has a Really Long Name', color: '#03a9f4' },
			{ id: '11', title: 'Done', color: '#cddc39' },           // lime
			{ id: '12', title: 'Stuck', color: '#e91e63' },          // pink
			{ id: '13', title: 'Low Priority', color: '#ff9800' },   // orange
			{ id: '14', title: 'Dark Theme Test', color: '#121212' } // very dark
		]
	}
}

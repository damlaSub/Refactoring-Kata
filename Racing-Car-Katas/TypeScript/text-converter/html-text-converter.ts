import { readFileSync } from 'fs';
import TextConventer from './textConventer';

export default class HtmlTextConverter extends TextConventer{
	private fullFilenameWithPath: string;

	constructor(fullFilenameWithPath: string) {
		super();
		this.fullFilenameWithPath = fullFilenameWithPath;
	}

	public convertToHtml(): string {
		const text = readFileSync(this.fullFilenameWithPath).toString();
		return this.convertFromText(text);
	}

	public getFilename() {
		return this.fullFilenameWithPath;
	}
}

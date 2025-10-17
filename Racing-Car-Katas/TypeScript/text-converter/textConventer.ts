export default class TextConventer {

    public convertFromText(text:string) {
        let i = 0;
		const html: string[] = [];
		let convertedLine: string[] = [];

		function stashNextCharacterAndAdvanceThePointer() {
			const c = text.charAt(i);
			i += 1;
			return c; 
		}

		function addANewLine() {
			const line = convertedLine.join('');
			html.push(line);
			convertedLine = [];
		}

		function pushACharacterToTheOutput() {
			convertedLine.push(characterToConvert);
		}

		let characterToConvert = stashNextCharacterAndAdvanceThePointer();

		while (i <= text.length) {

			switch (characterToConvert) {
				case '<':
					convertedLine.push('&lt;');
					break;
				case '>':
					convertedLine.push('&gt;');
					break;
				case '&':
					convertedLine.push('&amp;');
					break;
				case '\n':
					addANewLine();
					break;
				default:
					pushACharacterToTheOutput();
			}

			characterToConvert = stashNextCharacterAndAdvanceThePointer();
		}

		addANewLine();
		return html.join('<br />');
    }
}
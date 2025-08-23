import { useState } from "react"
import Popup from "../../components/base/Popup"
import TextInput from "../../components/base/TextInput"
import ColorInput from "../../components/base/ColorInput"

interface Props {
	onCancel: () => void
	onSubmit: (name: string, color: string) => void
}

function ColumnEditorPopup(props: Props) {
	const [name, setName] = useState<string>("");
	const [color, setColor] = useState<string>("");
	const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
	const [isColorInvalid, setIsColorInvalid] = useState<boolean>(false);

	function onInputName(val: string) {
		setName(val);
		setIsNameInvalid(false);
	}
	function onInputColor(val: string) {
		setColor(val);
		setIsColorInvalid(false);
	}

	function validate(): boolean {
		let res = true;
		if (!name) {
			setIsNameInvalid(true);
			res = false;
		} else {
			setIsNameInvalid(false);
		}
		if (!color) {
			setIsColorInvalid(true);
			res = false;
		} else {
			setIsColorInvalid(false);
		}
		return res;
	}

	function handleConfirm() {
		if (!validate()) {
			return;
		}
		props.onSubmit(name, color);
	}
	
	return (
		<Popup size='small' title='Create Column' onEscape={props.onCancel} buttons={[{
			text: 'Cancel',
			variant: 'secondary',
			onClick: props.onCancel
		}, {
			text: 'Create Column',
			variant: 'primary',
			onClick: handleConfirm
		}]}>
			<div className="p-2 flex">
				<div className="m-auto grid grid-cols-[1fr_3fr] text-right gap-2 w-[70%] items-baseline">
					<label htmlFor="name">Name:</label>
					<TextInput id="name" value={name} onChange={onInputName} invalid={isNameInvalid} required />
					<label htmlFor="color">Color:</label>
					<div className="self-center flex">
						<ColorInput id="color" value={color} onChange={onInputColor} invalid={isColorInvalid} required />
					</div>
				</div>
			</div>
		</Popup>
	)
}

export default ColumnEditorPopup

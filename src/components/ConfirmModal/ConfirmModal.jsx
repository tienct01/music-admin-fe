import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';

function ConfirmModal({ opened, handleYes }) {
	const [opened, { close, open }] = useDisclosure(opened);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Authentication"
			>
				Do you want to delete this song ?
				<Group position="apart">
					<Button
						onClick={close}
						variant="outline"
					>
						Cancel
					</Button>
					<Button onClick={handleYes}>Yes</Button>
				</Group>
			</Modal>
		</>
	);
}
export default ConfirmModal;

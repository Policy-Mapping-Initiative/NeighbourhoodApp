import { isPolicyModalOpen } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../store";

export default function PolicyModal() {
    const isOpen = useAppSelector(isPolicyModalOpen);

  
    return (
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={useAppDispatch(closeMo)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
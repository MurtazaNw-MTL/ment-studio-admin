import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Chip, Grid, Typography } from "@mui/material";
import { MyIcons } from "src/views/icons/Icons";
import ShowAvatar, { TextAndIcon } from "src/components/Common/CommonComponent";
import { CopyIt } from "src/components/commonfunctions";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
function BlockModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  data,
  closeParent
}) {
  // const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleOpen = () => {
    setShowConfirm(true);
  };
  const blockUser = async () => {
    if (message.trim() == "") return toast.error("Message can't be empty");
    let apiData = await CALL_API.USERS.block({
      id: data._id,
      status: true,
      message
    });
    if (apiData.data.success) {
      toast.error(`${data?.fullName} has been blocked`);
      handleClose();
      closeParent();
      pageReloader();
    }
  };
  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirmation Alert</h2>
          <p id="child-modal-description">
            Are you sure, you want to block {data?.fullName}
          </p>
          <textarea
            value={message}
            style={{ width: "100%" }}
            rows={3}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button onClick={handleClose}> Cancel</Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="error" onClick={blockUser}>
                Block
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function UnblockModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  closeParent,
  data
}) {
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setShowConfirm(true);
  };
  const unBlockUser = async () => {
    let apiData = await CALL_API.USERS.block({
      id: data._id,
      status: false,
      message: ""
    });
    if (apiData.data.success) {
      toast.success(`${data?.fullName} has been unblocked`);
      closeParent();
      pageReloader();
    } else {
      toast.error(apiData.message);
    }
  };
  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirmation Alert</h2>
          <p id="child-modal-description">
            Are you sure, you want to Unblock {data?.fullName}
          </p>

          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button onClick={handleClose}> Cancel</Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="error" onClick={unBlockUser}>
                Unblock
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
function VerifyUserModal({
  showConfirm,
  setShowConfirm,
  pageReloader,
  closeParent,
  data
}) {
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setShowConfirm(true);
  };
  const Verify = async () => {
    let apiData = await CALL_API.USERS.verify({
      id: data._id,
      status: true
    });
    if (apiData.data.success) {
      toast.success(`${data?.fullName} has been Verified`);
      closeParent();
      pageReloader();
    } else {
      toast.error(apiData.message);
    }
  };
  const handleClose = () => {
    setShowConfirm(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={showConfirm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Confirmation Alert</h2>
          <p id="child-modal-description">
            Are you sure, you want to Verify {data?.fullName}
          </p>

          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              {" "}
              <Button variant="contained" onClick={handleClose}>
                {" "}
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="error" onClick={Verify}>
                Verify
              </Button>
            </Grid>
          </Grid>

          {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ProductDetailModal({
  showModal,
  setShowModal,
  pageReloader
}) {
  //   const [open, setOpen] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showUnblockModal, setShowUnblockModal] = React.useState(false);
  const [showVerificationModal, setShowVerificationModal] =
    React.useState(false);
  let { data } = showModal;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* <Button onClick={}>Open modal</Button> */}
      <Modal
        open={showModal.open}
        onClose={() => setShowModal({ open: false, data: null })}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <div className="avatarName">
            <ShowAvatar name={data?.fullName} />
            <Typography variant="h3">{data?.fullName}</Typography>{" "}
            <Chip
              label={data?.isVerified ? "Verified" : "Not Verified"}
              color={data?.isVerified ? "success" : "error"}
            />
          </div>
          <br />

          {data?.company && (
            <div className="avatarName">
              <TextAndIcon
                Icon={MyIcons.BUSINESS}
                Text={data?.company}
                onClick={() => CopyIt("Company", data.company)}
              />
            </div>
          )}
          <TextAndIcon
            Icon={MyIcons.EMAIL}
            Text={data?.email}
            onClick={() => CopyIt("Email", data.email)}
          />
          <TextAndIcon
            Icon={MyIcons.CALL}
            Text={data?.mobileNumber}
            onClick={() => CopyIt("Mobile", data.mobileNumber)}
          />
          <br />
          <Typography fontWeight="bold">About</Typography>
          <p id="parent-modal-description">{data?.about}</p>
          <br />
          <Grid container justifyContent="end">
            <Grid item xs={3} textAlign="right">
              <Button
                // variant=""
                // color="success"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
            {!data?.isVerified && (
              <Grid item xs={3} textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setShowVerificationModal(true)}
                >
                  Verify User
                </Button>
              </Grid>
            )}
            <Grid item xs={3} textAlign="right">
              {data?.isBlocked?.status ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setShowUnblockModal(true)}
                >
                  Unblock User
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setShowConfirm(true)}
                >
                  Block User
                </Button>
              )}
            </Grid>
          </Grid>
          <BlockModal
            showConfirm={showConfirm}
            data={data}
            closeParent={handleClose}
            setShowConfirm={setShowConfirm}
            pageReloader={pageReloader}
          />
          <UnblockModal
            showConfirm={showUnblockModal}
            data={data}
            closeParent={handleClose}
            setShowConfirm={setShowUnblockModal}
            pageReloader={pageReloader}
          />
          <VerifyUserModal
            showConfirm={showVerificationModal}
            data={data}
            closeParent={handleClose}
            setShowConfirm={setShowVerificationModal}
            pageReloader={pageReloader}
          />
        </Box>
      </Modal>
    </div>
  );
}

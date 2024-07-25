import React, { useEffect, useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CALL_API } from "src/services/APICalls";
import {
  convertStringToFormat,
  showDate
} from "src/components/commonfunctions";
import { Button } from "@mui/material";
import AddUsers from "./AddUsers";
import SeoLib from "../../components/CommonComponents/Helmet";
function ManageUsers() {
  // modal actions to add users
  const [open, setOpen] = React.useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const reloadIt = () => setReloadPage(!reloadPage);

  let ActionButton = (
    <Button variant="contained" onClick={handleOpen} className="cus-btn">
      Add
    </Button>
  );
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    (async () => {
      setOpen(false);
      let { data } = await CALL_API.users.get({});
      console.log(data);
      setTableData(data.data);
    })();
  }, [reloadPage]);

  return (
    <PageContainer title="Manage Users" description="">
      <DashboardCard title="Manage Users" action={ActionButton}>
        {/* <SeoLib title="User Management" /> */}
        <AddUsers
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          reloadIt={reloadIt}
        />

        <BasicTable rows={tableData} />
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({ rows }) => {
  const title = {
    fontWeight: "bold",
    fontSize: "17px"
  };
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell style={title}>Sr No</TableCell>
          <TableCell style={title}>Role</TableCell>
          <TableCell style={title} align="center">
            Full Name
          </TableCell>
          <TableCell style={title} align="center">
            Wallet Address
          </TableCell>
          <TableCell style={title} align="center">
            Created At
          </TableCell>
          {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            style={{
              background: index % 2 == 0 ? "#e8e8e8" : "white"
            }}
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="center">{row.role}</TableCell>
            <TableCell align="center">{row.fullName}</TableCell>
            <TableCell align="center">
              {convertStringToFormat(row.walletAddress)}
            </TableCell>
            <TableCell align="center">{showDate(row.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ManageUsers;

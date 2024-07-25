import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CALL_API } from "src/services/APICalls";
import { toast } from "react-toastify";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import { CopyIt, showDate } from "src/components/commonfunctions";
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { MyTheme } from "src/layouts/customTheme";
import BusinessIcon from "@mui/icons-material/Business";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import UserDetailModal from "./UserDetailModal";
import ShowAvatar, {
  NoData,
  TextAndIcon
} from "src/components/Common/CommonComponent";
import { MyIcons } from "src/views/icons/Icons";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserList = () => {
  const [tableData, settableData] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [page, setpage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");

  const [searchParams, setSearchParams] = useState();
  const [showModal, setShowModal] = useState({
    open: false,
    data: null
  });
  const navigate = useNavigate();
  const pageReloader = () => setReloadPage(!reloadPage);
  let currPage = new URLSearchParams(window.location.search).get("page") || 1;

  useEffect(() => {
    // console.log(searchQuery);
    // if (!currPage) currPage = 0;
    setpage(currPage);
    // setSearchParams(searchTerm || "");
    getUsersData(currPage);
  }, [reloadPage, filterData, page, currPage]);

  const getUsersData = async (currPage) => {
    setshowLoader(true);

    try {
      let { data } = await CALL_API.USERS.get({
        ...filterData,
        page: currPage,
        role: "USER"
      });
      if (data.success) {
        setshowLoader(false);
        console.log(data);
        settableData(data.data);
      } else {
        toast.error(data.message);

        setshowLoader(false);
      }
    } catch (error) {
      // toast.error(error.message);
      setshowLoader(false);
      settableData([]);
    }
  };

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={3}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFilterData({ ...filterData, search });
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center"
              }}
            >
              <input
                className="searchInput"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MyIcons.SEARCH
                fontSize="large"
                onClick={() => {
                  // if(search==)
                  setFilterData({ ...filterData, search });
                }}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  right: "0.5rem"
                }}
              />
            </div>
          </form>
        </Grid>

        <Grid item xs={3} textAlign="right">
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">
              Select
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={filterState}
              label="Select"
              onChange={(e) => {
                console.log(e.target.value);
                let { value } = e.target;

                value == "All"
                  ? setFilterData({}) // {}
                  : value == "isVerified"
                  ? setFilterData({ isVerified: true })
                  : value == "notVerified"
                  ? setFilterData({ isVerified: false })
                  : setFilterData({ "isBlocked.status": true });
                setFilterState(
                  value == "All"
                    ? "All"
                    : value == "isVerified"
                    ? "isVerified"
                    : value == "notVerified"
                    ? "notVerified"
                    : "isBlocked.status"
                );
                // setFilterData(e.target.value);
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="isBlocked.status">Blocked</MenuItem>
              <MenuItem value="isVerified">Verified</MenuItem>
              <MenuItem value="notVerified">Not Verified</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {showLoader ? (
        <CustomLoader show={showLoader} />
      ) : (
        <>
          {tableData?.length ? (
            <>
              <UserTable
                tableData={tableData}
                showModal={showModal}
                pageReloader={pageReloader}
                setShowModal={setShowModal}
              />

              <Grid container justifyContent="center" mt={3}>
                <Grid item xs={1} textAlign="right">
                  <MyIcons.LEFTARROW
                    onClick={() => {
                      if (page > 1) {
                        let next = parseInt(page) - +1;
                        navigate("/manage-users?page=" + next);
                      }
                    }}
                    style={{
                      cursor: page == 1 ? "no-drop" : "pointer",
                      color: page > 1 ? MyTheme.bgColor1 : "gray"
                    }}
                  />
                </Grid>
                <Grid item xs={1} textAlign="center">
                  <Typography>{+page}</Typography>
                </Grid>
                <Grid item xs={1} textAlign="left">
                  <MyIcons.RIGHTARROW
                    onClick={() => {
                      // setpage(page + 1)
                      if (tableData.length < 10) return null;
                      let next = parseInt(page) + +1;
                      navigate("/manage-users?page=" + next);
                    }}
                    style={{
                      cursor: tableData?.length != 10 ? "no-drop" : "pointer",
                      color: tableData?.length == 10 ? MyTheme.bgColor1 : "gray"
                    }}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default UserList;

const UserTable = ({
  tableData = [],
  showModal,
  setShowModal,
  pageReloader
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      //   backgroundColor: theme.palette.common.black,
      //   color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th, td, th": {
      //   border: "1px solid red",
      padding: "12px 16px !important"
    },
    ":hover": {
      backgroundColor: MyTheme.tableHover
    }
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{}}>
          <TableRow>
            <StyledTableCell className="bold fs18">Sr</StyledTableCell>
            <StyledTableCell className="bold fs18">Name</StyledTableCell>
            <StyledTableCell align="left" className="bold fs18">
              Contact
            </StyledTableCell>
            <StyledTableCell align="center" className="bold fs18">
              Products
            </StyledTableCell>
            <StyledTableCell align="center" className="bold fs18">
              Verification
            </StyledTableCell>
            <StyledTableCell align="right" className="bold fs18">
              Created At
            </StyledTableCell>
            <StyledTableCell align="right" className="bold fs18">
              View
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell align="left">{index + 1}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <div className="avatarName">
                  <ShowAvatar name={row?.fullName} />

                  <div>
                    <Typography>{row?.fullName}</Typography>
                    {row.company && (
                      <TextAndIcon
                        Icon={BusinessIcon}
                        Text={row?.company}
                        onClick={() => CopyIt("Company Name", row?.company)}
                      />
                    )}
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <TextAndIcon
                  Icon={EmailRoundedIcon}
                  Text={row?.email}
                  onClick={() => CopyIt("Email", row.email)}
                />
                <TextAndIcon
                  Icon={CallRoundedIcon}
                  Text={row?.mobileNumber}
                  onClick={() => CopyIt("Mobile Number", row.mobileNumber)}
                />

                {/* <Typography fontWeight="bold">{row?.mobileNumber}</Typography> */}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.productCount ? row?.productCount : 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row?.isBlocked.status && (
                  <Chip label="Blocked" color="error" />
                )}

                <Chip
                  label={row?.isVerified ? "Verified" : "Not Verified"}
                  color={row?.isVerified ? "success" : "warning"}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {showDate(row.createdAt)}
              </StyledTableCell>
              <StyledTableCell align="right">
                <MyIcons.EYE
                  color="primary"
                  fontSize="large"
                  // style={{ color: "red" }}
                  style={{ cursor: "pointer", color: MyTheme.bgColor1 }}
                  onClick={() => setShowModal({ open: true, data: row })}
                />
                {/* <Button
                  variant="outlined"
                >
                  View
                </Button> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {/*  extras */}

      <UserDetailModal
        pageReloader={pageReloader}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </TableContainer>
  );
};

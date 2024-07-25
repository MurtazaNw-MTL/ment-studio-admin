import React from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import BusinessIcon from "@mui/icons-material/Business";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardControlKey";
import DOWN_ICON from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Icons = () => {
  return (
    <PageContainer title="Icons" description="this is Icons">
      <DashboardCard title="Icons">
        <iframe
          src="https://tabler-icons.io/"
          title="Inline Frame Example"
          frameBorder={0}
          width="100%"
          height="650"
        ></iframe>
      </DashboardCard>
    </PageContainer>
  );
};

export const MyIcons = {
  BUSINESS: BusinessIcon,
  EMAIL: EmailRoundedIcon,
  CALL: CallRoundedIcon,
  EYE: RemoveRedEyeIcon,
  SEARCH: SearchIcon,
  LEFTARROW: ArrowBackIosIcon,
  RIGHTARROW: ArrowForwardIosIcon,
  PRODUCTS: ProductionQuantityLimitsIcon,
  EDIT: EditIcon,
  UPICON: UpIcon,
  DOWNICON: DOWN_ICON,
  CIRCLECHECK: CheckCircleIcon
};

export default Icons;

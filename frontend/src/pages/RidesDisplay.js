import { 
    Box,
    IconButton,
    SlideFade,
    ButtonGroup,
} from "@chakra-ui/react";
import { useControllableState } from "@chakra-ui/react";
import RideCardGrid from "../components/RideCardGrid";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";

import RideCardAccordion from "../components/RideCardAccordian";

export default function RidesDisplay(props) {
  const [viewAccordion, setViewAccordion] = useControllableState({
    defaultValue: true,
  });
  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
  };

  return (
    <Box>
      <ButtonGroup isAttached>
        <IconButton
          icon={<AiOutlineUnorderedList />}
          onClick={() => setViewAccordion(true)}
          backgroundColor={viewAccordion ? "primary.600" : "primary.500"}
        />
        <IconButton
          icon={<BsGrid />}
          onClick={() => setViewAccordion(false)}
          backgroundColor={!viewAccordion ? "primary.600" : "primary.500"}
        />
      </ButtonGroup>
      <SlideFade
        in={viewAccordion}
        direction="down"
        offsetY="20px"
        unmountOnExit={true}
        transition={transitionProp}
      >
        <RideCardAccordion authUser={props.authUser} rides={props.rides} />
      </SlideFade>
      <SlideFade
        in={!viewAccordion}
        direction="down"
        offsetY="20px"
        unmountOnExit={true}
        transition={transitionProp}
      >
        <RideCardGrid rides={props.rides} />
      </SlideFade>
    </Box>
  );
}

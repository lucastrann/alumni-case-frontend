import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

interface ModalCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (title: string, startDate: string, endDate: string) => void;
  title: string;
  placeholder: string;
}

const ModalCalendar: React.FC<ModalCalendarProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  placeholder,
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  const handleConfirmClick = () => {
    if (eventTitle && startDate && endDate) {
      const formattedStartDate = startDate.toLocaleDateString();
      const formattedEndDate = endDate.toLocaleDateString(); 

      onConfirm(eventTitle, formattedStartDate, formattedEndDate); 
      setEventTitle(""); 
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            mb="2"
          />
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="dd/MM/yyyy" // Set the desired date format
            placeholderText="Start Date"
            className="date-picker" 
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            dateFormat="dd/MM/yyyy" // Set the desired date format
            placeholderText="End Date"
            className="date-picker" 
          />
          <Flex justifyContent="flex-end">
            <Button colorScheme="teal" onClick={handleConfirmClick}>
              Confirm
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalCalendar;
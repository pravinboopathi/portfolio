import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Snackbar, IconButton, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, #5a67d8 0%, #4c51bf 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer; /* Add this line to change the mouse pointer to a hand icon */
  transition: background 0.3s ease; /* Add smooth transition for background change */
  
  &:hover {
    background: linear-gradient(225deg, #4c51bf 0%, #5a67d8 100%); /* Slightly change the gradient direction on hover */
  }
`;


const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  text-align: center;
  @media (max-width: 600px) {
    width: 95%;
  }
`;

const ModalHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const ModalBody = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #333;
`;

const Contact = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();

  const validateForm = () => {
    const formData = new FormData(form.current);
    const email = formData.get('email');
    const name = formData.get('name');
    const message = formData.get('message');

    if (!email || !name || !message) {
      setMessage("All fields are required.");
      setOpenSnackbar(true);
      return false;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Invalid email address.");
      setOpenSnackbar(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer d65c4077-35d4-4075-9103-b4bb22efb56c`, // Your Web3Form API key
        },
        body: JSON.stringify({
          ...data,
          access_key: 'd65c4077-35d4-4075-9103-b4bb22efb56c', // Your Web3Form API key
          subject: 'New Submission from Web3Forms'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success) {
        setOpenModal(true);
        form.current.reset();
      } else {
        setMessage("Failed to send message.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred: " + error.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact Me !!</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="email" />
          <ContactInput placeholder="Your Name" name="name" />
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={Boolean(message)}
          autoHideDuration={6000}
          onClose={() => setMessage("")}
          message={message}
          action={
            <IconButton size="small" color="inherit" onClick={() => setMessage("")}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ModalContainer>
            <CloseButton onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </CloseButton>
            <ModalHeader>📬 Message Sent</ModalHeader>
            <ModalBody>Your message has been sent successfully! We will contact you soon. Thank you!</ModalBody>
          </ModalContainer>
        </Modal>
      </Wrapper>
    </Container>
  );
};

export default Contact;

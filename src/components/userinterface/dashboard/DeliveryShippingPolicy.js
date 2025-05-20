import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
const DeliveryShippingPolicy = () => {
  return (
    <div>
     <Header />
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          DELIVERY AND SHIPPING POLICY
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            GENERAL
          </Typography>
          <Typography paragraph>
            1.1. Reliance Retail Limited, having its registered office at 3rd Floor, Court House, Lokmanya Tilak Marg, Dhobi Talao, Mumbai – 400 002, Maharashtra, India ("Reliance", "we", "us" or "our") is managing and operating the mobile application/website and tablet applications available at www.quickcomm.com (collectively referred to as the "QuickComm", or "Website" or "App"), which inter alia facilitate the sale and purchase of products and services listed and sold ("Products") on the Website. The term ("User" or "Users" or "you" or "your") means any individual which uses, accesses or browses the Website and/or purchases the Products.
          </Typography>
          <Typography paragraph>
            1.2. The 'Terms and Conditions' published on QuickComm shall be read by reference here. This 'Shipping and Delivery Policy' ("Policy"), together with the 'Terms and Conditions' and other policies on the Website sets out our policies and procedures towards delivery and shipping of Products purchased via QuickComm.
          </Typography>
          <Typography paragraph>
            1.3. We provide shipping and delivery of our Products all over India. We aim to provide the best customer experience for you by tying-up and partnering with leading logistics service providers to handle your order in the best possible way and to ensure that you have a hassle-free experience in receiving the Product that you have ordered from QuickComm. We make all commercially reasonable endeavours to ensure that the Products are delivered to you in a timely fashion.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            APPLICABILITY OF POLICY
          </Typography>
          <Typography paragraph>
            2.1. By using QuickComm and/or initiating a request for purchase of Products on the Website, you agree to be bound by the terms contained in this Policy. If you do not agree to the terms contained in this Policy, you are advised not to transact on QuickComm. Please note that, we may from time to time change the terms of the Policy. Every time you wish to use QuickComm, please check the Policy to ensure you understand the terms and conditions that apply at that time.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            TERMS OF SHIPPING AND DELIVERY
          </Typography>
          <Typography paragraph>
            3.1. We partner with third party logistics service providers in order to effectuate Product shipping and delivery to you ("Logistics Partners"). We shall provide the details of the Logistics Partner who will be responsible for processing the shipping and delivery of any Product(s) purchased by you on the Website at the time such Product is processed and successfully handed over to the Logistics Partner by us. The Products are usually dispatched within 2 to 4 days of receiving the Order on QuickComm. In any case, the User will be provided with an estimated timeline for the delivery of the Product purchased from QuickComm.
          </Typography>
          <Typography paragraph>
            3.2. You agree and acknowledge that to effectuate timely delivery of the purchased Products to you we may inquire or collect specific information like your name, shipping address, billing address, landmarks, contact details, etc. You shall ensure that all information that is submitted by you to us on the Website is true, complete, accurate and sufficient to identify the actual place of delivery.
          </Typography>
          <Typography paragraph>
            3.3. We will attempt to deliver the purchased Product to your designated address within the estimated timeline of delivery notified to you. In the event you are not available or present to accept the delivery of the Product, our Logistics Partners will make a maximum of three (3) attempts to deliver the purchased Product(s) to you.
          </Typography>
          <Typography paragraph>
            3.4. While we make reasonable endeavours in ensuring that purchased Products are delivered to you in a timely manner and within the timeline notified to you, you accept and acknowledge that the delivery may be delayed on account of:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li">Logistics issues beyond our control;</Typography>
            <Typography component="li">Unsuitable weather conditions;</Typography>
            <Typography component="li">Political disruptions, strikes, employee-lockouts, etc.;</Typography>
            <Typography component="li">Acts of God such as floods, earthquakes, etc.;</Typography>
            <Typography component="li">Other unforeseeable circumstances.</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            CUSTOMER SUPPORT
          </Typography>
          <Typography paragraph>
            Any queries or concerns relating to the shipping and delivery of Products as per this Policy may be directed by you to our customer support team who can be contacted at the below mentioned details:
          </Typography>
          <Typography paragraph>
            Contact Details:
            <br />
            Toll Free Number – 1800 890 1222
            <br />
            Timings – 8:00 AM to 8:00 PM
          </Typography>
        </Box>
      </Paper>
    </Container>
    <Footer />

    </div>
  );
};

export default DeliveryShippingPolicy;

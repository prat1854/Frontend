import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3498db' }}>
            About QuickCom
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontStyle: 'italic', mb: 3 }}>
            India's Favorite Online Shopping Platform
          </Typography>

          <Typography paragraph sx={{ mb: 2 }}>
            At QuickCom, our goal is to make shopping easier, faster, and more convenient than ever before for our customers. We are committed in our mission to build a trustworthy online marketplace which offers the widest range of products across the country. With our proven user experience and reliable services, we are committed to provide customers in India with a trusted and hassle-free one-stop-shop for all their shopping needs across various categories such as Electronics, Grocery, Fashion, Home & Kitchen, etc.
          </Typography>

          <Typography paragraph sx={{ mb: 2 }}>
            For over 17 years of operations with Reliance Retail, we have built the most reliable retail presence that caters to the unique needs of customers in India, and we are committed to bring a similar experience online with QuickCom. Our vast exceptional selection of products make our online portal the preferred shopping destination for all kinds of customers.
          </Typography>

          <Typography paragraph sx={{ mb: 3 }}>
            With our convenient payment options, on-time delivery services, dependable customer service, and secure online transactions, you can now shop smarter, faster and more seamlessly within a few clicks. Our commitment to excellence has been recognized worldwide, and we look forward to offering our customers a delightful shopping experience online with QuickCom.
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3498db' }}>
            #Happy Shopping with QuickCom
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
} 
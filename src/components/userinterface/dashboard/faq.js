import React, { useState } from "react";
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { Box, Container, Paper, Typography, Grid, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const faqs = {
  title: "FAQs",
  subtitle: "Frequently Asked Questions:",
  description: "Check out this section to get answers for all the frequently asked questions.",
  
  categories: [
    {
      title: "Registration",
      questions: [
        "How do I register?",
        "Do I need to register before shopping on QuickCom?",
        "Can I register multiple times using the same phone number/email ID?"
      ]
    },
    {
      title: "Product / Price / Promotion",
      questions: [
        "How do I look for a particular Product?",
        "How will you ensure the freshness of products?",
        "How can I check if the product I am ordering is in stock?"
      ]
    },
    {
      title: "Ordering",
      questions: [
        "How do I know if I placed my order correctly?",
        "Can I call and place an order?",
        "How are the fruits and vegetables weighed?",
        "How do I make changes to my order?"
      ]
    },
    {
      title: "Payment",
      questions: [
        "What are the various modes of payment I can use for shopping?",
        "Can I pay online during the delivery of the product?",
        "I have placed an order with Cash on Delivery option. Can I change the payment method now?",
        "How much time will it take to get the refund of a cancelled/returned order?",
        "How will I get the refund against an order which placed with Cash on Delivery?",
        "What are RBI guidelines?",
        "Why am I unable to see some of my previously added cards?",
        "Is it mandatory to save cards with QuickCom? What impact will it have on my payment?",
        "Can I delete a tokenized card?",
        "Do I need any additional step to tokenize the card or make a payment through tokenized card?",
        "How do I provide my consent to save the card?",
        "Do I need to provide consent separately for each card?",
        "Do I need to pay any charges for saving my card?"
      ]
    },
    {
      title: "Delivery",
      questions: [
        "How will I know if QuickCom delivers to my area?",
        "How can I check for an expected date of delivery of an order I placed?"
      ]
    },
    {
      title: "Delivery Fee",
      questions: [
        "What is delivery fee? Why I am being charged?",
        "How does QuickCom calculate delivery fee?",
        "Why do I see delivery fee in my cart?",
        "If I cancel, return the product will I get back the delivery fee?",
        "Why I am charged from few orders and not for others?",
        "What kind of coupons discount I can avail to waive off delivery fee?",
        "Will the delivery fee be waived if I quickly place two separate orders that add up to a total of Rs 250?",
        "Why is my delivery fee higher than my order amount?",
        "Would I get the delivery fee back if my product is damaged, wrong item etc., and in non-returnable category?",
        "Why did I not receive a delivery fee refund on the partial cancellation?"
      ]
    },
    {
      title: "Loyalty Program",
      questions: [
        "What is the RelianceOne?",
        "How do I become a RelianceOne Member?",
        "What are benefits of RelianceOne?",
        "How do I know my current balance of ROne points?",
        "What is the value of ROne points?",
        "How to redeem ROne points?"
      ]
    },
    {
      title: "QuickCom Gift Card",
      questions: [
        "What is a QuickCom Gift Card?",
        "How can I purchase a QuickCom Gift Card?",
        "Can I cancel/return/transfer a gift card?",
        "Are there any limits to purchase a Gift Card?",
        "Do QuickCom Gift Cards expire?",
        "How will the Gift Card be credited to the recipient?",
        "Is there a link to share the purchased Gift Card to the recipient?",
        "How do I check my QuickCom Gift Card balance?",
        "How can I redeem the Gift Card balance?"
      ]
    },
    {
      title: "Login / Account Related",
      questions: [
        "What is My Account?",
        "I am unable to login",
        "What's the difference between deactivating and deleting my account?",
        "I want to deactivate my account. How can I do it?",
        "What happens if I deactivate my account?",
        "I deactivated my account. How do I reactivate it?",
        "I want to delete my account permanently. How can I do it?",
        "What happens if I permanently delete my account?"
      ]
    },
    {
      title: "Fraud Prevention and Awareness",
      questions: [
        "What are the ways in which fraudsters may approach customers?",
        "How can customers safeguard themselves from fraudsters?",
        "What should customers do in case they have become victim to any fraud?"
      ]
    },
    {
      title: "Gift Voucher",
      questions: [
        "What is the validity of QuickCom Gift Voucher?",
        "How can I redeem my QuickCom Gift Voucher?",
        "What products can I purchase using a QuickCom Gift Voucher?",
        "Can I partially redeem the QuickCom Gift Voucher?",
        "Can I redeem multiple QuickCom Gift Voucher against a single order?",
        "What happens in case total payable order value is greater than QuickCom Gift voucher?",
        "What happens in case my order value is lower than QuickCom Gift voucher?",
        "Can I redeem a QuickCom Gift Voucher more than once?",
        "What happens to my QuickCom Gift voucher in case of order cancellation, product return or doorstep reject?",
        "Who do I reach out in case of any issues faced while redeeming a gift voucher?",
        "Can I exchange QuickCom Gift Voucher in exchange for cash in bank or QuickCom wallet?",
        "What happens in case of failure to use the QuickCom Gift Voucher on or before the validity period?",
        "Can I cancel/return/transfer a QuickCom Gift Voucher?"
      ]
    },
    {
      title: "Ratings, Reviews, and Image Uploads on QuickCom",
      questions: [
        "What are ratings, reviews, and image uploads?",
        "Why should I rate, leave reviews, and upload images?",
        "How does the star-rating system work?",
        "Is there any minimum number of stars required to submit a review?",
        "Who can leave reviews and upload images?",
        "How do I leave a review and upload images?",
        "Are there any restrictions on what I can include in my review or images?",
        "Will my review and uploaded images appear immediately after submission?",
        "Can I edit my own review or uploaded images?",
        "If I want to raise concern regarding my rejected review, how can I do that?"
      ]
    }
  ]
};

const FAQ = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const changeCategory = (index) => {
    setActiveCategory(index);
    setActiveQuestion(null);
  };

  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#3498db', fontWeight: 'bold', textAlign: 'center' }}>
            {faqs.title}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 1 }}>
            {faqs.subtitle}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#636e72' }}>
            {faqs.description}
          </Typography>

          <Grid container spacing={3}>
            {/* Category sidebar */}
            <Grid item xs={12} md={3}>
              <Paper 
                elevation={2} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  height: isMobile ? 'auto' : '70vh',
                  position: 'sticky',
                  top: 20
                }}
              >
                <Box sx={{ bgcolor: '#3498db', color: 'white', p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Categories
                  </Typography>
                </Box>
                <Box sx={{ maxHeight: isMobile ? 'auto' : 'calc(70vh - 56px)', overflowY: 'auto' }}>
                  {faqs.categories.map((category, index) => (
                    <Box 
                      key={index}
                      sx={{
                        p: 2,
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: activeCategory === index ? '#e3f2fd' : 'white',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f5f9ff'
                        }
                      }}
                      onClick={() => changeCategory(index)}
                    >
                      <Typography 
                        sx={{ 
                          fontWeight: activeCategory === index ? 'bold' : 'normal',
                          color: activeCategory === index ? '#3498db' : 'inherit'
                        }}
                      >
                        {category.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Questions and answers */}
            <Grid item xs={12} md={9}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#3498db', fontWeight: 'bold', mb: 3 }}>
                  {faqs.categories[activeCategory].title}
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                {faqs.categories[activeCategory].questions.map((question, index) => (
                  <Accordion 
                    key={index} 
                    expanded={activeQuestion === index}
                    onChange={() => toggleQuestion(index)}
                    sx={{ 
                      mb: 1,
                      boxShadow: 'none',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px !important',
                      '&:before': {
                        display: 'none',
                      },
                      '&.Mui-expanded': {
                        margin: '8px 0',
                        borderColor: '#3498db',
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}
                      sx={{ 
                        backgroundColor: activeQuestion === index ? '#e3f2fd' : '#f8f9fa',
                        borderRadius: '8px',
                        '&.Mui-expanded': {
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }
                      }}
                    >
                      <Typography sx={{ fontWeight: 'medium', color: activeQuestion === index ? '#3498db' : '#2c3e50' }}>
                        {question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3, backgroundColor: '#fafafa' }}>
                      <Typography variant="body1" sx={{ color: '#636e72' }}>
                        This is a placeholder answer content. Replace this with the actual answer for this question.
                        You can add more detailed information here about the specific FAQ question.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQ; 
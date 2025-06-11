import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Stack,
  Alert,
  Snackbar,
  IconButton,
  Divider
} from '@mui/material';
    import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';



const ContactInfo = ({ icon, title, content }) => (
  <Card sx={{ 
    height: '100%',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(33, 150, 243, 0.15)',
    borderRadius: 3,
    border: '1px solid rgba(25, 118, 210, 0.15)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 16px 48px 0 rgba(33, 150, 243, 0.25)',
    }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Stack spacing={2.5} alignItems="center" textAlign="center">
        <Box sx={{ 
          color: 'primary.main', 
          bgcolor: 'primary.lighter',
          p: 3,
          borderRadius: '50%',
          transform: 'rotate(0deg)',
          transition: 'all 0.4s ease-in-out',
          '&:hover': {
            transform: 'rotate(360deg) scale(1.1)',
            bgcolor: 'primary.light',
            color: 'white'
          }
        }}>
          {React.cloneElement(icon, { fontSize: 'large' })}
        </Box>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            whiteSpace: 'pre-line',
            lineHeight: 1.8,
            letterSpacing: 0.2
          }}
        >
          {content}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement actual form submission
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We will get back to you soon.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 8, sm: 10 }, 
        px: { xs: 2, sm: 3 },
        backgroundColor: 'background.default',
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: 'linear-gradient(135deg, #f8faff 0%, #e4ecf9 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Box mb={8} textAlign="center">
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              letterSpacing: -0.5
            }}
          >
            Get in Touch
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto',
              lineHeight: 1.8,
              fontWeight: 400
            }}
          >
            We'd love to hear from you. Please fill out this form or use our contact information below.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form Section */}
          <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 }}}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 5 }, 
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 12px 40px 0 rgba(33, 150, 243, 0.12)'
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      variant="outlined"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit"
                      variant="contained" 
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                        boxShadow: '0 8px 24px 0 rgba(25, 118, 210, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 28px 0 rgba(25, 118, 210, 0.4)',
                        },
                        transition: 'all 0.3s ease-in-out'
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Information Section */}
          <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 }}}>
            <Stack spacing={4}>
              <ContactInfo
                icon={<LocationOnIcon />}
                title="Visit Us"
                content="DTCC Innovation Labs\nBangalore, India"
              />
              <ContactInfo
                icon={<EmailIcon />}
                title="Email Us"
                content="support@dtcc.com\nhelp@dtcc.com"
              />
              <ContactInfo
                icon={<PhoneIcon />}
                title="Call Us"
                content="+91 (80) 4567-8900\nMon-Fri 9:00 AM - 6:00 PM IST"
              />
              
              {/* Social Media Links */}
              <Box mt={2}>
                <Divider sx={{ mb: 4 }}>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ 
                      px: 2,
                      letterSpacing: 1,
                      textTransform: 'uppercase'
                    }}
                  >
                    Follow Us
                  </Typography>
                </Divider>
                <Stack 
                  direction="row" 
                  spacing={3} 
                  justifyContent="center"
                >
                  {/* Social media buttons with enhanced hover effects */}
                  {[FacebookIcon, LinkedInIcon, TwitterIcon, LanguageIcon].map((Icon, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        color: 'primary.main',
                        bgcolor: 'primary.lighter',
                        p: 2,
                        '&:hover': {
                          color: 'white',
                          bgcolor: 'primary.main',
                          transform: 'scale(1.15)',
                        },
                        transition: 'all 0.3s ease-in-out'
                      }}
                    >
                      <Icon />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
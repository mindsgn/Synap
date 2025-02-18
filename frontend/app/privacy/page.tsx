'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack,
  UnorderedList,
  ListItem,
  Divider 
} from '@chakra-ui/react';

export default function PrivacyPolicy() {
  return (
    <Box
      bg="black"
      minH="100vh"
      py={10}
      color="white"
    >
      <Container maxW="container.md">
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl">
            Privacy Policy for Synap
          </Heading>
          
          <Text color="gray.400">
            Last Updated: {new Date().toLocaleDateString()}
          </Text>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Introduction
            </Heading>
            <Text>
              Welcome to Synap, a mobile learning app designed to empower you to test and reinforce your knowledge through interactive multiple-choice questions. Our purpose is to personalize your learning journey by generating quiz content based on your input. We value your privacy and are committed to safeguarding your personal information.
            </Text>
          </Box>

          <Divider opacity={0.2} />

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Information We Collect
            </Heading>
            
            <Heading as="h3" size="md" mb={2}>
              1. User-Provided Information
            </Heading>
            <UnorderedList mb={4} spacing={2}>
              <ListItem>Personal details (e.g., email address, username)</ListItem>
              <ListItem>Quiz inputs and responses</ListItem>
              <ListItem>Feedback and support queries</ListItem>
            </UnorderedList>

            <Heading as="h3" size="md" mb={2}>
              2. Automatically Collected Information
            </Heading>
            <UnorderedList mb={4} spacing={2}>
              <ListItem>Device information and app usage statistics</ListItem>
              <ListItem>Error logs and performance metrics</ListItem>
              <ListItem>Cookies and anonymized analytics data</ListItem>
            </UnorderedList>
          </Box>

          <Divider opacity={0.2} />

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              How We Use Your Information
            </Heading>
            <Text mb={4}>
              We use the collected information to create a customized learning experience and to improve our app. This includes generating personalized quiz questions, improving app functionality, and analyzing usage trends to better serve your educational needs.
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>Personalizing your quiz experience</ListItem>
              <ListItem>Enhancing app performance and generating new features</ListItem>
              <ListItem>Analyzing user behavior to improve learning outcomes</ListItem>
              <ListItem>Sending updates and notifications related to the app</ListItem>
            </UnorderedList>
          </Box>

          <Divider opacity={0.2} />

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Data Storage and Security
            </Heading>
            <Text mb={4}>
              We store your information securely and take appropriate measures to protect it from unauthorized access. All sensitive data is encrypted and maintained on secure servers.
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>Data encryption both in transit and at rest</ListItem>
              <ListItem>Strict access controls to protect your personal information</ListItem>
              <ListItem>Regular security reviews and upgrades</ListItem>
            </UnorderedList>
          </Box>

          <Divider opacity={0.2} />

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Your Rights
            </Heading>
            <Text mb={4}>
              You have the right to access, update, or delete your personal information at any time. If you wish to exercise any of these rights or have any inquiries about how your data is used, please contact us.
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>Access your personal data</ListItem>
              <ListItem>Update or correct your information</ListItem>
              <ListItem>Request deletion of your data</ListItem>
              <ListItem>Opt out of non-essential data collection</ListItem>
            </UnorderedList>
          </Box>

          <Divider opacity={0.2} />

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Contact Us
            </Heading>
            <Text>
              If you have any questions or concerns regarding this Privacy Policy, please reach out to us at:{' '}
              <Text as="span" color="blue.400">
               Synap@mindsgn.studio
              </Text>
            </Text>
          </Box>

          <Box pt={4}>
            <Text color="gray.400" fontSize="sm">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page along with an updated revision date.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
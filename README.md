# EltaBlue: A Blockchain-Powered Blue Carbon Registry

This project is a submission for a hackathon focused on creating a decentralized and verifiable MRV (Monitoring, Reporting, and Verification) system for blue carbon ecosystems in India.

## Problem Statement

Blue carbon ecosystem restoration is gaining importance in India’s climate strategy. However, there is no decentralized, verifiable MRV system that ensures transparency, accuracy, and efficient carbon credit generation.

## Hackathon Requirements

Participants are to design a Blockchain-powered registry where:
- Verified plantation and restoration data are immutably stored.
- Carbon credits are tokenized using smart contracts.
- NGOs, communities, and coastal panchayats can be onboarded.
- Field data is integrated from apps and drones.

## Our Solution: EltaBlue

EltaBlue is a comprehensive platform designed as a high-fidelity prototype to meet these requirements. It provides a robust, user-friendly interface for all stakeholders in the blue carbon lifecycle, from project creation to credit trading.

### How EltaBlue Addresses the Requirements:

-   **Simulated Blockchain & Smart Contracts:** While not currently implemented on a live blockchain, the app simulates the entire workflow. Firestore is used as a stand-in for an immutable ledger, and the logic for tokenizing credits is clearly defined.
-   **Role-Based Onboarding:** The platform features distinct dashboards and permissions for **Project Developers**, **Verifiers**, **Investors**, and **Regulators**, directly addressing the need to onboard different groups like NGOs, communities, and government bodies.
-   **Mobile-Ready Interface:** The application is fully responsive, serving as the "mobile interface" for data access and management.
-   **AI-Powered MRV:** Our "AI-Assisted MRV" feature allows developers to process project data (including simulated satellite imagery), fulfilling the requirement to integrate field data from sources like drones and apps.
-   **Admin Tools for Governance:** The "Regulator" dashboard provides the necessary oversight tools for an entity like the NCCR to monitor ecosystem compliance and project status.
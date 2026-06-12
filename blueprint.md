
# Project Blueprint

## Overview

This project is a comprehensive threat intelligence dashboard designed to provide a centralized view of potential security risks within an organization. The dashboard offers a user-friendly interface to monitor employee risk levels, investigate high-risk individuals, analyze threat timelines, and leverage AI-powered analysis for proactive threat detection.

## Style and Design

The application follows a modern and intuitive design language, with a focus on clarity and ease of use. Key design elements include:

*   **Color Palette:** A dark-themed interface with a primary background color, a secondary color for borders and dividers, and accent colors for interactive elements and highlighting.
*   **Typography:** Clear and legible fonts with a well-defined hierarchy for headings, subheadings, and body text.
*   **Iconography:** The use of icons to enhance usability and provide visual cues for actions and information.
*   **Layout:** A responsive and well-structured layout that adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.

## Features

### 1. Main Dashboard

*   Provides a high-level overview of the organization's security posture.
*   Displays key metrics and visualizations, such as the number of high-risk employees, recent threat events, and overall risk trends.

### 2. Employee Monitoring

*   A dedicated page to view and manage a list of all employees.
*   A searchable and filterable table that allows users to quickly find specific employees or groups of employees based on their name, email, or risk level.
*   The table includes columns for employee name, email, department, risk level, and risk score.
*   The risk level is visually indicated using a color-coded badge.

### 3. Investigations

*   A specialized view to focus on high-risk employees who require immediate attention.
*   Displays a list of employees with a "high" or "critical" risk level.
*   Each list item provides essential employee information, including their name, email, and risk level.

### 4. Threat Timeline

*   A chronological visualization of all threat events that have occurred.
*   Each event in the timeline includes the date, time, type of threat, and a brief description.
*   The timeline provides a clear and intuitive way to understand the sequence of events and identify potential patterns or correlations.

### 5. AI-Powered Analysis

*   An advanced feature that leverages mock AI to provide in-depth threat analysis for individual employees.
*   Users can select an employee from a dropdown menu to initiate the analysis.
*   The analysis results include a summary of the employee's risk profile, a list of recommended actions, and a confidence score.

## Current Plan and Steps

The following steps have been completed to implement the features described above:

*   Created the main dashboard page with a basic layout.
*   Implemented the `EmployeeTable` component with search and filtering functionality.
*   Created the `Input` and `Select` components for the `EmployeeTable`.
*   Integrated the `EmployeeTable` into the `/employees` page.
*   Created the `/investigations` page with a list of high-risk employees.
*   Implemented the `ThreatTimeline` component to display threat events.
*   Integrated the `ThreatTimeline` into the `/timeline` page.
*   Created the `AiAnalysis` component for AI-powered threat analysis.
*   Created the `/api/analyze` API route to provide mock analysis data.
*   Created the `AnalysisResult` component to display the analysis results.
*   Integrated the `AiAnalysis` component into the `/ai-analysis` page.

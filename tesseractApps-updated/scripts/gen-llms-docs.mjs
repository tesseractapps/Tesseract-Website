import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Core pages content
const pages = {
  'home.md': `# TesseractApps - Home

TesseractApps is an Australian SaaS company providing all-in-one workforce management and compliance software purpose-built for NDIS providers, aged care, allied health, and disability support organisations.

## Value Proposition
Automate rostering, timesheets, payroll, participant management, and NDIS compliance — replacing manual spreadsheets and disconnected tools with a single integrated platform.

## Key Features
- Smart Rostering & Scheduling
- NDIS Compliance Automation
- Time & Attendance (Clock In/Out)
- Participant Management
- Incident Management
- HR Operations & Document Signing
`,
  'about.md': `# About TesseractApps

TesseractApps is an Australian B2B SaaS company helping care providers modernise their operations. The platform is built on Salesforce infrastructure and holds ISO 27001 and ISO 9001 certifications.

## Target Audience
NDIS Providers, Aged Care Services, Allied Health Professionals, Disability Support Services, Home & Community Care.

## Certifications
ISO 27001 (Information Security), ISO 9001 (Quality Management)
`,
  'product.md': `# Tesseract Care Management Software

Tesseract Care Management Software is an all-in-one platform built specifically for NDIS & Care Providers.

## Product Features
- **Roster Management**: Intelligent rostering and scheduling solutions
- **Timesheet**: Time tracking and attendance management
- **Admin Console**: Centralized administrative control panel
- **Access Control Panel**: Role-based access and permissions management
- **HR Operations**: Human resources management tools
- **T-Sign**: Electronic signature and document signing
- **Clock In & Clock Out**: Staff attendance and time tracking system
- **Participant Management**: NDIS participant care and service coordination
- **Incident Management**: Incident reporting and tracking system
- **Forms**: Digital forms and data collection
- **Accounting**: Financial management and payroll integration
- **T Learning Hub**: Training and professional development platform
`,
  'pricing.md': `# TesseractApps Pricing

Please visit our official website at https://tesseractapps.com.au/pricing for the most up-to-date information regarding our subscription options, customized enterprise plans, and features included in each tier.
`,
};

// Generate pages
const pageKeys = Object.keys(pages);
let aggregatedContext = '';

for (const key of pageKeys) {
  const content = pages[key];
  const filePath = path.join(PUBLIC_DIR, key);
  
  // Write individual .md file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Generated: public/${key}`);
  
  // Append to aggregated context
  aggregatedContext += `\n\n--- Start of ${key} ---\n\n`;
  aggregatedContext += content;
  aggregatedContext += `\n\n--- End of ${key} ---\n\n`;
}

// Generate the llms-ctx.txt (Aggregated file without optional stuff)
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-ctx.txt'), aggregatedContext.trim(), 'utf8');
console.log('Generated: public/llms-ctx.txt');

// We also generate an llms-ctx-full.txt (for now, same as ctx, but allows future expansion)
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-ctx-full.txt'), aggregatedContext.trim(), 'utf8');
console.log('Generated: public/llms-ctx-full.txt');

console.log('Successfully generated complete LLM text context documents.');

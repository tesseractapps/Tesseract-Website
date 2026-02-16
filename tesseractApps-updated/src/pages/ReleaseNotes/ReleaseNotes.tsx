import "./ReleaseNotes.css";
import { useMetaTags } from "../../utils/useMetaTags";

const ReleaseNotes = () => {
  useMetaTags({
    title: "Release Notes | Product Updates & New Features | TesseractApps",
    description:
      "Stay updated with TesseractApps latest features and improvements. Browse release notes for all platform updates, bug fixes, and new functionality.",
  });

  return (
    <div id="release-notes-container">
      <h1>What's New?</h1>
      <h2>v1.29.0</h2>
      <ul>
        <li>
          <b>Quote Generator:</b> Introduced a Quote Generator to enable
          providers to quickly create service quotes with accurate pricing and
          service details.
        </li>
        <br />
        <li>
          <b>Rounding and buffer time:</b> Implemented a 15-minute and 30 minute
          rounding in the timesheet. Allows a buffer time so minor time
          variances are treated as matched, preventing unnecessary timesheet
          mismatches.
        </li>
        <br />
        <li>
          <b>Replicate Previous Week / Fortnightly Roster:</b> Roster managers
          can now replicate rosters from the previous week or fortnight. This
          enhancement significantly reduces repetitive scheduling work, improves
          efficiency, and ensures continuity in staff and participant
          assignments.
        </li>
        <br />
        <li>
          <b>My Availability – New Changes:</b> Enhanced staff availability
          management with updated logic and improved flexibility. Roster
          managers now have more accurate and reliable availability data when
          planning shifts, leading to better coverage and reduced scheduling
          conflicts.
        </li>
        <br />
        <li>
          <b>Repository Renamed to “Documents”:</b> The existing repository has
          been renamed to Documents, consolidating:
          <br />
          Staff documents
          <br />
          Organization documents
          <br />
          Participant documents
          <br />
          Compliance-related files
          <br />
          This unified structure improves document management, accessibility,
          and compliance tracking.
        </li>
        <br />
        <li>
          <b>Multi-Facility Staff Payments by Facility Pay Group:</b> Introduced
          support for processing staff payments by facility-specific pay groups.
          This allows accurate payroll calculations for staff working across
          multiple facilities, ensuring correct pay rates and financial
          reporting per facility.
        </li>
        <br />
        <li>
          <b>Conversion of Unused Leave Hours:</b> Enabled conversion of unused
          leave hours in accordance with NDIS guidelines. This feature supports
          compliant rollover options, incentives, or adjustments, giving
          providers greater flexibility while maintaining regulatory adherence.
        </li>
        <br />
        <li>
          <b>Period Management in Participant Module:</b> Added period
          management functionality within the participant module to control
          service periods, billing cycles, and funding timelines. This improves
          accuracy in participant service tracking and financial management.
        </li>
        <br />
        <li>
          <b>Notification & Communication in Participant Contacts:</b>{" "}
          Introduced notifications and communication capabilities within
          participant contacts. This ensures timely updates, better
          coordination, and improved communication between providers, staff, and
          participant contacts.
        </li>
        <br />
        <li>
          <b>Compliance Report for Each Staff:</b> Implemented a comprehensive
          compliance report at the staff level. This report provides visibility
          into document status, training completion, and overall compliance,
          helping organizations meet audit and regulatory requirements.
        </li>
        <br />
        <li>
          <b>
            Cross Rostering for Staff & Participants Across Multiple Facilities:
          </b>
          Enabled cross-facility rostering where staff and participants can be
          assigned to multiple facilities. This enhancement supports complex
          operational models and ensures payroll accuracy for individuals
          working across different facilities.
        </li>
        <br />
        <li>
          <b>Document Acknowledgement / Confirmation:</b> Introduced document
          acknowledgement functionality, allowing staff (e.g., support workers)
          to confirm they have viewed and acknowledged documents. This feature
          provides audit proof, reduces compliance risk, and protects providers
          from liability.
        </li>
      </ul>
      <h2>v1.28.0</h2>
      <ul>
        <li>
          <b>Bulk Upload Enhancements:</b> Implemented Staff, Participant and
          Facility bulk uploads.
        </li>
        <br />
        <li>
          <b>Staff Documentation:</b> Now the Admin has the feasibility to
          either approve or reject the documents uploaded by Staff which can
          improve the documentation.
        </li>
        <br />
        <li>
          <b>Participant Nickname Feature and notifications:</b> Admins can
          assign a nickname to each participant for quick and intuitive
          identification across the platform and notified when a service is
          created or updated or when a staff is assigned.
        </li>
        <br />
        <li>
          <b>Chat:</b> The web and platform now includes real-time messaging
          authenticated via CometChat, enhancing team communication.
        </li>
        <br />
        <li>
          <b>MYOB Integration:</b> New improvements streamline synchronisation
          between the platform and MYOB, ensuring accurate financial and payroll
          data.
        </li>
        <br />
        <li>
          <b>Repository – Documents Enhancements:</b> Improved the documents
          repository structure, making organisation, retrieval, and versioning
          more efficient.
        </li>
        <br />
        <li>
          <b>Login Page Upgrade:</b> Introduced a modern UI with improved
          accessibility and performance for login.
        </li>
        <br />
        <li>
          <b>Fund Tracker – Approved Date Fix / Entity Name Update:</b>{" "}
          Implemented a complete solution to address incorrect approved dates
          and entity naming issues within the fund tracker.
        </li>
        <br />
        <li>
          <b>Facility - Documentation:</b> Four new tabs—Documents, Identity,
          Trainings, and Shift Compliance—have been added under Facility
          Documentation, allowing all related documents and identity details to
          be configured in one place.
        </li>
      </ul>
      <h2>v1.27.0</h2>
      <ul>
        <li>
          <b>Participant Login:</b> Participants can now log in to the
          application and access multiple modules seamlessly.
        </li>
        <br />
        <li>
          <b>T-Sign Enhancement:</b> Added an ABN field to the T-Sign form.
        </li>
        <br />
        <li>
          <b>Rejected Shifts:</b> Shifts starting within the next 24 hours can
          no longer be rejected.
        </li>
        <br />
        <li>
          <b>Public Holidays:</b> Updated with the latest public holiday data.
        </li>
        <br />
        <li>
          <b>Mobile: Shift Card:</b> Participant name is now displayed on the
          Shift Card.
        </li>
        <br />
        <li>
          <b>Mobile: Calendar View:</b> Shift-related data is now displayed
          directly in the Calendar.
        </li>
        <br />
        <li>
          <b>Mobile: My Roster:</b> Added Day and Week views for shifts.
        </li>
        <br />
        <li>
          <b>Mobile: Geolocation & Notifications:</b> Implemented forced sign-in
          geolocation and notification permissions.
        </li>
        <br />
        <li>
          <b>Facility Management:</b> Each facility can now create its own
          custom roles.
        </li>
        <br />
        <li>
          <b>Childcare Pay Guides:</b> Updated pay guides are now available
          within the application.
        </li>
        <br />
        <li>
          <b>Roster Manager:</b> Added an ‘All’ option to view all staff at
          once.
        </li>
        <br />
        <li>
          <b>Manage Forms:</b> Introduced a ‘Submitted Forms’ tab where users
          can view all submitted forms.
        </li>
        <br />
        <li>
          <b>Keyboard Shortcuts:</b> Added keyboard shortcuts for navigation and
          common actions.
        </li>
        <br />
        <li>
          <b>Global Search (Admin Module):</b> Implemented a global search
          function in the Admin module.
        </li>
        <br />
        <li>
          <b>Early Sign-Out Notification:</b> Admins will now receive
          notifications when staff sign out early.
        </li>
        <br />
        <li>
          <b>Request Sign-In Enhancements:</b> Added two new fields displaying
          staff location status and distance from site.
        </li>
        <br />
        <li>
          <b>Payslip Revamp:</b> Payslips are now broken down into M (Morning),
          A (Afternoon), N (Night), S (Sleepover) categories and Leave summary.
          Improved rendering of Pay Points in staff payslips. Added disclaimers
          for paid breaks in invoices and payslips.
        </li>
        <br />
        <li>
          <b>T-Sign Document Limit:</b> Implemented a limit for Word document
          uploads in T-Sign.
        </li>
        <br />
        <li>
          <b>Mobile: Pagination:</b> Pagination added across multiple mobile
          sections for better performance.
        </li>
        <br />
        <li>
          <b>Preferred Staff Matching:</b> Staff preferences now support
          filtering by Gender, Language, and Nationality.
        </li>
        <br />
        <li>
          <b>Xero Integration:</b> Full Xero integration for invoice and payroll
          synchronization.
        </li>
        <br />
        <li>
          <b>Participant Bulk Upload:</b> Users can now upload participant data
          in bulk.
        </li>
        <br />
        <li>
          <b>Journal Module:</b> Introduced a new journal flow with history
          tracking.
        </li>
        <br />
        <li>
          <b>Funds Tracker Enhancements:</b> Revamped UI with improved period
          management.
        </li>
        <br />
        <li>
          <b>T-Sign Revamp:</b> Multiple improvements including:
          <br />
          Signature pixel accuracy
          <br />
          Mac ID (gateway) tracking
          <br />
          Font adjustment
          <br />
          System ID visibility
          <br />
          Field overlap fixes
          <br />
          Email ID validation for sent forms
        </li>
      </ul>

      <h2>v1.26.0</h2>
      <ul>
        <li>
          <b>Welcome Emails and Reset Password Links:</b> Implemented a new,
          modern email format for welcome messages and password reset links to
          enhance readability and branding consistency.
        </li>
        <br />
        <li>
          <b>Mobile - Show Participant Name in Shift Card:</b> Updated the
          mobile view to display the participant’s name within each shift card
          for better context and quick identification.
        </li>
        <br />
        <li>
          <b>Dashboard - Roster Manager Widget Dropdown Option:</b> Added a
          dropdown option in the Roster Manager widget on the dashboard to
          easily filter and manage roster data.
        </li>
        <br />
        <li>
          <b>Onboarding:</b> Improved the onboarding process with a more
          intuitive layout and streamlined user flow.
        </li>
        <br />
        <li>
          <b>Increase Text area Limit to 1000:</b> Extended the character limit
          for all text area fields across the application from default to 1000
          characters.
        </li>
        <br />
        <li>
          <b>Multiple Document Upload Across the Application:</b> Introduced
          functionality to upload multiple documents simultaneously in various
          modules for improved efficiency.
        </li>
        <br />
        <li>
          <b>
            Roster Manager Calendar - Dynamic Expansion of the View Based on the
            Shifts:
          </b>{" "}
          Enhanced the calendar to automatically expand and adjust dynamically
          based on the number of shifts displayed.
        </li>
        <br />
        <li>
          <b>Time picker Over All Application:</b> Implemented a new, consistent
          time picker component across the entire application for better user
          experience and design uniformity.
        </li>
        <br />
        <li>
          <b>
            Based on the Shift Start and End Times the Billable Hours
            Calculation:
          </b>{" "}
          Billable hours are now automatically calculated and displayed based on
          the shift start and end times.
        </li>
        <br />
        <li>
          <b>Max Duration of Shift in Roster Settings:</b> Added a configuration
          option in Roster Settings to define the maximum allowable duration for
          any shift.
        </li>
        <br />
        <li>
          <b>
            History for Every Change in IR + Export the Contents of the Table in
            IR + Signature:
          </b>{" "}
          Added history tracking for all changes in Incident Reports, enabled
          export of the IR table contents, and introduced digital signature
          functionality.
        </li>
        <br />
        <li>
          <b>Smart Roster - Participant & Staff View (UI):</b> Redesigned the
          Smart Roster interface for both Participant and Staff views to offer a
          cleaner, more intuitive experience.
        </li>
        <br />
        <li>
          <b>
            Editing Payrates for In Progress/Completed Shifts - Sleepover Shift:
          </b>{" "}
          Enabled the ability to edit payrates for In Progress and Completed
          sleepover shifts.
        </li>
        <br />
        <li>
          <b>Editing Payrates in Timesheet - Sleepover Shift:</b> Added
          functionality to edit payrates in timesheets specifically for
          sleepover shifts.
        </li>
        <br />
        <li>
          <b>Adding Services for In Progress/Completed Shifts:</b> Implemented
          the ability to add services to in-progress and completed.
        </li>
        <br />
        <li>
          <b>
            Simplify Participant View by Adding Accordions in Personal Tab and
            Removing Extra Tabs:
          </b>{" "}
          Simplified the participant view by converting sections in the Personal
          tab into collapsible accordions and removing unnecessary tabs.
        </li>
        <br />
        <li>
          <b>Manage Invoices - Mail Implementation:</b> Introduced email
          functionality in the Manage Invoices module to send invoices directly
          to recipients from the system.
        </li>
        <br />
        <li>
          <b>Reimbursements:</b> Manages both shift and reimbursement invoices,
          tracks invoice statuses, supports bulk actions, and ensures complete
          audit trails and compliance.
        </li>
        <br />
        <li>
          <b>Manage Invoices:</b> Added a yearly date picker for easier
          navigation and filtering by year. Introduced new tabs Cancelled and
          Total Value, and added a Reimbursements column under both Pending and
          Total Value tabs.
        </li>
        <br />
        <li>
          <b>Funds Tracker:</b> Implemented Shift name and Entity Name dropdowns
          in Add New Fund slide and Miscellaneous values in service type
          dropdown.
        </li>
        <br />
        <li>
          <b>
            Timesheets - Feasibility for staff Break in and breakout option:
          </b>{" "}
          Implemented feasibility for staff to record Break In and Break Out
          times within timesheets, allowing accurate tracking of break durations
          and improved payroll calculations.
        </li>
        <br />
        <li>
          <b>Mobile – Break In and Break Out in Sign in Module:</b> Added Break
          In and Break Out options in the mobile sign-in module to enable staff
          to accurately record break durations during their shifts.
        </li>
        <br />
        <li>
          <b>Mobile – Participant Name in Shift Card:</b> Updated the mobile
          view to display the Participant Name within each shift card for better
          visibility and quick identification.
        </li>
        <br />
        <li>
          <b>Funds Tracker – Nursing Enhancements:</b> Enhanced the Funds
          Tracker to allow adding multiple catalogue items, updating rates, and
          renaming items, improving flexibility and ease of use for nursing
          services.
        </li>
        <br />
        <li>
          <b>Navigations:</b> Implemented a new navigation feature allowing
          users to return to the previous window when they have navigated to the
          last page, improving workflow and ease of use.
        </li>
      </ul>

      <h2>v1.25.0</h2>
      <ul>
        <li>
          <b>Immediate Email Notifications:</b> User creation and password reset
          emails are now sent instantly upon action for improved responsiveness.
        </li>
        <br />
        <li>
          <b>Forgot Password Link:</b> A "Forgot Password" option is now
          available on the login page, making password recovery more convenient.
        </li>
        <br />
        <li>
          <b>Custom Shift Rates:</b> Roster Manager now supports custom shift
          rates, offering greater flexibility in shift planning and budgeting.
        </li>
        <br />
        <li>
          <b>Real-Time Shift Reallocation:</b> Introduced real-time shift
          reallocation for faster and more efficient schedule adjustments.
        </li>
        <br />
        <li>
          <b>Shift Names and Timings Display:</b> Shift names and timings
          configured in Roster Settings are now shown in both Participant
          Schedule and Participant Availability views.
        </li>
        <br />
        <li>
          <b>Support for Custom Shift Names (Mobile):</b> Mobile app now
          displays custom shift names in alignment with facility-specific
          settings.
        </li>
        <br />
        <li>
          <b>"Sign Out" Checkbox (Web):</b> A new checkbox for "Sign out" has
          been added to the web platform for a smoother logout process.
        </li>
        <br />
        <li>
          <b>Request Sign-Out Feature:</b> A new "Request Sign out" option is
          now available within the Sign-in workflow, improving tracking and
          control.
        </li>
        <br />
        <li>
          <b>Email Notifications for Sign-In/Out:</b> Automatic email alerts are
          now sent for both Sign-in and Sign-out requests to keep stakeholders
          informed.
        </li>
        <br />
        <li>
          <b>Enhanced Search in 100 Points of ID:</b> Improved search
          functionality allows faster and easier access to ID verification
          records.
        </li>
        <br />
        <li>
          <b>UI Enhancements:</b> Visual improvements made to "My Profile - My
          Availability" and "Participant Schedule" for a more user-friendly
          experience.
        </li>
        <br />
        <li>
          <b>Preferred Names Display:</b> Preferred names for Facilities and
          Participants are now displayed according to facility-specific
          preferences.
        </li>
        <br />
        <li>
          <b>My Notification:</b> Users can now configure notification
          preferences for improved communication and control.
        </li>
        <br />
        <li>
          <b>"My Notifications" Section (Mobile):</b> A dedicated "My
          Notifications" tab is now available in the mobile app for easier
          access to alerts and updates.
        </li>
        <br />
        <li>
          <b>Smart Forms:</b> Users can now complete Smart Forms directly from
          both web and mobile devices, enhancing accessibility and efficiency.
        </li>
        <br />
        <li>
          <b>Shift Names:</b> Shift names and timings configured in Roster
          Settings are now displayed consistently in Participant Schedule and
          Participant Availability views.
        </li>
      </ul>

      <h2>v1.24.0</h2>
      <ul>
        <li>
          <b>Preferred Names:</b> Users can now set preferred names for both
          facilities and participants, which will be reflected consistently
          across the application for a more personalised experience.
        </li>
        <br />
        <li>
          <b>Roster Settings:</b> Introducing customisable shift timing
          templates for both standard and customised shifts, giving you greater
          flexibility in managing your roster.
        </li>
        <br />
        <li>
          <b>Timesheet Downloads:</b> Timesheets can now be downloaded in CSV
          and PDF formats based on the selected frequency, making payroll and
          reporting easier than ever.
        </li>
        <br />
        <li>
          <b>ID Documentation:</b> Implementation of 100 points of ID
          verification to strengthen documentation and compliance processes.
        </li>
        <br />
        <li>
          <b>Roster Manager:</b> New restrictions prevent the creation of shifts
          if they exceed preset hour limits, helping to maintain workforce
          compliance and avoid scheduling errors.
        </li>
        <br />
        <li>
          <b>Industry Introduction in Facility:</b> Facilities now feature an
          industry introduction section to better categorise and manage
          facility-specific information.
        </li>
        <br />
        <li>
          <b>Manage Invoices:</b> Enhanced invoice management tools improve
          tracking and processing for more efficient financial workflows.
        </li>
        <br />
        <li>
          <b>Pay Guides:</b> New pay guides tailored for the nursing industry
          have been introduced to assist with accurate and compliant payroll
          processing.
        </li>
        <br />
      </ul>
      <h2>v1.23.0</h2>
      <ul>
        <li>
          <b>Roster Manager calendar view – new UI:</b> Introduced a refreshed
          calendar view for better shift visualization.
        </li>
        <br />
        <li>
          <b>Expand and collapse of Roster Manager cards:</b> Quickly expand or
          minimise shift cards for cleaner navigation.
        </li>
        <br />
        <li>
          <b>Side navigation bar expand and collapse:</b> Customise your
          workspace with a collapsible side navigation panel.
        </li>
        <br />
        <li>
          <b>Roster Manager – shift reports:</b> Generate and view detailed
          reports on scheduled shifts directly in Roster Manager.
        </li>
        <br />
        <li>
          <b>Drag and drop to reassign shifts:</b> Easily move shifts between
          staff with a simple drag-and-drop action.
        </li>
        <br />
        <li>
          <b>Publish shifts with an end date:</b> Define and limit the
          publishing period of shifts with a set end date.
        </li>
        <br />
        <li>
          <b>My Profile › My Availability:</b> Restrict scheduling beyond set
          hours – Prevent shifts from being scheduled outside user-defined
          availability.
        </li>
        <br />
        <li>
          <b>Dashboard enhancements:</b> Added a widget for rejected shifts and
          enabled week selection in the Roster Manager widget.
        </li>
        <br />
        <li>
          <b>Preferred Staff selection UI upgraded:</b> Improved interface for
          selecting preferred staff during scheduling.
        </li>
        <br />
        <li>
          <b>Mobile › My Availability with sub-tabs:</b> New mobile layout
          includes separate tabs for Availability and Reports.
        </li>
        <br />
        <li>
          <b>Funds Tracker:</b> Miscellaneous fund is added in the funds.
        </li>
        <br />
        <li>
          <b>Accounting</b>
          <ol>
            <li>
              <b>General Ledger:</b> Out of balance restriction – Prevents
              posting entries that result in an unbalanced ledger.
            </li>
            <br />
            <li>
              <b>Customized email to sales:</b> Allows sending personalised
              emails directly to the sales team.
            </li>
            <br />
            <li>
              <b>Full account list selection during record creation:</b> Enables
              selection from the complete chart of accounts when creating
              records.
            </li>
            <br />
            <li>
              <b>Services invoices to sales:</b> Service-based invoices are now
              automatically reflected in sales data.
            </li>
            <br />
            <li>
              <b>Chart of Accounts › Net values in category names:</b> Displays
              net values alongside account categories for quick financial
              insights.
            </li>
          </ol>
        </li>
      </ul>

      <h2>v1.22.0</h2>

      <ul>
        <li>
          <b>Quick‑Access Menu in Roster Manager:</b> The menu icon now provides
          quick access to key tools—Auto-schedule, Publish roster, Manage
          invoices, Roster settings, and the new Under/Over Efficiency Report—so
          you can jump into actions faster.
        </li>
        <br />

        <li>
          <b>Under/Over Rostering Efficiency Report:</b> A new dynamic report
          helps you monitor staff status—under‑rostering, fully rostered, or
          over‑rostering—for any selected date. This gives schedulers an instant
          overview to balance shifts more effectively.
        </li>
        <br />

        <li>
          <b>Sleepover Allowance & Vehicle Reimbursement:</b>
          <ol>
            <li>
              <b>Sleepover Allowance:</b> A standard allowance of $66.02 per
              night is now available under <b>Admin → Staff</b>.
            </li>
            <li>
              <b>Vehicle Reimbursement:</b> Staff can now claim vehicle
              reimbursements at $0.99/km, improving accuracy and fairness in
              expense tracking.
            </li>
          </ol>
        </li>
        <br />

        <li>
          <b>Performance Management Goals:</b> Facility and Org Admins can now
          create and assign goals directly within the Performance Management
          System (PMS), promoting structured performance tracking and staff
          development.
        </li>
        <br />

        <li>
          <b>Timesheet Cleanup:</b> The system will now automatically remove the
          “Break” column in timesheets if no break is recorded, offering a
          cleaner and more focused timesheet view.
        </li>
        <br />

        <li>
          <b>Mobile Alerts:</b> Staff using the mobile app will now receive
          alerts 15 minutes before scheduled login or logout times, improving
          shift adherence and punctuality.
        </li>
        <br />

        <li>
          <b>Bug Fixes & Performance Improvements:</b> A wide range of bug fixes
          and behind-the-scenes improvements have been implemented across the
          platform, delivering a more stable and responsive experience.
        </li>
        <br />
      </ul>
      <h2>v1.21.0</h2>

      <ul>
        <li>
          <b>Facility-Wise Data Access:</b> The application now supports
          facility-specific data segmentation for more accurate insights and
          management.
        </li>
        <br />
        <li>
          <b>Facility Admin Role:</b> A new user type – Facility Admin – can now
          be created to manage and monitor specific facilities independently.
        </li>
        <br />
        <li>
          <b>T Learner Module:</b> Introduced a built-in tutorial system
          tailored to the logged-in user, providing step-by-step guidance
          throughout the application.
        </li>
        <br />
        <li>
          <b>Facility-Based Settings:</b> Customize and manage settings at the
          facility level using the new Facility Settings section.
        </li>
        <br />
        <li>
          <b>Geolocation & Supervisor Signature in Timesheets:</b> Capture
          supervisor signatures and geolocation data directly within the
          timesheet for added verification and compliance.
        </li>
        <br />
        <li>
          <b>Time Round-Off Control:</b> Admin now have the ability to enable or
          disable time round-off as per their preferences.
        </li>
        <br />
        <li>
          <b>Email Notifications for Shift Creation:</b> Stay informed with
          automated email notifications whenever a new shift is created.
        </li>
        <br />
        <li>
          <b>Staff Filtering in EOI:</b> Improved the Expression of Interest
          (EOI) section with advanced staff filtering capabilities.
        </li>
        <br />
        <li>
          <b>Nickname Option for Users:</b> Users can now opt to use a nickname
          for better personalization.
        </li>
        <br />
        <li>
          <b>Staff History Tracking:</b> Track changes and updates related to
          staff profiles with the new history tracking feature.
        </li>
        <br />
        <li>
          <b>My Profile in Mobile:</b> My Profile module is introduced in the
          mobile application.
        </li>
        <br />
      </ul>

      <h2>v1.20.0</h2>

      <ul>
        <li>
          <b>UI/UX:</b> A complete new User Interface and User Experience is
          developed throughout the application.
        </li>
        <br />
        <li>
          <b>Major Bug Fixes:</b> Major bug fixes implemented throughout the
          application to improve stability and performance.
        </li>
        <br />
        <li>
          <b>Customisable Dashboard:</b> Customisable dashboard introduced to
          suit your workflow and preferences.
        </li>
        <br />
        <li>
          <b>Roster Manager – Create Shift:</b> Cleaner layout with only Create
          Shift and Cancel buttons for a simplified user experience.
        </li>
        <br />
        <li>
          <b>Accounting:</b>
          <ol>
            <li>
              <b>Tax Calculation:</b> Enhanced accuracy for sales tax across all
              transactions.
            </li>
            <li>
              <b>General Ledger:</b> Default two-line entries with the option to
              add more, plus a Cr/Dr dropdown for easy classification.
            </li>
            <li>
              <b>Email Notifications:</b> Automated emails triggered for new or
              updated Sales and RFQs.
            </li>
            <li>
              <b>Account List Template:</b> Full template with built-in
              validations to ensure data accuracy.
            </li>
            <li>
              <b>Notes Field:</b> Added freeform notes for context in
              transactions.
            </li>
            <li>
              <b>Record History Tracking:</b> Activity log now visible on each
              record for auditability.
            </li>
          </ol>
        </li>
        <br />
      </ul>

      <h2>v1.19.0</h2>

      <ul>
        <li>
          <b>Auto Scheduling in Roster Management:</b> Automatically assign
          shifts to staff based on availability and preferences, streamlining
          the scheduling process.
        </li>
        <br />
        <li>
          <b>Publish Functionality in Roster Management:</b> Notify staff
          instantly when shifts are assigned through auto scheduling, ensuring
          timely communication.
        </li>
        <br />
        <li>
          <b>Rejected Shifts:</b> View all previously rejected shifts along with
          detailed reports. These shifts can now be reassigned using the auto
          schedule feature.
        </li>
        <br />
        <li>
          <b>Recurring Fortnightly Shifts:</b> Set up shifts that recur every
          two weeks, reducing manual scheduling efforts.
        </li>
        <br />
        <li>
          <b>Participant Schedule – Manage Staff Preferences:</b> Customise
          staff preferences directly within the participant's schedule for more
          tailored assignments.
        </li>
        <br />
        <li>
          <b>Recurring Holiday Rates for Sleepover Shifts:</b> Apply appropriate
          holiday rates automatically to recurring sleepover shifts.
        </li>
        <br />
        <li>
          <b>Sleepover Allowance for Weekends and Holidays:</b> Ensure staff
          receive correct allowances for sleepover shifts during weekends and
          holidays.
        </li>
        <br />
        <li>
          <b>Participant Snapshot in Participant Journal:</b> Quickly access
          critical information such as allergic conditions and mental health
          notes within the participant's journal.
        </li>
        <br />
        <li>
          <b>Reimbursements – Vehicle Type Dropdown:</b> While submitting
          reimbursements, staff can now select their vehicle type—Electric or
          Fuel—for accurate processing.
        </li>
        <br />
        <li>
          <b>Customisable Forms:</b> Empower users to create and manage custom
          forms tailored to specific needs, enhancing data collection and
          workflow flexibility.
        </li>
        <br />
        <li>
          <b>T-Sign Template Creation:</b> Introduced standardised templates
          within the T-Sign module, streamlining document generation and
          ensuring consistency across the board.
        </li>
        <br />
        <li>
          <b>Participant and Payroll Dashboards:</b> Implemented dedicated
          dashboards for participants and payroll administrators, providing
          real-time insights into participant funds and payroll activities.
        </li>
        <br />
        <li>
          <b>UI/UX Enhancements:</b> Revamp the user interface and experience
          across the application for improved navigation, accessibility, and
          overall user satisfaction.
        </li>
        <br />
        <li>
          <b>Accounting:</b>
          <ol>
            <li>
              <b>Automatic Tax Population from Entity Details:</b> When creating
              new accounts, tax information now auto-populates based on the
              associated entity's details, reducing manual entry and ensuring
              consistency.
            </li>
            <li>
              <b>Account List Generation from Entity Details:</b> The system now
              automatically generates a list of relevant accounts derived from
              the entity's information, streamlining the setup process and
              minimizing errors.
            </li>
            <li>
              <b>Time Period Association:</b> Link accounts to specific time
              periods for improved financial reporting accuracy.
            </li>
            <li>
              <b>Active/Inactive Status Management:</b> Easily mark accounts as
              active or inactive to maintain an organized ledger without losing
              historical data.
            </li>
            <li>
              <b>Account List Import:</b> Quickly import bulk account data using
              CSV or Excel files, streamlining the setup process.
            </li>
            <li>
              <b>Account List Editing:</b> Modify account details such as names,
              types, and codes directly within the system for better control and
              accuracy.
            </li>
          </ol>
        </li>
        <br />
      </ul>

      <h2>v1.18.0</h2>

      <ul>
        <li>
          <b>Accounting:</b> Access advanced accounting functionalities to
          streamline financial operations <br />
          <ol>
            <li>
              <b>Payroll:</b> Manage employee compensation, deductions, and tax
              filings efficiently.
            </li>
            <li>
              <b>Sales and Purchases:</b> Track sales invoices and purchase
              orders to maintain accurate financial records.
            </li>
            <li>
              <b>Chart of Accounts:</b> Organise financial accounts
              systematically to ensure accurate reporting.
            </li>
            <li>
              <b>General Ledger:</b> Maintain a comprehensive record of all
              financial transactions.
            </li>
            <li>
              <b>Reports:</b> Generate detailed financial reports, including
              Profit and Loss, Superannuation, Balance sheets, Reconciliation,
              Client Accounts, Activity statements, Wages, and Departmental
              Accounts.
            </li>
            <li>
              <b>Settings:</b> Customise accounting preferences to align with
              organisational policies and compliance requirements.
            </li>
          </ol>
        </li>
        <br />

        <li>
          <b>Custom Shifts:</b> Create and manage shift types tailored to your
          organisation's unique scheduling needs.
        </li>
        <br />

        <li>
          <b>Holiday Rates for Recurring Shifts:</b> Automatically apply holiday
          pay rates to recurring shifts that fall on designated holidays,
          ensuring accurate compensation.
        </li>
        <br />

        <li>
          <b>Funds Tracker - Services:</b> After adding funds, users can now
          select specific service items to associate with the allocated funds,
          ensuring precise tracking.
        </li>
        <br />

        <li>
          <b>Invoice Generation:</b> Invoices generated within the system are
          automatically linked to the Accounting module, ensuring real-time
          updates to financial records.
        </li>
        <br />

        <li>
          <b>Participant Scheduling:</b> Efficiently schedule participants for
          various activities or services, enhancing coordination and resource
          allocation.
        </li>
        <br />

        <li>
          <b>My Availability Management:</b> View and manage availability of
          staff to optimise scheduling and ensure adequate coverage.
        </li>
        <br />

        <li>
          <b>Shift Deletion for Service-Linked Shifts:</b> Delete shifts even if
          they are associated with specific services, providing greater
          flexibility in schedule management.
        </li>
        <br />

        <li>
          <b>Invoice Redesign:</b> Complete redesign of invoices across the web
          app, including PDF changes for ICT Timesheet, Roster Timesheet,
          Payroll Invoice, and Participant Services.
        </li>
        <br />

        <li>
          <b>Billable Hours Tracking:</b> Accurately track billable hours for
          services rendered, facilitating precise invoicing and financial
          reporting.
        </li>
        <br />

        <li>
          <b>Editable Shift Timings for All Shift Types:</b> Modify shift start
          and end times across all shift types, allowing for dynamic scheduling
          adjustments.
        </li>
        <br />

        <li>
          <b>ICT Timesheet – Time picker:</b> Implement a user-friendly time
          picker for ICT timesheets, simplifying time entry and tracking.
        </li>
        <br />

        <li>
          <b>ICT Timesheet – Accounting Integration:</b> Integrate ICT timesheet
          data with accounting systems for seamless financial reconciliation and
          reporting.
        </li>
        <br />
      </ul>
    </div>
  );
};

export default ReleaseNotes;

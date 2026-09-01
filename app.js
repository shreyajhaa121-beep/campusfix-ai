// ==========================================
// CampusFix AI - Application Logic
// ==========================================

const STORAGE_KEY = "campusFixComplaints";

// ==========================================
// Default Sample Complaints
// ==========================================

const defaultComplaints = [

  {
    id: "CF-2026-001",
    title: "Water supply not working",
    type: "Hostel",
    category: "Water & Plumbing",
    location: "Hostel Block B",
    description:
      "Water supply has stopped and students are affected.",
    status: "Pending",
    priority: "High",
    authority: "Hostel Warden",
    createdAt: "2026-08-29",

    history: [
      {
        status: "Submitted",
        note:
          "Complaint submitted successfully."
      }
    ]
  },


  {
    id: "CF-2026-002",
    title: "Wi-Fi not working",
    type: "College",
    category: "Wi-Fi & Internet",
    location: "College 2nd Floor",
    description:
      "Internet connection is unavailable in multiple classrooms.",
    status: "In Progress",
    priority: "Medium",
    authority:
      "College Safety Department",
    createdAt: "2026-08-26",

    history: [
      {
        status: "Submitted",
        note:
          "Complaint submitted successfully."
      },

      {
        status: "In Progress",
        note:
          "Authority started working on the issue."
      }
    ]
  },


  {
    id: "CF-2026-003",
    title: "Broken classroom light",
    type: "College",
    category: "Electrical",
    location: "Classroom 204",
    description:
      "The classroom light is not working.",
    status: "Resolved",
    priority: "Low",
    authority:
      "College Safety Department",
    createdAt: "2026-08-20",

    history: [
      {
        status: "Submitted",
        note:
          "Complaint submitted successfully."
      },

      {
        status: "Resolved",
        note:
          "The electrical issue was resolved."
      }
    ]
  },


  {
    id: "CF-2026-004",
    title:
      "Security issue near hostel gate",
    type: "Hostel",
    category: "Security",
    location:
      "Hostel Main Gate",
    description:
      "Security concern reported and still unresolved.",
    status: "Escalated",
    priority: "High",
    authority:
      "College Main Authority",
    createdAt: "2026-08-18",

    history: [
      {
        status: "Submitted",
        note:
          "Complaint submitted successfully."
      },

      {
        status: "Escalated",
        note:
          "Resolution deadline passed and complaint was escalated."
      }
    ]
  }

];


// ==========================================
// Remove Duplicate History Entries
// ==========================================

function cleanHistory(history) {

  if (!Array.isArray(history)) {

    return [
      {
        status: "Submitted",
        note:
          "Complaint submitted successfully."
      }
    ];

  }


  const cleanedHistory = [];


  history.forEach(item => {

    const lastItem =
      cleanedHistory[
        cleanedHistory.length - 1
      ];


    if (

      !lastItem ||

      lastItem.status !== item.status ||

      lastItem.note !== item.note

    ) {

      cleanedHistory.push(item);

    }

  });


  return cleanedHistory;

}


// ==========================================
// Load Complaints
// ==========================================

function loadComplaints() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const data = JSON.parse(saved);

      if (Array.isArray(data)) {
        return data.map((complaint) => {
          complaint.history = cleanHistory(
            complaint.history
          );

          return complaint;
        });
      }
    }
  } catch (error) {
    console.error(
      "Unable to load complaints:",
      error
    );
  }

  return JSON.parse(
    JSON.stringify(defaultComplaints)
  );
}

let complaints =
  loadComplaints();


// ==========================================
// Save Complaints
// ==========================================

function saveComplaints() {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(
      complaints
    )

  );

}


// ==========================================
// Show Report Form
// ==========================================

function showReportForm() {

  const reportSection =
    document.getElementById(
      "reportSection"
    );


  const detailsSection =
    document.getElementById(
      "detailsSection"
    );


  if (detailsSection) {

    detailsSection.classList.add(
      "hidden"
    );

  }


  if (reportSection) {

    reportSection.classList.remove(
      "hidden"
    );


    reportSection.scrollIntoView({

      behavior:
        "smooth"

    });

  }

}


// ==========================================
// Show Dashboard
// ==========================================

function showDashboard() {

  const dashboard =
    document.getElementById(
      "dashboard"
    );


  if (dashboard) {

    dashboard.scrollIntoView({

      behavior:
        "smooth"

    });

  }

}


// ==========================================
// Generate Complaint ID
// ==========================================

function generateComplaintId() {

  return (
    "CF-2026-" +
    Date.now()
  );

}


// ==========================================
// Determine Authority
// ==========================================

function getAuthority(type) {

  if (type === "Hostel") {

    return (
      "Hostel Warden"
    );

  }


  return (
    "College Safety Department"
  );

}


// ==========================================
// Calculate Priority
// ==========================================

function calculatePriority(
  category,
  description
) {

  const text = (

    category +
    " " +
    description

  ).toLowerCase();


  if (

    text.includes("security") ||
    text.includes("danger") ||
    text.includes("fire") ||
    text.includes("water")

  ) {

    return "High";

  }


  if (

    text.includes("electrical") ||
    text.includes("wifi") ||
    text.includes("wi-fi") ||
    text.includes("internet")

  ) {

    return "Medium";

  }


  return "Low";

}
// ==========================================
// 7-DAY DEADLINE HELPERS
// ==========================================

function getDaysRemaining(
  complaint
) {

  // Resolved complaints do not need countdown

  if (
    complaint.status ===
    "Resolved"
  ) {

    return null;

  }


  const createdDate =
    new Date(
      complaint.createdAt
    );


  const today =
    new Date();


  // Remove time so calculation is based on dates

  createdDate.setHours(
    0,
    0,
    0,
    0
  );


  today.setHours(
    0,
    0,
    0,
    0
  );


  const deadline =
    new Date(
      createdDate
    );


  deadline.setDate(
    deadline.getDate() + 7
  );


  const difference =
    deadline -
    today;


  return Math.ceil(

    difference /

    (
      1000 *
      60 *
      60 *
      24
    )

  );

}
// ==========================================
// GET EXACT DEADLINE DATE
// ==========================================

function getDeadlineDate(
  complaint
) {

  const createdDate =
    new Date(
      complaint.createdAt
    );


  createdDate.setHours(
    0,
    0,
    0,
    0
  );


  const deadline =
    new Date(
      createdDate
    );


  deadline.setDate(
    deadline.getDate() + 7
  );


  return deadline;

}


// ==========================================
// FORMAT DEADLINE DATE
// ==========================================

function formatDeadlineDate(
  complaint
) {

  const deadline =
    getDeadlineDate(
      complaint
    );


  return deadline.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

}

// ==========================================
// GET ESCALATION INFORMATION
// ==========================================

function getEscalationInfo(
  complaint
) {

  // Only show escalation information
  // when complaint is escalated

  if (
    complaint.status !==
    "Escalated"
  ) {

    return "";

  }


  const previousAuthority =

    complaint.type ===
    "Hostel"

      ? "Hostel Warden"

      : "College Safety Department";


  const escalatedAuthority =
    "College Main Authority";


  return `

    <div class="escalation-info">

      <div class="escalation-icon">

        ⚠

      </div>


      <div class="escalation-content">

        <h3>
          Complaint Escalated
        </h3>


        <p>

          This complaint was not resolved
          within the 7-day resolution period.

        </p>


        <p>

          <strong>
            Previous Authority:
          </strong>

          ${previousAuthority}

        </p>


        <p>

          <strong>
            Escalated To:
          </strong>

          ${escalatedAuthority}

        </p>


        <p>

          <strong>
            Escalation Reason:
          </strong>

          7-day resolution deadline expired.

        </p>

      </div>

    </div>

  `;

}


// ==========================================
// GET DEADLINE STATUS
// ==========================================

function getDeadlineLabel(
  complaint
) {

  const daysRemaining =
    getDaysRemaining(
      complaint
    );


  if (
    daysRemaining === null
  ) {

    return `
      <span class="deadline resolved-deadline">
        ✓ Resolved
      </span>
    `;

  }


  if (
    complaint.status ===
    "Escalated"
  ) {

    return `
      <span class="deadline overdue">
        ⚠ Escalated
      </span>
    `;

  }


  if (
    daysRemaining < 0
  ) {

    return `
      <span class="deadline overdue">
        ⚠ Overdue
      </span>
    `;

  }


  if (
    daysRemaining === 0
  ) {

    return `
      <span class="deadline urgent">
        ⏳ Deadline today
      </span>
    `;

  }


  if (
    daysRemaining === 1
  ) {

    return `
      <span class="deadline urgent">
        ⏳ 1 day remaining
      </span>
    `;

  }


  return `
    <span class="deadline">
      ⏳ ${daysRemaining} days remaining
    </span>
  `;

}


// ==========================================
// Get Status CSS Class
// ==========================================

function getStatusClass(status) {

  if (status === "In Progress") {

    return "progress";

  }


  return status

    .toLowerCase()

    .replace(
      /\s+/g,
      "-"
    );

}


// ==========================================
// Dashboard Statistics
// ==========================================

function renderStats() {
  
  const total =
    complaints.length;


  const pending =
    complaints.filter(

      complaint =>
        complaint.status === "Pending"

    ).length;


  const inProgress =
    complaints.filter(

      complaint =>
        complaint.status === "In Progress"

    ).length;


  const escalated =
    complaints.filter(

      complaint =>
        complaint.status === "Escalated"

    ).length;


  const totalElement =
    document.getElementById(
      "totalIssues"
    );


  const pendingElement =
    document.getElementById(
      "pendingIssues"
    );


  const progressElement =
    document.getElementById(
      "progressIssues"
    );


  const overdueElement =
    document.getElementById(
      "overdueIssues"
    );


  if (totalElement) {

    totalElement.textContent =
      total;

  }
  

  if (pendingElement) {

    pendingElement.textContent =
      pending;

  }


  if (progressElement) {

    progressElement.textContent =
      inProgress;

  }


  if (overdueElement) {

    overdueElement.textContent =
      escalated;

  }

}
// ==========================================
// AUTHORITY DASHBOARD
// ==========================================

function renderAuthorityDashboard() {

  const authorityFilter =
    document.getElementById(
      "authorityFilter"
    );


  const authorityComplaintsList =
    document.getElementById(
      "authorityComplaintsList"
    );


  if (
    !authorityComplaintsList
  ) {

    return;

  }


  // Selected authority

  const selectedAuthority =

    authorityFilter

      ? authorityFilter.value

      : "All";


  // Filter complaints

  let authorityComplaints =

    complaints.filter(

      complaint => {

        if (
          selectedAuthority ===
          "All"
        ) {

          return true;

        }


        return (

          complaint.authority ===
          selectedAuthority

        );

      }

    );


  // ==========================================
  // AUTHORITY STATISTICS
  // ==========================================

  const assignedIssues =

    authorityComplaints.length;


  const pendingIssues =

    authorityComplaints.filter(

      complaint =>

        complaint.status ===
        "Pending"

    ).length;


  const progressIssues =

    authorityComplaints.filter(

      complaint =>

        complaint.status ===
        "In Progress"

    ).length;


  const escalatedIssues =

    authorityComplaints.filter(

      complaint =>

        complaint.status ===
        "Escalated"

    ).length;


  // Update dashboard numbers

  const assignedElement =
    document.getElementById(
      "assignedIssues"
    );


  const pendingElement =
    document.getElementById(
      "authorityPending"
    );


  const progressElement =
    document.getElementById(
      "authorityProgress"
    );


  const escalatedElement =
    document.getElementById(
      "authorityEscalated"
    );


  if (
    assignedElement
  ) {

    assignedElement.textContent =
      assignedIssues;

  }


  if (
    pendingElement
  ) {

    pendingElement.textContent =
      pendingIssues;

  }


  if (
    progressElement
  ) {

    progressElement.textContent =
      progressIssues;

  }


  if (
    escalatedElement
  ) {

    escalatedElement.textContent =
      escalatedIssues;

  }


  // ==========================================
  // RENDER AUTHORITY COMPLAINTS
  // ==========================================

  authorityComplaintsList.innerHTML =
    "";


  if (
    authorityComplaints.length === 0
  ) {

    authorityComplaintsList.innerHTML = `

      <p class="no-authority-complaints">

        No complaints assigned to this authority.

      </p>

    `;


    return;

  }


  authorityComplaints

    .slice()

    .reverse()

    .forEach(

      complaint => {


        const card =
          document.createElement(
            "div"
          );


        card.className =
          "authority-complaint-card";


        card.innerHTML = `

          <div
            class="authority-complaint-top"
          >

            <div>

              <h3>
                ${complaint.title}
              </h3>

              <p>
                ${complaint.description}
              </p>

            </div>


            <span
              class="status ${getStatusClass(
                complaint.status
              )}"
            >

              ${complaint.status}

            </span>

          </div>


          <div
            class="authority-complaint-meta"
          >

            <span>
              📍 ${complaint.location}
            </span>


            <span>
              🏷️ ${complaint.category}
            </span>


            <span>
              🔥 ${complaint.priority} Priority
            </span>


            <span>
              🆔 ${complaint.id}
            </span>

          </div>


          <div
            class="authority-card-actions"
          >

            <button
              type="button"
              onclick="
                openAuthorityComplaint(
                  '${complaint.id}'
                )
              "
            >

              Manage Complaint

            </button>

          </div>

        `;


        authorityComplaintsList.appendChild(
          card
        );

      }

    );

}


// ==========================================
// OPEN AUTHORITY COMPLAINT
// ==========================================

function openAuthorityComplaint(
  complaintId
) {

  showComplaintDetails(
    complaintId
  );

}


// ==========================================
// AUTHORITY FILTER EVENT
// ==========================================

function setupAuthorityFilter() {

  const authorityFilter =
    document.getElementById(
      "authorityFilter"
    );


  if (
    !authorityFilter
  ) {

    return;

  }


  authorityFilter.addEventListener(

    "change",

    function () {

      renderAuthorityDashboard();

    }

  );

}


// ==========================================
// Get Filtered Complaints
// ==========================================

function getFilteredComplaints() {

  const searchInput =
    document.getElementById(
      "searchComplaint"
    );


  const statusFilter =
    document.getElementById(
      "statusFilter"
    );


  const typeFilter =
    document.getElementById(
      "typeFilter"
    );


  const priorityFilter =
    document.getElementById(
      "priorityFilter"
    );


  const searchText =
    searchInput
      ? searchInput.value
          .trim()
          .toLowerCase()
      : "";


  const selectedStatus =
    statusFilter
      ? statusFilter.value
      : "";


  const selectedType =
    typeFilter
      ? typeFilter.value
      : "";


  const selectedPriority =
    priorityFilter
      ? priorityFilter.value
      : "";


  return complaints.filter(
    complaint => {


      const searchableText = (

        complaint.title +
        " " +
        complaint.description +
        " " +
        complaint.location +
        " " +
        complaint.category +
        " " +
        complaint.authority

      ).toLowerCase();


      const matchesSearch =

        !searchText ||

        searchableText.includes(
          searchText
        );


      const matchesStatus =

        !selectedStatus ||

        complaint.status ===
          selectedStatus;


      const matchesType =

        !selectedType ||

        complaint.type ===
          selectedType;


      const matchesPriority =

        !selectedPriority ||

        complaint.priority ===
          selectedPriority;


      return (

        matchesSearch &&

        matchesStatus &&

        matchesType &&

        matchesPriority

      );

    }
  );

}


// ==========================================
// Clear Filters
// ==========================================

function clearFilters() {

  const searchInput =
    document.getElementById(
      "searchComplaint"
    );


  const statusFilter =
    document.getElementById(
      "statusFilter"
    );


  const typeFilter =
    document.getElementById(
      "typeFilter"
    );


  const priorityFilter =
    document.getElementById(
      "priorityFilter"
    );


  if (searchInput) {

    searchInput.value = "";

  }


  if (statusFilter) {

    statusFilter.value = "";

  }


  if (typeFilter) {

    typeFilter.value = "";

  }


  if (priorityFilter) {

    priorityFilter.value = "";

  }


  renderComplaints();

}


// ==========================================
// Render Complaint List
// ==========================================

function renderComplaints() {

  const complaintsList =
    document.getElementById(
      "complaintsList"
    );


  if (!complaintsList) {

    return;

  }


  const filteredComplaints =
    getFilteredComplaints();


  complaintsList.innerHTML =
    "";


  if (
    filteredComplaints.length === 0
  ) {

    complaintsList.innerHTML = `

      <p class="no-results">
        No complaints found matching your filters.
      </p>

    `;

    return;

  }


  filteredComplaints

    .slice()

    .reverse()

    .forEach(
      complaint => {


        const card =
          document.createElement(
            "div"
          );


        card.className =
          "complaint-card";


        card.style.cursor =
          "pointer";


        card.innerHTML = `

          <h3>
            ${complaint.title}
          </h3>


          <p>
            ${complaint.description}
          </p>


          <div
            class="complaint-meta"
          >

            <span>
              📍 ${complaint.location}
            </span>


            <span>
              🏷️ ${complaint.category}
            </span>


            <span>
              👤 ${complaint.authority}
            </span>


            <span>
              🔥 ${complaint.priority} Priority
            </span>


            <span
              class="status ${getStatusClass(
                complaint.status
              )}"
            >

              ${complaint.status}

            </span>


            ${getDeadlineLabel(
              complaint
            )}

          </div>

        `;


        card.addEventListener(

          "click",

          function () {

            showComplaintDetails(
              complaint.id
            );

          }

        );


        complaintsList.appendChild(
          card
        );

      }
    );

}


// ==========================================
// Create Status Action Buttons
// ==========================================

function getActionButtons(
  complaint
) {

  let buttons =
    "";


  if (
    complaint.status ===
    "Pending"
  ) {

    buttons = `

      <button
        type="button"
        onclick="updateComplaintStatus('${complaint.id}', 'In Progress')"
      >
        Mark In Progress
      </button>


      <button
        type="button"
        onclick="updateComplaintStatus('${complaint.id}', 'Resolved')"
      >
        Mark Resolved
      </button>

    `;

  }


  else if (
    complaint.status ===
    "In Progress"
  ) {

    buttons = `

      <button
        type="button"
        onclick="updateComplaintStatus('${complaint.id}', 'Resolved')"
      >
        Mark Resolved
      </button>

    `;

  }


  else if (
    complaint.status ===
    "Escalated"
  ) {

    buttons = `

      <button
        type="button"
        onclick="updateComplaintStatus('${complaint.id}', 'In Progress')"
      >
        Mark In Progress
      </button>


      <button
        type="button"
        onclick="updateComplaintStatus('${complaint.id}', 'Resolved')"
      >
        Mark Resolved
      </button>

    `;

  }


  else if (
    complaint.status ===
    "Resolved"
  ) {

    buttons = `

      <p
        class="resolved-message"
      >
        ✓ This complaint has been resolved.
      </p>

    `;

  }


  return buttons;

}


// ==========================================
// Show Complaint Details
// ==========================================

function showComplaintDetails(
  id
) {

  const complaint =
    complaints.find(

      item =>
        item.id === id

    );


  if (!complaint) {

    return;

  }


  complaint.history =
    cleanHistory(
      complaint.history
    );


  saveComplaints();


  const detailsSection =
    document.getElementById(
      "detailsSection"
    );


  const complaintDetails =
    document.getElementById(
      "complaintDetails"
    );


  const reportSection =
    document.getElementById(
      "reportSection"
    );


  if (

    !detailsSection ||

    !complaintDetails

  ) {

    return;

  }


  if (reportSection) {

    reportSection.classList.add(
      "hidden"
    );

  }


  let historyHTML =
    "";


  complaint.history.forEach(
    item => {

      historyHTML += `

        <div
          class="history-item"
        >

          <strong>
            ${item.status}
          </strong>


          <p>
            ${item.note}
          </p>

        </div>

      `;

    }
  );


  const actionButtons =
    getActionButtons(
      complaint
    );


  complaintDetails.innerHTML = `

    <div
      class="complaint-detail-card"
    >

      <h2>
        ${complaint.title}
      </h2>


      <p>
        ${complaint.description}
      </p>


      <hr>


      <p>

        <strong>
          Complaint ID:
        </strong>

        ${complaint.id}

      </p>


      <p>

        <strong>
          Type:
        </strong>

        ${complaint.type}

      </p>


      <p>

        <strong>
          Category:
        </strong>

        ${complaint.category}

      </p>


      <p>

        <strong>
          Location:
        </strong>

        ${complaint.location}

      </p>


      <p>

        <strong>
          Priority:
        </strong>

        ${complaint.priority}

      </p>


      <p>

        <strong>
          Authority:
        </strong>

        ${complaint.authority}

      </p>


      <p>

        <strong>
          Status:
        </strong>

        ${complaint.status}

      </p>


      <p>

        <strong>
          Submitted:
        </strong>

        ${complaint.createdAt}

      </p>


      <p>

        <strong>
          Resolution Deadline:
        </strong>

        ${formatDeadlineDate(
          complaint
        )}

      </p>


      <p>

        <strong>
          Time Remaining:
        </strong>

        ${getDeadlineLabel(
          complaint
        )}

      </p>


      ${getEscalationInfo(
        complaint
      )}


      <hr>


      <h3>
        Authority Actions
      </h3>


      ${

        complaint.status !==
        "Resolved"

          ? `

            <textarea
              id="actionNote"
              placeholder="Add an action/update note..."
            ></textarea>

          `

          : ""

      }


      <div
        class="action-buttons"
      >

        ${actionButtons}

      </div>


      <hr>


      <h3>
        Complaint Journey
      </h3>


      <div
        class="complaint-history"
      >

        ${historyHTML}

      </div>

    </div>

  `;


  detailsSection.classList.remove(
    "hidden"
  );


  detailsSection.scrollIntoView({

    behavior:
      "smooth"

  });

}


// ==========================================
// Update Complaint Status
// ==========================================

function updateComplaintStatus(
  complaintId,
  newStatus
) {

  const complaint =
    complaints.find(

      item =>
        item.id === complaintId

    );


  if (!complaint) {

    return;

  }


  if (
    complaint.status ===
    newStatus
  ) {

    alert(
      "This complaint is already marked as " +
      newStatus +
      "."
    );


    return;

  }


  if (
    complaint.status ===
    "Resolved"
  ) {

    alert(
      "This complaint has already been resolved."
    );


    return;

  }


  const actionNoteElement =
    document.getElementById(
      "actionNote"
    );


  let note =
    "";


  if (

    actionNoteElement &&

    actionNoteElement.value.trim()

  ) {

    note =
      actionNoteElement.value.trim();

  }


  if (!note) {

    if (
      newStatus ===
      "In Progress"
    ) {

      note =
        "Authority started working on this complaint.";

    }


    else if (
      newStatus ===
      "Resolved"
    ) {

      note =
        "Authority marked this complaint as resolved.";

    }


    else {

      note =
        "Complaint status updated.";

    }

  }


  complaint.status =
    newStatus;


  const lastHistoryItem =
    complaint.history[
      complaint.history.length - 1
    ];


  if (

    !lastHistoryItem ||

    lastHistoryItem.status !==
    newStatus ||

    lastHistoryItem.note !==
    note

  ) {

    complaint.history.push({

      status:
        newStatus,

      note:
        note

    });

  }


  complaint.history =
    cleanHistory(
      complaint.history
    );


  saveComplaints();


  renderStats();


  renderComplaints();


  renderAuthorityDashboard();


  showComplaintDetails(
    complaintId
  );


  alert(

    "Complaint status updated to: " +
    newStatus

  );

}


// ==========================================
// Close Complaint Details
// ==========================================

function closeDetails() {

  const detailsSection =
    document.getElementById(
      "detailsSection"
    );


  if (detailsSection) {

    detailsSection.classList.add(
      "hidden"
    );

  }


  const complaintsSection =
    document.getElementById(
      "complaintsSection"
    );


  if (complaintsSection) {

    complaintsSection.scrollIntoView({

      behavior:
        "smooth"

    });

  }

}


// ==========================================
// Handle New Complaint
// ==========================================

const complaintForm =
  document.getElementById(
    "complaintForm"
  );


if (complaintForm) {

  complaintForm.addEventListener(

    "submit",

    function (event) {

      event.preventDefault();


      const type =
        document.getElementById(
          "complaintType"
        ).value;


      const category =
        document.getElementById(
          "category"
        ).value;


      const title =
        document.getElementById(
          "title"
        ).value;


      const location =
        document.getElementById(
          "location"
        ).value;


      const description =
        document.getElementById(
          "description"
        ).value;


      const authority =
        getAuthority(
          type
        );


      const newComplaint = {

        id:
          generateComplaintId(),

        title:
          title,

        type:
          type,

        category:
          category,

        location:
          location,

        description:
          description,

        status:
          "Pending",

        priority:
          calculatePriority(
            category,
            description
          ),

        authority:
          authority,

        createdAt:

          new Date()

            .toISOString()

            .split(
              "T"
            )[0],


        history: [

          {

            status:
              "Submitted",

            note:

              "Complaint submitted successfully and assigned to " +

              authority +

              "."

          }

        ]

      };


      complaints.push(
        newComplaint
      );


      saveComplaints();


      renderStats();


      renderComplaints();


      renderAuthorityDashboard();


      complaintForm.reset();


      alert(

        "Complaint submitted successfully!\n\n" +

        "Complaint ID: " +

        newComplaint.id +

        "\n\nAssigned to: " +

        newComplaint.authority +

        "\n\nAutomatic escalation will occur if the complaint is not resolved within 7 days."

      );


      const reportSection =
        document.getElementById(
          "reportSection"
        );


      if (reportSection) {

        reportSection.classList.add(
          "hidden"
        );

      }


      const complaintsSection =
        document.getElementById(
          "complaintsSection"
        );


      if (complaintsSection) {

        complaintsSection.scrollIntoView({

          behavior:
            "smooth"

        });

      }

    }

  );

}


// ==========================================
// Filter Event Listeners
// ==========================================

const searchComplaint =
  document.getElementById(
    "searchComplaint"
  );


const statusFilter =
  document.getElementById(
    "statusFilter"
  );


const typeFilter =
  document.getElementById(
    "typeFilter"
  );


const priorityFilter =
  document.getElementById(
    "priorityFilter"
  );


if (searchComplaint) {

  searchComplaint.addEventListener(

    "input",

    renderComplaints

  );

}


if (statusFilter) {

  statusFilter.addEventListener(

    "change",

    renderComplaints

  );

}


if (typeFilter) {

  typeFilter.addEventListener(

    "change",

    renderComplaints

  );

}


if (priorityFilter) {

  priorityFilter.addEventListener(

    "change",

    renderComplaints

  );

}


// ==========================================
// Initial Application Render
// ==========================================

complaints = complaints.map(
  complaint => {

    complaint.history =
      cleanHistory(
        complaint.history
      );

    return complaint;

  }
);


saveComplaints();


renderStats();


renderComplaints();


setupAuthorityFilter();


renderAuthorityDashboard();

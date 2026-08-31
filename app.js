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

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (saved) {

      const data =
        JSON.parse(saved);


      if (Array.isArray(data)) {

        return data.map(
          complaint => {

            complaint.history =
              cleanHistory(
                complaint.history
              );


            return complaint;

          }
        );

      }

    }

  } catch (error) {

    console.error(
      "Unable to load complaints:",
      error
    );

  }


  return JSON.parse(
    JSON.stringify(
      defaultComplaints
    )
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

    text.includes(
      "security"
    ) ||

    text.includes(
      "danger"
    ) ||

    text.includes(
      "fire"
    ) ||

    text.includes(
      "water"
    )

  ) {

    return "High";

  }


  if (

    text.includes(
      "electrical"
    ) ||

    text.includes(
      "wifi"
    ) ||

    text.includes(
      "wi-fi"
    ) ||

    text.includes(
      "internet"
    )

  ) {

    return "Medium";

  }


  return "Low";

}


// ==========================================
// Get Status CSS Class
// ==========================================

function getStatusClass(
  status
) {

  if (
    status ===
    "In Progress"
  ) {

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
        complaint.status ===
        "Pending"

    ).length;


  const inProgress =
    complaints.filter(

      complaint =>
        complaint.status ===
        "In Progress"

    ).length;


  const escalated =
    complaints.filter(

      complaint =>
        complaint.status ===
        "Escalated"

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


  complaintsList.innerHTML =
    "";


  if (
    complaints.length === 0
  ) {

    complaintsList.innerHTML = `

      <p>
        No complaints found.
      </p>

    `;

    return;

  }


  complaints

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
              🔥
              ${complaint.priority}
              Priority
            </span>


            <span
              class="status ${getStatusClass(
                complaint.status
              )}"
            >

              ${complaint.status}

            </span>

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

  let buttons = "";


  // Pending Complaint

  if (
    complaint.status ===
    "Pending"
  ) {

    buttons = `

      <button
        type="button"
        onclick="
          updateComplaintStatus(
            '${complaint.id}',
            'In Progress'
          )
        "
      >
        Mark In Progress
      </button>


      <button
        type="button"
        onclick="
          updateComplaintStatus(
            '${complaint.id}',
            'Resolved'
          )
        "
      >
        Mark Resolved
      </button>

    `;

  }


  // In Progress Complaint

  else if (
    complaint.status ===
    "In Progress"
  ) {

    buttons = `

      <button
        type="button"
        onclick="
          updateComplaintStatus(
            '${complaint.id}',
            'Resolved'
          )
        "
      >
        Mark Resolved
      </button>

    `;

  }


  // Escalated Complaint

  else if (
    complaint.status ===
    "Escalated"
  ) {

    buttons = `

      <button
        type="button"
        onclick="
          updateComplaintStatus(
            '${complaint.id}',
            'In Progress'
          )
        "
      >
        Mark In Progress
      </button>


      <button
        type="button"
        onclick="
          updateComplaintStatus(
            '${complaint.id}',
            'Resolved'
          )
        "
      >
        Mark Resolved
      </button>

    `;

  }


  // Resolved Complaint

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
              placeholder="
                Add an action/update note...
              "
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


  // Prevent same status update

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


  // Prevent changing resolved complaint

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

    actionNoteElement
      .value
      .trim()

  ) {

    note =
      actionNoteElement
        .value
        .trim();

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


  // Check duplicate history

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

            .split("T")[0],


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


      complaintForm.reset();


      alert(

        "Complaint submitted successfully!\n\n" +

        "Complaint ID: " +

        newComplaint.id +

        "\n\nAssigned to: " +

        newComplaint.authority

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
// Initial Application Render
// ==========================================

complaints =
  complaints.map(
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

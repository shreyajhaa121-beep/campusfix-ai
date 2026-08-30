// CampusFix AI - Application Logic

const complaints = [
  {
    id: "CF-2026-001",
    title: "Water supply not working",
    type: "Hostel",
    category: "Water & Plumbing",
    location: "Hostel Block B",
    description: "Water supply has stopped and students are affected.",
    status: "Pending",
    priority: "High",
    authority: "Hostel Warden",
    createdAt: "2026-08-29",
    history: [
      {
        status: "Submitted",
        note: "Complaint submitted successfully."
      }
    ]
  },
  {
    id: "CF-2026-002",
    title: "Wi-Fi not working",
    type: "College",
    category: "Wi-Fi & Internet",
    location: "College 2nd Floor",
    description: "Internet connection is unavailable in multiple classrooms.",
    status: "In Progress",
    priority: "Medium",
    authority: "College Safety Department",
    createdAt: "2026-08-26",
    history: [
      {
        status: "Submitted",
        note: "Complaint submitted successfully."
      },
      {
        status: "In Progress",
        note: "Issue assigned to the responsible department."
      }
    ]
  },
  {
    id: "CF-2026-003",
    title: "Broken classroom light",
    type: "College",
    category: "Electrical",
    location: "Classroom 204",
    description: "The classroom light is not working.",
    status: "Resolved",
    priority: "Low",
    authority: "College Safety Department",
    createdAt: "2026-08-20",
    history: [
      {
        status: "Submitted",
        note: "Complaint submitted successfully."
      },
      {
        status: "Resolved",
        note: "The electrical issue was resolved."
      }
    ]
  },
  {
    id: "CF-2026-004",
    title: "Security issue near hostel gate",
    type: "Hostel",
    category: "Security",
    location: "Hostel Main Gate",
    description: "Security concern reported and still unresolved.",
    status: "Escalated",
    priority: "High",
    authority: "College Main Authority",
    createdAt: "2026-08-18",
    history: [
      {
        status: "Submitted",
        note: "Complaint submitted successfully."
      },
      {
        status: "Escalated",
        note: "Resolution deadline passed. Escalated to College Main Authority."
      }
    ]
  }
];


// -----------------------------
// UI NAVIGATION
// -----------------------------

function showReportForm() {

  const reportSection =
    document.getElementById("reportSection");

  reportSection.classList.remove("hidden");

  reportSection.scrollIntoView({
    behavior: "smooth"
  });

}


function showDashboard() {

  document
    .getElementById("dashboard")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// -----------------------------
// COMPLAINT UTILITIES
// -----------------------------

function generateComplaintId() {

  return "CF-2026-" +
    Math.floor(100 + Math.random() * 900);

}


function getAuthority(type) {

  if (type === "Hostel") {
    return "Hostel Warden";
  }

  return "College Safety Department";

}


function calculatePriority(category, description) {

  const text =
    (category + " " + description)
      .toLowerCase();


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


function getStatusClass(status) {

  if (status === "In Progress") {
    return "progress";
  }

  return status.toLowerCase();

}


// -----------------------------
// 7-DAY AUTOMATIC ESCALATION
// -----------------------------

function checkEscalations() {

  const today = new Date();


  complaints.forEach(complaint => {

    // Resolved complaints never escalate

    if (
      complaint.status === "Resolved" ||
      complaint.status === "Escalated"
    ) {
      return;
    }


    const createdDate =
      new Date(complaint.createdAt);


    const deadlineDate =
      new Date(complaint.createdAt);


    deadlineDate.setDate(
      deadlineDate.getDate() + 7
    );


    // Escalate when deadline has passed

    if (today > deadlineDate) {

      complaint.status =
        "Escalated";


      complaint.authority =
        "College Main Authority";


      // Prevent duplicate escalation history

      const alreadyEscalated =
        complaint.history.some(
          item =>
            item.status === "Escalated"
        );


      if (!alreadyEscalated) {

        complaint.history.push({

          status:
            "Escalated",

          note:
            "7-day resolution deadline passed. Complaint automatically escalated to College Main Authority."

        });

      }

    }

  });

}


// -----------------------------
// DASHBOARD
// -----------------------------

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


  document
    .getElementById("totalIssues")
    .textContent =
    total;


  document
    .getElementById("pendingIssues")
    .textContent =
    pending;


  document
    .getElementById("progressIssues")
    .textContent =
    inProgress;


  document
    .getElementById("overdueIssues")
    .textContent =
    escalated;

}


// -----------------------------
// COMPLAINT LIST
// -----------------------------

function renderComplaints() {

  const complaintsList =
    document.getElementById(
      "complaintsList"
    );


  complaintsList.innerHTML = "";


  complaints
    .slice()
    .reverse()
    .forEach(complaint => {

      const card =
        document.createElement("div");


      card.className =
        "complaint-card";


      card.onclick =
        function () {

          showComplaintDetails(
            complaint.id
          );

        };


      card.innerHTML = `

        <h3>
          ${complaint.title}
        </h3>


        <p>
          ${complaint.description}
        </p>


        <div class="complaint-meta">

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

        </div>

      `;


      complaintsList.appendChild(
        card
      );

    });

}


// -----------------------------
// COMPLAINT DETAILS
// -----------------------------

function showComplaintDetails(
  complaintId
) {

  const complaint =
    complaints.find(
      item =>
        item.id === complaintId
    );


  if (!complaint) {
    return;
  }


  const detailsSection =
    document.getElementById(
      "detailsSection"
    );


  const complaintDetails =
    document.getElementById(
      "complaintDetails"
    );


  const submissionDate =
    new Date(
      complaint.createdAt
    ).toLocaleDateString();


  const deadlineDate =
    new Date(
      complaint.createdAt
    );


  deadlineDate.setDate(
    deadlineDate.getDate() + 7
  );


  let historyHTML = "";


  complaint.history.forEach(
    item => {

      historyHTML += `

        <div class="history-item">

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


  complaintDetails.innerHTML = `

    <div class="details-card">

      <h3>
        ${complaint.title}
      </h3>


      <p>
        ${complaint.description}
      </p>


      <div class="details-grid">

        <div class="detail-item">
          <strong>Complaint ID</strong>
          ${complaint.id}
        </div>


        <div class="detail-item">
          <strong>Status</strong>
          ${complaint.status}
        </div>


        <div class="detail-item">
          <strong>Priority</strong>
          ${complaint.priority}
        </div>


        <div class="detail-item">
          <strong>Category</strong>
          ${complaint.category}
        </div>


        <div class="detail-item">
          <strong>Location</strong>
          ${complaint.location}
        </div>


        <div class="detail-item">
          <strong>Complaint Type</strong>
          ${complaint.type}
        </div>


        <div class="detail-item">
          <strong>Assigned Authority</strong>
          ${complaint.authority}
        </div>


        <div class="detail-item">
          <strong>Submitted On</strong>
          ${submissionDate}
        </div>


        <div class="detail-item">
          <strong>Resolution Deadline</strong>
          ${deadlineDate.toLocaleDateString()}
        </div>

      </div>


      <div class="authority-actions">

        <h3>
          Authority Actions
        </h3>


        <textarea
          id="actionNote"
          placeholder="Add an action or update note..."
        ></textarea>


        <div class="action-buttons">

          <button
            onclick="updateComplaintStatus(
              '${complaint.id}',
              'In Progress'
            )"
          >
            Mark In Progress
          </button>


          <button
            onclick="updateComplaintStatus(
              '${complaint.id}',
              'Resolved'
            )"
          >
            Mark Resolved
          </button>

        </div>

      </div>


      <div class="complaint-history">

        <h3>
          Complaint Journey
        </h3>

        ${historyHTML}

      </div>

    </div>

  `;


  detailsSection
    .classList
    .remove("hidden");


  detailsSection
    .scrollIntoView({
      behavior: "smooth"
    });

}


// -----------------------------
// UPDATE STATUS
// -----------------------------

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


  const actionNote =
    document
      .getElementById(
        "actionNote"
      )
      .value
      .trim();


  complaint.status =
    newStatus;


  let note =
    actionNote;


  if (!note) {

    if (
      newStatus ===
      "In Progress"
    ) {

      note =
        "Authority started working on this complaint.";

    }


    if (
      newStatus ===
      "Resolved"
    ) {

      note =
        "Authority marked this complaint as resolved.";

    }

  }


  complaint.history.push({

    status:
      newStatus,

    note:
      note

  });


  renderStats();

  renderComplaints();


  showComplaintDetails(
    complaintId
  );

}


// -----------------------------
// CLOSE DETAILS
// -----------------------------

function closeDetails() {

  document
    .getElementById(
      "detailsSection"
    )
    .classList
    .add("hidden");


  document
    .getElementById(
      "complaintsSection"
    )
    .scrollIntoView({
      behavior: "smooth"
    });

}


// -----------------------------
// NEW COMPLAINT SUBMISSION
// -----------------------------

document
  .getElementById(
    "complaintForm"
  )
  .addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const type =
        document
          .getElementById(
            "complaintType"
          )
          .value;


      const category =
        document
          .getElementById(
            "category"
          )
          .value;


      const title =
        document
          .getElementById(
            "title"
          )
          .value;


      const location =
        document
          .getElementById(
            "location"
          )
          .value;


      const description =
        document
          .getElementById(
            "description"
          )
          .value;


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
          getAuthority(
            type
          ),

        createdAt:
          new Date()
            .toISOString()
            .split("T")[0],

        history: [

          {

            status:
              "Submitted",

            note:
              "Complaint submitted successfully."

          }

        ]

      };


      complaints.push(
        newComplaint
      );


      checkEscalations();

      renderStats();

      renderComplaints();


      document
        .getElementById(
          "complaintForm"
        )
        .reset();


      alert(
        "Complaint submitted successfully!\n\n" +
        "Complaint ID: " +
        newComplaint.id +
        "\nAssigned to: " +
        newComplaint.authority
      );


      document
        .getElementById(
          "complaintsSection"
        )
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


// -----------------------------
// INITIAL APPLICATION LOAD
// -----------------------------

checkEscalations();

renderStats();

renderComplaints();

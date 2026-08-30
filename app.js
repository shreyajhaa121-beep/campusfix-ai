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
    createdAt: "2026-08-29"
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
    createdAt: "2026-08-26"
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
    createdAt: "2026-08-20"
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
    createdAt: "2026-08-18"
  }
];


// Show Report Form

function showReportForm() {
  document
    .getElementById("reportSection")
    .classList
    .remove("hidden");

  document
    .getElementById("reportSection")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// Show Dashboard

function showDashboard() {
  document
    .getElementById("dashboard")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// Generate Complaint ID

function generateComplaintId() {
  return "CF-2026-" +
    Math.floor(100 + Math.random() * 900);
}


// Determine Authority

function getAuthority(type) {
  if (type === "Hostel") {
    return "Hostel Warden";
  }

  return "College Safety Department";
}


// Determine Priority

function calculatePriority(category, description) {

  const text = (
    category + " " + description
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
    text.includes("internet")
  ) {
    return "Medium";
  }

  return "Low";
}


// Render Dashboard Statistics

function renderStats() {

  const total = complaints.length;

  const pending = complaints.filter(
    complaint =>
      complaint.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    complaint =>
      complaint.status === "In Progress"
  ).length;

  const overdue = complaints.filter(
    complaint =>
      complaint.status === "Escalated"
  ).length;

  document
    .getElementById("totalIssues")
    .textContent = total;

  document
    .getElementById("pendingIssues")
    .textContent = pending;

  document
    .getElementById("progressIssues")
    .textContent = inProgress;

  document
    .getElementById("overdueIssues")
    .textContent = overdue;
}


// Get Status CSS Class

function getStatusClass(status) {

  if (status === "In Progress") {
    return "progress";
  }

  return status.toLowerCase();
}


// Render Complaint List

function renderComplaints() {

  const complaintsList =
    document.getElementById("complaintsList");

  complaintsList.innerHTML = "";

  complaints
    .slice()
    .reverse()
    .forEach(complaint => {

      const card =
        document.createElement("div");

      card.className = "complaint-card";

      card.innerHTML = `
        <h3>${complaint.title}</h3>

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

      complaintsList.appendChild(card);

    });
}


// Handle New Complaint

document
  .getElementById("complaintForm")
  .addEventListener(
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


      const newComplaint = {

        id: generateComplaintId(),

        title: title,

        type: type,

        category: category,

        location: location,

        description: description,

        status: "Pending",

        priority:
          calculatePriority(
            category,
            description
          ),

        authority:
          getAuthority(type),

        createdAt:
          new Date()
            .toISOString()
            .split("T")[0]

      };


      complaints.push(
        newComplaint
      );


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


// Initial Render

renderStats();

renderComplaints();
